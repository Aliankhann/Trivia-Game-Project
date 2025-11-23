// src/services/matchCategories.ts
import { getGeminiClient } from "../clients/geminiClient";
import { registeredTriviaAPIs } from "../apis";

export const matchCategoriesToTopic = async (
  topic: string
): Promise<Record<string, string | null>> => {
  const gemini = getGeminiClient();
  const model = gemini.getGenerativeModel({ model: "gemini-2.5-pro" });

  console.log(
    "matchCategoriesToTopic categories",
    registeredTriviaAPIs.map((api) => api.categories)
  );

  const prompt = `
The user wants trivia about: "${topic}"

Below are category lists from different trivia APIs. For each API, choose the category that best matches the topic.
Return a JSON object where each key is the API ID, and its value is the best matching category.

IMPORTANT: Return ONLY valid JSON. Do not explain anything, don't use code blocks.

${registeredTriviaAPIs
  .map(
    (api) =>
      `API: ${api.id}\nCategories: ${api.categories.join(", ")}\n\n`
  )
  .join("")}
`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text() || "{}";

  console.log("matchCategoriesToTopic raw response", raw);

  // Handle ```json ... ``` wrappers if Gemini ignores your instructions
  const cleaned = (() => {
    const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
    return match && match[1] ? match[1].trim() : raw.trim();
  })();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse Gemini response as JSON:", cleaned);
    console.error("Parse error:", err);
    // surface the error instead of silently returning nulls
    throw new Error("Gemini returned invalid JSON for category matching.");
  }

  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    console.error("Gemini response is not an object:", parsed);
    throw new Error("Gemini did not return a JSON object for category mapping.");
  }

  const parsedObj = parsed as Record<string, string | null>;

  // For each API, only accept categories we know; otherwise null
  const mappedResult: Record<string, string | null> = Object.fromEntries(
    registeredTriviaAPIs.map((api) => {
      const value = parsedObj[api.id];
      const validCategory =
        typeof value === "string" && api.categories.includes(value)
          ? value
          : null;

      if (value && !validCategory) {
        console.warn(
          `Gemini returned unknown category "${value}" for API "${api.id}". Falling back to null.`
        );
      }

      return [api.id, validCategory];
    })
  );

  console.log("matchCategoriesToTopic result", mappedResult);

  return mappedResult;
};
