const { gpt } = require("../Utils/openAI");

const getRecommendationsFromGPT = async (country, gas, sector, predictedEmission) => {
    const recommendationTool = {
        type: "function",
        function: {
            name: "generate_recommendations",
            description: "Provides emissions-related recommendations for industry actions, policy changes, and public awareness.",
            parameters: {
                type: "object",
                properties: {
                    "industry-actions": {
                        type: "string",
                        description: "Recommendations for industry stakeholders to reduce emissions."
                    },
                    "policy-changes": {
                        type: "string",
                        description: "Suggestions for government or institutional policy changes to address emissions."
                    },
                    "public-awareness": {
                        type: "string",
                        description: "Ideas for increasing public awareness and engagement around emissions issues."
                    }
                },
                required: ["industry-actions", "policy-changes", "public-awareness"]
            }
        }
    };

    const prompt = `
    Generate concise climate action recommendations for the following inputs:
    Country: ${country}
    Sector: ${sector}
    Gas: ${gas}
    Predicted annual emissions: ${predictedEmission} metric tons
    `;

    let response = await gpt(prompt, [recommendationTool], { type: "function", function: { name: "generate_recommendations" } });
    return response;
}

module.exports = { getRecommendationsFromGPT };