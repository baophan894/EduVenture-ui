"use client";

import PropTypes from "prop-types";

const SingleChoiceAnswer = ({
  question,
  selectedAnswer,
  isReviewMode,
  isCorrect,
}) => {
  return (
    <div className="space-y-3 mt-2">
      {question.questionOptions.map((option) => {
        const isSelected = selectedAnswer === option.optionId;
        const isCorrectOption =
          isReviewMode && option.optionId === question.correctAnswer;

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
              className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
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
                <div className="w-2 h-2 rounded-full bg-white"></div>
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
    correctAnswer: PropTypes.string,
  }).isRequired,
  selectedAnswer: PropTypes.string,
  isReviewMode: PropTypes.bool,
  isCorrect: PropTypes.bool,
};

export default SingleChoiceAnswer;
