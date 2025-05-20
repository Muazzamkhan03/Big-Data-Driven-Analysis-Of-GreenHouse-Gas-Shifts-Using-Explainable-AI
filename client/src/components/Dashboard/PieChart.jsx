import { ResponsivePie } from "@nivo/pie";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import axios from "axios";
import { mockPieData as data } from "./mockData";

const PieChart = ({ selectedCountries, yearRange }) => {

  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call your API here
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_HOST}/api/emissions/?countries=${selectedCountries}&startYear=${yearRange[0]}&endYear=${yearRange[1]}`
        );
        console.log(`${import.meta.env.VITE_REACT_APP_HOST}/api/emissions/?countries=${selectedCountries}&startYear=${yearRange[0]}&endYear=${yearRange[1]}`);
        const sectorEmissionsData = response.data.data.emissionsBySector;
        console.log("Sector Data:", sectorEmissionsData);

        if (sectorEmissionsData && Array.isArray(sectorEmissionsData)) {
          const transformedSectorData = sectorEmissionsData.map((sector) => ({
            id: sector.sector,
            label: sector.sector.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),

            value: sector.totalEmission,
          }));
          // parseFloat((sector.totalEmission / 1e16).toFixed(10))

          setPieData(transformedSectorData);
        }
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchData();
  }, [selectedCountries, yearRange]);

  return (
    <div
      style={{
        textAlign: "left",
        fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: "9px",
        paddingBottom: "10px",
        backgroundColor: "var(--secondary-background)",
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h1 style={{ textAlign: "left", fontSize: "30px" }}>Sectors</h1>
      <div style={{ width: "600px", height: "350px" }}>
        <ResponsivePie
          data={pieData}
          margin={{ top: 20, right: 80, bottom: 20, left:-100 }}
          innerRadius={0.5}
          colors={[
            "#ff4c4c", "#4cff4c", "#4c4cff", "#ffde4c", "#ff4cff",
            "#4cffff", "#ff884c", "#b84cff", "#4cff88", "#ffd24c"
          ]}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          enableRadialLabels={false}
          radialLabelsSkipAngle={0}
          // radialLabel={() => ''}
          arcLabel={() => ''}
          // radialLabelsTextColor="transparent"
          // radialLabelsLinkColor="transparent"
          // enableSliceLabels={true}
          enableArcLinkLabels={false}
          // arcLinkLabelsTextColor="#" // label text color
          // arcLinkLabelsDiagonalLength={2}//optional for spacing/positioning
          // arcLinkLabelsStraightLength={6}//optional
          // arcLinkLabelsThickness={2}       // optional line thickness
          // arcLinkLabelsColor={{ from: 'color' }} // line color based on slice color
          // sliceLabel={() => ''}

          tooltip={({ datum }) => (
            <div style={{
              background: "#333",
              color: "white",
              padding: "6px 10px",
              borderRadius: "5px",
              fontSize: "14px"
            }}>
              {datum.label}: {datum.value}
            </div>
          )}
          

          legends={[
            {
              anchor: "right",
              direction: "column",
              translateX: 100,
              itemsSpacing: 8,
              itemWidth: 200,
              itemHeight: 16,
              itemTextColor: "white",
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 12,
              symbolShape: "square",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default PieChart;


PieChart.propTypes = {
  selectedCountries: PropTypes.arrayOf(PropTypes.string),
  yearRange: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])),
};
