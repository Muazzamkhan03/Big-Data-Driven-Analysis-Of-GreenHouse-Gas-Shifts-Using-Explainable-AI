const express = require("express");
const { getPredictions } = require('../Controllers/predictions');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Emission Prediction
 *  description: API endpoint for making emission predictions
*/

/**
 * @swagger
 * /api/predictions/:
 *   post:
 *     summary: Predict greenhouse gas emissions
 *     tags: [Emission Prediction]
 *     description: Sends country, gas, sector, and year to a prediction model and receives projected monthly and subsector emissions. User must be logged in.
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
 *                 description: Year for which to predict emissions.
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
 *         description: Successfully retrieved emission predictions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     monthly_emissions:
 *                       type: array
 *                       items:
 *                         type: number
 *                       description: Predicted emissions for each month
 *                     subsector_emissions:
 *                       type: object
 *                       additionalProperties:
 *                         type: object
 *                         properties:
 *                           monthly_emissions:
 *                             type: array
 *                             items:
 *                               type: number
 *                           total_emissions:
 *                             type: number
 *                     total_emissions:
 *                       type: number
 *                       description: Total predicted emissions for the year
 *                     since2024:
 *                       type: number
 *                       description: Percentage change compared to emissions in 2024
 *             example:
 *               success: true
 *               data:
 *                 monthly_emissions: [9855.71, 15461.52, 9688.34, 8623.84, 5251.93, 4680.54, 3392.00, 3078.03, 3476.83, 3386.05, 5072.37, 6748.94]
 *                 subsector_emissions:
 *                   cropland-fires:
 *                     monthly_emissions: [9834.88, 15440.99, 9671.11, 8606.14, 5236.20, 4667.83, 3383.73, 3072.33, 3471.48, 3380.24, 5064.52, 6740.03]
 *                     total_emissions: 78569.49
 *                   enteric-fermentation-cattle-pasture:
 *                     monthly_emissions: [-0.015, -0.015, -0.016, -0.016, -0.018, -0.018, -0.019, -0.019, -0.019, -0.019, -0.018, -0.017]
 *                     total_emissions: -0.208
 *                   manure-left-on-pasture-cattle:
 *                     monthly_emissions: [0.039, 0.035, 0.038, 0.032, 0.043, 0.037, 0.038, 0.033, 0.024, 0.025, 0.021, 0.020]
 *                     total_emissions: 0.388
 *                   manure-management-cattle-operation:
 *                     monthly_emissions: [2.195, 2.153, 2.210, 2.140, 2.006, 1.756, 1.581, 1.466, 1.425, 1.477, 1.537, 1.617]
 *                     total_emissions: 21.563
 *                   synthetic-fertilizer-application:
 *                     monthly_emissions: [18.616, 18.352, 15.001, 15.552, 13.699, 10.928, 6.665, 4.220, 3.923, 4.330, 6.310, 7.288]
 *                     total_emissions: 124.885
 *                 total_emissions: 78716.11
 *                 since2024: -99.82
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
 *         description: Internal server or prediction failure
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

// ROUTE 1:  Endpoint for getting predictions using GET /api/predictions/. Login required
router.post('/', getPredictions);


module.exports = router;