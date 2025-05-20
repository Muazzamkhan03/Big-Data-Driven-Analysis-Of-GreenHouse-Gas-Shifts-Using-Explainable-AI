const express = require("express");
const { getCountries, getGases, getSectors, getSubSectors } = require('../Controllers/resources');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Resources
 *  description: API endpoints for accessing resources such as countries, gases, sectors and subsectors
*/

/**
 * @swagger
 * /api/resources/countries:
 *   get:
 *     summary: Retrieve a list of all countries
 *     tags: [Resources]
 *     description: This endpoint returns a list of all countries available in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Name of the country
 *             example:
 *               - name: PAK
 *               - name: IND
 *       500:
 *         description: Internal server error
 */

// ROUTE 1:  Endpoint for getting all the countries using GET /api/resources/countries. Login not required
router.get('/countries', getCountries);

/**
 * @swagger
 * /api/resources/gases:
 *   get:
 *     summary: Retrieve a list of all gases
 *     tags: [Resources]
 *     description: This endpoint returns a list of all greenhouse gases available in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of gases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Name of the gas
 *             example:
 *               - name: CO2
 *               - name: CH4
 *               - name: N2O
 *       500:
 *         description: Internal server error
 */

// ROUTE 2:  Endpoint for getting all the gases using GET /api/resources/gases. Login not required
router.get('/gases', getGases);

/**
 * @swagger
 * /api/resources/sectors:
 *   get:
 *     summary: Retrieve a list of all sectors
 *     tags: [Resources]
 *     description: This endpoint returns a list of all sectors available in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of sectors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Name of the sector
 *             example:
 *               - name: Agriculture
 *               - name: Energy
 *               - name: Industrial Processes
 *       500:
 *         description: Internal server error
 */

// ROUTE 3:  Endpoint for getting all the sectors using GET /api/resources/sectors. Login not required
router.get('/sectors', getSectors);

/**
 * @swagger
 * /api/resources/subsectors:
 *   get:
 *     summary: Retrieve a list of all subsectors
 *     tags: [Resources]
 *     description: This endpoint returns a list of all subsectors available in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of subsectors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   subsector:
 *                     type: string
 *                     description: Name of the subsector
 *                   sector:
 *                     type: string
 *                     description: string of the sector to which the subsector belongs
 *             example:
 *               - subsector: cement
 *                 sector: manufacturing
 *               - subsector: manure-applied-to-soils
 *                 sector: agriculture
 *       500:
 *         description: Internal server error
 */

// ROUTE 4:  Endpoint for getting all the subsectors using GET /api/resources/subsectors. Login not required
router.get('/subsectors', getSubSectors);


module.exports = router;