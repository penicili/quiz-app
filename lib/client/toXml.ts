import type { QuizInput, QuestionInput } from "../schemas/quizzes";

const toCdata = (value: string): string =>
  `<![CDATA[${value.replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;

const questionToXml = (
  question: QuestionInput,
  questionIndex: number,
  quizTitle: string,
): string => {
  const correctAnswers = question.answers.filter((answer) => answer.isCorrect);

  if (correctAnswers.length !== 1) {
    throw new Error(
      `Question ${questionIndex + 1} must have exactly one correct answer`,
    );
  }

  const answersXml = question.answers
    .map((answer) => {
      const fraction = answer.isCorrect ? "100" : "0";
      const feedback = answer.isCorrect ? "Correct!" : "Incorrect.";

      return `    <answer fraction="${fraction}" format="html">
      <text>${toCdata(answer.text)}</text>
      <feedback format="html">
        <text>${toCdata(feedback)}</text>
      </feedback>
    </answer>`;
    })
    .join("\n");

  return `  <question type="multichoice">
    <name>
      <text>${toCdata(`${quizTitle} - Question ${questionIndex + 1}`)}</text>
    </name>
    <questiontext format="html">
      <text>${toCdata(question.text)}</text>
    </questiontext>
    <defaultgrade>1.0000000</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <single>true</single>
    <shuffleanswers>true</shuffleanswers>
    <answernumbering>abc</answernumbering>
${answersXml}
  </question>`;
};

export const toXml = (quiz: QuizInput): string => {
  const title = quiz.title.trim();

  if (!title) {
    throw new Error("Quiz title cannot be empty");
  }

  if (quiz.questions.length === 0) {
    throw new Error("Quiz must contain at least one question");
  }

  const questionsXml = quiz.questions
    .map((question, index) => questionToXml(question, index, title))
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<quiz>
${questionsXml}
</quiz>
`;
};
