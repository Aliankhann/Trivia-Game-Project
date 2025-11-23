// src/index.ts
import express from "express";
import dotenv from "dotenv";
import questionsRouter from "./routes/questions";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/generate-questions", questionsRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCP server listening on port ${PORT}`);
});
