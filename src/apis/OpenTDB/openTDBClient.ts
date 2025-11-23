// src/apis/OpenTDB/openTDBClient.ts
import axios from "axios";
import { TriviaAPI, MultipleChoiceQuestion } from "../BaseTriviaApi";
import { baseUrl, params } from "./constants";

const fetchQuestions = async (
  category: string | null
): Promise<MultipleChoiceQuestion[]> => {
  if (!category) {
    return [];
  }

  const paramsObj = {
    ...params,
    category: params.category[category],
  };

  const response = await axios.get(baseUrl, { params: paramsObj });

  console.log(
    "openTDBApi response.data.results",
    paramsObj,
    response.data.results?.length
  );

  const results = response.data.results || [];

  const mapped: MultipleChoiceQuestion[] = results.map((q: any) => {
    const allOptions = [...(q.incorrect_answers || []), q.correct_answer];

    // simple shuffle
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }

    return {
      question: q.question,
      options: allOptions,
      answer: q.correct_answer,
      metadata: {
        category: q.category,
        difficulty: q.difficulty,
        type: q.type,
      },
    };
  });

  return mapped;
};

export const openTDBApi: TriviaAPI = {
  id: "openTDB",
  fetchQuestions,
  categories: Object.keys(params.category),
};
