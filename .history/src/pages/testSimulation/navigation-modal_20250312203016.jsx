"use client";

import { FaTimes } from "react-icons/fa";
import { TEST_TYPES } from "./test-types";

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

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      ></div>

      {/* Modal Content */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 rounded-lg ${
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
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="font-shopee">
                    {Object.keys(answers).length} of {questions.length} answered
                  </span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-[#469B74]"
                    style={{
                      width: `${
                        (Object.keys(answers).length / questions.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Question navigation grid */}
              <div className="grid grid-cols-5 gap-2 mb-6">
                {questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => {
                      if (!isListeningTest || index === currentQuestionIndex) {
                        onQuestionSelect(index);
                        onClose();
                      }
                    }}
                    disabled={isListeningTest && index !== currentQuestionIndex}
                    className={`h-12 rounded-md flex flex-col items-center justify-center font-medium transition-colors ${
                      index === currentQuestionIndex
                        ? "bg-[#469B74] text-white"
                        : answers[question.id]
                        ? "bg-[#469B74] bg-opacity-20 text-[#469B74]"
                        : flaggedQuestions.includes(question.id)
                        ? "bg-[#FCB80B] bg-opacity-20 text-[#FCB80B]"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } ${
                      isListeningTest && index !== currentQuestionIndex
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    } font-shopee`}
                  >
                    <span>{index + 1}</span>
                  </button>
                ))}
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
