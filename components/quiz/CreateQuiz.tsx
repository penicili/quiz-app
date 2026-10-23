"use client";
import { useState } from "react";
// Pakai DTO dari sini, soalnya tadinya mau pake db, kurang tau bakal kepake apa kag
// TODO: sesuain DTO yang dipake di db biar sama kayak interface disini
import QuestionEditor from "./components/QuestionEditor";
import type { QuestionInput, QuizInput } from "./types/Quiz.types";
import { exportQuiz } from "@/lib/client/export";
import { allowedFormats } from "@/lib/client/export";

export default function CreateQuiz() {
  const emptyQuestion = (): QuestionInput => ({
    text: "",
    answers: [
      { text: "Answer 1", isCorrect: true },
      { text: "Answer 2", isCorrect: false },
      { text: "Answer 3", isCorrect: false },
      { text: "Answer 4", isCorrect: false },
    ],
  });
  const [quiz, setQuiz] = useState<QuizInput>({
    title: "New Quiz",
    questions: [emptyQuestion()],
  });

  const [format, setFormat] = useState<allowedFormats>(allowedFormats.Aiken);

  function handleGenerate() {
    exportQuiz(quiz, format);
  }

  function handleReset() {
    setQuiz({ title: "New Quiz", questions: [emptyQuestion()] });
  }

  function handleAddQuestion() {
    setQuiz((q) => ({ ...q, questions: [...q.questions, emptyQuestion()] }));
  }

  function handleRemoveQuestion(questionIndex: number) {
    console.log(`Removing question ${questionIndex}`);
    setQuiz((q) => ({
      ...q,
      questions: q.questions.filter((_, idx) => idx !== questionIndex),
    }));
  }

  function removeAnswer(questionIndex: number, answerIndex: number) {
    setQuiz((currentQuiz) => ({
      ...currentQuiz,
      questions: currentQuiz.questions.map((question, currentQuestionIndex) =>
        currentQuestionIndex === questionIndex
          ? {
              ...question,
              answers: question.answers.filter(
                (_, currentAnswerIndex) => currentAnswerIndex !== answerIndex,
              ),
            }
          : question,
      ),
    }));
  }

  function addAnswer(questionIndex: number) {
    setQuiz((q) => ({
      ...q,
      questions: q.questions.map((question, c) =>
        c === questionIndex
          ? {
              ...question,
              answers: [...question.answers, { text: "", isCorrect: false }],
            }
          : question,
      ),
    }));
  }

  function updateQuestion(questionIndex: number, updated: QuestionInput) {
    setQuiz((currentQuiz) => ({
      ...currentQuiz,
      questions: currentQuiz.questions.map((question, currentQuestionIndex) =>
        currentQuestionIndex === questionIndex ? updated : question,
      ),
    }));
  }

  return (
    <div className="flex flex-col min-h-screen bg-yellow">
      {/* TODO: Refactor this shit */}
      {/* Section Metadata dan action Quiz (nama, save dsb)*/}
      <section className="flex flex-col gap-6 border-b-4 border-black px-4 py-6 sm:px-8 md:flex-row md:items-start md:justify-between md:px-12 md:py-8">
        <div className="flex min-w-0 max-w-full flex-col gap-2">
          <input
            type="text"
            id="quiz-title"
            value={quiz.title}
            placeholder="Quiz Title"
            onChange={(e) => setQuiz((q) => ({ ...q, title: e.target.value }))}
            className="w-full max-w-full border-b-2 border-transparent font-display text-2xl font-bold tracking-widest focus:border-black focus:outline-none sm:text-3xl md:w-fit md:text-4xl"
          />
        </div>
        <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
          <button
            onClick={handleGenerate}
            className="neo-btn neo-btn--accept w-full sm:w-auto"
          >
            Generate
          </button>
          <button
            onClick={handleReset}
            className="neo-btn neo-btn--secondary w-full sm:w-auto shadow-[5px 5px black]"
          >
            Reset
          </button>
        </div>
      </section>
      {/* Soals */}
      <section className="flex flex-row justify-between">
        {/* Kiri tampilan soal */}
        <div className="flex min-w-0 flex-1 flex-col gap-6 px-4 py-8 sm:px-8 md:px-12">
          {quiz.questions.map((question, questionIndex) => (
            <QuestionEditor
              key={questionIndex}
              question={question}
              questionIndex={questionIndex}
              onUpdate={(updated) => updateQuestion(questionIndex, updated)}
              onRemove={() => handleRemoveQuestion(questionIndex)}
              onRemoveAnswer={(ai) => removeAnswer(questionIndex, ai)}
              onAddAnswer={() => addAnswer(questionIndex)}
            />
          ))}
          <button
            className="neo-btn neo-btn--accept self-end"
            onClick={handleAddQuestion}
          >
            Add question
          </button>
        </div>
        {/* Kanan overview soal */}
        <div className="hidden md:flex flex-col px-12 py-8 bg-white h-screen md:min-w-1/4 border-l-4 border-black">
          <label>Format</label>
          <select
            id="format"
            value={format}
            onChange={(e) => setFormat(e.target.value as allowedFormats)}
            className="neo-input"
          >
            {Object.values(allowedFormats).map((allowedFormat) => (
              <option key={allowedFormat} value={allowedFormat}>
                {allowedFormat}
              </option>
            ))}
          </select>
        </div>
      </section>
    </div>
  );
}
