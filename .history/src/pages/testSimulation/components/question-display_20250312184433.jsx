"use client"

import { FaFlag } from "react-icons/fa"

const QuestionDisplay = ({ question, questionNumber, isFlagged, onToggleFlag }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-gray-800 font-shopee">Question {questionNumber}</h2>
        <button
          onClick={onToggleFlag}
          className={`p-2 rounded-full ${isFlagged ? "bg-[#FCB80B] text-white" : "bg-gray-100 text-gray-500"}`}
          title={isFlagged ? "Unflag this question" : "Flag for review"}
        >
          <FaFlag />
        </button>
      </div>

      <p className="text-gray-700 mb-4 font-shopee">{question.text}</p>

      {question.imageUrl && (
        <div className="mb-4">
          <img
            src={question.imageUrl || "/placeholder.svg"}
            alt="Question visual"
            className="max-w-full rounded-lg border border-gray-200"
          />
        </div>
      )}
    </div>
  )
}

export default QuestionDisplay

