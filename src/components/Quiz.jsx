import { useState, useCallback } from "react";
import questions from "../questions.jsx";
import quizCompletedLogo from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

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
    () => handleSelectAnswer(answer),
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

  const shuffleAnswers = [...questions[activeQuestionIndex].answers];
  shuffleAnswers.sort(() => Math.random() - 0.5); // Math random will give us a number between 0 and 1 and when we subtract 0.5 from it we get negative value. Negative value means it will be swapped. We are randomly shuffling the answers array to the user because the array always has the first element as the correct answer and we dont want to show like that to the user.

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex} // adding key prop to this component here because this component will not get recreated or unmounted and remounted to the dom whenever the question changes. Adding the activeQuestionIndex as a key will help react to rerender this component as the index is now changed.
          onTimeout={() => handleSelectAnswer(null)}
          timeout={10000}
        />
        <h2>{questions[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffleAnswers.map((answer) => {
            let cssClass = "";
            const isSelected = userAnswers[userAnswers.length - 1] === answer;

            if (answerState === "answered" && isSelected) {
              cssClass = "selected";
            }

            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              cssClass = answerState;
            }
            return (
              <li key={answer} className="answer">
                <button onClick={handleSkipAnswer} className={cssClass}>
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
