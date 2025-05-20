import {
  Box,
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

const FiltersSection = ({
  timePeriod,
  setTimePeriod,
  region,
  setRegion,
  latitude,
  setLatitude,
  setLongitude,
  longitude,
  emissionType,
  setEmissionType,
  onFiltersChange,
}) => {
  const [yearValue, setYearValue] = useState(
    timePeriod ? new Date(`${timePeriod}`) : new Date()
  );
  const [countries, setCountries] = useState([]);
  const [gases, setGases] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [isLoadingFilters, setIsLoadingFilters] = useState(true); // ← new state

  const countryFullNames = {
    PAK: "Pakistan",
    IND: "India",
    NPL: "Nepal",
    BGD: "Bangladesh",
    AFG: "Afghanistan",
    MDV: "Maldives",
    LKA: "Sri Lanka",
    BTN: "Bhutan"
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
      } finally {
        setIsLoadingFilters(false); // ← loading complete
      }
    };

    fetchFilterData();
  }, []);

  useEffect(() => {
    onFiltersChange({
      year: yearValue.getFullYear(),
      region,
      gas: emissionType,
      sector: selectedSector,
      latitude,
      longitude
    });
  }, [yearValue, region, emissionType, selectedSector, latitude, longitude]);

  const handleYearChange = (newValue) => {
    if (newValue) {
      setYearValue(newValue);
      setTimePeriod(newValue.getFullYear());
    }
  };

  const formatGasLabel = (gas) =>
    gas === 'co2e_20yr' ? 'CO2e20' : gas === 'pm2_5' ? 'PM2.5' : gas.toUpperCase();

  const formatSectorLabel = (sector) =>
    sector.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

  if (isLoadingFilters) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          width: "100%",
        }}
      >
        <CircularProgress color="primary" />
        <Typography sx={{ ml: 2, color: "#fff" }}>Loading filters...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      backgroundColor: "var(--secondary-background)",
      borderRadius: "15px",
      display: "flex",
      flexDirection: "column",
      gap: "1em",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: "1em",
    }}>
      <Box sx={{ margin: "1em" }}>
        <Typography variant="h4" sx={{ fontFamily: "Poppins", fontWeight: "bold" }}>
          Filters
        </Typography>
      </Box>

      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "90%",
        fontFamily: "Poppins",
      }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year"]}
            label="Year"
            value={yearValue}
            onChange={handleYearChange}
            slotProps={{
              textField: {
                InputProps: {
                  sx: {
                    color: "#fff",
                    "& input": { color: "#fff" },
                  },
                },
                InputLabelProps: { style: { color: "#fff" } },
                sx: {
                  backgroundColor: "var(--background)",
                  borderRadius: "10px",
                  width: "100%",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                  "& .MuiSvgIcon-root": { color: "#fff" },
                },
              },
            }}
          />
        </LocalizationProvider>

        <TextField
          select
          label="Region"
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
            setLatitude(null);
            setLongitude(null);
          }}
          sx={{
            flex: 1,
            backgroundColor: "var(--background)",
            borderRadius: "10px",
            width: "100%",
          }}
          InputProps={{ style: { color: "#fff" , textAlign: "left"} }}
          InputLabelProps={{ style: { color: "#fff" } }}
        >
          {countries.map((code) => (
            <MenuItem key={code} value={code}>
              {countryFullNames[code] || code}
            </MenuItem>
          ))}
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
          InputProps={{ style: { color: "#fff" , textAlign: "left" } }}
          InputLabelProps={{ style: { color: "#fff" } }}
        >
          {gases.map((gas) => (
            <MenuItem key={gas} value={gas}>
              {formatGasLabel(gas)}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Sector"
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
          sx={{
            flex: 1,
            backgroundColor: "var(--background)",
            borderRadius: "10px",
            width: "100%",
          }}
          InputProps={{ style: { color: "#fff", textAlign: "left" } }}
          InputLabelProps={{ style: { color: "#fff" } }}
        >
          {sectors.map((sector) => (
            <MenuItem key={sector} value={sector}>
              {formatSectorLabel(sector)}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
};

FiltersSection.propTypes = {
  timePeriod: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setTimePeriod: PropTypes.func.isRequired,
  region: PropTypes.string.isRequired,
  setRegion: PropTypes.func.isRequired,
  emissionType: PropTypes.string.isRequired,
  setEmissionType: PropTypes.func.isRequired,
  latitude: PropTypes.func.isRequired,
  setLatitude: PropTypes.func.isRequired,
  longitude: PropTypes.func.isRequired,
  setLongitude: PropTypes.func.isRequired,
  onFiltersChange: PropTypes.func.isRequired,
};

export default FiltersSection;
