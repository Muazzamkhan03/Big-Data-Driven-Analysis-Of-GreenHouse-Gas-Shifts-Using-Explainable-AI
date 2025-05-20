import { ResponsiveBar } from "@nivo/bar";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

const formatGasLabel = (gas) => {
  if (gas === "co2e_20yr") return "CO2e20";
  if (gas === "pm2_5") return "PM2.5";
  return gas.toUpperCase();
};

const BarChart = ({ selectedCountries, yearRange }) => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the data from the API
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/emissions/?countries=${selectedCountries}&startYear=${yearRange[0]}&endYear=${yearRange[1]}`
        );
        console.log(`${import.meta.env.VITE_REACT_APP_HOST}/api/emissions/?countries=${selectedCountries}&startYear=${yearRange[0]}&endYear=${yearRange[1]}`);

        const emissionsByGasData = response.data.data.emissionsByGas;
        console.log("Emissions by Gas:", emissionsByGasData);

        // Check if data exists and map to a valid format
        if (emissionsByGasData && Array.isArray(emissionsByGasData)) {
          const transformedGasData = emissionsByGasData
            .map((gas) => ({
              id: formatGasLabel(gas.gas),            
              value: parseFloat(gas.totalEmission), 
            }))

            
          setBarData(transformedGasData);
        }
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    fetchData();
  }, [selectedCountries, yearRange]);

  return (
    <div style={{
      backgroundColor: "var(--secondary-background)",
      padding: "15px",
      borderRadius: "10px",
      width: "100%",
    }}>
      <h1 style={{ textAlign: "left", fontSize: "30px" }}>Gases</h1>

      <div style={{ height: "500px" }}>
      <ResponsiveBar
  data={barData}
  keys={["value"]}
  indexBy="id"
  margin={{ top: 40, right: 20, bottom: 50, left: 50 }} // More top margin for labels
  padding={0.3}
  valueScale={{ type: "linear" }}
  indexScale={{ type: "band", round: true }}
  colors={["#21C55D"]}
  borderColor={{ from: "color", modifiers: [["darker", "1.6"]] }}

  axisTop={null}
  axisRight={null}
  axisBottom={{
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Gas",
    legendPosition: "middle",
    legendOffset: 32,
  }}
  axisLeft={{
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Concentration (in millions)",
    legendPosition: "middle",
    legendOffset: -40,
    format: value => {
      if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
      if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
      if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
      return value;
    },
  }}

  enableLabel={false} // Disable default labels
  legends={[]}
  theme={{
    axis: {
      ticks: {
        text: {
          fill: "#FFFFFF",
        },
      },
      domain: {
        line: {
          stroke: "#FFFFFF",
        },
      },
    },
  }}

  tooltip={() => null}

  // tooltip={({ value }) => (
  //   <div
  //     style={{
  //       padding: '6px 9px',
  //       color: '#21C55D',
  //       background: '#FFFFFF',
  //       borderRadius: '4px',
  //       fontWeight: 'Bold'
  //     }}
  //   >
  //     {value.toLocaleString()}
  //   </div>
  // )}

  role="application"
  barAriaLabel={(e) => `${e.indexValue}: ${e.formattedValue}`}

  layers={[
    "grid",
    "axes",
    "bars",
    ({ bars }) =>
      bars.map((bar) => (
        <text
          key={bar.key}
          x={bar.x + bar.width / 2}
          y={bar.y - 6} // Above the bar
          textAnchor="middle"
          dominantBaseline="central"
          fill="#FFFFFF"
          style={{ fontSize: 12, fontWeight: "bold" }}
        >
          {bar.data.value.toLocaleString()}
        </text>
      )),
  ]}
/>


      </div>
    </div>
  );
};

export default BarChart;

BarChart.propTypes = {
  selectedCountries: PropTypes.arrayOf(PropTypes.string),
  yearRange: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])), 
};
