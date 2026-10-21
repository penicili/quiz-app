import "server-only";
import type { ObjectId } from "mongodb";
import { getDb } from "./client";



export interface AnswerRecord{
  _id: ObjectId,
  text: string,
  isCorrect: boolean
}

export interface QuestionRecord{
  _id: ObjectId,
  text: string,
  answers: AnswerRecord[]
}

export interface QuizRecord {
  _id: ObjectId, 
  questions: QuestionRecord[]
  createdAt: Date;
}

const db = await getDb()

export const quizzesCols = async () => {
  return (db.collection<QuizRecord>("quizzes"))
}