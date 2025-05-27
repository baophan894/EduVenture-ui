"use client";

import { FaTimes, FaInfoCircle } from "react-icons/fa";
import PropTypes from "prop-types";

const NavigationModal = ({
  isOpen,
  onClose,
  test,
  questions,
  currentQuestionIndex,
  answers,
  flaggedQuestions,
  onQuestionSelect,
  onFinish,
  isReviewMode = false,
}) => {
  const filteredTestQuestions = questions.filter(
    (question) => question.typeName !== "Part Instruction"
  );

  const currentQuestion = questions[currentQuestionIndex];

  // Find the actual index of the current question among non-instruction questions
  const actualIndex = filteredTestQuestions.findIndex(
    (q) => q.id === currentQuestion.id
  );

  // Get the display number for each question
  const getQuestionNumber = (index) => {
    let questionCount = 0;
    for (let i = 0; i <= index; i++) {
      if (questions[i].typeName !== "Part Instruction") {
        questionCount++;
      }
    }
    return questionCount;
  };

  // Get button color based on answer status
  const getButtonColor = (question, index) => {
    if (question.typeName === "Part Instruction") {
      return index === currentQuestionIndex
        ? "bg-blue-500 text-white"
        : "bg-blue-100 text-blue-600";
    }

    const isCurrent = index === currentQuestionIndex;
    if (isCurrent) {
      return "bg-[#469B74] text-white";
    }

    if (isReviewMode) {
      const answer = answers[question.id];
      if (answer?.isCorrect) {
        return "bg-green-100 text-green-700";
      } else if (answer?.isCorrect === false) {
        return "bg-red-100 text-red-700";
      }
      return "bg-gray-100 text-gray-600";
    }

    const isAnswered = answers[question.id];
    const isFlagged = flaggedQuestions.includes(question.id);
    if (isFlagged) {
      return "bg-yellow-100 text-yellow-700";
    }
    if (isAnswered) {
      return "bg-green-100 text-green-700";
    }
    return "bg-gray-100 text-gray-600";
  };

  // Render color legend based on mode
  const renderColorLegend = () => {
    if (isReviewMode) {
      return (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2 font-shopee">
            Color Guide:
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 border border-green-700"></div>
              <span className="text-gray-600">Correct Answer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-100 border border-red-700"></div>
              <span className="text-gray-600">Incorrect Answer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-100 border border-gray-600"></div>
              <span className="text-gray-600">Not Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#469B74]"></div>
              <span className="text-gray-600">Current Question</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2 font-shopee">
          Color Guide:
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-100 border border-green-700"></div>
            <span className="text-gray-600">Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-700"></div>
            <span className="text-gray-600">Flagged</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-100 border border-gray-600"></div>
            <span className="text-gray-600">Not Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#469B74]"></div>
            <span className="text-gray-600">Current Question</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-[550px] max-h-[90vh] overflow-auto transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 font-shopee">
              Navigation
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close navigation"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-3">
              <span className="font-shopee">
                {currentQuestion.typeName === "Part Instruction"
                  ? `Instruction`
                  : `Question ${actualIndex + 1} of ${
                      filteredTestQuestions.length
                    }`}
              </span>
              {!isReviewMode && (
                <span className="font-shopee">
                  {Object.keys(answers).length} of{" "}
                  {filteredTestQuestions.length} answered
                </span>
              )}
            </div>

            {!isReviewMode && (
              <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-[#469B74]"
                  style={{
                    width: `${
                      (Object.keys(answers).length /
                        filteredTestQuestions.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          {/* Color Legend */}
          {renderColorLegend()}

          {/* Question navigation grid */}
          <div className="grid grid-cols-5 gap-3 mb-8 max-w-[350px] mx-auto">
            {questions.map((question, index) => {
              if (question.typeName === "Part Instruction") {
                return (
                  <button
                    key={question.id}
                    className={`aspect-square w-full p-1 rounded-lg text-xs font-medium flex flex-col items-center justify-center ${getButtonColor(
                      question,
                      index
                    )}`}
                    onClick={() => onQuestionSelect(index)}
                  >
                    <FaInfoCircle className="mb-0.5 text-[10px]" />
                    <span className="text-[8px]">Instruction</span>
                  </button>
                );
              }

              const questionNumber = getQuestionNumber(index);

              return (
                <button
                  key={question.id}
                  className={`aspect-square w-full p-1 rounded-lg text-xs font-medium flex items-center justify-center ${getButtonColor(
                    question,
                    index
                  )}`}
                  onClick={() => onQuestionSelect(index)}
                >
                  {questionNumber}
                </button>
              );
            })}
          </div>

          {/* Finish button - only show in test mode */}
          {!isReviewMode && (
            <button
              onClick={onFinish}
              className="w-full bg-[#469B74] text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Finish Test
            </button>
          )}
        </div>
      </div>
    </>
  );
};

NavigationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  test: PropTypes.shape({
    typeName: PropTypes.string.isRequired,
  }).isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      typeName: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  answers: PropTypes.object.isRequired,
  flaggedQuestions: PropTypes.arrayOf(PropTypes.number).isRequired,
  onQuestionSelect: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  isReviewMode: PropTypes.bool,
};

export default NavigationModal;
