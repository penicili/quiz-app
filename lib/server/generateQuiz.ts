"use server";

import { GoogleGenAI } from "@google/genai";
import { env } from "@/lib/env";
import type { QuizInput } from "@/components/quiz/types/Quiz.types";

type QuizOptions = {
  numQuestions: number;
  difficulty: "easy" | "medium" | "hard";
  outputLanguage?: string;
  numOptions?: number;
  focusTopic?: string;
};

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
const model = env.GEMINI_MODEL;

function buildQuizPrompt({
  numQuestions,
  difficulty,
  outputLanguage = "English",
  numOptions = 4,
  focusTopic,
}: QuizOptions): string {
  return `
You are a professional quiz author. Create multiple-choice questions based strictly on the attached PDF document.

## Parameters
- Number of questions: ${numQuestions}
- Difficulty: ${difficulty}
- Options per question: ${numOptions}
- Output language (questions, options, explanations): ${outputLanguage}
${focusTopic ? `- Focus topic: ${focusTopic}` : "- Cover the entire document evenly"}

## Rules
1. Every question MUST be grounded in the document's content. Do not add facts from outside the document.
2. Each question must have exactly ONE correct answer.
3. Distractors (incorrect options) must be plausible and similar in length and style to the correct answer. Avoid obviously wrong or joke options.
4. Do not write questions that depend on images, charts, or tables that cannot be read clearly.
5. Do not use "All of the above" or "None of the above".
6. Randomize the position of the correct answer across questions.
7. Avoid duplicate questions, and avoid questions that reveal the answer to other questions.
8. Match the cognitive depth to the difficulty level:
   - easy: recall of definitions or directly stated facts
   - medium: understanding and explaining concepts
   - hard: analyzing, comparing, or applying concepts to new scenarios
9. Each question must contain exactly ${numOptions} answers.
10. Exactly one answer per question must have "isCorrect": true.
11. If the document does not contain enough material for ${numQuestions} valid questions, generate only as many as the material supports. Do not invent content.
12. Return only valid JSON matching the requested output schema.
`.trim();
}

const quizResponseSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          text: { type: "string" },
          answers: {
            type: "array",
            items: {
              type: "object",
              properties: {
                text: { type: "string" },
                isCorrect: { type: "boolean" },
              },
              required: ["text", "isCorrect"],
            },
          },
        },
        required: ["text", "answers"],
      },
    },
  },
  required: ["title", "questions"],
} as const;

function isQuizInput(value: unknown, numOptions: number): value is QuizInput {
  if (!value || typeof value !== "object") {
    return false;
  }

  const quiz = value as { title?: unknown; questions?: unknown };

  return (
    typeof quiz.title === "string" &&
    Array.isArray(quiz.questions) &&
    quiz.questions.every((question) => {
      if (!question || typeof question !== "object") {
        return false;
      }

      const currentQuestion = question as {
        text?: unknown;
        answers?: unknown;
      };

      return (
        typeof currentQuestion.text === "string" &&
        Array.isArray(currentQuestion.answers) &&
        currentQuestion.answers.length === numOptions &&
        currentQuestion.answers.filter(
          (answer) =>
            answer &&
            typeof answer === "object" &&
            "isCorrect" in answer &&
            answer.isCorrect === true,
        ).length === 1 &&
        currentQuestion.answers.every((answer) => {
          if (!answer || typeof answer !== "object") {
            return false;
          }

          const currentAnswer = answer as {
            text?: unknown;
            isCorrect?: unknown;
          };

          return (
            typeof currentAnswer.text === "string" &&
            typeof currentAnswer.isCorrect === "boolean"
          );
        })
      );
    })
  );
}

export default async function generateQuiz(
  attachment: File,
  options: QuizOptions = {
    numQuestions: 10,
    difficulty: "medium",
    outputLanguage: "English",
    numOptions: 4,
  },
): Promise<QuizInput> {
  try {
    if (attachment.type !== "application/pdf") {
      throw new Error("Only PDF files are supported.");
    }

    const data = Buffer.from(await attachment.arrayBuffer()).toString("base64");

    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          inlineData: {
            mimeType: attachment.type,
            data,
          },
        },
        {
          text: buildQuizPrompt({
            ...options,
            numOptions: options.numOptions ?? 4,
          }),
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: quizResponseSchema,
      },
    });

    if (!response.text) {
      throw new Error("Gemini returned an empty quiz response.");
    }

    const quiz: unknown = JSON.parse(response.text);

    const numOptions = options.numOptions ?? 4;

    if (!isQuizInput(quiz, numOptions)) {
      throw new Error("Gemini returned an invalid quiz structure.");
    }

    return quiz;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
