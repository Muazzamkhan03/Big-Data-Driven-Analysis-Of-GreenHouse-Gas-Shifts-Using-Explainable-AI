require('dotenv').config();
const User = require('../Models/User');
const axios = require('axios');
const { getSince2024 } = require('../Helpers/Since2024Change');

// The actual controller
const getPredictions = async (req, res) => {
    try {
        const { country, gas, sector, year, lat, lon } = req.body;

        // Check for missing or empty required fields
        if (
            !country || typeof country !== 'string' || country.trim() === '' ||
            !gas || typeof gas !== 'string' || gas.trim() === '' ||
            !sector || typeof sector !== 'string' || sector.trim() === '' ||
            year === undefined || year === null || isNaN(year)
        ) {
            return res.status(400).json({ success: false, error: 'country, gas, sector, and year are required and must be valid.' });
        }

        const sanitizedData = {
            country: country.trim(),
            gas: gas.trim(),
            sector: sector.trim(),
            year,
            lat,
            lon,
        };

        // Get prediction
        try {
            const response = await axios.post(`${process.env.MODEL_SERVER_URL}/prediction`, sanitizedData);

            if (!response.data.success) {
                return res.status(500).json({ success: false, error: "Failed to make prediction" });
            }

            const finalResponse = {
                success: true,
                data: {
                    monthly_emissions: response.data.data.monthly_emissions,
                    subsector_emissions: response.data.data.subsector_emissions,
                    total_emissions: response.data.data.total_emissions
                }
            };

            const since2024 = await getSince2024(sanitizedData.country, sanitizedData.gas, sanitizedData.sector, response.data.data.total_emissions);
            finalResponse.data.since2024 = since2024;

            // If the user is logged in, save it to their history
            if (req.user && req.user.id) {
                const user = await User.findOne({ _id: req.user.id });
                if (user && !user.isDeleted) {
                    user.history.push({ 
                        country: sanitizedData.country, 
                        gas: sanitizedData.gas, 
                        sector: sanitizedData.sector, 
                        year: sanitizedData.year, 
                        lat: sanitizedData.lat, 
                        long: sanitizedData.lon
                    });

                    await user.save();
                }
            }

            return res.status(200).json(finalResponse);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, error: "Failed to make prediction" });
        }

    } catch (error) {
        console.error('Error fetching predictions:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}


module.exports = { getPredictions };