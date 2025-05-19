"use client";

import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";

const MultipleChoiceAnswer = ({
  question,
  selectedAnswers,
  onAnswerChange,
}) => {
  const toggleAnswer = (optionId) => {
    const newAnswers = selectedAnswers?.includes(optionId)
      ? selectedAnswers.filter((id) => id !== optionId)
      : [...(selectedAnswers || []), optionId];

    onAnswerChange(newAnswers);
  };

  // Function to clear all selected answers
  const clearAllAnswers = () => {
    onAnswerChange([]);
  };

  return (
    <div className="space-y-3 mt-2">
      {/* Clear all answers button - only shown when at least one answer is selected */}
      {selectedAnswers?.length > 0 && (
        <div className="flex justify-end mb-2">
          <button
            onClick={clearAllAnswers}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500 transition-colors font-shopee"
          >
            <FaTimes size={12} />
            Clear All Selections
          </button>
        </div>
      )}

      {question.questionOptions.map((option) => (
        <label
          key={option.id}
          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
            selectedAnswers?.includes(option.optionId)
              ? "border-[#469B74] bg-[#469B74] bg-opacity-5"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <input
            type="checkbox"
            name={`question-${question.id}`}
            value={option.optionId}
            checked={selectedAnswers?.includes(option.optionId)}
            onChange={() => toggleAnswer(option.optionId)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
              selectedAnswers?.includes(option.optionId)
                ? "border-[#469B74] bg-[#469B74]"
                : "border-gray-400"
            }`}
          >
            {selectedAnswers?.includes(option.optionId) && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
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

MultipleChoiceAnswer.propTypes = {
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
  selectedAnswers: PropTypes.arrayOf(PropTypes.string),
  onAnswerChange: PropTypes.func.isRequired,
};

export default MultipleChoiceAnswer;
