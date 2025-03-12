import { QUESTION_TYPES } from "./test-types"
import SingleChoiceAnswer from "./answer-types/single-choice-answer"
import MultipleChoiceAnswer from "./answer-types/multiple-choice-answer"
import FillInBlankAnswer from "./answer-types/fill-in-blank-answer"

const AnswerSection = ({ question, answer, onAnswerChange }) => {
  const handleAnswerChange = (value) => {
    onAnswerChange(question.id, value)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 font-shopee">Your Answer</h2>

      {question.type === QUESTION_TYPES.SINGLE_CHOICE && (
        <SingleChoiceAnswer question={question} selectedAnswer={answer} onAnswerChange={handleAnswerChange} />
      )}

      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <MultipleChoiceAnswer question={question} selectedAnswers={answer} onAnswerChange={handleAnswerChange} />
      )}

      {question.type === QUESTION_TYPES.FILL_IN_BLANK && (
        <FillInBlankAnswer question={question} answer={answer} onAnswerChange={handleAnswerChange} />
      )}
    </div>
  )
}

export default AnswerSection

