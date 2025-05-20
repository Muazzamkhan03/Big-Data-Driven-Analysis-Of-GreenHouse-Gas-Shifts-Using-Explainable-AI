import { useState } from "react";
import { Box } from "@mui/material";
import MapSection from "./MapSection";
import FiltersSection from "./FiltersSection";
import { useResponsiveValue } from "../../../utility/common/useResponsiveValue";
import QuickStatsSection from "./QuickStatsSection";
import { mainSectionStyles as styles } from "./styles";
import PropTypes from "prop-types";
import { Height } from "@mui/icons-material";

const MainSection = ({ onFiltersChange, quickStats, loadingPredictions }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [region, setRegion] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [emissionType, setEmissionType] = useState("");

  const flexDirection = useResponsiveValue("column", "column", "row");
  const flexDirectionRight = useResponsiveValue("column", "row", "column");
  const widthRight = useResponsiveValue("100%", "100%", "30%");
  const handleAddressSelect = (address) => {
    setFormattedAddress(address.formattedAddress);
    setRegion(address.country);
    setLatitude(address.latitude);
    setLongitude(address.longitude);
  }




  return (
    <Box sx={styles.container(flexDirection)}>
      <MapSection
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        formattedAddress={formattedAddress}
        handleAddressSelect={handleAddressSelect}
      />
      <Box
        sx={{
          width: widthRight,
          borderRadius: "15px",
          display: "flex",
          flexDirection: flexDirectionRight,
          gap: "1em",
          
          height:"600px",
          justifyContent: "space-between",
        }}
      >
        <FiltersSection
          timePeriod={timePeriod}
          setTimePeriod={setTimePeriod}
          region={region}
          setRegion={setRegion}
          latitude={latitude}              
          setLatitude={setLatitude}        
          longitude={longitude}            
          setLongitude={setLongitude}
          emissionType={emissionType}
          setEmissionType={setEmissionType}
          onFiltersChange={onFiltersChange}
        />
        <QuickStatsSection quickStats={quickStats} loadingPredictions={loadingPredictions}/>
      </Box>
    </Box>
  );
};

MainSection.propTypes = {
  onFiltersChange: PropTypes.func.isRequired,
  quickStats: PropTypes.shape({
    totalEmissions: PropTypes.number,
    since2024: PropTypes.number,
  }),
};

export default MainSection;
