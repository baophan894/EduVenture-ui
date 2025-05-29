import PropTypes from "prop-types";
import { FaChevronDown } from "react-icons/fa";

const PartDropdown = ({
  part,
  isEditing,
  testParts,
  handlePartChange,
  handleQuestionChange,
}) => {
  if (!isEditing || part.isDeleted) {
    return null;
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Part
      </label>
      <div className="relative">
        <select
          value={part.order}
          onChange={(e) => {
            const newOrder = parseInt(e.target.value);
            const oldOrder = part.order;

            // Update the current part's order
            handlePartChange(part.id, "order", newOrder);

            // Update all questions in this part to reference the new part order
            part.questions.forEach((question) => {
              handleQuestionChange(
                oldOrder - 1,
                question.order - 1,
                "partOrder",
                newOrder
              );
            });
          }}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
        >
          {testParts
            .filter((p) => !p.isDeleted)
            .sort((a, b) => a.order - b.order)
            .map((p) => (
              <option key={p.id} value={p.order}>
                Part {p.order}
              </option>
            ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <FaChevronDown className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

PartDropdown.propTypes = {
  part: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    order: PropTypes.number.isRequired,
    isDeleted: PropTypes.bool,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        order: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  testParts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      order: PropTypes.number.isRequired,
      isDeleted: PropTypes.bool,
    })
  ).isRequired,
  handlePartChange: PropTypes.func.isRequired,
  handleQuestionChange: PropTypes.func.isRequired,
};

export default PartDropdown;
