const { emissionsOf2024 } = require("./helpersForEmissionData");

const getSince2024 = async (country, gas, sector, predictedEmission) => {
    const emOf24 = await emissionsOf2024(country, gas, sector);

    const percentageChange = (((predictedEmission * 10000) - emOf24) / emOf24) * 100;

    return Number(percentageChange.toFixed(2));
}

module.exports = { getSince2024 };