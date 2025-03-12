"use client"

const MultipleChoiceAnswer = ({ question, selectedAnswers, onAnswerChange }) => {
  const toggleAnswer = (optionId) => {
    const newAnswers = selectedAnswers?.includes(optionId)
      ? selectedAnswers.filter((id) => id !== optionId)
      : [...(selectedAnswers || []), optionId]

    onAnswerChange(newAnswers)
  }

  return (
    <div className="space-y-3 mt-2">
      {question.options.map((option) => (
        <label
          key={option.id}
          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
            selectedAnswers?.includes(option.id)
              ? "border-[#469B74] bg-[#469B74] bg-opacity-5"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <input
            type="checkbox"
            name={`question-${question.id}-option-${option.id}`}
            checked={selectedAnswers?.includes(option.id) || false}
            onChange={() => toggleAnswer(option.id)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-sm border flex items-center justify-center mr-3 ${
              selectedAnswers?.includes(option.id) ? "border-[#469B74] bg-[#469B74]" : "border-gray-400"
            }`}
          >
            {selectedAnswers?.includes(option.id) && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="flex-1 font-shopee">
            <span className="font-medium">{option.id}.</span> {option.text}
          </div>
        </label>
      ))}
    </div>
  )
}

export default MultipleChoiceAnswer

