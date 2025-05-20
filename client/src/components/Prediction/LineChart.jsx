import { ResponsiveLine } from "@nivo/line";
import PropTypes from "prop-types";

const LineChart = ({ monthlyData }) => {
  return (
    <ResponsiveLine
      data={monthlyData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: 'var(--chart3)',
            },
          },
          legend: {
            text: {
              fontWeight: 'bold',
              fill: 'var(--chart3)',
            },
          },
          ticks: {
            line: {
              stroke: 'var(--chart3)',
              strokeWidth: 1,
            },
            text: {
              fill: 'var(--chart3)',
            },
          },
        },
        legends: {
          text: {
            fill: 'var(--chart3)',
          },
        },
        tooltip: {
          container: {
            color: 'var(--chart1)',
          },
        },
      }}
      colors={{ scheme: "nivo" }}
      margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Months", // Changed to "Month"
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Emissions (Mt)", // Changed to "Emissions"
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      
      tooltip={({ point }) => (
        <div
          style={{
            padding: "8px 12px",
            background: "green",
            color: "#fff",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          <strong>{point.data.xFormatted}</strong> — {point.data.yFormatted} Mt
        </div>
      )}
    />
  );
};

LineChart.propTypes = {
  monthlyData: PropTypes.array.isRequired,
};

export default LineChart
