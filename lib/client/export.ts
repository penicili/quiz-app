"use-client"
import type { QuizInput } from "@/components/quiz/types/Quiz.types";

export enum allowedFormats {
  Aiken = 'Aiken',
}

export const exportQuiz = (quiz: QuizInput, exportType: allowedFormats) => {
  try {
    const json = JSON.stringify(quiz);
    if (exportType === allowedFormats.Aiken) {
      console.log(json)
    } else {
      throw new Error("Unavailable format");
    }
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : String(e));
  }
};
