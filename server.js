import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// === Replace with your Gemini API Key ===
const GEMINI_API_KEY = "AIzaSyCcLO3oP0zFKyeihmqZW-NZlH1r0kKv75c";

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{
                text: `You are an expert AI career and education advisor. 
The student says: "${userMessage}". 
Give personalized, encouraging, and clear guidance — suggest possible career paths, degrees, and skill-building resources. 
Keep it short and friendly.`
              }]
            }
          ]
        }),
      }
    );

    const data = await response.json();
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Hmm... I didn’t quite get that.";

    res.json({ reply: botReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Sorry, there was an error connecting to Gemini." });
  }
});

app.listen(3000, () => console.log("✅ Gemini backend running on http://localhost:3000"));
