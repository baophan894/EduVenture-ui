"use client"

import { FaArrowRight, FaCheck } from "react-icons/fa"
import { TEST_TYPES } from "./test-types"

const NavigationPanel = ({
  test,
  questions,
  currentQuestionIndex,
  answers,
  flaggedQuestions,
  onQuestionSelect,
  onNext,
  onFinish,
}) => {
  const isListeningTest = test.type === TEST_TYPES.LISTENING

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 font-shopee">Navigation</h2>

      {/* Question navigation grid - only clickable for reading test */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {questions.map((question, index) => (
          <button
            key={question.id}
            onClick={() => !isListeningTest && onQuestionSelect(index)}
            disabled={isListeningTest}
            className={`h-10 rounded-md flex items-center justify-center font-medium transition-colors ${
              index === currentQuestionIndex
                ? "bg-[#469B74] text-white"
                : answers[question.id]
                  ? "bg-[#469B74] bg-opacity-20 text-[#469B74]"
                  : flaggedQuestions.includes(question.id)
                    ? "bg-[#FCB80B] bg-opacity-20 text-[#FCB80B]"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } ${isListeningTest && index !== currentQuestionIndex ? "opacity-50 cursor-not-allowed" : ""} font-shopee`}
          >
            {index + 1}
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

      {/* Navigation buttons - only Next for listening, Next/Previous for reading */}
      <div className="flex gap-3 mt-auto">
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            onClick={onNext}
            className="w-full py-2 px-4 bg-[#469B74] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 font-shopee"
          >
            Next
            <FaArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={onFinish}
            className="w-full py-2 px-4 bg-[#FCB80B] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 font-shopee"
          >
            Finish Test
            <FaCheck size={14} />
          </button>
        )}
      </div>

      {/* Test instructions */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-medium mb-2 font-shopee">Test Instructions:</h3>
        <p className="text-sm text-gray-600 font-shopee">
          {isListeningTest
            ? "You can only move forward in this listening test. Listen carefully as each audio will play only once."
            : "You can navigate between questions using the number buttons above."}
        </p>
      </div>
    </div>
  )
}

export default NavigationPanel

