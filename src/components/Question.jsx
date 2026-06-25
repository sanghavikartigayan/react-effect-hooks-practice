import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

const Question = ({
  questionText,
  answers,
  onSelectAnswer,
  selectedAnswer,
  onSkipAnswer,
  answerState,
}) => {
  return (
    <div id="question">
      <QuestionTimer onTimeout={onSkipAnswer} timeout={10000} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelectAnswer={onSelectAnswer}
      />
    </div>
  );
};

export default Question;
