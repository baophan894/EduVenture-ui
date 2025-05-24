"use client";

import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";

const FillInBlankAnswer = ({ question, answer, onAnswerChange }) => {
  // Function to clear the current answer
  const clearAnswer = () => {
    onAnswerChange("");
  };

  return (
    <div className="mt-2">
      <div className="relative">
        <input
          type="text"
          value={answer || ""}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#469B74] focus:border-transparent font-shopee"
        />

        {/* Clear button - only shown when there's text */}
        {answer && (
          <button
            onClick={clearAnswer}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
            title="Clear answer"
          >
            <FaTimes size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

FillInBlankAnswer.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  answer: PropTypes.string,
  onAnswerChange: PropTypes.func.isRequired,
};

export default FillInBlankAnswer;
