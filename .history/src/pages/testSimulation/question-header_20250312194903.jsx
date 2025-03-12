"use client";

import { FaFlag, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const QuestionHeader = ({
  questionNumber,
  totalQuestions,
  isFlagged,
  onToggleFlag,
  onPrevious,
  onNext,
  disablePrevious = false,
}) => {
  return (
    <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold font-shopee">
          Question {questionNumber} of {totalQuestions}
        </h2>
        <button
          onClick={onToggleFlag}
          className={`p-2 rounded-full ${
            isFlagged
              ? "bg-[#FCB80B] text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
          title={isFlagged ? "Unflag this question" : "Flag for review"}
        >
          <FaFlag />
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onPrevious}
          disabled={disablePrevious}
          className={`p-2 rounded-lg ${
            disablePrevious
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={onNext}
          className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default QuestionHeader;
