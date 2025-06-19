import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDNfbHFAwmIuXV3jmQOB6O-4e4RS8bageQ";
const genAI = new GoogleGenerativeAI(API_KEY);

const INITIAL_PROMPT = `You are EduBot, an AI assistant for EduVenture, an educational platform. Your role is to:
1. Help students with their learning journey
2. Provide guidance on courses and study materials
3. Answer questions about education and learning
4. Be friendly, encouraging, and supportive
5. Keep responses concise and clear
6. If you don't know something, admit it and suggest asking a teacher or expert

Remember to:
- Use a friendly and encouraging tone
- Focus on educational topics
- Provide practical advice when possible
- Be patient and understanding
- Maintain a professional but approachable demeanor
- DO NOT use markdown formatting, asterisks, or any special characters in your responses
- Keep responses in plain text format suitable for a chat window`;

export const getGeminiResponse = async (message) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: INITIAL_PROMPT }],
        },
        {
          role: "model",
          parts: [
            {
              text: "I understand my role as EduBot. I'm ready to help students with their educational journey in a friendly and supportive way.",
            },
          ],
        },
        {
          role: "user",
          parts: [{ text: "Hello, I need help with my studies." }],
        },
        {
          role: "model",
          parts: [
            {
              text: "Hello! I'm EduBot, your educational assistant. I'm here to help you with your learning journey. What would you like to know?",
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // Clean the response text
    const cleanText = text
      .replace(/\*\*/g, "") // Remove double asterisks
      .replace(/\*/g, "") // Remove single asterisks
      .replace(/`/g, "") // Remove backticks
      .replace(/#/g, "") // Remove hash symbols
      .replace(/_/g, "") // Remove underscores
      .replace(/\[|\]/g, "") // Remove square brackets
      .replace(/\(|\)/g, "") // Remove parentheses
      .replace(/\n{3,}/g, "\n\n") // Replace multiple newlines with double newlines
      .trim(); // Remove leading/trailing whitespace

    return cleanText;
  } catch (error) {
    console.error("Error getting Gemini response:", error);
    return "I apologize, but I'm having trouble connecting right now. Please try again later.";
  }
};
