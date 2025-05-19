"use client";

import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";

const SingleChoiceAnswer = ({ question, selectedAnswer, onAnswerChange }) => {
  // Function to clear the current answer
  const clearAnswer = () => {
    onAnswerChange(null);
  };

  return (
    <div className="space-y-3 mt-2">
      {/* Clear answer button - only shown when an answer exists */}
      {selectedAnswer && (
        <div className="flex justify-end mb-2">
          <button
            onClick={clearAnswer}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500 transition-colors font-shopee"
          >
            <FaTimes size={12} />
            Clear Answer
          </button>
        </div>
      )}

      {question.questionOptions.map((option) => (
        <label
          key={option.id}
          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
            selectedAnswer === option.optionId
              ? "border-[#469B74] bg-[#469B74] bg-opacity-5"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <input
            type="radio"
            name={`question-${question.id}`}
            value={option.optionId}
            checked={selectedAnswer === option.optionId}
            onChange={() => onAnswerChange(option.optionId)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
              selectedAnswer === option.optionId
                ? "border-[#469B74] bg-[#469B74]"
                : "border-gray-400"
            }`}
          >
            {selectedAnswer === option.optionId && (
              <div className="w-2 h-2 rounded-full bg-white"></div>
            )}
          </div>
          <div className="flex-1 font-shopee">
            <span className="font-medium">{option.optionId}.</span>{" "}
            {option.text}
          </div>
        </label>
      ))}
    </div>
  );
};

SingleChoiceAnswer.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    questionOptions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        optionId: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  selectedAnswer: PropTypes.string,
  onAnswerChange: PropTypes.func.isRequired,
};

export default SingleChoiceAnswer;
