import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";

const BarChart = ({ sourceData }) => {
  return (
    <ResponsiveBar
      data={sourceData}
      keys={["emissions"]}
      indexBy="sector"
      margin={{ top: 50, right: 30, bottom: 80, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "accent" }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 10,
        tickPadding: 13,
        tickRotation: 35,
        legend: "Subsectors",
        legendPosition: "middle",
        legendOffset: 10,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Total Emissions(Mt)",
        legendPosition: "middle",
        legendOffset: -50,
      }}
      enableLabel={false}
      tooltip={({ id, value, indexValue, color }) => (
        <div
          style={{
            padding: "8px 12px",
            background: "#1a630b",
            color: "#fff",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          <strong>{indexValue}</strong> — {value} Mt
        </div>
      )}
      theme={{
        axis: {
          ticks: {
            text: {
              fontSize: 8 ,
              fill: "#eac79d",
            },
          },
          legend: {
            text: {
               fontSize: 10 ,
               fontWeight: 'bold',
              fill: "#eac79d",
            },
          },
        },
      }}
    />
  );
};

BarChart.propTypes = {
  sourceData: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      sector: PropTypes.string.isRequired,
      emissions: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BarChart;
