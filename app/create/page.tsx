"use client";
import { useState } from "react";
export default function Create() {
  const [quizTitle, setQuizTitle] = useState("Quiz Title");
  const [quizDescription, setQuizDescription] = useState("Quiz Description");

  function handleGenerate(){
    return null
  }

  function handleReset(){
    return null
  }

  return (
    <div className="flex flex-col gap-10 min-h-screen bg-yellow p-8">
      {/* Section Metadata dan action Quiz (nama, save dsb)*/}
      <section className="flex flex-row px-4 gap-6 justify-between">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            id="quiz-title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="font-display text-4xl font-bold tracking-widest border-b-2 border-transparent focus:outline-none focus:border-black w-fit"
          />
          <input
            type="text"
            id="quiz-description"
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            placeholder="Quiz Description"
            className="font-heading text-md font-semibold tracking-widest border-b-1 border-transparent focus:outline-none focus:border-black w-fit"
          />
        </div>
        <div className="flex flex-row gap-4">
          <button className="neo-btn neo-btn--accept">Generate</button>
          <button className="neo-btn neo-btn--secondary shadow-[5px 5px black]">
            Reset
          </button>
        </div>
      </section>

      {/* Soals */}
      <section className="flex flex-row"></section>
    </div>
  );
}
