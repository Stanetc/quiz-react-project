import { useState, useCallback } from "react";

import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  //  Deriving quiosten base on length as at moment is index 0 in the state stored, as user answer on 1st question length will become 1 and will react will switch to next question
  const activeQuestionIndex = userAnswers.length;

  // Adding computed value for complete quiz where will get (true) as bellow statement therwise will get (false)
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    //   Logic to select the answer with onClick prop at the button element
    function handleSelectAnswer(selectedAnswer) {
      // Updating state with help of arrow function is order to save old answers as well and save new one as well -> selectedAsnwer is where new answer are stored, prevUserAnswers are old asnwer are stored
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), []);

  // If statement with new HTML elements to update UI if quiz complete
  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    // id= quiz,question for syiling in css file
    <div id="quiz">
      <Question
        // Using key={} in order to force react to destroy and re-create component
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
