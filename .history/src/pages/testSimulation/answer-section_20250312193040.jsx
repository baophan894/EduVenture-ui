"use client";

const AnswerSection = ({
  question,
  answer,
  onAnswerChange,
  showQuestionText = false,
}) => {
  return (
    <div className="space-y-4">
      {/* Show question text if configured */}
      {showQuestionText && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 font-shopee">
            {question.text}
          </h3>
          {question.imageUrl && (
            <img
              src={question.imageUrl || "/placeholder.svg"}
              alt="Question visual"
              className="max-w-full rounded-lg border border-gray-200 mb-4"
            />
          )}
        </div>
      )}

      {/* Answer options */}
      <div className="space-y-3">
        {question.options?.map((option) => (
          <label
            key={option.id}
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
              answer === option.id
                ? "border-[#469B74] bg-[#469B74] bg-opacity-5"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option.id}
              checked={answer === option.id}
              onChange={() => onAnswerChange(option.id)}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                answer === option.id
                  ? "border-[#469B74] bg-[#469B74]"
                  : "border-gray-400"
              }`}
            >
              {answer === option.id && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <div className="flex-1 font-shopee">
              <span className="font-medium">{option.id}.</span> {option.text}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AnswerSection;
