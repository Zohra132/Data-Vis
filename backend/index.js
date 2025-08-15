const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); //this is to let the backend use the api key

const app = express();
app.use(cors());
app.use(express.json());



app.post("/explain", async (req, res) => {
    const { steps, structure, currentState } = req.body;
  
    const prompt = `
  You are an expert at explaining computer science data structures.
  
  Explain the following operation on a ${structure}:
  Steps: ${JSON.stringify(steps)}
  Current State: ${JSON.stringify(currentState)}
  
  Respond clearly and concisely for students.
  `;
  
    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }, {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      });
  
      res.json({ explanation: response.data.choices[0].message.content });
    } catch (error) {
      console.error("OpenAI error:", error.response?.data || error.message);
      res.status(500).json({ explanation: "OpenAI API failed", error: error.message });
    }
  });
  
app.listen(3001, () => {
    console.log("✅ Backend server running on http://localhost:3001");
});
  