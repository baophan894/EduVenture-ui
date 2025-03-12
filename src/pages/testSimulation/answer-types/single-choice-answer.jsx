"use client"

const SingleChoiceAnswer = ({ question, selectedAnswer, onAnswerChange }) => {
  return (
    <div className="space-y-3 mt-2">
      {question.options.map((option) => (
        <label
          key={option.id}
          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
            selectedAnswer === option.id
              ? "border-[#469B74] bg-[#469B74] bg-opacity-5"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <input
            type="radio"
            name={`question-${question.id}`}
            value={option.id}
            checked={selectedAnswer === option.id}
            onChange={() => onAnswerChange(option.id)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
              selectedAnswer === option.id ? "border-[#469B74] bg-[#469B74]" : "border-gray-400"
            }`}
          >
            {selectedAnswer === option.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
          </div>
          <div className="flex-1 font-shopee">
            <span className="font-medium">{option.id}.</span> {option.text}
          </div>
        </label>
      ))}
    </div>
  )
}

export default SingleChoiceAnswer

