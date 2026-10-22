"use client";

import type { QuestionInput } from "../types/Quiz.types";

type Props = {
  question: QuestionInput;
  questionIndex: number;
  onUpdate: (updated: QuestionInput) => void;
};

export default function QuestionEditorCard({
  question,
  questionIndex,
  onUpdate,
}: Props) {
  return (
    <div className="neo-card flex w-full min-w-0 flex-col gap-4">
      {/* Nomor dan pertanyaan di atas */}
      <div className="flex w-full min-w-0 items-center gap-2">
        <p className="shrink-0 text-2xl">{questionIndex + 1})</p>

        <input
          className="min-w-0 flex-1 border-b-2 border-transparent text-2xl focus:border-black focus:outline-none"
          value={question.text}
          onChange={(e) => onUpdate({ ...question, text: e.target.value })}
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
                onUpdate({
                  ...question,
                  answers: question.answers.map(
                    (currentAnswer, currentAnswerIndex) =>
                      currentAnswerIndex === answerIndex
                        ? { ...currentAnswer, text: e.target.value }
                        : currentAnswer,
                  ),
                })
              }
            />
            <input
              type="radio"
              name={`question-${questionIndex}`}
              className="neo-radio"
              checked={answer.isCorrect}
              onChange={() =>
                onUpdate({
                  ...question,
                  answers: question.answers.map(
                    (currentAnswer, currentAnswerIndex) => ({
                      ...currentAnswer,
                      isCorrect: currentAnswerIndex === answerIndex,
                    }),
                  ),
                })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
