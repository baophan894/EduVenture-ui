"use client";

import { FaTimes, FaInfoCircle } from "react-icons/fa";
import { QUESTION_TYPES, TEST_TYPES } from "./test-types";

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
}) => {
  const isListeningTest = test.type === TEST_TYPES.LISTENING;

  const flattenedQuestions = test.parts.flatMap((part) => part.questions);

  const filteredTestQuestions = flattenedQuestions.filter(
    (question) => question.type !== QUESTION_TYPES.PART_INSTRUCTION
  );

  const currentQuestion = flattenedQuestions[currentQuestionIndex];

  // Find the actual index of the current question among non-instruction questions
  const actualIndex = filteredTestQuestions.findIndex(
    (q) => q.id === currentQuestion.id
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => {
          console.log("Hello");
          onClose();
        }}
      ></div>

      {/* Modal Content */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-11/12 max-w-md p-6 transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className="rounded-lg overflow-hidden max-h-[90vh] w-[400px]">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 font-shopee">
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

              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span className="font-shopee">
                    {currentQuestion.type === QUESTION_TYPES.PART_INSTRUCTION
                      ? `Instruction`
                      : `Question ${actualIndex + 1} of ${
                          filteredTestQuestions.length
                        }`}
                  </span>
                  <span className="font-shopee">
                    {Object.keys(answers).length} of{" "}
                    {filteredTestQuestions.length} answered
                  </span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
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
              </div>

              {/* Question navigation grid */}
              <div className="grid grid-cols-5 gap-2 mb-6">
                {questions.map((question, index) => {
                  // For part instructions, render a special instruction button
                  if (question.type === QUESTION_TYPES.PART_INSTRUCTION) {
                    return (
                      <button
                        key={question.id}
                        onClick={() => {
                          onQuestionSelect(index);
                          onClose();
                        }}
                        className={`h-12 rounded-md flex flex-col items-center justify-center font-medium transition-colors ${
                          index === currentQuestionIndex
                            ? "bg-blue-500 text-white"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        } font-shopee ${
                          isListeningTest && index !== currentQuestionIndex
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={
                          isListeningTest && index !== currentQuestionIndex
                        }
                        title="Part Instruction"
                      >
                        <FaInfoCircle size={14} />
                        <span className="text-xs mt-1">Info</span>
                      </button>
                    );
                  }

                  // For regular questions, find their actual index among non-instruction questions
                  const actualIndex = filteredTestQuestions.findIndex(
                    (q) => q.id === question.id
                  );

                  return (
                    <button
                      key={question.id}
                      onClick={() => {
                        if (
                          !isListeningTest ||
                          index === currentQuestionIndex
                        ) {
                          onQuestionSelect(index);
                          onClose();
                        }
                      }}
                      disabled={
                        isListeningTest && index !== currentQuestionIndex
                      }
                      className={`h-12 rounded-md flex flex-col items-center justify-center font-medium transition-colors ${
                        index === currentQuestionIndex
                          ? "bg-[#469B74] text-white"
                          : flaggedQuestions.includes(question.id)
                          ? "bg-[#FCB80B] bg-opacity-20 text-[#FCB80B]"
                          : answers[question.id]
                          ? "bg-[#469B74] bg-opacity-20 text-[#469B74]"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } ${
                        isListeningTest && index !== currentQuestionIndex
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      } font-shopee`}
                    >
                      <span>{actualIndex + 1}</span>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 bg-[#469B74] bg-opacity-20 mr-2"></div>
                  <span className="font-shopee">Answered</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 bg-[#FCB80B] bg-opacity-20 mr-2"></div>
                  <span className="font-shopee">Flagged for review</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 bg-gray-100 mr-2"></div>
                  <span className="font-shopee">Not visited</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 bg-blue-100 mr-2"></div>
                  <span className="font-shopee">Part instruction</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    onFinish();
                    onClose();
                  }}
                  className="w-full py-3 px-4 bg-[#FCB80B] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 font-shopee"
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationModal;
