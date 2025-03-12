"use client"

import { FaFlag } from "react-icons/fa"
import { TEST_TYPES, READING_PARTS } from "./test-types"
import AudioPlayer from "./audio-player"

const QuestionDisplay = ({ test, question, questionNumber, isFlagged, onToggleFlag, onAudioEnd }) => {
  // Find the part this question belongs to
  const part = test.parts.find((part) => part.questions.some((q) => q.id === question.id))

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 font-shopee">{part?.title}</h2>
          <p className="text-sm text-gray-600 font-shopee mt-1">{part?.instructions}</p>
        </div>
        <button
          onClick={onToggleFlag}
          className={`p-2 rounded-full ${isFlagged ? "bg-[#FCB80B] text-white" : "bg-gray-100 text-gray-500"}`}
          title={isFlagged ? "Unflag this question" : "Flag for review"}
        >
          <FaFlag />
        </button>
      </div>

      {/* Audio player for listening questions */}
      {test.type === TEST_TYPES.LISTENING && question.audioUrl && (
        <div className="mb-4">
          <AudioPlayer audioUrl={question.audioUrl} onAudioEnd={onAudioEnd} />
        </div>
      )}

      {/* Question text */}
      <p className="text-gray-700 mb-4 font-shopee font-medium">{question.text}</p>

      {/* Question image if available */}
      {question.imageUrl && (
        <div className="mb-4">
          <img
            src={question.imageUrl || "/placeholder.svg"}
            alt="Question visual"
            className="max-w-full rounded-lg border border-gray-200"
          />
        </div>
      )}

      {/* For Part 6 and 7, show the passage */}
      {test.type === TEST_TYPES.READING &&
        (part?.partNumber === READING_PARTS.TEXT_COMPLETION ||
          part?.partNumber === READING_PARTS.READING_COMPREHENSION) &&
        question.text.includes("\n") && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4 font-shopee">
            {question.text.split("\n").map((line, index) => (
              <p key={index} className="mb-2 last:mb-0 font-shopee">
                {line}
              </p>
            ))}
          </div>
        )}
    </div>
  )
}

export default QuestionDisplay

