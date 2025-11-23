// src/routes/questions.ts
import express from "express";
import { fetchAllTriviaAPIs } from "../services/fetchAllTriviaApis";
import { rateRelevanceToTopic } from "../services/rateRelevanceToTopic";

const router = express.Router();

router.post("/", async (req, res) => {
  const topic = req.body.topic;

  if (!topic) return res.status(400).json({ error: "Missing topic." });

  try {
    console.log("Received /generate-questions for topic:", topic);
    const rawQuestions = await fetchAllTriviaAPIs(topic);
    const filteredQuestions = await rateRelevanceToTopic(topic, rawQuestions);
    console.log("Filtered questions:", filteredQuestions);
    res.json(filteredQuestions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate questions." });
  }
});

export default router;
