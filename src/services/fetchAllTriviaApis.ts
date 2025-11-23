// src/services/fetchAllTriviaApis.ts
import { MultipleChoiceQuestion } from "../apis/BaseTriviaApi";
import { matchCategoriesToTopic } from "./matchCategories";
import { registeredTriviaAPIs } from "../apis";

export const fetchAllTriviaAPIs = async (
  topic: string
): Promise<MultipleChoiceQuestion[]> => {
  const matched = await matchCategoriesToTopic(topic);

  const questionsByApi = await Promise.all(
    registeredTriviaAPIs.map((api) =>
      api.fetchQuestions(matched?.[api.id] ?? null)
    )
  );

  console.log(
    "fetchAllTriviaAPIs questions per API",
    questionsByApi.map((q) => q.length)
  );

  return questionsByApi.flat();
};
