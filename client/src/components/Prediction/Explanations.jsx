import {
  Box,
  Typography,
  LinearProgress,
  Slider,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import PropTypes from "prop-types";
import { useResponsiveValue } from "../../utility/common/useResponsiveValue";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { useState, useEffect } from "react";
import axios from "axios";

const Explanations = ({ xaiData, loading }) => {
  const flexDirection = useResponsiveValue("column", "column", "row");

  const [projectedImpact, setProjectedImpact] = useState(null);


  const [scenarioValues, setScenarioValues] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  });


  const [localLoading, setLocalLoading] = useState(false);

  const handleSliderChange = (index, newValue) => {
    setScenarioValues((prev) => ({ ...prev, [index]: newValue }));
    setLocalLoading(true); // show spinner
  };

  const fetchProjectedImpact = async (values) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_HOST}/api/extension/what-if`, {
        techAdoptionSlider: values[0],
        policyEnforcementSlider: values[1],
        publicAwarenessSlider: values[2],
        renewableEnergySlider: values[3],
      });

      if (response.data.success) {
        setProjectedImpact(response.data.data);
        console.log(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching projected impact:", error);
    }
  };


  useEffect(() => {
    if (localLoading) {
      const timeout = setTimeout(() => {
        setLocalLoading(false);
        fetchProjectedImpact(scenarioValues);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [localLoading]);


  const colorPalette = [
    "#78e08f", "#60a3bc", "#e77f67", "#f5cd79", "#e15f41",
    "#546de5", "#ff6b81", "#7bed9f", "#70a1ff", "#ff4757"
  ];

  const featureData = xaiData?.numerical_attribution
    ? Object.entries(xaiData.numerical_attribution).map(([label, value], index) => {
      const formattedLabel = label
        .replace(/[_-]/g, " ")
        .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

      return {
        label: formattedLabel,
        value: Math.round(value * 100),
        color: colorPalette[index % colorPalette.length],
      };
    })
    : [];

  const modelExplanationData = xaiData?.categorical_explanations
    ? Object.entries(xaiData.categorical_explanations).map(([key, explanation]) => {
      const formattedKey = key
        .replace(/[_-]/g, " ")
        .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

      return {
        key: formattedKey,
        explanation,
      };
    })
    : [];

  const scenarioData = [
    { label: "Technological adoption" },
    { label: "Policy enforcement" },
    { label: "Public awareness" },
    { label: "Renewable energy" },
  ];

  const isInitialLoading = !xaiData?.numerical_attribution || !xaiData?.categorical_explanations;
const isLoading = loading || isInitialLoading;


  return (
    <Box
      sx={{
        borderRadius: "10px",
        display: "flex",
        gap: 2,
        width: "100%",
        flexDirection: flexDirection,
        marginBottom: "1em",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "var(--secondary-background)",
          display: "flex",
          borderRadius: "15px",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            borderRadius: "10px",
            display: "flex",
            width: "100%",
            flexDirection: "column",
            gap: "1em",
          }}
        >
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
              Explanations and What If Scenarios
            </Typography>
          </Box>

          <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                gap: "1em",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {/* Feature Importance */}
              <Box
                sx={{
                  width: "65%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1em",
                  alignItems: "center",
                  margin: "1em",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "var(--background)",
                    width: "100%",
                    borderRadius: "15px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "var(--background)",
                      margin: "1em",
                      borderRadius: "15px",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ fontFamily: "Poppins", fontWeight: "bold" }}
                    >
                      Feature Importance
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em",
                        alignItems: "center",
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress sx={{ color: "var(--secondary)", margin: "2em" }} />
                      ) : (
                        featureData.map((feature, index) => (
                          <Box
                            key={index}
                            sx={{ marginBottom: "1em", width: "100%" }}
                          >
                            <Typography
                              sx={{ fontFamily: "Poppins", textAlign: "left" }}
                            >
                              {feature.label}
                            </Typography>
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "1em",
                              }}
                            >
                              <LinearProgress
                                variant="determinate"
                                value={feature.value}
                                sx={{
                                  borderRadius: "100px",
                                  backgroundColor: "#2c3e50",
                                  "& .MuiLinearProgress-bar": {
                                    backgroundColor: feature.color,
                                  },
                                  height: "17px",
                                  flex: 1,
                                }}
                              />
                              <Typography
                                sx={{
                                  fontFamily: "Poppins",
                                  color: feature.color,
                                  fontWeight: "bold",
                                }}
                              >
                                {feature.value}%
                              </Typography>
                            </Box>
                          </Box>
                        ))
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* What If Scenarios */}
              <Box
                sx={{
                  width: "48%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "var(--background)",
                  borderRadius: "15px",
                  justifyContent: "flex-start",
                  margin: "1em",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    margin: "1em",
                  }}
                >
                  What if Scenario Analysis
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100%",
                    margin: "1em",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    {scenarioData.map((scenario, index) => (
                      <Box key={index} sx={{ width: "100%", marginBottom: "1em" }}>
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            textAlign: "left",
                            marginBottom: "0.5em",
                          }}
                        >
                          {scenario.label}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1em",
                          }}
                        >
                          <Slider
                            value={scenarioValues[index]}
                            onChange={(e, newValue) =>
                              handleSliderChange(index, newValue)
                            }
                            min={-100}
                            max={100}
                            step={0.5}
                            marks
                            sx={{
                              color: "transparent",
                              height: 15,
                              borderRadius: "5px",
                              "& .MuiSlider-thumb": {
                                width: 15,
                                height: 15,
                                backgroundColor: "var(--secondary)",
                              },
                              "& .MuiSlider-track": {
                                height: 15,
                                borderRadius: "5px",
                                backgroundColor: "var(--secondary-background)",
                                border: "none",
                              },
                              "& .MuiSlider-rail": {
                                height: 15,
                                borderRadius: "5px",
                                backgroundColor: "var(--secondary-background)",
                                opacity: 1,
                              },
                            }}
                          />
                          <Typography
                            sx={{
                              fontFamily: "Poppins",
                              color: "var(--secondary)",
                              fontWeight: "bold",
                            }}
                          >
                            {scenarioValues[index] > 0 ? "+" : ""}
                            {scenarioValues[index]}%
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: "#1e2a28",
                      padding: "1em",
                      borderRadius: "10px",
                      textAlign: "center",
                      width: "90%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        textAlign: "left",
                      }}
                      variant="subtitle1"
                    >
                      Projected Impact
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontFamily: "Poppins",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "0.5em",
                      }}
                    >
                      <AutoGraphIcon sx={{ color: "var(--secondary)" }} />
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          color: "var(--secondary)",
                          fontWeight: "bold",
                          fontSize: "1.2em",
                          textAlign: "left",
                        }}
                      >
                       {projectedImpact !== null ? `${parseFloat(projectedImpact.toFixed(3))}%` : "0%"}

                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: "Poppins", textAlign: "left" }}
                      >
                        in total emissions
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Model Explanations */}
            <Box
              sx={{
                width: "95%",
                display: "flex",
                flexDirection: "column",
                gap: "1em",
                margin: "1em",
                backgroundColor: "var(--background)",
                borderRadius: "15px",
                padding: "1em",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Model Explanations
              </Typography>
              {isLoading ? (
                <Box sx={{ textAlign: "center", padding: "2em" }}>
                  <CircularProgress sx={{ color: "var(--secondary)" }} />
                </Box>
              ) : (
                <List sx={{ fontFamily: "Poppins", flexDirection: "column" }}>
                  {modelExplanationData.map((item, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        color: "#ddd",
                        borderBottom: "1px solid #444",
                        paddingBottom: "0.5em",
                        marginBottom: "0.5em",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: "bold",
                          color: "var(--secondary)",
                          marginRight: "0.5em",
                        }}
                      >
                        {item.key}:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontFamily: "Poppins" }}
                      >
                        {item.explanation}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

Explanations.propTypes = {
  xaiData: PropTypes.shape({
    numerical_attribution: PropTypes.object,
    categorical_explanations: PropTypes.object,
  }),
};

export default Explanations;
