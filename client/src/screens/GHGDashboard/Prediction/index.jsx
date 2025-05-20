import { useState, useEffect } from "react";
import Explanations from "../../../components/Prediction/Explanations";
import MainSection from "../../../components/Prediction/Map/MainSection";
import Predictions from "../../../components/Prediction/Predictions";
import "./style.css";
import DashboardHeader from "../../../components/Dashboard/TopBar/DashboardHeader";
import BottomBar from "../../../components/Dashboard/BottomBar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardPredictions = () => {
  const [filters, setFilters] = useState({
    year: "",
    region: "",
    gas: "",
    sector: "",
    latitude: null,
    longitude: null
  });

  const [recommendationData, setRecommendationData] = useState([]);
  const [predictionsData, setPredictionsData] = useState(null);
  const [xaiData, setXaiData] = useState(null);
  const [rateLimitToastShown, setRateLimitToastShown] = useState(false);
  const [countries, setCountries] = useState([]);
  const [gases, setGases] = useState([]);
  const [sectors, setSectors] = useState([]);

  const [quickStats, setQuickStats] = useState({
    totalEmissions: 0,
    since2024: 0
  });

  // Loading states for different sections
  const [loadingPredictions, setLoadingPredictions] = useState(false);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [loadingXAI, setLoadingXAI] = useState(false);
  const [loadingQuickStart, setloadingQuickStart] = useState(false);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log("Updated Filters in DashboardPredictions:", newFilters);

    // Reset the loading states for all sections when filters change
    setLoadingPredictions(true);
    setLoadingRecommendations(true);
    setLoadingXAI(true);
    setloadingQuickStart(true); // should be true to trigger spinner
  };

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [countriesRes, gasesRes, sectorsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_REACT_APP_HOST}/api/resources/countries`),
          axios.get(`${import.meta.env.VITE_REACT_APP_HOST}/api/resources/gases`),
          axios.get(`${import.meta.env.VITE_REACT_APP_HOST}/api/resources/sectors`)
        ]);

        setCountries(countriesRes.data.data.map((c) => c.name));
        setGases(gasesRes.data.data.map((g) => g.name));
        setSectors(sectorsRes.data.data.map((s) => s.name));
      } catch (err) {
        console.error("Error fetching filter data:", err);
      } 
      
    };

    fetchFilterData();
  }, []);


  useEffect(() => {
    const { year, region, gas, sector, latitude, longitude } = filters;

    const fetchData = async () => {
      const requestBody = {
        country: region,
        gas,
        sector,
        year,
        latitude,
        longitude
      };

      try {
        // Fetch predictions data
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/predictions/`,
          requestBody,
          { withCredentials: true }
        );
        const predictedEmission = response.data.data;

        setPredictionsData(predictedEmission);
        setQuickStats({
          totalEmissions: predictedEmission.total_emissions,
          since2024: predictedEmission.since2024
        });

        setLoadingPredictions(false);
        setloadingQuickStart(false);

        // Fetch recommendations
        const recommendResponse = await axios.post(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/extension/recommend`,
          {
            country: region,
            gas,
            sector,
            predictedEmission
          },
          { withCredentials: true }
        );

        setRecommendationData(recommendResponse.data.recommendations);
        setLoadingRecommendations(false);

        // Fetch XAI data
        const explainResponse = await axios.post(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/extension/explain`,
          requestBody,
          { withCredentials: true }
        );

        setXaiData(explainResponse.data.xai);
        setLoadingXAI(false);
      } catch (error) {
        if (error.response?.status === 429 && !rateLimitToastShown) {
          toast.error(
            "You have reached your limit for today. Please log in to make more callouts.",
            {
              autoClose: 5000,
              onClose: () => setRateLimitToastShown(false)
            }
          );
          setRateLimitToastShown(true);
        } else if (error.response?.status === 500 && !rateLimitToastShown) {
          toast.error(
            "A server error occurred while processing your request. Please try again later.",
            { autoClose: 5000 }
          );
        } else {
          console.error("Error during predictions, recommendations, or XAI explain:", error);
        }
      } finally {
        setLoadingPredictions(false);
        setLoadingRecommendations(false);
        setLoadingXAI(false);
        setloadingQuickStart(false);
      }
    };

    // If filters are complete, fetch data
    if (year && region && gas && sector) {
      fetchData();
    } else {
      // Filters are incomplete, stop QuickStats loading
      setloadingQuickStart(false);
    }
  }, [filters.year, filters.region, filters.gas, filters.sector]);

  const isFiltersEmpty =
    !filters.year || !filters.region || !filters.gas || !filters.sector;

  return (
    <>
      <ToastContainer />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          backgroundColor: "#fff",
          zIndex: 1000,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
        }}
      >
        <DashboardHeader
        countries={countries}
        gases={gases} />
      </div>

      <div
        className="dashboard-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
          minHeight: "100vh",
          paddingTop: "70px",
          boxSizing: "border-box",
          overflow: "auto",
          gap: "20px"
        }}
      >
        <MainSection
          onFiltersChange={handleFiltersChange}
          quickStats={quickStats}
          loadingPredictions={loadingQuickStart}
         
        />

        {isFiltersEmpty ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
              textAlign: "center",
              fontFamily: "Poppins",
              fontSize: "18px",
              color: "#FFFFFF",
              padding: "20px"
            }}
          >
            <p>
              Please select Region, Emission Type, Sector, and Year to see the
              predictions
            </p>
          </div>
        ) : (
          <>
            <Predictions
              filters={filters}
              predictionsData={predictionsData}
              recommendationData={recommendationData}
              loading={loadingPredictions}
              loadingRecommendations={loadingRecommendations}
            />
            <Explanations xaiData={xaiData} loading={loadingXAI} />
          </>
        )}

        <BottomBar />
      </div>
    </>
  );
};

export default DashboardPredictions;
