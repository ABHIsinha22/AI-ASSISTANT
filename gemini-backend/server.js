// Import necessary modules
// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');


const app = express();
const port = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;


let genAI;
let model;
try {
   
    

    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
   
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    console.log("SUCCESS: Gemini model initialized successfully.");
} catch (error) {
    console.error("ERROR: Failed to initialize Gemini API or model:", error.message);
    model = null; 
}


const chatHistory = [];


app.post('/chat', async (req, res) => {
    
    if (!model) {
        console.error("ERROR: Chat request received but Gemini model is not initialized.");
        return res.status(500).json({ error: "Gemini model not initialized. Please ensure your API key is correctly set in the .env file and restart the server." });
    }

    try {
        const { message } = req.body;

        if (!message) {
            console.warn("WARNING: Received chat request with no message provided.");
            return res.status(400).json({ error: "No message provided." });
        }

        console.log(`INFO: Received message from frontend: "${message}"`);
        console.log(`DEBUG: Current chat history length: ${chatHistory.length}`);

        const chatSession = model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 200,
            },
        });

        console.log("DEBUG: Calling Gemini API sendMessage...");
        // Send the user's message to the Gemini model
        const result = await chatSession.sendMessage(message);
        console.log("DEBUG: Gemini API sendMessage call completed. Extracting text...");

        const responseText = await result.response.text();
        console.log("DEBUG: Extracted response text from Gemini API.");

        // Append the user message and model response to the chat history
        chatHistory.push({ role: "user", parts: [{ text: message }] });
        chatHistory.push({ role: "model", parts: [{ text: responseText }] });

        console.log(`INFO: Gemini response: "${responseText}"`);

        // Send the model's response back to the frontend
        res.json({ response: responseText });

    } catch (error) {
        console.error("ERROR: An error occurred during chat processing:", error);
        if (error.response && error.response.status) {
            console.error(`Gemini API error status: ${error.response.status}`);
            console.error(`Gemini API error data:`, error.response.data);
            return res.status(500).json({ error: `Gemini API error: ${error.response.status} - ${error.response.data.message || 'Unknown API error'}` });
        }
        res.status(500).json({ error: `An unexpected error occurred: ${error.message}` });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`CORS enabled for all origins.`);
    console.log(`API Key Status: ${GEMINI_API_KEY && GEMINI_API_KEY.length > 10 ? "Using a valid-looking API key." : "WARNING: GEMINI_API_KEY is not properly set."}`);
    if (!GEMINI_API_KEY || GEMINI_API_KEY.length < 10) {
        console.log("ACTION REQUIRED: Please ensure your .env file has GEMINI_API_KEY=YOUR_ACTUAL_API_KEY");
    }
});
