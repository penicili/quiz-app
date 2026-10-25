"use-client";
import type { QuizInput } from "@/components/quiz/types/Quiz.types";
import { toAiken } from "./toAiken";

export enum allowedFormats {
  Aiken = "Aiken",
}

enum fileFormats {
  txt = "txt",
}

const downloadQuiz = (q: string, fileFormat: fileFormats, fileName: string) => {
  if (fileFormat === fileFormats.txt) {
    const blob = new Blob([q], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${fileName}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  } else {
    throw new Error("Invalid file format");
  }
};

export const exportQuiz = (quiz: QuizInput, exportType: allowedFormats) => {
  try {
    // const json = JSON.stringify(quiz);
    if (exportType === allowedFormats.Aiken) {
      const aikenfile = toAiken(quiz);
      return downloadQuiz(aikenfile, fileFormats.txt, quiz.title);
    } else {
      throw new Error("Unavailable format");
    }
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : String(e));
  }
};
