import { Box, CircularProgress, Typography } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const southAsianCountries = {
  PK: "Pakistan",
  IN: "India",
  NP: "Nepal",
  BD: "Bangladesh",
  AF: "Afghanistan",
  MV: "Maldives",
  LK: "Sri Lanka",
  BT: "Bhutan",
};

const alpha2ToAlpha3 = {
  PK: "PAK",
  IN: "IND",
  NP: "NPL",
  BD: "BGD",
  AF: "AFG",
  MV: "MDV",
  LK: "LKA",
  BT: "BTN",
};

const MapSection = ({
  selectedLocation,
  setSelectedLocation,
  handleAddressSelect,
}) => {
  const [loading, setLoading] = useState(false);
  const [formattedAddress, setFormattedAddress] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation({ lat: latitude, lng: longitude });
        },
        (error) => console.error("Geolocation error:", error)
      );
    }
  }, []);

  const handleMapClick = async (event) => {
    setLoading(true);
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.results[0]) {
        const result = data.results[0];
        const countryComponent = result.address_components.find((component) =>
          component.types.includes("country")
        );
        const countryCode = countryComponent?.short_name;

        if (countryCode && southAsianCountries[countryCode]) {
          setSelectedLocation({ lat, lng });
          setFormattedAddress(result.formatted_address);
          handleAddressSelect({
            latitude: lat.toString(),
            longitude: lng.toString(),
            formattedAddress: result.formatted_address,
            country: alpha2ToAlpha3[countryCode],
          });
        } else {
          toast.error("Please select a location within South Asia.");
        }
      } else {
        toast.error("Location not found.");
      }
    } catch (error) {
      toast.error("Error fetching geocode information.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "595px",
        borderRadius: "15px",
        backgroundColor: "var(--secondary-background)",
        padding: "1em",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography
          variant="h4"
          sx={{ fontFamily: "Poppins", fontWeight: "bold", mr: 2 }}
        >
          Emissions Map
        </Typography>
        <input
          type="text"
          readOnly
          placeholder="Select Address on Map"
          value={formattedAddress}
          style={{
            borderRadius: "10px",
            backgroundColor: "var(--background)",
            color: "#fff",
            border: "none",
            width: "65%",
            fontFamily: "Poppins",
            padding: "1em 0.5em",
            marginLeft: "1em",
          }}
        />
      </Box>

      <Box sx={{ width: "100%", height: "500px", position: "relative" }}>
        <LoadScript googleMapsApiKey={import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            id="map"
            mapContainerStyle={{ height: "100%", width: "100%" ,borderRadius:"10px"  }}
            zoom={6}
            center={selectedLocation || { lat: 30.3753, lng: 69.3451 }} // Default center: Pakistan
            onClick={handleMapClick}
          >
            {selectedLocation && <Marker position={selectedLocation} />}
          </GoogleMap>
        </LoadScript>

        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default MapSection;
