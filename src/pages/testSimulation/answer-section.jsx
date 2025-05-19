import SingleChoiceAnswer from "./answer-types/single-choice-answer";
import MultipleChoiceAnswer from "./answer-types/multiple-choice-answer";
import FillInBlankAnswer from "./answer-types/fill-in-blank-answer";
import PropTypes from "prop-types";

const AnswerSection = ({ question, answer, onAnswerChange }) => {
  const handleAnswerChange = (value) => {
    onAnswerChange(question.id, value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 font-shopee">Your Answer</h3>
      <p className="text-sm text-gray-600 font-shopee">
        {question?.answerInstruction}
      </p>
      {question.typeName === "Single Choice" && (
        <SingleChoiceAnswer
          question={question}
          selectedAnswer={answer}
          onAnswerChange={handleAnswerChange}
        />
      )}
      {question.typeName === "Multiple Choice" && (
        <MultipleChoiceAnswer
          question={question}
          selectedAnswers={answer}
          onAnswerChange={handleAnswerChange}
        />
      )}
      {question.typeName === "Fill in Blank" && (
        <FillInBlankAnswer
          question={question}
          answer={answer}
          onAnswerChange={handleAnswerChange}
        />
      )}
    </div>
  );
};

AnswerSection.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    typeName: PropTypes.string.isRequired,
    answerInstruction: PropTypes.string,
    questionOptions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        optionId: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  answer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onAnswerChange: PropTypes.func.isRequired,
};

export default AnswerSection;
