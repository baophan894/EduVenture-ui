"use client";

import { FaFlag, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PropTypes from "prop-types";

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
  isReviewMode = false,
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
          {question.typeName === "Part Instruction"
            ? `Instruction`
            : `Question ${questionNumber} of ${filteredTotalQuestions}`}
        </h2>
        {!isReviewMode && question.typeName !== "Part Instruction" && (
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
        {/* Navigation buttons */}
        {!disableNavigation && (
          <>
            <button
              onClick={onPrevious}
              className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
              title="Previous question"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={onNext}
              className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
              title="Next question"
            >
              <FaArrowRight />
            </button>
          </>
        )}

        {/* Layout options */}
        <div className="flex items-center gap-1 ml-4">
          <button
            onClick={() => setLayout(LAYOUTS.VERTICAL)}
            className={`p-2 rounded ${
              layout === LAYOUTS.VERTICAL
                ? "bg-[#469B74] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
            title="Vertical layout"
          >
            <VerticalLayoutIcon />
          </button>
          <button
            onClick={() => setLayout(LAYOUTS.HORIZONTAL)}
            className={`p-2 rounded ${
              layout === LAYOUTS.HORIZONTAL
                ? "bg-[#469B74] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
            title="Horizontal layout"
          >
            <HorizontalLayoutIcon />
          </button>
          <button
            onClick={() => setLayout(LAYOUTS.REVERSE_VERTICAL)}
            className={`p-2 rounded ${
              layout === LAYOUTS.REVERSE_VERTICAL
                ? "bg-[#469B74] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
            title="Reverse vertical layout"
          >
            <ReverseVerticalLayoutIcon />
          </button>
          <button
            onClick={() => setLayout(LAYOUTS.REVERSE_HORIZONTAL)}
            className={`p-2 rounded ${
              layout === LAYOUTS.REVERSE_HORIZONTAL
                ? "bg-[#469B74] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
            title="Reverse horizontal layout"
          >
            <ReverseHorizontalLayoutIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

QuestionHeader.propTypes = {
  question: PropTypes.shape({
    typeName: PropTypes.string.isRequired,
  }).isRequired,
  questionNumber: PropTypes.number.isRequired,
  filteredTotalQuestions: PropTypes.number.isRequired,
  isFlagged: PropTypes.bool.isRequired,
  onToggleFlag: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  disableNavigation: PropTypes.bool,
  layout: PropTypes.string.isRequired,
  setLayout: PropTypes.func.isRequired,
  isReviewMode: PropTypes.bool,
};

export default QuestionHeader;
