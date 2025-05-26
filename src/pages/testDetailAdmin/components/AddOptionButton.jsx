import PropTypes from "prop-types";

const AddOptionButton = ({
  question,
  part,
  isEditing,
  handleQuestionChange,
}) => {
  if (
    !isEditing ||
    question.isDeleted ||
    part.isDeleted ||
    question.typeName === "Part Instruction" ||
    question.typeName === "Fill in Blank"
  ) {
    return null;
  }

  return (
    <div className="mt-4">
      <button
        onClick={() => {
          const newOption = {
            optionId: String.fromCharCode(65 + question.questionOptions.length), // A, B, C, etc.
            text: "",
          };
          handleQuestionChange(
            part.order - 1,
            question.order - 1,
            "questionOptions",
            [...question.questionOptions, newOption]
          );
        }}
        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
      >
        + Add Option
      </button>
    </div>
  );
};

AddOptionButton.propTypes = {
  question: PropTypes.shape({
    typeName: PropTypes.string.isRequired,
    questionOptions: PropTypes.arrayOf(
      PropTypes.shape({
        optionId: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
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

export default AddOptionButton;
