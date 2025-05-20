import { useState, useEffect } from "react";
import { Box, TextField, Typography, MenuItem, Card } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { typographyStyles } from "../../../constants/FontConstants";
import { useResponsiveValue } from "../../../utility/common/useResponsiveValue";

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [region, setRegion] = useState("");
  const [emissionType, setEmissionType] = useState("");
  const [addressDetails, setAddressDetails] = useState({});

  const handleAddressSelect = (address) => {
    setAddressDetails(address);
    console.log(addressDetails);
  };

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
    setSelectedLocation({ lat, lng });

    // Fetch address details using the Geocoding API
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBMLGFyGSVbRy8FVFp2MOzo9IVdxXFEBs8`;
    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.results[0]) {
      const result = data.results[0];
      setFormattedAddress(result.formatted_address);

      const addressData = {
        latitude: lat.toString(),
        longitude: lng.toString(),
        formattedAddress: result.formatted_address,
      };

      handleAddressSelect(addressData);
    }
  };

  const flexDirection = useResponsiveValue("column", "column", "row");
  const flexDirectionRight = useResponsiveValue("column", "row", "column");
  const widthRight = useResponsiveValue("100%", "100%", "30%");
  return (
    <Box
      sx={{
        borderRadius: "10px",
        display: "flex",
        gap: 2,
        width: "100%",
        flexDirection: flexDirection,
        marginBottom: "1em",
      }}
    >
      {/* Map Section */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "var(--secondary-background)",
          display: "flex",
          borderRadius: "15px",
        }}
      >
        <Box
          sx={{
            color: "#fff",
            borderRadius: "10px",
            display: "flex",
            width: "100%",
            flexDirection: "column",
            gap: "1em",
          }}
        >
          {/* Heading */}
          <Box
            sx={{
              display: "flex",
              gap: "1em",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "1em",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontFamily: "Poppins", fontWeight: "bold" }}
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
                width: "55%",
                fontFamily: "Poppins",
                padding: "1em 0.5em",
              }}
            />
          </Box>

          {/*Map*/}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadScript
              googleMapsApiKey={import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY}
            >
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "415px",
                  borderRadius: "15px",
                  margin: "1em",
                }}
                center={selectedLocation || { lat: 37.7749, lng: -122.4194 }}
                zoom={10}
                onClick={handleMapClick}
              >
                {selectedLocation && <Marker position={selectedLocation} />}
              </GoogleMap>
            </LoadScript>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: widthRight,
          borderRadius: "15px",
          display: "flex",
          flexDirection: flexDirectionRight,
          gap: "1em",
          justifyContent: "space-between",
        }}
      >
        {/* Filters Section */}
        <Box
          sx={{
            backgroundColor: "var(--secondary-background)",
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "1em",
          }}
        >
          <Box
            sx={{
              margin: "1em",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontFamily: "Poppins", fontWeight: "bold" }}
            >
              Filters
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "90%",
              fontFamily: "Poppins",
            }}
          >
            <TextField
              select
              label="Time Period"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              sx={{
                flex: 1,
                backgroundColor: "var(--background)",
                borderRadius: "10px",
                width: "100%",
                fontFamily: "Poppins",
              }}
              InputProps={{
                style: { color: "#fff" },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            >
              <MenuItem value="Last Month" sx={{ fontFamily: "Poppins" }}>
                Last Month
              </MenuItem>
              <MenuItem value="Last Year" sx={{ fontFamily: "Poppins" }}>
                Last Year
              </MenuItem>
            </TextField>
            <TextField
              select
              label="Region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              sx={{
                flex: 1,
                backgroundColor: "var(--background)",
                borderRadius: "10px",
                width: "100%",
              }}
              InputProps={{
                style: { color: "#fff" },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            >
              <MenuItem value="San Francisco">San Francisco</MenuItem>
              <MenuItem value="Oakland">Oakland</MenuItem>
            </TextField>
            <TextField
              select
              label="Emission Type"
              value={emissionType}
              onChange={(e) => setEmissionType(e.target.value)}
              sx={{
                flex: 1,
                backgroundColor: "var(--background)",
                borderRadius: "10px",
                width: "100%",
              }}
              InputProps={{
                style: { color: "#fff" },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            >
              <MenuItem value="CO2">CO2</MenuItem>
              <MenuItem value="CH4">CH4</MenuItem>
            </TextField>
          </Box>
        </Box>
        

        {/* Quick Stats Section */}
        <Box
          sx={{
            backgroundColor: "var(--secondary-background)",
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1em",
              justifyContent: "flex-start",
              alignItems: "center",
              margin: "1em",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontFamily: "Poppins", fontWeight: "bold" }}
            >
              Quick Stats
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "var(--background)",
                padding: "1em",
                borderRadius: "10px",
                color: "#fff",
                textAlign: "center",
                width: "50%",
                height: "60%",
                margin: "1em",
              }}
            >
              <Typography
                variant={typographyStyles.para}
                sx={{ fontWeight: "bold", color: "var(--black10)" }}
              >
                Total Emissions
              </Typography>
              <Typography
                variant={typographyStyles.h6}
                sx={{
                  color: "var(--success)",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                }}
              >
                2.455 M tons
              </Typography>
            </Card>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "var(--background)",
                padding: "1em",
                borderRadius: "10px",
                textAlign: "center",
                width: "50%",
                height: "60%",
                margin: "1em",
              }}
            >
              <Typography
                variant={typographyStyles.para}
                sx={{ fontWeight: "bold", color: "var(--black10)" }}
              >
                YoY Change
              </Typography>
              <Typography
                variant={typographyStyles.h6}
                sx={{
                  color: "var(--error)",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                }}
              >
                +2.7%
              </Typography>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Map;
