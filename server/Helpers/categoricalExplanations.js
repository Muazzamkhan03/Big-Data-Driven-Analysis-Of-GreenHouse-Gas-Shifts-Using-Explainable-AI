const { gptMessage } = require("../Utils/openAI");
const safeJsonParse = require('../Utils/jsonParser');

const generateCategoricalExplanation = async (categoricalAttributions, country, gas, sector) => {
    formattedAttributions = JSON.stringify(categoricalAttributions, null, 2);

    const prompt = `
    You are given integrated gradient scores for categorical input features used in a machine learning model that predicts greenhouse gas emissions.
    For each subsector, write one concise sentence identifying which categorical feature had the highest influence (i.e., the highest absolute IG value), and explain briefly why that feature might be influential in that context.

    Do not describe the subsector as a feature — instead, explain how the top categorical input feature influenced the prediction for that subsector. ENSURE TO DO IT FOR EACH SUBSECTOR\n\n
    Provide your response **strictly** as a valid JSON object.\n
    ⚠️ Important: Make sure all keys are enclosed in double quotes, each key-value pair ends with a comma (except the last one), and the entire output is enclosed in curly braces.\n

    Use this format:\n
    {
        "subsector_name": "Explanation sentence.",
        "subsector2_name": "Explanation sentence.",
        "subsector3_name": "Explanation sentence.",
        ...
    }\n

    Country: ${country}, Sector: ${sector}, Gas: ${gas}.\n\n

    Integrated gradient values:\n
    ${formattedAttributions}`;
    let response = await gptMessage(prompt);
    console.log(response);
    
    response = safeJsonParse(response);

    return response;
}

module.exports = { generateCategoricalExplanation };