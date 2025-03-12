"use client";

import { useState } from "react";
import {
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaFlag,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { TEST_TYPES } from "./test-types";

const CollapsibleNavigation = ({
  test,
  questions,
  currentQuestionIndex,
  answers,
  flaggedQuestions,
  onQuestionSelect,
  onNext,
  onPrevious,
  onFinish,
  onSubmitEarly,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isListeningTest = test.type === TEST_TYPES.LISTENING;

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-30 flex items-stretch">
      {/* Toggle Button */}
      <button
        onClick={toggleNavigation}
        className="bg-[#469B74] text-white p-2 rounded-l-md shadow-md flex items-center justify-center"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
      >
        {isOpen ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      {/* Navigation Panel */}
      <div
        className={`bg-white shadow-lg rounded-l-lg transition-all duration-300 overflow-hidden ${
          isOpen ? "w-64 opacity-100" : "w-0 opacity-0"
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 font-shopee">
              Navigation
            </h2>
            <button
              onClick={onSubmitEarly}
              className="px-3 py-1 bg-[#FCB80B] text-white rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors font-shopee"
            >
              Submit Test
            </button>
          </div>

          {/* Question navigation grid */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {questions.map((question, index) => (
              <button
                key={question.id}
                onClick={() => !isListeningTest && onQuestionSelect(index)}
                disabled={isListeningTest && index !== currentQuestionIndex}
                className={`h-10 rounded-md flex items-center justify-center font-medium transition-colors ${
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
                {index + 1}
                {flaggedQuestions.includes(question.id) && (
                  <FaFlag className="ml-1 text-xs" />
                )}
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

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-auto">
            {!isListeningTest && currentQuestionIndex > 0 && (
              <button
                onClick={onPrevious}
                className="flex-1 py-2 px-4 bg-gray-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 font-shopee"
              >
                <FaArrowLeft size={14} />
                Previous
              </button>
            )}

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={onNext}
                className="flex-1 py-2 px-4 bg-[#469B74] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 font-shopee"
              >
                Next
                <FaArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={onFinish}
                className="flex-1 py-2 px-4 bg-[#FCB80B] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 font-shopee"
              >
                Finish Test
                <FaCheck size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleNavigation;
