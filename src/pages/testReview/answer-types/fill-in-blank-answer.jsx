"use client";

import PropTypes from "prop-types";

const FillInBlankAnswer = ({ answer, isReviewMode, isCorrect }) => {
  const getInputStyle = () => {
    if (!isReviewMode) return "border-gray-300 focus:ring-[#469B74]";
    return isCorrect
      ? "border-green-500 bg-green-50 focus:ring-green-500"
      : "border-red-500 bg-red-50 focus:ring-red-500";
  };

  return (
    <div className="mt-2">
      <div className="relative">
        <input
          type="text"
          value={answer || ""}
          readOnly
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent font-shopee ${getInputStyle()}`}
        />
      </div>
    </div>
  );
};

FillInBlankAnswer.propTypes = {
  answer: PropTypes.string,
  isReviewMode: PropTypes.bool,
  isCorrect: PropTypes.bool,
};

export default FillInBlankAnswer;
