"use client"

const FillInBlankAnswer = ({ question, answer, onAnswerChange }) => {
  return (
    <div className="mt-2">
      <input
        type="text"
        value={answer || ""}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder="Type your answer here..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#469B74] focus:border-transparent font-shopee"
      />
    </div>
  )
}

export default FillInBlankAnswer

