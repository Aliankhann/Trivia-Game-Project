export interface TriviaAPI {
    id: string;
    fetchQuestions(category: string | null): Promise<MultipleChoiceQuestion[]>;
    categories: string[];
}

export interface MultipleChoiceQuestion {
    question: string;
    options: string[];
    answer: string;
    metadata: Record<string, any> | null;
}
