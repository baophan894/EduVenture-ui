"use client";

import PropTypes from "prop-types";

const MultipleChoiceAnswer = ({
  question,
  selectedAnswers,
  isReviewMode,
  isCorrect,
}) => {
  const correctAnswers = question.correctAnswer?.split(",") || [];

  return (
    <div className="space-y-3 mt-2">
      {question.questionOptions.map((option) => {
        const isSelected = selectedAnswers?.includes(option.optionId);
        const isCorrectOption =
          isReviewMode && correctAnswers.includes(option.optionId);

        let optionStyle = "border-gray-200";
        if (isReviewMode) {
          if (isCorrectOption) {
            optionStyle = "border-green-500 bg-green-50";
          } else if (isSelected && !isCorrect) {
            optionStyle = "border-red-500 bg-red-50";
          }
        } else if (isSelected) {
          optionStyle = "border-[#469B74] bg-[#469B74] bg-opacity-5";
        }

        return (
          <div
            key={option.id}
            className={`flex items-center p-3 border rounded-lg ${optionStyle}`}
          >
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
                isSelected
                  ? isReviewMode
                    ? isCorrect
                      ? "border-green-500 bg-green-500"
                      : "border-red-500 bg-red-500"
                    : "border-[#469B74] bg-[#469B74]"
                  : isReviewMode && isCorrectOption
                  ? "border-green-500 bg-green-500"
                  : "border-gray-400"
              }`}
            >
              {(isSelected || (isReviewMode && isCorrectOption)) && (
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
          </div>
        );
      })}
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
    correctAnswer: PropTypes.string,
  }).isRequired,
  selectedAnswers: PropTypes.arrayOf(PropTypes.string),
  isReviewMode: PropTypes.bool,
  isCorrect: PropTypes.bool,
};

export default MultipleChoiceAnswer;
