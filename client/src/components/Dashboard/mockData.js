// import { FactoryOutlined, GavelOutlined, GroupsOutlined } from "@mui/icons-material";
// import React from "react";

export const mockPieData = [

  { id: "CO2", label: "CO2", value: 45 },
  { id: "CH4", label: "CH4", value: 25 },
  { id: "N2O", label: "N2O", value: 100 },
  { id: "NH3", label: "NH3", value: 60 },
  { id: "CH3COOH", label: "CH3COOH", value: 15 },
  { id: "NO3", label: "NO3", value: 15 },
];

export const mockBarData = [
  { gas: "CO2", value: 4 },
  { gas: "SO2", value: 4 },
  { gas: "PM2.5", value: 1 },
  { gas: "CH4", value: 6 },
];

export const sectorsData = [
  {
    name: "Sector 1", subSectors: [
      { name: "Sub-sector 1", value: 500 },
      { name: "Sub-sector 2", value: 600 }
    ]
  },
  {
    name: "Sector 2", subSectors: [
      { name: "Sub-sector 1", value: 700 },
      { name: "Sub-sector 2", value: 800 }
    ]
  },
  {
    name: "Sector 3", subSectors: [
      { name: "Sub-sector 1", value: 550 },
      { name: "Sub-sector 2", value: 650 }
    ]
  },
  {
    name: "Sector 4", subSectors: [
      { name: "Sub-sector 1", value: 950 },
      { name: "Sub-sector 2", value: 550 },
      { name: "Sub-sector 3", value: 200 }
    ]
  },
  {
    name: "Sector 5", subSectors: [
      { name: "Sub-sector 1", value: 900 },
      { name: "Sub-sector 2", value: 920 }
    ]
  },
  {
    name: "Sector 6", subSectors: [
      { name: "Sub-sector 1", value: 610 },
      { name: "Sub-sector 2", value: 720 }
    ]
  },
  {
    name: "Sector 7", subSectors: [
      { name: "Sub-sector 1", value: 450 },
      { name: "Sub-sector 2", value: 350 },
      { name: "Sub-sector 3", value: 900 },
      { name: "Sub-sector 4", value: 750 },
      { name: "Sub-sector 5", value: 830 }
    ]
  },
  {
    name: "Sector 8", subSectors: [
      { name: "Sub-sector 1", value: 530 },
      { name: "Sub-sector 2", value: 710 }
    ]
  }
];

export const mockCountryEmissionsData = [
  { year: 2019, Ind: 30, Sri: 40, Pak: 20 },
  { year: 2020, Ind: 40, Sri: 45, Pak: 30 },
  { year: 2021, Ind: 55, Sri: 50, Pak: 40 },
  { year: 2022, Ind: 35, Sri: 35, Pak: 25 },
  { year: 2023, Ind: 50, Sri: 48, Pak: 38 }
];

export const mockYears = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
export const mockCountries = ["USA", "India", "China", "Pakistan"," Turkey", "Germany"];