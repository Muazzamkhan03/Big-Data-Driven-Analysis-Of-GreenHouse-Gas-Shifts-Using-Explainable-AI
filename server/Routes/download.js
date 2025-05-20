const express = require("express");
const { getDownloadUrl, addNewFile } = require('../Controllers/downloads');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Downloads
 *  description: API endpoints for downlading GHG emission data based on Country and Gas
*/

/**
 * @swagger
 * /api/download/:
 *   get:
 *     summary: Retrieve the download URL for the provided gas and country
 *     tags: [Downloads]
 *     description: This endpoint returns the download URL for a ZIP file based on the given gas type and country.
 *     parameters:
 *       - in: query
 *         name: gas
 *         schema:
 *           type: string
 *         required: true
 *         description: Type of gas
 *         example: "so2"
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         required: true
 *         description: Country name
 *         example: "PAK"
 *     responses:
 *       200:
 *         description: Successfully retrieved the download URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 url:
 *                   type: string
 *                   description: The direct download link for the requested file
 *                   example: "https://drive.google.com/uc?export=download&id=1AbCdEfGhIJ12345"
 *       400:
 *         description: Missing gas or country parameter
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
 *                   example: "Missing gas or country parameter"
 *       404:
 *         description: File not found for the given gas and country
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
 *                   example: "File not found for given gas and country"
 *       500:
 *         description: Internal server error
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
 *                   example: "Internal server error occurred"
 */


// ROUTE 1:  Endpoint for getting download url of emission data based on gas and country using GET /api/download/. Login not required
router.get('/', getDownloadUrl);

// ROUTE 2: Endpoint for adding in a new zip file entry using POST /api/download/. ONLY FOR DEV USE
router.post('/', addNewFile);

module.exports = router;