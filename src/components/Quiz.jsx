import { useState, useCallback } from "react";
import questions from "../questions.jsx";
import quizCompletedLogo from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

const Quiz = () => {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1; // we are doing this because the activeQuestion will switch to next question immediately after we setUserAnswer state instead of showing correct or wrong status.

  const quizIsComplete = activeQuestionIndex === questions.length;

  const handleSelectAnswer = useCallback(
    (selectedAnser) => {
      setAnswerState("answered");
      setUserAnswers((prevAnswers) => {
        return [...prevAnswers, selectedAnser];
      });

      setTimeout(() => {
        if (selectedAnser === questions[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex],
  ); // useCallback is used here because it is this function that is added as a dependency to the handleSkipAnswer callback function.

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  ); // useCallback is used here instead of the normal event function hanlder because this function will get recreated each time the timer component gets resetted. To avoid that issue we are caching this function using useCallbacks.

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompletedLogo} alt="Trophy Cup" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex} // adding key prop to this component here because this component will not get recreated or unmounted and remounted to the dom whenever the question changes. Adding the activeQuestionIndex as a key will help react to rerender this component as the index is now changed.
        questionText={questions[activeQuestionIndex].text}
        answers={questions[activeQuestionIndex].answers}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
};

export default Quiz;
