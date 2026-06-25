import { useRef } from "react";

const Answers = ({ answerState, selectedAnswer, onSelectAnswer, answers }) => {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5); // Math random will give us a number between 0 and 1 and when we subtract 0.5 from it we get negative value. Negative value means it will be swapped. We are randomly shuffling the answers array to the user because the array always has the first element as the correct answer and we dont want to show like that to the user.
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        let cssClass = "";
        const isSelected = selectedAnswer === answer;

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
            <button onClick={() => onSelectAnswer(answer)} className={cssClass}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
