const axios = require('axios');
const { generateCategoricalExplanation } = require('../Helpers/categoricalExplanations');
const { getRecommendationsFromGPT } = require('../Helpers/recommendations');

// The actual controller for getting explanations
const getExplanations = async (req, res) => {
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
            const response = await axios.post(`${process.env.MODEL_SERVER_URL}/explanation`, sanitizedData);

            if (!response.data.success) {
                return res.status(500).json({ success: false, error: "Failed to get explanations" });
            }

            const finalResponse = {
                success: true,
                xai: {
                    numerical_attribution: response.data.data.overall_numerical_attribution
                }
            };

            const categoricalAttributions = response.data.data.overall_categorical_attribution;

            const categorical_explanations = await generateCategoricalExplanation(categoricalAttributions, sanitizedData.country, sanitizedData.gas, sanitizedData.sector);

            finalResponse.xai.categorical_explanations = categorical_explanations;

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

const getRecommendations = async (req, res) => {
    try {
        const { country, gas, sector, predictedEmission } = req.body;

        // Check for missing or empty required fields
        if (
            !country || typeof country !== 'string' || country.trim() === '' ||
            !gas || typeof gas !== 'string' || gas.trim() === '' ||
            !sector || typeof sector !== 'string' || sector.trim() === '' ||
            predictedEmission === undefined || predictedEmission === null
        ) {
            return res.status(400).json({ success: false, error: 'country, gas, sector, and predictedEmissions are required and must be valid.' });
        }

        try {
            const recommendations = await getRecommendationsFromGPT(country, gas, sector, predictedEmission);

            return res.status(200).json({ success: true, recommendations: recommendations });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, error: "Failed to make prediction" });
        }

    } catch (error) {
        console.error('Error fetching predictions:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

const getWhatIf = async (req, res) => {
    try {
        const {
            techAdoptionSlider = 0,
            policyEnforcementSlider = 0,
            publicAwarenessSlider = 0,
            renewableEnergySlider = 0
        } = req.body;

        // Impact weights per 10% change (as decimals)
        const weights = {
            tech_adoption: -0.03,       // -3% per +10%
            policy_enforcement: -0.02,  // -2% per +10%
            public_awareness: -0.01,    // -1% per +10%
            renewable_energy: -0.04     // -4% per +10%
        };

        // Calculate total change
        const totalChange =
            (techAdoptionSlider / 10) * weights.tech_adoption +
            (policyEnforcementSlider / 10) * weights.policy_enforcement +
            (publicAwarenessSlider / 10) * weights.public_awareness +
            (renewableEnergySlider / 10) * weights.renewable_energy;

        return res.status(200).json({ success: true, data: totalChange * 100 });

    } catch (error) {
        console.error('Error fetching predictions:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

module.exports = { getExplanations, getRecommendations, getWhatIf };