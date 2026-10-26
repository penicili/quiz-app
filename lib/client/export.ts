"use client";
import type { QuizInput } from "../schemas/quizzes";
import { toAiken } from "./toAiken";
import { toXml } from "./toXml";

export enum allowedFormats {
  Aiken = "Aiken",
  MoodleXml = "Moodle XML",
}

enum fileFormats {
  txt = "txt",
  xml = "xml",
}

const downloadQuiz = (
  content: string,
  fileFormat: fileFormats,
  fileName: string,
) => {
  const fileDetails = {
    [fileFormats.txt]: {
      extension: fileFormats.txt,
      mimeType: "text/plain;charset=utf-8",
    },
    [fileFormats.xml]: {
      extension: fileFormats.xml,
      mimeType: "application/xml;charset=utf-8",
    },
  }[fileFormat];

  if (!fileDetails) {
    throw new Error("Invalid file format");
  }

  const blob = new Blob([content], { type: fileDetails.mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${fileName}.${fileDetails.extension}`;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportQuiz = (quiz: QuizInput, exportType: allowedFormats) => {
  if (exportType === allowedFormats.Aiken) {
    return downloadQuiz(toAiken(quiz), fileFormats.txt, quiz.title);
  }

  if (exportType === allowedFormats.MoodleXml) {
    return downloadQuiz(toXml(quiz), fileFormats.xml, quiz.title);
  }

  throw new Error("Unavailable format");
};
