import { FactoryOutlined, GavelOutlined, GroupsOutlined } from "@mui/icons-material";
import React from "react";

export const mockBarData = [
  {
    gas: "CO2",
    mining: 100,
    forestry: 80,
    agriculture: 120,
    transportation: 300,
  },
  {
    gas: "CH4",

    mining: 50,
    forestry: 20,
    agriculture: 80,
    transportation: 150,
  },
  {
    gas: "N2O",
    mining: 30,
    forestry: 40,
    agriculture: 50,
    transportation: 100,
  },
  {
    gas: "Fluorinated Gases",
    mining: 20,
    forestry: 40,
    agriculture: 70,
    transportation: 300,
  },
];

export const mockLineData = [
  {
    id: "NO2",
    color: "green",
    data: [
      { x: "Jan", y: 200 },
      { x: "Feb", y: 250 },
      { x: "March", y: 230 },
      { x: "April", y: 280 },
      { x: "May", y: 300 },
      { x: "June", y: 320 },
      { x: "July", y: 310 },
      { x: "Aug", y: 290 },
      { x: "Sept", y: 270 },
      { x: "Oct", y: 260 },
      { x: "Nov", y: 240 },
      { x: "Dec", y: 250 },
    ],
  },
  {
    id: "CO2",
    color: "blue",
    data: [
      { x: "Jan", y: 120 },
      { x: "Feb", y: 150 },
      { x: "March", y: 140 },
      { x: "April", y: 160 },
      { x: "May", y: 180 },
      { x: "June", y: 190 },
      { x: "July", y: 185 },
      { x: "Aug", y: 175 },
      { x: "Sept", y: 165 },
      { x: "Oct", y: 150 },
      { x: "Nov", y: 140 },
      { x: "Dec", y: 145 },
    ],
  },
  {
    id: "CH4",
    color: "red",
    data: [
      { x: "Jan", y: 80 },
      { x: "Feb", y: 100 },
      { x: "March", y: 90 },
      { x: "April", y: 120 },
      { x: "May", y: 120 },
      { x: "June", y: 130 },
      { x: "July", y: 125 },
      { x: "Aug", y: 115 },
      { x: "Sept", y: 105 },
      { x: "Oct", y: 110 },
      { x: "Nov", y: 100 },
      { x: "Dec", y: 105 },
    ],
  },
];

export const  recommendations = [
    {
      title: "Industry Actions",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon:React.createElement(FactoryOutlined)
    },
    {
      title: "Policy Changes",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: React.createElement(GavelOutlined),
    },
    {
      title: "Public Awareness",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon:React.createElement(GroupsOutlined),
    },
  ];