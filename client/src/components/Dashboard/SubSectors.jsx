import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Typography, Box } from "@mui/material";

const getShockColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 50%)`;
};

const formatName = (name) => {
    return name
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

const SubSector = ({ selectedCountries, yearRange }) => {
    const [openSectors, setOpenSectors] = useState(null);
    const [subSectorColors, setSubSectorColors] = useState({});
    const [sectorsData, setSectorsData] = useState([]);
    const [maxEmissionsPerSector, setMaxEmissionsPerSector] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_REACT_APP_HOST}/api/emissions/?countries=${selectedCountries}&startYear=${yearRange[0]}&endYear=${yearRange[1]}`
                );

               
                const sectors = response.data.data.emissionsBySubsector;
                console.log('SubSectors Data: ', sectors );
                const colors = {};
                const maxValues = {};

                sectors.forEach((sector) => {
                    let maxEmission = 0;
                    colors[sector.sector] = {};
                    sector.subsectors.forEach((sub) => {
                        colors[sector.sector][sub.subsector] = getShockColor();
                        if (sub.totalEmission > maxEmission) {
                            maxEmission = sub.totalEmission;
                        }
                    });
                    maxValues[sector.sector] = maxEmission;
                });

                setSectorsData(sectors);
                setSubSectorColors(colors);
                setMaxEmissionsPerSector(maxValues);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, [selectedCountries, yearRange]);

    const toggleSector = (sectorName) => {
        setOpenSectors((prev) => (prev === sectorName ? null : sectorName));
    };

    return (
        <Box sx={{ minHeight: "100vh", width: "100vw", backgroundColor: "#1F2E2C", color: "white", p: 4, borderRadius: "10px" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>Sub-Sectors</Typography>

            <Box sx={{ px: 2 }}>
                {sectorsData.map((sector, index) => (
                    <Box key={index} sx={{ backgroundColor: " var(--background)", p: 2, borderRadius: "8px", mb: 2 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                cursor: "pointer"
                            }}
                            onClick={() => toggleSector(sector.sector)}
                        >
                            <Typography variant="h6">{formatName(sector.sector)}</Typography>
                            {openSectors === sector.sector ? <FaChevronUp /> : <FaChevronDown />}
                        </Box>

                        {openSectors === sector.sector && (
                            <Box sx={{ mt: 2 }}>
                                {sector.subsectors.map((sub, idx) => {
                                    
                                    console.log(sub.subsector, ':', sub.totalEmission);
                                    console.log(sub.subsector, ':', sub.totalEmission  < 0 ? 0 : sub.totalEmission);
                                    
                                    const rawEmission = sub.totalEmission;
                                    const emission = rawEmission < 0 ? 0 : rawEmission;
                                    const maxEmission = maxEmissionsPerSector[sector.sector] || 1;
                                    const widthPercent = (emission / maxEmission) * 100;

                                    return (
                                        <Box key={idx} sx={{ mb: 1 }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                                                <Typography variant="body2">{formatName(sub.subsector)}</Typography>
                                                <Typography variant="body2">{emission.toFixed(2)}</Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    height: "6px",
                                                    backgroundColor: "#333",
                                                    borderRadius: "4px",
                                                    mt: 1
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        height: "100%",
                                                        borderRadius: "4px",
                                                        width: `${widthPercent}%`,
                                                        backgroundColor: subSectorColors[sector.sector][sub.subsector],
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    );
                                })}

                            </Box>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default SubSector;

SubSector.propTypes = {
    selectedCountries: PropTypes.arrayOf(PropTypes.string),
    yearRange: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])),
};
