const executeQuery = require('../Utils/queryExecuter');

const totalEmissionsPerYearByEachCountry = async (startYear, endYear, countries = null) => {
    try {

        const query = `
    SELECT 
        e.year,
        c.name AS country,
        SUM(e.emission) AS total_emission
    FROM public.emissions e
    JOIN public.countries c ON e.country_id = c.id
    WHERE e.year BETWEEN $1 AND $2
        AND ($3::text[] IS NULL OR c.name = ANY($3::text[]))
    GROUP BY e.year, c.name
    ORDER BY e.year, c.name;
    `;

        const params = [startYear, endYear, countries];
        return await executeQuery(query, params);

    } catch (err) {
        console.error('Error in fetching total emissions per year by each country: ', err);
        throw err; // Re-throw the error to handle it in the calling function
    }
}

const totalEmissionsDueToEachSector = async (startYear, endYear, countries = null) => {
    try {

        query = `
    SELECT 
        s.name AS sector,
        SUM(e.emission) AS total_emission
    FROM public.emissions e
    JOIN public.sub_sectors ss ON e.subsector_id = ss.id
    JOIN public.sectors s ON ss.sector_id = s.id
    JOIN public.countries c ON e.country_id = c.id
    WHERE e.year BETWEEN $1 AND $2
        AND ($3::text[] IS NULL OR c.name = ANY($3::text[]))
    GROUP BY s.name
    ORDER BY s.name;
    `;

        const params = [startYear, endYear, countries];
        return await executeQuery(query, params);

    } catch (err) {
        console.error('Error in fetching total emissions due to each sector: ', err);
        throw err; // Re-throw the error to handle it in the calling function
    }
}

const totalEmissionsOfEachGas = async (startYear, endYear, countries = null) => {
    try {

        const query = `
    SELECT
        g.name AS gas,
        SUM(e.emission) AS total_emission
    FROM public.emissions e
    JOIN public.gases g ON e.gas_id = g.id
    JOIN public.countries c ON e.country_id = c.id
    WHERE e.year BETWEEN $1 AND $2
        AND ($3::text[] IS NULL OR c.name = ANY($3::text[]))
    GROUP BY g.name
    ORDER BY g.name;
    `;

        const params = [startYear, endYear, countries];
        return await executeQuery(query, params);

    } catch (err) {
        console.error('Error in fetching total emissions of gases: ', err);
        throw err; // Re-throw the error to handle it in the calling function
    }
}

const totalEmissionsByEachSubSector = async (startYear, endYear, countries = null) => {
    try {

        const query = `
    SELECT 
    s.name AS sector,
    ss.name AS subsector,
    SUM(e.emission) AS total_emission
    FROM public.emissions e
    JOIN public.sub_sectors ss ON e.subsector_id = ss.id
    JOIN public.sectors s ON ss.sector_id = s.id
    JOIN public.countries c ON e.country_id = c.id
    WHERE e.year BETWEEN $1 AND $2
        AND ($3::text[] IS NULL OR c.name = ANY($3::text[]))
    GROUP BY s.name, ss.name
    ORDER BY s.name, ss.name;`;

        const params = [startYear, endYear, countries];
        return await executeQuery(query, params);

    } catch (err) {
        console.error('Error in fetching total emissions by each sector: ', err);
        throw err; // Re-throw the error to handle it in the calling function
    }
}

const emissionsOf2024 = async (country, gas, sector) => {
    try {

        const query = `
    SELECT 
        SUM(e.emission) AS total_emissions
    FROM 
        public.emissions e
    JOIN 
        public.countries c ON e.country_id = c.id
    JOIN 
        public.gases g ON e.gas_id = g.id
    JOIN 
        public.sub_sectors ss ON e.subsector_id = ss.id
    JOIN 
        public.sectors s ON ss.sector_id = s.id
    WHERE 
        c.name = $1 AND
        g.name = $2 AND
        s.name = $3 AND 
        e.year = 2022;`;

        const params = [country, gas, sector];
        const response =  await executeQuery(query, params);
        return parseFloat(response[0]["total_emissions"]);

    } catch (err) {
        console.error('Error in fetching total emissions by each sector: ', err);
        throw err; // Re-throw the error to handle it in the calling function
    }
}

module.exports = { totalEmissionsPerYearByEachCountry, totalEmissionsDueToEachSector, totalEmissionsOfEachGas, totalEmissionsByEachSubSector, emissionsOf2024 };