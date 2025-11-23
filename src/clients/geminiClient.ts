import { GoogleGenerativeAI } from "@google/generative-ai";

let gemini: GoogleGenerativeAI | null = null;

export const getGeminiClient = () => {
  if (!gemini) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in .env");
    }
    gemini = new GoogleGenerativeAI(apiKey);
  }
  return gemini;
};
