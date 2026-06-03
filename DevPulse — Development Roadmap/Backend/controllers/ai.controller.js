import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAI = async (req, res) => {
  try {
    const message = req.body?.message;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      content:message,
    });

    const result = await model.generateContent(message);
    const response = await result.response;

    return res.json({ reply: response.text() });
  } catch (err) {
    console.log("🔥 GEMINI ERROR:", err);
    return res.status(500).json({
      error: err.message || "AI failed",
    });
  }
};
