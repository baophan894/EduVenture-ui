"use client";

import PropTypes from "prop-types";

const AnswerSection = ({ question }) => {
  console.log("Question type:", question.typeName); // Debug log

  // If it's a Part Instruction, show a message
  if (question.typeName === "PART_INSTRUCTION") {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-gray-600 font-shopee">
          <p className="text-lg mb-2">Part Instructions</p>
          <p className="text-sm">
            Please read the instructions carefully before proceeding to the
            questions.
          </p>
        </div>
      </div>
    );
  }

  const renderSingleChoiceAnswer = () => {
    return (
      <div className="space-y-3 mt-2">
        {question.questionOptions.map((option) => {
          const isUserAnswer = question.selectedOptionIds?.includes(
            option.optionId
          );
          const isCorrectOption = question.correctAnswer === option.optionId;

          return (
            <div
              key={option.id}
              className={`flex items-center p-3 border-2 rounded-lg relative ${
                isUserAnswer && question.isCorrect
                  ? "border-green-500 bg-green-50"
                  : isUserAnswer && !question.isCorrect
                  ? "border-red-500 bg-red-50"
                  : isCorrectOption
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              {/* User's selection indicator */}
              {isUserAnswer && (
                <div className="absolute -left-2 -top-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  Your Choice
                </div>
              )}
              {/* Correct answer indicator */}
              {isCorrectOption && !isUserAnswer && (
                <div className="absolute -left-2 -top-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Correct Answer
                </div>
              )}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                  isUserAnswer || isCorrectOption
                    ? "border-green-500 bg-green-500"
                    : "border-gray-400"
                }`}
              >
                {(isUserAnswer || isCorrectOption) && (
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

  const renderMultipleChoiceAnswer = () => {
    return (
      <div className="space-y-3 mt-2">
        {question.questionOptions.map((option) => {
          const isUserAnswer = question.selectedOptionIds?.includes(
            option.optionId
          );
          const isCorrectOption = question.correctAnswer?.includes(
            option.optionId
          );

          return (
            <div
              key={option.id}
              className={`flex items-center p-3 border-2 rounded-lg relative ${
                isUserAnswer && isCorrectOption
                  ? "border-green-500 bg-green-50"
                  : isUserAnswer && !isCorrectOption
                  ? "border-red-500 bg-red-50"
                  : isCorrectOption
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              {/* User's selection indicator */}
              {isUserAnswer && (
                <div className="absolute -left-2 -top-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  Your Choice
                </div>
              )}
              {/* Correct answer indicator */}
              {isCorrectOption && !isUserAnswer && (
                <div className="absolute -left-2 -top-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Correct Answer
                </div>
              )}
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 ${
                  isUserAnswer || isCorrectOption
                    ? "border-green-500 bg-green-500"
                    : "border-gray-400"
                }`}
              >
                {(isUserAnswer || isCorrectOption) && (
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

  const renderFillInBlankAnswer = () => {
    return (
      <div className="space-y-4 mt-2">
        <div className="p-4 border-2 rounded-lg bg-gray-50 relative">
          <div className="absolute -left-2 -top-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            Your Answer
          </div>
          <div
            className={`p-2 rounded ${
              question.isCorrect
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            } font-shopee`}
          >
            {question.writtenAnswer || "Not answered"}
          </div>
        </div>
        <div className="p-4 border-2 rounded-lg bg-gray-50 relative">
          <div className="absolute -left-2 -top-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Correct Answer
          </div>
          <div className="p-2 rounded bg-green-50 text-green-700 font-shopee">
            {question.correctAnswer}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 font-shopee">Your Answer</h3>
      <p className="text-sm text-gray-600 mb-4 font-shopee">
        {question.answerInstruction}
      </p>
      {question.questionType === "Single Choice" && renderSingleChoiceAnswer()}
      {question.questionType === "Multiple Choice" &&
        renderMultipleChoiceAnswer()}
      {question.questionType === "Fill in Blank" && renderFillInBlankAnswer()}
    </div>
  );
};

AnswerSection.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number,
    questionId: PropTypes.number.isRequired,
    questionTitle: PropTypes.string.isRequired,
    questionInstruction: PropTypes.string.isRequired,
    answerInstruction: PropTypes.string.isRequired,
    questionType: PropTypes.string.isRequired,
    typeName: PropTypes.string.isRequired,
    writtenAnswer: PropTypes.string,
    isCorrect: PropTypes.bool.isRequired,
    selectedOptionIds: PropTypes.arrayOf(PropTypes.string),
    correctAnswer: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    questionOptions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        optionId: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default AnswerSection;
