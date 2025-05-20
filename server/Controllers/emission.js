const { totalEmissionsPerYearByEachCountry, totalEmissionsDueToEachSector, totalEmissionsOfEachGas, totalEmissionsByEachSubSector } = require('../Helpers/helpersForEmissionData');

const getEmissionsData = async (startYear, endYear, countries) => {
    try {
        // Execute all the queries in parallel
        const [
            totalEmissionsPerYearResult,
            emissionsBySectorResult,
            emissionsByGasResult,
            emissionsBySubsectorResult
        ] = await Promise.all([
            totalEmissionsPerYearByEachCountry(startYear, endYear, countries),
            totalEmissionsDueToEachSector(startYear, endYear, countries),
            totalEmissionsOfEachGas(startYear, endYear, countries),
            totalEmissionsByEachSubSector(startYear, endYear, countries)
        ]);

        // Format the results into the desired structure
        const formattedResponse = {
            totalEmissionsPerYear: totalEmissionsPerYearResult.map(row => ({
                country: row.country,
                year: row.year,
                totalEmission: row.total_emission
            })),
            emissionsBySector: emissionsBySectorResult.map(row => ({
                sector: row.sector,
                totalEmission: row.total_emission
            })),
            emissionsByGas: emissionsByGasResult.map(row => ({
                gas: row.gas,
                totalEmission: row.total_emission
            })),
            emissionsBySubsector: Object.values(
                emissionsBySubsectorResult.reduce((acc, row) => {
                    if (!acc[row.sector]) {
                        // If this sector doesn't exist in the accumulator, create it
                        acc[row.sector] = { sector: row.sector, subsectors: [] };
                    }
                    // Push the subsector data into the appropriate sector's "subsectors" array
                    acc[row.sector].subsectors.push({
                        subsector: row.subsector,
                        totalEmission: row.total_emission
                    });
                    return acc; // Return the updated accumulator for the next iteration
                }, {})
            )
        };

        return formattedResponse;
    } catch (err) {
        console.error('Error combining emissions data:', err);
        throw new Error('Failed to fetch emissions data');
    }
};

// The actual controller
const getEmissions = async (req, res) => {
    try {
        const { countries, startYear, endYear } = req.query;
    
        // Default values for years
        const defaultStartYear = 2015;
        const defaultEndYear = 2024;
    
        // Process countries parameter
        const countryList = countries ? countries.split(',') : null; // null means all countries
    
        // Process year parameters

        let fromYear = startYear ? parseInt(startYear, 10) : defaultStartYear;
        let toYear = endYear ? parseInt(endYear, 10) : defaultEndYear;

        if (isNaN(startYear) || isNaN(endYear)) {
            fromYear = defaultStartYear;
            toYear = defaultEndYear;
        }
    
        // Validate the year range
        if (fromYear > toYear) {
          return res.status(400).json({ success: false, error: 'Start year cannot be greater than end year' });
        }
    
        const response = await getEmissionsData(fromYear, toYear, countryList);

        res.status(200).json({ success: true, data: response });
      } catch (error) {
        console.error('Error fetching historical emissions:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
      }
}

module.exports = { getEmissions };