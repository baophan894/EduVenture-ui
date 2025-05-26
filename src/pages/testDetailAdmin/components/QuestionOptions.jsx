import PropTypes from "prop-types";
import {
  FaCheck,
  FaUndo,
  FaTrash,
  FaRegCheckSquare,
  FaRegSquare,
} from "react-icons/fa";

const QuestionOptions = ({
  question,
  part,
  isEditing,
  isMultipleChoice,
  isOptionSelected,
  handleOptionChange,
  handleSingleChoiceSelection,
  handleMultipleChoiceSelection,
  handleQuestionChange,
}) => {
  if (
    question.typeName === "Part Instruction" ||
    question.typeName === "Fill in Blank" ||
    question.questionOptions.length === 0
  ) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Options{" "}
          {isMultipleChoice(question) ? "(Multiple Choice)" : "(Single Choice)"}
        </label>
        {isEditing && !question.isDeleted && !part.isDeleted && (
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">
              {isMultipleChoice(question)
                ? "Click options to select/deselect correct answers"
                : "Click an option to set as correct answer"}
            </div>
          </div>
        )}
      </div>
      <div className="rounded-md border overflow-hidden">
        {question.questionOptions.map((option, optionIndex) => (
          <div
            key={option.id}
            className={`flex items-center gap-4 p-3 ${
              optionIndex !== question.questionOptions.length - 1
                ? "border-b"
                : ""
            } ${
              option.isDeleted
                ? "bg-red-50 opacity-50"
                : isOptionSelected(part.order, question.order, option.optionId)
                ? "bg-emerald-50"
                : isEditing && !question.isDeleted && !part.isDeleted
                ? "hover:bg-gray-50 cursor-pointer"
                : ""
            }`}
            onClick={() => {
              if (
                isEditing &&
                !question.isDeleted &&
                !part.isDeleted &&
                !option.isDeleted
              ) {
                if (isMultipleChoice(question)) {
                  handleMultipleChoiceSelection(
                    part.order,
                    question.order,
                    option.optionId
                  );
                } else {
                  handleSingleChoiceSelection(
                    part.order,
                    question.order,
                    option.optionId
                  );
                }
              }
            }}
          >
            {!option.isDeleted && (
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  isOptionSelected(part.order, question.order, option.optionId)
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-700"
                } font-medium`}
              >
                {String.fromCharCode(
                  65 +
                    question.questionOptions.filter(
                      (opt, idx) => !opt.isDeleted && idx <= optionIndex
                    ).length -
                    1
                )}
              </div>
            )}

            <div className="flex-1">
              {isEditing && !question.isDeleted && !part.isDeleted ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) =>
                      handleOptionChange(
                        part.order - 1,
                        question.order - 1,
                        optionIndex,
                        "text",
                        e.target.value
                      )
                    }
                    className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${
                      option.isDeleted ? "bg-red-50" : ""
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  />
                  {option.isDeleted ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const updatedOptions = question.questionOptions.map(
                          (opt, idx) =>
                            idx === optionIndex
                              ? { ...opt, isDeleted: false }
                              : opt
                        );
                        handleQuestionChange(
                          part.order - 1,
                          question.order - 1,
                          "questionOptions",
                          updatedOptions
                        );
                      }}
                      className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="Undo delete"
                    >
                      <FaUndo />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const updatedOptions = question.questionOptions.map(
                          (opt, idx) =>
                            idx === optionIndex
                              ? { ...opt, isDeleted: true }
                              : opt
                        );
                        handleQuestionChange(
                          part.order - 1,
                          question.order - 1,
                          "questionOptions",
                          updatedOptions
                        );
                      }}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete option"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ) : (
                <div
                  className={
                    option.isDeleted
                      ? "line-through text-red-500 bg-red-50 px-2 py-1 rounded"
                      : ""
                  }
                >
                  {option.text}
                </div>
              )}
            </div>

            {isEditing && !question.isDeleted && !part.isDeleted ? (
              isMultipleChoice(question) ? (
                isOptionSelected(
                  part.order,
                  question.order,
                  option.optionId
                ) ? (
                  <FaRegCheckSquare className="text-emerald-600 text-lg" />
                ) : (
                  <FaRegSquare className="text-gray-400 text-lg" />
                )
              ) : (
                <div
                  className={`w-5 h-5 rounded-full border ${
                    isOptionSelected(
                      part.order,
                      question.order,
                      option.optionId
                    )
                      ? "border-emerald-600 bg-emerald-600"
                      : "border-gray-300"
                  } flex items-center justify-center`}
                >
                  {isOptionSelected(
                    part.order,
                    question.order,
                    option.optionId
                  ) && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              )
            ) : (
              isOptionSelected(part.order, question.order, option.optionId) && (
                <FaCheck className="text-emerald-600" />
              )
            )}
          </div>
        ))}
      </div>

      {/* Display selected answers for multiple choice */}
      {isMultipleChoice(question) &&
        question.correctAnswer &&
        question.correctAnswer
          .split(",")
          .every((answer) =>
            question.questionOptions.some(
              (option) => option.optionId === answer
            )
          ) && (
          <div className="mt-2 text-sm">
            <span className="font-medium">Correct answers:</span>{" "}
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
              {question.correctAnswer}
            </span>
          </div>
        )}
    </div>
  );
};

QuestionOptions.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    typeName: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    questionOptions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        optionId: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        isDeleted: PropTypes.bool,
      })
    ).isRequired,
    correctAnswer: PropTypes.string,
    isDeleted: PropTypes.bool,
  }).isRequired,
  part: PropTypes.shape({
    order: PropTypes.number.isRequired,
    isDeleted: PropTypes.bool,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  isMultipleChoice: PropTypes.func.isRequired,
  isOptionSelected: PropTypes.func.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
  handleSingleChoiceSelection: PropTypes.func.isRequired,
  handleMultipleChoiceSelection: PropTypes.func.isRequired,
  handleQuestionChange: PropTypes.func.isRequired,
};

export default QuestionOptions;
