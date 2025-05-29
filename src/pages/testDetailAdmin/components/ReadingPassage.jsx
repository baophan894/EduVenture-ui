import PropTypes from "prop-types";

const ReadingPassage = ({
  question,
  part,
  isEditing,
  handleQuestionChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Reading Passage
      </label>
      {isEditing && !question.isDeleted && !part.isDeleted ? (
        <div className="flex gap-2">
          <textarea
            value={question.readingPassage || ""}
            onChange={(e) =>
              handleQuestionChange(
                part.order - 1,
                question.order - 1,
                "readingPassage",
                e.target.value
              )
            }
            rows="6"
            className="flex-1 min-w-[300px] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
          />
        </div>
      ) : (
        <div className="p-3 bg-gray-50 rounded-md border whitespace-pre-wrap text-sm">
          {question.readingPassage || (
            <span className="text-gray-500 italic text-sm">
              No reading passage provided
            </span>
          )}
        </div>
      )}
    </div>
  );
};

ReadingPassage.propTypes = {
  question: PropTypes.shape({
    readingPassage: PropTypes.string,
    order: PropTypes.number.isRequired,
    isDeleted: PropTypes.bool,
  }).isRequired,
  part: PropTypes.shape({
    order: PropTypes.number.isRequired,
    isDeleted: PropTypes.bool,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleQuestionChange: PropTypes.func.isRequired,
};

export default ReadingPassage;
