import { Box, Typography, CircularProgress } from "@mui/material";
import { typographyStyles } from "../../constants/FontConstants";
import { useResponsiveValue } from "../../utility/common/useResponsiveValue";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

import PropTypes from "prop-types";
import InfoIcon from "@mui/icons-material/Info";

const Predictions = ({ predictionsData, recommendationData = {}, loading }) => {
  const flexDirection = useResponsiveValue("column", "column", "row");
  const flexDirectionRight = useResponsiveValue("column", "row", "column");
  const widthRight = useResponsiveValue("100%", "100%", "30%");
  const margin = useResponsiveValue("0.5em", "0.5em", "1em");

  const monthlyData = predictionsData?.monthly_emissions || [];
  const sourceData = predictionsData?.subsector_emissions || {};

  const isLoadingCharts = loading || !predictionsData || Object.keys(predictionsData).length === 0;
  const isLoadingRecommendations = loading || !recommendationData || Object.keys(recommendationData).length === 0;

  const formattedMonthlyData = [
    {
      id: predictionsData?.country || "Emissions",
      data: monthlyData.map((value, index) => ({
        x: new Date(0, index).toLocaleString("default", { month: "short" }),
        y: value,
      })),
    },
  ];

  const formattedsourceData = Object.entries(sourceData).map(
    ([key, value]) => ({
      sector: key
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      emissions: value.total_emissions,
    })
  );

  const formattedRecommendations = Object.entries(recommendationData).map(
    ([key, description]) => ({
      title: key
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      description,
      icon: <InfoIcon />,
    })
  );

  return (
    <Box
      sx={{
        borderRadius: "10px",
        display: "flex",
        gap: 2,
        width: "100%",
        flexDirection,
        marginBottom: "1em",
      }}
    >
      {/* Prediction Section */}
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
              Emissions Prediction
            </Typography>
          </Box>

          {/* Content or Loader */}
          {isLoadingCharts ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px", // placeholder height
              }}
            >
              <CircularProgress sx={{ color: "var(--secondary)" }} />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                gap: "1em",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mx: "1em",
                flexDirection,
              }}
            >
              {/* Line Chart */}
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "var(--background)",
                  borderRadius: "15px",
                  flexDirection: "column",
                  display: "flex",
                  alignItems: "center",
                  height: "450px",
                   marginTop: "4em",
                   marginBottom:"4em",
                  padding: "1em",
                }}
              >
                <Typography
                  variant={typographyStyles.para}
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "var(--black10)",
                    marginBottom: "0.5em",
                  }}
                >
                  Monthly Trends
                </Typography>
                <Box sx={{ height: "90%", width: "100%" }}>
                  <LineChart monthlyData={formattedMonthlyData} />
                </Box>
              </Box>

              {/* Bar Chart */}
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "var(--background)",
                  borderRadius: "15px",
                  flexDirection: "column",
                  display: "flex",
                  alignItems: "center",
                  height: "450px",
                   marginTop: "4em",
                   marginBottom:"4em",
                  padding: "1em",
                }}
              >
                <Typography
                  variant={typographyStyles.para}
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "var(--black10)",
                    marginBottom: "0.5em",
                  }}
                >
                  Emission Sources
                </Typography>
                <Box sx={{ height: "90%", width: "100%" }}>
                  <BarChart sourceData={formattedsourceData} />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* Recommendations */}
      <Box
        sx={{
          width: widthRight,
          borderRadius: "15px",
          display: "flex",
          flexDirection: flexDirectionRight,
          justifyContent: "space-between",
          backgroundColor: "var(--secondary-background)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "1em",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                marginTop: margin,
                marginBottom: margin,
              }}
            >
              Recommendations 
            </Typography>
          </Box>

          {/* Recommendations or Spinner */}
          {isLoadingRecommendations ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px", // placeholder height
              }}
            >
              <CircularProgress sx={{ color: "var(--secondary)" }} />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                gap: "1em",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                marginBottom: "1em",
              }}
            >
              {formattedRecommendations.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1em",
                    backgroundColor: "var(--background)",
                    borderRadius: "15px",
                    width: "90%",
                  }}
                >
                  <Box sx={{ margin: "1em" }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: "0.5em" }}
                    >
                      <Box sx={{ color: "var(--chart4)" }}>{item.icon}</Box>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: "bold",
                          fontSize: "15px",
                          color: "var(--chart4)",
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "12px",
                        color: "var(--black10)",
                        textAlign: "left",
                        marginTop: "0.5em",
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

Predictions.propTypes = {
  predictionsData: PropTypes.object.isRequired,
  recommendationData: PropTypes.object,
  loading: PropTypes.bool.isRequired,  // Ensure loading prop is passed
};

export default Predictions;
