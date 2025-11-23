// src/services/rateRelevanceToTopic.ts
import { MultipleChoiceQuestion } from "../apis/BaseTriviaApi";
import { getGeminiClient } from "../clients/geminiClient";

interface GeminiRatedQuestion {
  question: string;
  options: string[];
  answer: string;
  relevanceScore: number;
}

export const rateRelevanceToTopic = async (
  topic: string,
  questions: MultipleChoiceQuestion[]
): Promise<MultipleChoiceQuestion[]> => {
  const gemini = getGeminiClient();
  const model = gemini.getGenerativeModel({ model: "gemini-2.5-pro" });

  const prompt = `
You are a trivia expert. Given the topic "${topic}", choose the 5 most relevant questions from the list below.
Return them as a valid JSON array. Each item should have: question, options, answer, and a relevanceScore from 1–5.

IMPORTANT: Return ONLY valid JSON. Do not include any explanatory text, markdown formatting, or code blocks.

Questions:
${JSON.stringify(questions, null, 2)}
`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text() || "[]";

  console.log("rateRelevanceToTopic raw response", raw);

  // Handle ```json ... ``` wrappers if they appear
  const cleaned = (() => {
    const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
    return match && match[1] ? match[1].trim() : raw.trim();
  })();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse Gemini response as JSON:", cleaned);
    throw new Error("Gemini returned invalid JSON for rated questions.");
  }

  if (!Array.isArray(parsed)) {
    console.error("Gemini response is not an array:", parsed);
    throw new Error("Gemini did not return an array of questions.");
  }

  const rated = (parsed as GeminiRatedQuestion[]).map((item, idx) => {
    if (
      typeof item.question !== "string" ||
      !Array.isArray(item.options) ||
      typeof item.answer !== "string"
    ) {
      console.error("Invalid item from Gemini at index", idx, item);
      throw new Error("Gemini returned a question with invalid structure.");
    }

    return {
      question: item.question,
      options: item.options,
      answer: item.answer,
      metadata: {
        relevanceScore:
          typeof item.relevanceScore === "number" ? item.relevanceScore : null,
      },
    } satisfies MultipleChoiceQuestion;
  });

  return rated;
};
