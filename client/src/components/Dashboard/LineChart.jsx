    import { ResponsiveLine } from "@nivo/line";
    import { useEffect, useState } from "react";
    import PropTypes from 'prop-types';
    import axios from "axios"; // Using axios for API calls

    const fixedColors = [
        "#39FF14", // Neon Green 
        "#FFA500", // Deep Orange   
        "#E1B382", // Sand Brown
        "#A45C40", //  Rust Brown
        "#D9935E", // Copper Orange
        "#F2CD5D", // Golden Yellow
        "#8A7352", // Wood Brown
        "#B27D56", //Light Terracotta
        "#5A8C74", // Muted Teal
    ];

    const CountryEmissionsChart = ({selectedCountries, yearRange }) => {
        const [chartData, setChartData] = useState([]);
        //console.log(countries);


        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_REACT_APP_HOST}/api/emissions/?countries=${selectedCountries}&startYear=${yearRange[0]}&endYear=${yearRange[1]}`
                    );
                    const emissionsData = response.data.data.totalEmissionsPerYear;
                    // console.log(`http://localhost:5000/api/emissions/?countries=${selectedCountries}&startYear=${yearRange[0]}&endYear=${yearRange[1]}`);
                    console.log('Emissions Data:', emissionsData);
                    // Transform data into Nivo's expected format
                    const formattedData = selectedCountries.map((country, index) => {
                        const countryData = emissionsData.filter(entry => entry.country === country);

                        return {
                            id: country,
                            color: fixedColors[index % fixedColors.length],
                            data: countryData.map(entry => ({
                                x: entry.year,
                                y: entry.totalEmission,
                            })),
                        };
                    });

                    setChartData(formattedData);
                } catch (error) {
                    console.error("Error fetching emissions data:", error);
                }
            };

            fetchData();
        }, [selectedCountries, yearRange]);

        return (
            <div style={{ borderRadius: "10px", backgroundColor: "#1F2E2C", height: "400px", width: "100%" }}>
                <ResponsiveLine
                    data={chartData}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        tickTextColor: "#39FF14",
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        tickTextColor: "#39FF14",
                        format: value => {
                            if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
                            if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
                            if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
                            return value;
                        }
                    }}
                    
                    colors={{ datum: "color" }}
                    lineWidth={3}
                    pointSize={8}
                    pointBorderWidth={2}
                    enableSlices="x"
                    sliceTooltip={({ slice }) => (
                        <div
                            style={{
                                background: "white",
                                color: "black",
                                padding: "10px",
                                borderRadius: "4px",
                                fontSize: "14px",
                            }}
                        >
                            <div><strong>Year: {slice.points[0].data.xFormatted}</strong></div>
                            {slice.points.map(point => (
                                <div key={point.id} style={{ color: point.serieColor }}>
                                   <strong> {point.serieId}: {Number(point.data.y).toLocaleString()}</strong>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    legends={[
                        {
                            anchor: "top-right",
                            direction: "column",
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 5,
                            itemWidth: 80,
                            itemHeight: 20,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                        },
                    ]}
                    gridXValues={[]} // Removes vertical grid lines
                    gridYValues={[]} // Removes horizontal grid lines
                    theme={{
                        textColor: "white",
                        axis: {
                            ticks: { text: { fill: "#a2f739" } },
                            domain: { line: { stroke: "#a2f739", strokeWidth: 2 } },
                        },
                        legends: { text: { fill: "white" } },
                    }}
                />
            </div>
        );
    };

    export default CountryEmissionsChart;



    CountryEmissionsChart.propTypes = {
        selectedCountries: PropTypes.arrayOf(PropTypes.string),
        yearRange: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])), 
    };
