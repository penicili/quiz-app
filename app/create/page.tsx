"use client";
import { useState } from "react";
// Pakai DTO dari sini, soalnya tadinya mau pake db, kurang tau bakal kepake apa kag
// TODO: sesuain DTO yang dipake di db biar sama kayak interface disini

type AnswerInput = { text: string; isCorrect: boolean };
type QuestionInput = { text: string; answers: AnswerInput[] };
type QuizInput = { title: string; questions: QuestionInput[] };

export default function Create() {
  const emptyQuestion = (): QuestionInput => ({
    text: "Question",
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

  function handleGenerate() {
    return null;
  }

  function handleReset() {
    return null;
  }

  function addQuestion() {
    setQuiz((q) => ({ ...q, questions: [...q.questions, emptyQuestion()] }));
  }

  function updateQuestion(i: number, updated: QuestionInput) {
    setQuiz((currentQuiz) => ({
      ...currentQuiz,
      questions: currentQuiz.questions.map((question, questionIndex) =>
        questionIndex === i ? updated : question,
      ),
    }));
  }

  function updateAnswer(
    questionIndex: number,
    answerIndex: number,
    updated: Partial<AnswerInput>,
  ) {
    setQuiz((currentQuiz) => ({
      ...currentQuiz,
      questions: currentQuiz.questions.map((question, currentQuestionIndex) =>
        currentQuestionIndex === questionIndex
          ? {
              ...question,
              answers: question.answers.map((answer, currentAnswerIndex) =>
                currentAnswerIndex === answerIndex
                  ? { ...answer, ...updated }
                  : answer,
              ),
            }
          : question,
      ),
    }));
  }

  function selectCorrectAnswer(questionIndex: number, answerIndex: number) {
    setQuiz((currentQuiz) => ({
      ...currentQuiz,
      questions: currentQuiz.questions.map((question, currentQuestionIndex) =>
        currentQuestionIndex === questionIndex
          ? {
              ...question,
              answers: question.answers.map((answer, currentAnswerIndex) => ({
                ...answer,
                isCorrect: currentAnswerIndex === answerIndex,
              })),
            }
          : question,
      ),
    }));
  }

  return (
    <div className="flex flex-col min-h-screen bg-yellow">
      {/* Section Metadata dan action Quiz (nama, save dsb)*/}
      <section className="flex flex-col gap-6 border-b-4 border-black px-4 py-6 sm:px-8 md:flex-row md:items-start md:justify-between md:px-12 md:py-8">
        <div className="flex min-w-0 max-w-full flex-col gap-2">
          <input
            type="text"
            id="quiz-title"
            value={quiz.title}
            onChange={(e) => setQuiz((q) => ({ ...q, title: e.target.value }))}
            className="w-full max-w-full border-b-2 border-transparent font-display text-2xl font-bold tracking-widest focus:border-black focus:outline-none sm:text-3xl md:w-fit md:text-4xl"
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
          {quiz.questions.map((question, questionIndex) => (
            <div
              key={questionIndex}
              className="flex w-full min-w-0 flex-col gap-4"
            >
              {/* Nomor dan pertanyaan di atas */}
              <div className="flex w-full min-w-0 items-center gap-2">
                <p className="shrink-0 text-2xl">{questionIndex + 1})</p>

                <input
                  className="min-w-0 flex-1 border-b-2 border-transparent text-2xl focus:border-black focus:outline-none"
                  value={question.text}
                  onChange={(e) => {
                    updateQuestion(questionIndex, {
                      ...question,
                      text: e.target.value,
                    });
                  }}
                />
              </div>

              {/* Answers di bawah */}
              <div className="flex w-full flex-col gap-3 pl-8">
                {question.answers.map((answer, answerIndex) => (
                  <div key={answerIndex} className="flex w-full">
                    <input
                      className="w-full border-b-2 border-black bg-transparent px-2 py-1 focus:outline-none"
                      type="text"
                      value={answer.text}
                      onChange={(e) =>
                        updateAnswer(questionIndex, answerIndex, {
                          text: e.target.value,
                        })
                      }
                    />
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      className="neo-radio"
                      checked={answer.isCorrect}
                      onChange={() =>
                        selectCorrectAnswer(questionIndex, answerIndex)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Kanan overview soal */}
        <div className="hidden md:flex flex-col px-12 py-8 bg-white h-screen md:min-w-1/4 border-l-4 border-black">
          Tes
        </div>
      </section>
    </div>
  );
}
