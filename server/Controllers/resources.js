const executeQuery = require('../Utils/queryExecuter');

const getCountries = async (req, res) => {
    try {

        const query = `SELECT name FROM countries;`;

        const response = await executeQuery(query);

        res.status(200).json({ success: true, data: response });

    } catch (err) {
        console.error('Error fetching :', err);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

const getGases = async (req, res) => {
    try {

        const query = `SELECT name FROM gases;`;

        const response = await executeQuery(query);

        res.status(200).json({ success: true, data: response });

    } catch (err) {
        console.error('Error fetching :', err);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

const getSectors = async (req, res) => {
    try {

        const query = `SELECT name FROM sectors;`;

        const response = await executeQuery(query);

        res.status(200).json({ success: true, data: response });

    } catch (err) {
        console.error('Error fetching :', err);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

const getSubSectors = async (req, res) => {
    try {

        const query = `
        SELECT ss.name AS subsector, s.name AS sector FROM 
        sub_sectors AS ss
        JOIN sectors AS s
        ON ss.sector_id = s.id;`;

        const response = await executeQuery(query);

        res.status(200).json({ success: true, data: response });

    } catch (err) {
        console.error('Error fetching :', err);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

module.exports = { getCountries, getGases, getSectors, getSubSectors }