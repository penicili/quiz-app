import { z } from "zod";

export const createAnswerSchema = z.object({
  text: z.string().min(1),
  isCorrect: z.boolean(),
});

export const createQuestionSchema = z.object({
  text: z.string().trim().min(1),
  answers: z.array(createAnswerSchema).min(1)
});

export const createQuizSchema = z.object({
  title: z.string(),
  questions: z.array(createQuestionSchema).min(1)
});

export type QuizInput = z.infer<typeof createQuizSchema>;
export type QuestionInput = z.infer<typeof createQuestionSchema>;
export type AnswerInput = z.infer<typeof createAnswerSchema>;
