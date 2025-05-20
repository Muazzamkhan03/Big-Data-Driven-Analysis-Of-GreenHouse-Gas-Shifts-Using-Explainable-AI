import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// List of South Asian countries (Country Names or ISO Country Codes)
const southAsianCountries = [
  "Afghanistan",
  "Bangladesh",
  "Bhutan",
  "India",
  "Maldives",
  "Nepal",
  "Pakistan",
  "Sri Lanka"
];

const DashboardMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

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
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // Perform reverse geocoding to get the country
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.results[0]) {
        const result = data.results[0];
        const country = result.address_components.find((component) =>
          component.types.includes("country")
        )?.long_name;

        // Check if the country is South Asian
        if (country && southAsianCountries.includes(country)) {
          setSelectedLocation({ lat, lng });
        } else {
          // Show Toastify alert if location is outside South Asia
          toast.error("Please select a location within South Asia.");
        }
      }
    } catch (error) {
      console.error("Error fetching geocode data:", error);
      toast.error("Failed to retrieve location data.");
    }
  };

  return (
    <Box sx={{ width: "50%", borderRadius: "10px" }}>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "450px", borderRadius: "15px" }}
          center={selectedLocation || { lat: 37.7749, lng: -122.4194 }}
          zoom={10}
          onClick={handleMapClick}
        >
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
      </LoadScript>

      {/* Toastify Container */}
      <ToastContainer />
    </Box>
  );
};

export default DashboardMap;
