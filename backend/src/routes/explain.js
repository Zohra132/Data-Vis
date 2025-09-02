
import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
    console.log("Explain request received:", req.body);
    const { steps, structure, currentState } = req.body;
  
    const prompt = `
  You are an expert at explaining computer science data structures.
  
  Explain the following operation on a ${structure}:
  Steps: ${JSON.stringify(steps)}
  Current State: ${JSON.stringify(currentState)}
  
  Respond clearly and concisely for students.
  `;
  
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      res.json({ explanation: response.data.choices[0].message.content });
    } catch (error) {
      console.error("OpenAI error:", error.response?.data || error.message);
      res.status(500).json({ explanation: "OpenAI API failed", error: error.message });
    }
  });

export default router;