import PropTypes from "prop-types";
import { FaImage, FaUpload, FaUndo, FaTrash } from "react-icons/fa";

const QuestionImage = ({
  question,
  part,
  isEditing,
  getImageUrl,
  handleQuestionChange,
  setImageFiles,
  test,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <FaImage className="text-xs" /> Image
      </label>
      {isEditing && !question.isDeleted && !part.isDeleted ? (
        <div className="space-y-2">
          <div className="rounded-lg overflow-hidden bg-gray-100 mb-2 relative group">
            <img
              src={
                question.imageUrl?.startsWith("blob:")
                  ? question.imageUrl
                  : getImageUrl(question.imageUrl) ||
                    "https://placehold.co/800x450/png?text=No+Image"
              }
              alt={question.title}
              className="w-full h-auto max-h-64 object-contain"
              onError={(e) => {
                e.target.src = "https://placehold.co/800x450/png?text=No+Image";
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <label className="cursor-pointer bg-white text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors">
                <FaUpload />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const questionKey = `question_${part.order}_${question.order}`;
                      setImageFiles((prev) => ({
                        ...prev,
                        [questionKey]: file,
                      }));
                      const previewUrl = URL.createObjectURL(file);
                      handleQuestionChange(
                        part.order - 1,
                        question.order - 1,
                        "imageUrl",
                        previewUrl
                      );
                    }
                  }}
                />
              </label>
            </div>
          </div>
          <div className="flex gap-2">
            {test.testParts[part.order]?.questions?.some(
              (q) => q.id === question.id
            ) &&
              question.imageUrl !==
                test.testParts[part.order]?.questions?.find(
                  (q) => q.id === question.id
                )?.imageUrl && (
                <button
                  onClick={() => {
                    handleQuestionChange(
                      part.order - 1,
                      question.order - 1,
                      "imageUrl",
                      test.testParts[part.order]?.questions?.find(
                        (q) => q.id === question.id
                      )?.imageUrl
                    );
                    const questionKey = `question_${part.order}_${question.order}`;
                    setImageFiles((prev) => ({
                      ...prev,
                      [questionKey]: null,
                    }));
                  }}
                  className="flex-1 bg-white text-gray-800 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors border"
                  title="Restore original image"
                >
                  <FaUndo />
                  <span>Restore Original</span>
                </button>
              )}
            {question.imageUrl !==
              "https://placehold.co/800x450/png?text=No+Image" && (
              <button
                onClick={() => {
                  handleQuestionChange(
                    part.order - 1,
                    question.order - 1,
                    "imageUrl",
                    ""
                  );
                  const questionKey = `question_${part.order}_${question.order}`;
                  setImageFiles((prev) => ({
                    ...prev,
                    [questionKey]: null,
                  }));
                }}
                className="flex-1 bg-white text-red-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-50 transition-colors border border-red-200"
                title="Remove image"
              >
                <FaTrash />
                <span>Remove Image</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden bg-gray-100">
          <img
            src={
              question.imageUrl?.startsWith("blob:")
                ? question.imageUrl
                : getImageUrl(question.imageUrl) ||
                  "https://placehold.co/800x450/png?text=No+Image"
            }
            alt={question.title}
            className="w-full h-auto max-h-64 object-contain"
            onError={(e) => {
              e.target.src = "https://placehold.co/800x450/png?text=No+Image";
            }}
          />
        </div>
      )}
    </div>
  );
};

QuestionImage.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    order: PropTypes.number.isRequired,
    isDeleted: PropTypes.bool,
  }).isRequired,
  part: PropTypes.shape({
    order: PropTypes.number.isRequired,
    isDeleted: PropTypes.bool,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  getImageUrl: PropTypes.func.isRequired,
  handleQuestionChange: PropTypes.func.isRequired,
  setImageFiles: PropTypes.func.isRequired,
  test: PropTypes.shape({
    testParts: PropTypes.arrayOf(
      PropTypes.shape({
        order: PropTypes.number.isRequired,
        questions: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            imageUrl: PropTypes.string,
          })
        ),
      })
    ),
  }).isRequired,
};

export default QuestionImage;
