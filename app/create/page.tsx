"use client";
import { useState } from "react";
export default function Create() {
  const [quizTitle, setQuizTitle] = useState("Quiz Title");
  const [quizDescription, setQuizDescription] = useState("Quiz Description");
  const [question, setQuestion] = useState("Question");

  function handleGenerate() {
    return null;
  }

  function handleReset() {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-yellow">
      {/* Section Metadata dan action Quiz (nama, save dsb)*/}
      <section className="flex flex-col gap-6 border-b-4 border-black px-4 py-6 sm:px-8 md:flex-row md:items-start md:justify-between md:px-12 md:py-8">
        <div className="flex min-w-0 max-w-full flex-col gap-2">
          <input
            type="text"
            id="quiz-title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="w-full max-w-full border-b-2 border-transparent font-display text-2xl font-bold tracking-widest focus:border-black focus:outline-none sm:text-3xl md:w-fit md:text-4xl"
          />
          <input
            type="text"
            id="quiz-description"
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            placeholder="Quiz Description"
            className="w-full max-w-full border-b border-transparent font-heading text-md font-semibold tracking-widest focus:border-black focus:outline-none md:w-fit"
          />
        </div>
        <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
          <button className="neo-btn neo-btn--accept w-full sm:w-auto">
            Generate
          </button>
          <button className="neo-btn neo-btn--secondary w-full sm:w-auto shadow-[5px 5px black]">
            Reset
          </button>
        </div>
      </section>
      {/* Soals */}
      <section className="flex flex-row justify-between">
        {/* Kiri tampilan soal */}
        <div className="min-w-0 flex-1 px-4 py-8 sm:px-8 md:px-12">
          <div className="flex min-w-0 items-center gap-4">
            <p className="shrink-0 font-display text-4xl">1</p>
            <input
              name="Question"
              className="min-w-0 flex-1 text-2xl focus:outline-none border-b-2 border-transparent focus:border-black"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
        </div>
        {/* Kanan overview soal */}
        <div className="hidden md:flex flex-col px-12 py-8 bg-white h-screen md:min-w-1/4 border-l-4 border-black">
          Tes
        </div>
      </section>
    </div>
  );
}
