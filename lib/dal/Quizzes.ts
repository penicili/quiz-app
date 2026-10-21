import "server-only";
import { ObjectId } from "mongodb";
import type {
  AnswerRecord,
  QuestionRecord,
  QuizRecord,
} from "@/lib/db/collections";
import { quizzesCols } from "@/lib/db/collections";
import {
  createQuizSchema,
  type CreateQuizInput,
} from "@/lib/schemas/quizzes";

export type AnswerDTO = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type QuestionDTO = {
  id: string;
  text: string;
  answers: AnswerDTO[];
};

export type QuizDTO = {
  id: string;
  questions: QuestionDTO[];
};

const answerToDTO = (answer: AnswerRecord): AnswerDTO => ({
  id: answer._id.toHexString(),
  text: answer.text,
  isCorrect: answer.isCorrect,
});

const questionToDTO = (question: QuestionRecord): QuestionDTO => ({
  id: question._id.toHexString(),
  text: question.text,
  answers: question.answers.map(answerToDTO),
});

export const toDTO = (quiz: QuizRecord): QuizDTO => ({
  id: quiz._id.toHexString(),
  questions: quiz.questions.map(questionToDTO),
});

export const listQuizzes = async (page = 1, pageSize = 20) => {
  const col = await quizzesCols();
  const docs = await col
    .find({})
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();
  return docs.map(toDTO);
};

export const createQuiz = async (input: CreateQuizInput): Promise<QuizDTO> => {
  const data = createQuizSchema.parse(input);

  const quiz: QuizRecord = {
    _id: new ObjectId(),
    createdAt: new Date(),
    questions: data.questions.map((question) => ({
      _id: new ObjectId(),
      text: question.text,
      answers: question.answers.map((answer) => ({
        _id: new ObjectId(),
        text: answer.text,
        isCorrect: answer.isCorrect,
      })),
    })),
  };

  const col = await quizzesCols();
  await col.insertOne(quiz);

  return toDTO(quiz);
};