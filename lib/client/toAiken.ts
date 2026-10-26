"use-client";
import type { QuizInput, QuestionInput } from "../schemas/quizzes";

// Lokasi default file PHP ketika dijalankan melalui XAMPP adalah…
// A) /xampp/www/
// B) xampp/htdocs/
// C) /xampp/config/
// D) /xampp/server/
// E) /xampp/bin/
// ANSWER: B
const aikenQuestion = (q: QuestionInput) => {
  const index = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lines: string[] = [];
  lines.push(q.text);
  q.answers.forEach((a, i) => {
    lines.push(`${index[i]}) ${a.text}`);
  });

  const correctIndex = q.answers.findIndex((a) => a.isCorrect);
  lines.push(`ANSWER: ${index[correctIndex]}`);

  return lines.join("\n");
};

export const toAiken = (jsonQuiz: QuizInput) => {
  return jsonQuiz.questions.map(aikenQuestion).join("\n\n");
};

