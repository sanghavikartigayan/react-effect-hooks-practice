import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";

import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((selectedAnser) => {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnser];
    });
  }, []); // useCallback is used here because it is this function that is added as a dependency to the handleSkipAnswer callback function.

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  ); // useCallback is used here instead of the normal event function hanlder because this function will get recreated each time the timer component gets resetted. To avoid that issue we are caching this function using useCallbacks.

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex} // adding key prop to this component here because this component will not get recreated or unmounted and remounted to the dom whenever the question changes. Adding the activeQuestionIndex as a key will help react to rerender this component as the index is now changed.
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
};

export default Quiz;
