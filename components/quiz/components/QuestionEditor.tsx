"use client";

import type { QuestionInput } from "../types/Quiz.types";

type Props = {
  question: QuestionInput;
  questionIndex: number;
  onUpdate: (updated: QuestionInput) => void;
  onRemove: () => void;
  onRemoveAnswer: (ai: number) => void;
  onAddAnswer: () => void;
};

export default function QuestionEditorCard({
  question,
  questionIndex,
  onUpdate,
  onRemove,
  onRemoveAnswer,
  onAddAnswer,
}: Props) {
  // TODO: error handling kalau keluar dari ini
  // TODO: kalobisa dimasukin ke Quiz aja ini label A B C D  ny
  const answerOptions = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return (
    <div className="neo-card flex w-full min-w-0 flex-col gap-4">
      {/* Nomor dan pertanyaan di atas */}
      <div className="flex w-full min-w-0 items-center gap-2 border-b-2 border-black pb-2">
        <p className="shrink-0 text-2xl">{`${questionIndex + 1})`}</p>

        <input
          className="min-w-0 flex-1 border-b-2 border-transparent text-2xl focus:outline-none"
          placeholder={`Question number ${questionIndex + 1}`}
          value={question.text}
          onChange={(e) => onUpdate({ ...question, text: e.target.value })}
        />

        <button
          className="neo-btn neo-btn--secondary px-2! py-0!"
          onClick={onRemove}
        >
          X
        </button>
      </div>

      {/* Answers di bawah */}
      <div className="flex w-full flex-col gap-3">
        {question.answers.map((answer, answerIndex) => (
          <div key={answerIndex} className="flex w-full items-center gap-4">
            <input
              type="radio"
              name={`question-${questionIndex}`}
              className="neo-radio border-pink! checked:border-black! checked:shadow-[inset_0_0_0_4px_var(--green)]!"
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
            <input
              className="w-full border-b-2 border-black bg-transparent px-2 py-1 focus:outline-none"
              type="text"
              placeholder={answerOptions[answerIndex]}
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
            {answer.isCorrect ? (
              <span>(correct)</span>
            ) : (
              <button
                onClick={() => onRemoveAnswer(answerIndex)}
                className="neo-btn neo-btn--secondary px-1! py-0!"
              >
                X
              </button>
            )}
          </div>
        ))}
        <button className="neo-btn" onClick={onAddAnswer}>
          Add Answer
        </button>
      </div>
    </div>
  );
}
