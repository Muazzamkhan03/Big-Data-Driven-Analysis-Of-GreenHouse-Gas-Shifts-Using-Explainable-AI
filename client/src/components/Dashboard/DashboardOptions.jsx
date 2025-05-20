import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  Slider,
  Typography
} from "@mui/material";
import { FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";
import { mockYears } from "./mockData";

const DashboardOptions = ({ onFilterChange, setCountriesList }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [yearRange, setYearRange] = useState([2015, 2024]);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  const countryFullNames = {
    PAK: "Pakistan",
    IND: "India",
    NPL: "Nepal",
    BGD: "Bangladesh",
    AFG: "Afghanistan",
    MDV: "Maldives",
    LKA: "Srilanka",
    BTN: "Bhutan"
    // add more as needed
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_HOST}/api/resources/countries`)
      .then((response) => {
        const countryNames = response.data.data.map((c) => c.name);
        setCountries(countryNames);
        setSelectedCountries(countryNames);
        onFilterChange(countryNames, yearRange);
        setCountriesList(countryNames);
      })
      .catch((error) => {
        console.error("Failed to fetch countries:", error);
      });
  }, []);

  // ✅ Close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => {
      setCountryDropdownOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCountryChange = (event) => {
    const updatedCountries = event.target.value;
    setSelectedCountries(updatedCountries);
    onFilterChange(updatedCountries, yearRange);
  };

  const handleYearChange = (event, newValue) => {
    setYearRange(newValue);
    onFilterChange(selectedCountries, newValue);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        paddingRight: "20px",
        gap: "20px",
        boxSizing: "border-box",
      }}
    >
      <Link to="/dashboard/prediction" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#A6C700",
            color: "black",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "18%",
            "&:hover": { backgroundColor: "#95B800" },
          }}
          startIcon={<FaChartLine />}
        >
          Future Predictions
        </Button>
      </Link>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          alignItems: "center",
        }}
      >
        {/* Country Dropdown */}
        <Box
          onMouseLeave={() => setCountryDropdownOpen(false)}
          sx={{ position: "relative" }}
        >
          <FormControl
            sx={{
              minWidth: 300,
              backgroundColor: "#1F2E2C",
              borderRadius: "5px",
            }}
            onClick={() => setCountryDropdownOpen(true)}
          >
            <InputLabel sx={{ color: "#fff", fontWeight: "bold" }}>
              Select Country
            </InputLabel>
            <Select
              multiple
              open={countryDropdownOpen}
              value={selectedCountries}
              onChange={handleCountryChange}
              renderValue={(selected) => selected.join(", ")}
              sx={{
                color: "#fff",
                backgroundColor: "#1F2E2C",
                "& .MuiSelect-icon": { color: "#fff" },
              }}
              MenuProps={{
                PaperProps: {
                  onMouseLeave: () => setCountryDropdownOpen(false),
                  sx: {
                    backgroundColor: "#1F2E2C",
                    color: "#fff",
                  },
                },
              }}
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  <Checkbox
                    checked={selectedCountries.includes(country)}
                    sx={{ color: "#A6C700" }}
                  />
                  <ListItemText primary={countryFullNames[country]} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Year Slider */}
        <Box sx={{ width: 600 }}>
          <Typography
            sx={{ color: "#fff", fontSize: "15px", fontWeight: "bold" }}
          >
            Year Range
          </Typography>
          <Slider
            value={yearRange}
            onChange={handleYearChange}
            valueLabelDisplay="auto"
            step={1}
            marks={mockYears.map((year) => ({
              value: year,
              label: <span style={{ color: "white" }}>{year}</span>,
            }))}
            min={mockYears[0]}
            max={mockYears[mockYears.length - 1]}
            sx={{ color: "#A6C700" }}
          />
        </Box>
      </Box>
    </div>
  );
};

DashboardOptions.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  setCountriesList: PropTypes.func.isRequired,
};

export default DashboardOptions;
