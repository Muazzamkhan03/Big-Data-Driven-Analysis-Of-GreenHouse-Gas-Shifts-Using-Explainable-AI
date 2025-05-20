const express = require("express");
const { getEmissions } = require('../Controllers/emission');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Historical Emissions
 *  description: API endpoint for accessing historical emissions data
*/

/**
 * @swagger
 * /api/emissions/:
 *   get:
 *     summary: Retrieve greenhouse gas emissions data
 *     tags: [Historical Emissions]
 *     description: This endpoint retrieves emissions data based on the provided countries and time range. If no countries or years are provided, it defaults to all countries and a pre-defined time range.
 *     parameters:
 *       - in: query
 *         name: countries
 *         schema:
 *           type: string
 *           description: Comma-separated list of country codes (e.g., "PAK,IND,BAN"). If omitted, data for all countries is returned.
 *           example: "PAK,IND"
 *       - in: query
 *         name: startYear
 *         schema:
 *           type: integer
 *           description: The starting year of the data. Defaults to 2000 if not provided.
 *           example: 2015
 *       - in: query
 *         name: endYear
 *         schema:
 *           type: integer
 *           description: The ending year of the data. Defaults to 2020 if not provided.
 *           example: 2018
 *     responses:
 *       200:
 *         description: Successfully retrieved emissions data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalEmissionsPerYear:
 *                   type: array
 *                   description: Total emissions for each year by each country
 *                   items:
 *                     type: object
 *                     properties:
 *                       country:
 *                         type: string
 *                         description: The country code
 *                       year:
 *                         type: integer
 *                         description: The year
 *                       totalEmission:
 *                         type: number
 *                         description: Total emissions for the year
 *                   example:
 *                     [
 *                       { "country": "IND", "year": 2015, "totalEmission": 6805067443.29468 },
 *                       { "country": "PAK", "year": 2015, "totalEmission": 1001591272.1282594 },
 *                       { "country": "IND", "year": 2016, "totalEmission": 7253565653.14974 },
 *                       { "country": "PAK", "year": 2016, "totalEmission": 1111104784.233649 }
 *                     ]
 *                 emissionsBySector:
 *                   type: array
 *                   description: Total emissions grouped by sector
 *                   items:
 *                     type: object
 *                     properties:
 *                       sector:
 *                         type: string
 *                         description: The name of the sector
 *                       totalEmission:
 *                         type: number
 *                         description: Total emissions for the sector
 *                   example:
 *                     [
 *                       { "sector": "agriculture", "totalEmission": 10516658495.020239 },
 *                       { "sector": "buildings", "totalEmission": 2546908197.6178713 },
 *                       { "sector": "fluorinated-gases", "totalEmission": 445358923.9607338 },
 *                       { "sector": "forestry-and-land-use", "totalEmission": -15015938.531200659 }
 *                     ]
 *                 emissionsByGas:
 *                   type: array
 *                   description: Total emissions grouped by gas type
 *                   items:
 *                     type: object
 *                     properties:
 *                       gas:
 *                         type: string
 *                         description: The name of the gas
 *                       totalEmission:
 *                         type: number
 *                         description: Total emissions for the gas
 *                   example:
 *                     [
 *                       { "gas": "ch4", "totalEmission": 131407487.61661625 },
 *                       { "gas": "co", "totalEmission": 32928511.019272953 },
 *                       { "gas": "co2", "totalEmission": 10335120249.103443 }
 *                     ]
 *                 emissionsBySubsector:
 *                   type: array
 *                   description: Total emissions grouped by subsector, categorized under sectors
 *                   items:
 *                     type: object
 *                     properties:
 *                       sector:
 *                         type: string
 *                         description: The name of the sector
 *                       subsectors:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             subsector:
 *                               type: string
 *                               description: The name of the subsector
 *                             totalEmission:
 *                               type: number
 *                               description: Total emissions for the subsector
 *                   example:
 *                     [
 *                       {
 *                         "sector": "agriculture",
 *                         "subsectors": [
 *                           { "subsector": "cropland-fires", "totalEmission": 800000 },
 *                           { "subsector": "crop-residues", "totalEmission": 200000 }
 *                         ]
 *                       },
 *                       {
 *                         "sector": "buildings",
 *                         "subsectors": [
 *                           { "subsector": "non-residential-onsite-fuel-usage", "totalEmission": 400000 },
 *                           { "subsector": "other-onsite-fuel-usage", "totalEmission": 1000000 },
 *                           { "subsector": "residential-onsite-fuel-usage", "totalEmission": 1000000 }
 *                         ]
 *                       },
 *                       {
 *                         "sector": "fluorinated-gases",
 *                         "subsectors": [
 *                           { "subsector": "fluorinated-gases", "totalEmission": 445358923.9607338 }
 *                         ]
 *                       }
 *                     ]
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *                   description: The error message
 *             example:
 *               success: false
 *               error: "Invalid query parameters"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *                   description: The error message
 *             example:
 *               success: false
 *               error: "Internal server error occurred"
 */


// ROUTE 1:  Endpoint for getting emissions using GET /api/emissions/. Login not required
router.get('/', getEmissions);


module.exports = router;