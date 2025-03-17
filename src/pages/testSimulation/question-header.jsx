"use client";

import { FaFlag, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { QUESTION_TYPES } from "./test-types";

const QuestionHeader = ({
  question,
  questionNumber,
  filteredTotalQuestions,
  isFlagged,
  onToggleFlag,
  onPrevious,
  onNext,
  disableNavigation = false,
  layout,
  setLayout,
}) => {
  // Layout options
  const LAYOUTS = {
    VERTICAL: "vertical",
    HORIZONTAL: "horizontal",
    REVERSE_VERTICAL: "reverse-vertical",
    REVERSE_HORIZONTAL: "reverse-horizontal",
  };

  // Custom layout icons as SVG
  const VerticalLayoutIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="2" y="2" width="20" height="8" fill="currentColor" />
    </svg>
  );

  const HorizontalLayoutIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="2" y="2" width="8" height="20" fill="currentColor" />
    </svg>
  );

  const ReverseVerticalLayoutIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="2" y="14" width="20" height="8" fill="currentColor" />
    </svg>
  );

  const ReverseHorizontalLayoutIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="14" y="2" width="8" height="20" fill="currentColor" />
    </svg>
  );

  return (
    <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold font-shopee">
          {question.type === QUESTION_TYPES.PART_INSTRUCTION
            ? `Instruction`
            : `Question ${questionNumber} of ${filteredTotalQuestions}`}
        </h2>
        {question.type != QUESTION_TYPES.PART_INSTRUCTION && (
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
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Layout Switcher */}
        <div className="flex items-center gap-1 mr-4 border-r pr-4">
          <button
            onClick={() => setLayout(LAYOUTS.VERTICAL)}
            className={`p-2 rounded-md ${
              layout === LAYOUTS.VERTICAL
                ? "bg-[#469B74] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title="Question above, answer below"
          >
            <VerticalLayoutIcon />
          </button>
          <button
            onClick={() => setLayout(LAYOUTS.HORIZONTAL)}
            className={`p-2 rounded-md ${
              layout === LAYOUTS.HORIZONTAL
                ? "bg-[#469B74] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title="Question left, answer right"
          >
            <HorizontalLayoutIcon />
          </button>
          <button
            onClick={() => setLayout(LAYOUTS.REVERSE_VERTICAL)}
            className={`p-2 rounded-md ${
              layout === LAYOUTS.REVERSE_VERTICAL
                ? "bg-[#469B74] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title="Answer above, question below"
          >
            <ReverseVerticalLayoutIcon />
          </button>
          <button
            onClick={() => setLayout(LAYOUTS.REVERSE_HORIZONTAL)}
            className={`p-2 rounded-md ${
              layout === LAYOUTS.REVERSE_HORIZONTAL
                ? "bg-[#469B74] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title="Answer left, question right"
          >
            <ReverseHorizontalLayoutIcon />
          </button>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={onPrevious}
          disabled={disableNavigation}
          className={`p-2 rounded-lg ${
            disableNavigation
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={onNext}
          disabled={disableNavigation}
          className={`p-2 rounded-lg ${
            disableNavigation
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default QuestionHeader;
