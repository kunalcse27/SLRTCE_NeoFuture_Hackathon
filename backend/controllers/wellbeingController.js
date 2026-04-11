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

    const analysis = sentimentAnalyzer.analyze(text);
    
    // Convert sentiment score to a 1-10 stress scale
    // sentiment score: positive is happy, negative is stressed
    // Analysis score usually ranges from -5 to +5 per word.
    // Let's normalize it.
    const score = analysis.score;
    let stressLevel = 5; // Start at middle (Neutral)

    if (score > 0) {
      stressLevel = Math.max(1, 5 - Math.floor(score / 2)); // Positive sentiment = Lower stress
    } else if (score < 0) {
      stressLevel = Math.min(10, 5 + Math.abs(Math.floor(score / 2))); // Negative sentiment = Higher stress
    }

    // Recommendation based on stress
    let recommendation = "You're doing great! Keep up the positive vibes.";
    if (stressLevel >= 8) {
      recommendation = "It looks like you're carrying a lot right now. Remember to take deep breaths and maybe talk to a friend or mentor.";
    } else if (stressLevel >= 6) {
      recommendation = "You seem a bit tense. How about a 5-minute break to clear your head?";
    }

    res.status(200).json({
      success: true,
      data: {
        stressLevel,
        sentiment: score > 0 ? "Positive" : score < 0 ? "Negative" : "Neutral",
        recommendation,
        comparative: analysis.comparative
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
