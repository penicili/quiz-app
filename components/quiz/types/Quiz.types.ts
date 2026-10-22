export type AnswerInput = { text: string; isCorrect: boolean };
export type QuestionInput = { text: string; answers: AnswerInput[] };
export type QuizInput = { title: string; questions: QuestionInput[] };


