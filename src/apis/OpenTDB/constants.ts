// src/apis/OpenTDB/constants.ts
export const categories: Record<string, number> = {
  "General Knowledge": 9,
  "Entertainment: Books": 10,
  "Entertainment: Film": 11,
  "Entertainment: Music": 12,
  "Entertainment: Musicals & Theatres": 13,
  "Entertainment: Television": 14,
  "Entertainment: Video Games": 15,
  "Entertainment: Board Games": 16,
  "Science & Nature": 17,
  "Science: Computers": 18,
  "Science: Mathematics": 19,
  "Mythology": 20,
  "Sports": 21,
  "Geography": 22,
  "History": 23,
  "Politics": 24,
  "Art": 25,
  "Celebrities": 26,
  "Animals": 27,
  "Vehicles": 28,
  "Entertainment: Comics": 29,
  "Entertainment: Japanese Anime & Manga": 31,
  "Entertainment: Cartoon & Animations": 32,
};

export const types: Record<string, string> = {
  "Multiple Choice": "multiple",
  "True/False": "boolean",
};

export const difficulties: Record<string, string> = {
  Easy: "easy",
  Medium: "medium",
  Hard: "hard",
};

export const amounts: Record<string, number> = {
  min: 1,
  max: 50,
};

export const baseUrl = "https://opentdb.com/api.php";

export const params: Record<string, any> = {
  category: categories,
  type: types["Multiple Choice"],
  difficulty: difficulties["Medium"],
  amount: amounts["max"],
};
