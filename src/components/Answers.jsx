import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const randomiseAnswers = useRef();

  if (!randomiseAnswers.current) {
    //   Randomise the answer logic -> create const where copy old array all answer -> creating new array
    randomiseAnswers.current = [...answers];
    // sort() wich will take the new build array
    // sort() will take two argument and function sort((a, b) => -1) if you return negative nubmer they swap if you return possitive number they stayin order they are.
    // Here we want to randomise it so sort -> Math.random() - 0.5 -> will give 50% negative and 50% positive value
    randomiseAnswers.current.sort(() => Math.random() - 0.5);

    // display active quastions next is curent index and text properties from question.js
  }

  return (
    <ul id="answers">
      {/* inputing ul list dinamicly for answer wich need to be randomise */}
      {/* Mapping answers with li where key={} point to answers and button as need to be clickeble for the user */}
      {randomiseAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClasses = "";

        if (answerState === "answered" && isSelected) {
          cssClasses = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClasses = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => {
                onSelect(answer);
              }}
              className={cssClasses}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
