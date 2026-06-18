import { useState } from "react";
import questions from "../questions.jsx";
import quizCompletedLogo from "../assets/quiz-complete.png";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === questions.length;

  const handleSelectAnswer = (selectedAnser) => {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnser];
    });
  };

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
        <h2>{questions[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffleAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
