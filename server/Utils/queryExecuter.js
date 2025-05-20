const {pgClient} = require('../connection');

const executeQuery = async (query, params) => {
    try {
        const result = await pgClient.query(query, params || []);
        return result.rows; // Return the rows of the result
    } catch (err) {
        console.error('Error executing query:', err);
        throw err; // Re-throw the error to handle it in the calling function
    }
};

module.exports = executeQuery;