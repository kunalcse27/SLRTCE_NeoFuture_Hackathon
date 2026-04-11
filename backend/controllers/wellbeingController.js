import { GoogleGenerativeAI } from "@google/generative-ai";
import Sentiment from "sentiment";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const sentimentAnalyzer = new Sentiment();

/**
 * Wellbeing Controller
 * 
 * Logic for analyzing emotions and tracking behavioral trends.
 */

// AI Chat with Mira
export const chatWithMira = async (req, res) => {
  try {
    const { messages, mood } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ success: false, message: "Invalid messages format" });
    }

    // Using systemInstruction for better "training" and persona consistency
    const systemPrompt = `You are Mira, a warm, empathetic mental wellness companion for students. 
Current student mood context: ${mood || 'Not specified'}.
Your Goal:
- Be supportive, non-judgmental, and conversational.
- Use simple, friendly language. Avoid clinical or overly professional tones.
- If the student seems highly stressed or in danger, gently encourage seeking professional help.
- Do NOT provide medical diagnoses or prescriptions.
- Keep responses concise but meaningful (3-5 sentences).
- Focus on active listening and validating feelings.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt
    });

    const chat = model.startChat({
      history: messages.slice(0, -1).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const lastMessage = messages[messages.length - 1].content;
    console.log("Sending to Gemini:", lastMessage);

    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    console.log("Mira Response:", text);

    res.status(200).json({
      success: true,
      data: {
        reply: text
      }
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({
      success: false,
      message: "I'm having a bit of trouble thinking right now. Let's try again in a moment. 💙",
      error: error.message
    });
  }
};

// Automated Sentiment & Stress Analysis
export const analyzeSentiment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ success: false, message: "No text provided" });

    const input = text.toLowerCase();
    let stressLevel = 5;

    if (input.includes("stress") || input.includes("anxious") || input.includes("overwhelmed")) {
      stressLevel = 8;
    } else if (input.includes("exam") || input.includes("study") || input.includes("pressure")) {
      stressLevel = 9;
    } else if (input.includes("tired") || input.includes("exhausted") || input.includes("sleep")) {
      stressLevel = 7;
    } else if (input.includes("sad") || input.includes("low") || input.includes("depressed")) {
      stressLevel = 6;
    } else if (input.includes("happy") || input.includes("good") || input.includes("great")) {
      stressLevel = 2;
    }

    let recommendation = "";
    if (stressLevel >= 8) {
      recommendation = "You seem highly stressed. Try taking a break and managing tasks step by step.";
    } else if (stressLevel >= 6) {
      recommendation = "You might be feeling overwhelmed. Take short breaks and rest.";
    } else if (stressLevel >= 3) {
      recommendation = "You're doing okay. Maintain a balanced routine.";
    } else {
      recommendation = "Great! You seem relaxed and positive.";
    }

    // Wrap directly identically back into the same schema the frontend is hitting
    // InsightsPage.jsx maps via `data.stressLevel` but the reverted routing
    // might expect data wrapper. Keep backward and frontend compat.
    res.status(200).json({
      stressLevel,
      recommendation,
      success: true,
      data: {
          stressLevel,
          recommendation
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWellbeingStats = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        currentSentiment: 0.72,
        trend: "Improving",
        weeklyResilience: "+12%"
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitJournalEntry = async (req, res) => {
  try {
    const { text } = req.body;
    const analysis = sentimentAnalyzer.analyze(text);

    res.status(201).json({
      success: true,
      data: {
        sentiment: analysis.score > 0 ? "Positive" : "Negative",
        score: analysis.score
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
