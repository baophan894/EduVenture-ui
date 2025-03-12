import { QUESTION_TYPES } from "./test-types"
import SingleChoiceAnswer from "./answer-types/single-choice-answer"
import MultipleChoiceAnswer from "./answer-types/multiple-choice-answer"
import FillInBlankAnswer from "./answer-types/fill-in-blank-answer"

const AnswerSection = ({ questions, answers, onAnswerChange }) => {
  // Group questions by type
  const fillInBlankQuestions = questions.filter((q) => q.type === QUESTION_TYPES.FILL_IN_BLANK)

  const choiceQuestions = questions.filter(
    (q) => q.type === QUESTION_TYPES.SINGLE_CHOICE || q.type === QUESTION_TYPES.MULTIPLE_CHOICE,
  )

  const handleAnswerChange = (questionId, value) => {
    onAnswerChange(questionId, value)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 font-shopee">Your Answers</h2>

      {/* Fill in the blank questions - one per section */}
      {fillInBlankQuestions.map((question) => (
        <div key={question.id} className="mb-6 pb-6 border-b border-gray-200 last:border-0 last:pb-0 last:mb-0">
          <h3 className="text-md font-medium mb-2 font-shopee">
            Question {questions.findIndex((q) => q.id === question.id) + 1}: {question.text}
          </h3>
          <FillInBlankAnswer
            question={question}
            answer={answers[question.id]}
            onAnswerChange={(value) => handleAnswerChange(question.id, value)}
          />
        </div>
      ))}

      {/* Choice questions - can have multiple in one section */}
      {choiceQuestions.length > 0 && (
        <div className="space-y-6">
          {choiceQuestions.map((question) => (
            <div key={question.id} className="mb-6 pb-6 border-b border-gray-200 last:border-0 last:pb-0 last:mb-0">
              <h3 className="text-md font-medium mb-2 font-shopee">
                Question {questions.findIndex((q) => q.id === question.id) + 1}: {question.text}
              </h3>

              {question.type === QUESTION_TYPES.SINGLE_CHOICE ? (
                <SingleChoiceAnswer
                  question={question}
                  selectedAnswer={answers[question.id]}
                  onAnswerChange={(value) => handleAnswerChange(question.id, value)}
                />
              ) : (
                <MultipleChoiceAnswer
                  question={question}
                  selectedAnswers={answers[question.id]}
                  onAnswerChange={(value) => handleAnswerChange(question.id, value)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AnswerSection

