const express = require("express");
const { getExplanations, getRecommendations, getWhatIf } = require('../Controllers/extensions');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Emission Prediction Extensions
 *  description: API endpoints for extensions on the predictions, including explanations and recommendations
*/

/**
 * @swagger
 * /api/extension/explain:
 *   post:
 *     summary: Get explanation for predicted greenhouse gas emissions
 *     tags: [Emission Prediction Extensions]
 *     description: Sends input features to the explanation model and returns numerical and categorical attributions showing which inputs influenced the emission prediction. User must be logged in.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - country
 *               - gas
 *               - sector
 *               - year
 *             properties:
 *               country:
 *                 type: string
 *                 description: ISO 3-letter country code.
 *                 example: "PAK"
 *               gas:
 *                 type: string
 *                 description: Greenhouse gas type (e.g., "co2", "ch4").
 *                 example: "co2"
 *               sector:
 *                 type: string
 *                 description: Emission sector (e.g., "agriculture").
 *                 example: "agriculture"
 *               year:
 *                 type: integer
 *                 description: Year for which to generate the explanation.
 *                 example: 2025
 *               lat:
 *                 type: number
 *                 description: Optional latitude value.
 *                 example: 30.3753
 *               lon:
 *                 type: number
 *                 description: Optional longitude value.
 *                 example: 69.3451
 *     responses:
 *       200:
 *         description: Successfully retrieved attribution explanations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 xai:
 *                   type: object
 *                   properties:
 *                     numerical_attribution:
 *                       type: object
 *                       properties:
 *                         duration:
 *                           type: number
 *                         lat:
 *                           type: number
 *                         lon:
 *                           type: number
 *                         start_month_cos:
 *                           type: number
 *                         start_month_sin:
 *                           type: number
 *                         start_year:
 *                           type: number
 *                     categorical_explanations:
 *                       type: object
 *                       additionalProperties:
 *                         type: string
 *             example:
 *               success: true
 *               xai:
 *                 numerical_attribution:
 *                   duration: 0.021
 *                   lat: 0.202
 *                   lon: 0.255
 *                   start_month_cos: 0.017
 *                   start_month_sin: 0.025
 *                   start_year: 0.481
 *                 categorical_explanations:
 *                   cropland-fires: "The 'iso3_country_index' had the highest influence, suggesting that the country code (PAK) had a significant impact on predicting CO2 emissions from cropland fires in the agriculture sector."
 *                   enteric-fermentation-cattle-pasture: "The 'subsector_index' had the highest influence, indicating that the specific subsector of enteric fermentation in cattle pasture had the most significant contribution to the prediction of CO2 emissions in the agriculture sector."
 *                   manure-left-on-pasture-cattle: "The 'iso3_country_index' had the highest influence, implying that the country code (PAK) heavily influenced the prediction of CO2 emissions from manure left on pasture in the agriculture sector."
 *                   manure-management-cattle-operation: "The 'subsector_index' had the highest influence, indicating that the specific subsector of manure management in cattle operation was the most influential in predicting CO2 emissions in the agriculture sector."
 *                   synthetic-fertilizer-application: "The 'sector_index' had the highest influence, suggesting that the sector of agriculture as a whole had the most significant impact on predicting CO2 emissions from synthetic fertilizer application."
 *       400:
 *         description: Missing or invalid input fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *             example:
 *               success: false
 *               error: "country, gas, sector, and year are required and must be valid."
 *       500:
 *         description: Internal server or explanation failure
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *             example:
 *               success: false
 *               error: "Failed to make prediction"
 */

// ROUTE 1:  Endpoint for getting predictions using POST /api/extension/recommend. Login not required
router.post('/explain', getExplanations);


/**
 * @swagger
 * /api/predictions/recommend:
 *   post:
 *     summary: Get recommendations based on predicted emissions
 *     tags: [Emission Prediction Extensions]
 *     description: Generates tailored recommendations based on the provided country, gas type, sector, and predicted emission value. Authentication required (JWT in cookies).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - country
 *               - gas
 *               - sector
 *               - predictedEmission
 *             properties:
 *               country:
 *                 type: string
 *                 example: "PAK"
 *               gas:
 *                 type: string
 *                 example: "co2"
 *               sector:
 *                 type: string
 *                 example: "agriculture"
 *               predictedEmission:
 *                 type: number
 *                 example: 78716.06973833591
 *     responses:
 *       200:
 *         description: Successfully retrieved recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 recommendations:
 *                   type: object
 *                   properties:
 *                     industry-actions:
 *                       type: string
 *                       example: "Implement sustainable farming practices, improve irrigation efficiency, and decrease the use of chemical fertilizers and pesticides."
 *                     policy-changes:
 *                       type: string
 *                       example: "Introduce incentives for sustainable agriculture, invest in renewable energy for farming, and regulate emissions from agricultural activities."
 *                     public-awareness:
 *                       type: string
 *                       example: "Educate farmers on emission reduction techniques, promote climate-friendly farming practices, and engage communities in sustainable agriculture initiatives."
 *       400:
 *         description: Missing or invalid input fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *             example:
 *               success: false
 *               error: "country, gas, sector, and predictedEmissions are required and must be valid."
 *       500:
 *         description: Server or prediction failure
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *             example:
 *               success: false
 *               error: "Failed to make prediction"
 */

// ROUTE 2:  Endpoint for getting predictions using POST /api/extension/recommend. Login not required
router.post('/recommend', getRecommendations);


/**
 * @swagger
 * /api/extension/what-if:
 *   post:
 *     summary: Generate emission change scenarios based on hypothetical policy and behavior changes
 *     tags: [Emission Prediction Extensions]
 *     description: Computes the projected percentage change in emissions based on various hypothetical inputs. Authentication is not required.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               techAdoptionSlider:
 *                 type: number
 *                 description: Percentage (-100-100) representing the level of technological adoption slider
 *                 example: 20
 *               policyEnforcementSlider:
 *                 type: number
 *                 description: Percentage (-100-100) representing the strength of policy enforcement slider
 *                 example: 30
 *               publicAwarenessSlider:
 *                 type: number
 *                 description: Percentage (-100-100) representing the level of public awareness slider
 *                 example: 90
 *               renewableEnergySlider:
 *                 type: number
 *                 description: Percentage (-100-100) representing the adoption of renewable energy slider
 *                 example: 12
 *     responses:
 *       200:
 *         description: Successfully computed what-if scenario impact
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: number
 *                   description: Projected percentage change in emissions
 *             example:
 *               success: true
 *               data: -25.8
 *       500:
 *         description: Server error while computing the scenario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: false
 *               message: "Internal server error."
 */

// ROUTE 3:  Endpoint for getting what if scenarios using POST /api/extension/what-if. Login not required
router.post('/what-if', getWhatIf);


module.exports = router;