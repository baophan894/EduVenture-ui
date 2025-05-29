import PropTypes from "prop-types";

const FillInBlankAnswer = ({
  question,
  part,
  isEditing,
  handleFillInBlankChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Correct Answer
      </label>
      {isEditing && !question.isDeleted && !part.isDeleted ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={question.correctAnswer || ""}
            onChange={(e) =>
              handleFillInBlankChange(
                part.order - 1,
                question.order - 1,
                e.target.value
              )
            }
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            placeholder="Enter correct answer"
          />
        </div>
      ) : (
        <div className="p-2 bg-gray-50 rounded-md border font-medium text-emerald-600">
          {question.correctAnswer || "No answer provided"}
        </div>
      )}
    </div>
  );
};

FillInBlankAnswer.propTypes = {
  question: PropTypes.shape({
    correctAnswer: PropTypes.string,
    order: PropTypes.number.isRequired,
    isDeleted: PropTypes.bool,
  }).isRequired,
  part: PropTypes.shape({
    order: PropTypes.number.isRequired,
    isDeleted: PropTypes.bool,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleFillInBlankChange: PropTypes.func.isRequired,
};

export default FillInBlankAnswer;
