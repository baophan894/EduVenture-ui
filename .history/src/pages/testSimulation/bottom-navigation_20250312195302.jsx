"use client";

import { FaArrowLeft, FaArrowRight, FaCheck, FaList } from "react-icons/fa";

const BottomNavigation = ({
  currentQuestionIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onFinish,
  onOpenNavigation,
  disablePrevious = false,
}) => {
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenNavigation}
            className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-300 font-shopee"
          >
            <FaList size={14} />
            Questions
          </button>

          <div className="text-sm text-gray-600 font-shopee">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
        </div>

        <div className="flex gap-3">
          {!disablePrevious && (
            <button
              onClick={onPrevious}
              disabled={currentQuestionIndex === 0}
              className={`py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                currentQuestionIndex === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } font-shopee`}
            >
              <FaArrowLeft size={14} />
              Previous
            </button>
          )}

          {isLastQuestion ? (
            <button
              onClick={onFinish}
              className="py-2 px-4 bg-[#FCB80B] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 font-shopee"
            >
              Finish Test
              <FaCheck size={14} />
            </button>
          ) : (
            <button
              onClick={onNext}
              className="py-2 px-4 bg-[#469B74] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 font-shopee"
            >
              Next
              <FaArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
