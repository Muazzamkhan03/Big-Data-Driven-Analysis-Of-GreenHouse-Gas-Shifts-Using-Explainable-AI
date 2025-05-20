require('dotenv').config();

const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const gpt = async (prompt, tools, tool_choice) => {
    try{
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo-1106",
            tools: tools,
            tool_choice: tool_choice
        });
    
        let response = await completion.choices[0].message.tool_calls[0];

        console.log(response);

        response = JSON.parse(response.function.arguments);

        return response;
    } catch (error){
        console.log(error);
    }
}

const gptMessage = async (prompt) => {
    try{
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo-1106",
        });
    
        return completion.choices[0].message.content;
    } catch (error){
        console.log(error);
    }
}

module.exports = { gpt, gptMessage };
