import './style.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import DashboardMap from '../../../components/Dashboard/DashboardMap';
import PieChart from '../../../components/Dashboard/PieChart';
import BarChart from '../../../components/Dashboard/BarChart';
import SubSectors from '../../../components/Dashboard/SubSectors';
import DashboardHeader from '../../../components/Dashboard/TopBar/DashboardHeader';
import DashboardOptions from '../../../components/Dashboard/DashboardOptions';
import LineChart from '../../../components/Dashboard/LineChart';
import BottomBar from '../../../components/Dashboard/BottomBar';
// import DownloadModal from '../../../components/Dashboard/DownloadModal';

const Dashboards = ({getcountries}) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [yearRange, setYearRange] = useState([]);
  const [gases, setGases] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_APP_HOST}/api/resources/gases`)
      .then(response => {
        const gasNames = response.data.data.map(c => c.name);
        setGases(gasNames);
      })
      .catch(error => {
        console.error("Failed to fetch gases:", error);
      });
  }, []);

  useEffect(() => {
    // Setting auth object in local storage
    if (!localStorage.getItem('auth')) {
      localStorage.setItem('auth', JSON.stringify({ isLoggedIn: false, name: '', email: '' }));
    }
  }, []);

  useEffect(() => {
    console.log("Updated Countries:", selectedCountries);
    console.log("Updated Year Range:", yearRange);
  }, [selectedCountries, yearRange]);

  const handleFilterChange = (newSelectedCountries, newYearRange) => {
    setSelectedCountries(newSelectedCountries);
    setYearRange(newYearRange);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100vw",
      minHeight: "100vh",
      paddingTop: "70px",
      boxSizing: "border-box",
      overflow: "auto",
      gap: "20px"
    }}>
      {/* <DownloadModal /> */}

      {/* Fixed Dashboard Header */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        backgroundColor: "#fff",
        zIndex: 1000,
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <DashboardHeader
  countries={countries}
  yearRange={yearRange}
  gases={gases}
/>

      </div>

      {/* Dashboard Options */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        width: "94%",
        maxWidth: "1400px",
      }}>
        <DashboardOptions
  onFilterChange={handleFilterChange}
  setCountriesList={setCountries}
/>

      </div>

      {/* First Row - Line Chart */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        width: "94%",
        maxWidth: "1400px",
      }}>
        <LineChart selectedCountries={selectedCountries} yearRange={yearRange} />
      </div>

      {/* Second Row - Map & Pie Chart */}
      <div style={{
        display: "flex",
        gap: "10px",
        justifyContent: "space-between",
        width: "94%",
        maxWidth: "1400px",
      }}>
        <DashboardMap style={{ flex: 1 }} />
        <PieChart style={{ flex: 1 }} selectedCountries={selectedCountries} yearRange={yearRange} />
      </div>

      {/* Third Row - Bar Chart */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        width: "94%",
        maxWidth: "1400px",
      }}>
        <BarChart selectedCountries={selectedCountries} yearRange={yearRange} />
      </div>

      {/* Fourth Row - Sub Sectors */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        width: "94%",
        maxWidth: "1400px",
      }}>
        <SubSectors selectedCountries={selectedCountries} yearRange={yearRange} />
      </div>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  );
};

export default Dashboards;

Dashboards.propTypes = {
  getcountries: PropTypes.func.isRequired,
  
};