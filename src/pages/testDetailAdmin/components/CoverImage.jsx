import PropTypes from "prop-types";
import { FaUpload, FaUndo, FaTrash } from "react-icons/fa";

const CoverImage = ({
  test,
  originalTest,
  isEditing,
  handleChange,
  setTest,
  getImageUrl,
  setImageFiles,
  mode = "edit", // 'edit' or 'create'
}) => {
  // Only show restore buttons in edit mode when originalTest exists
  const showRestoreButtons = mode === "edit" && originalTest;

  // Check if the cover image has changed (only in edit mode)
  const hasImageChanged =
    showRestoreButtons && test.coverImg !== originalTest.coverImg;

  // Check if the current image is not the placeholder
  const isPlaceholderImage =
    !test.coverImg ||
    test.coverImg === "https://placehold.co/1200x675/png?text=No+Cover+Image";

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-1">
        Cover Image
        <span className="text-red-500 text-sm">*</span>
      </h2>
      <div className="relative">
        <div className="rounded-lg overflow-hidden bg-gray-100 aspect-video relative">
          <img
            src={
              test.coverImg?.startsWith("blob:")
                ? test.coverImg
                : getImageUrl(test.coverImg) ||
                  "https://placehold.co/1200x675/png?text=No+Cover+Image"
            }
            alt={test.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/1200x675/png?text=No+Cover+Image";
            }}
          />
        </div>
        {isEditing && (
          <div className="flex flex-col gap-2 mt-2">
            <label className="cursor-pointer bg-white text-gray-800 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors border">
              <FaUpload />
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    // Create a preview URL for the selected image
                    const previewUrl = URL.createObjectURL(file);
                    // Store both the file and preview URL
                    setImageFiles((prev) => ({
                      ...prev,
                      coverImg: file,
                    }));
                    handleChange({
                      target: {
                        name: "coverImg",
                        value: previewUrl,
                      },
                    });
                  }
                }}
              />
            </label>
            {showRestoreButtons && hasImageChanged && (
              <button
                onClick={() => {
                  setTest((prev) => ({
                    ...prev,
                    coverImg: originalTest.coverImg,
                  }));
                  setImageFiles((prev) => ({
                    ...prev,
                    coverImg: null,
                  }));
                }}
                className="bg-white text-gray-800 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors border"
                title="Restore original image"
              >
                <FaUndo />
                <span>Restore Original</span>
              </button>
            )}
            {!isPlaceholderImage && (
              <button
                onClick={() => {
                  setTest((prev) => ({
                    ...prev,
                    coverImg:
                      "https://placehold.co/1200x675/png?text=No+Cover+Image",
                  }));
                  setImageFiles((prev) => ({
                    ...prev,
                    coverImg: null,
                  }));
                }}
                className="bg-white text-red-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-50 transition-colors border border-red-200"
                title="Remove image"
              >
                <FaTrash />
                <span>Remove Image</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

CoverImage.propTypes = {
  test: PropTypes.shape({
    title: PropTypes.string.isRequired,
    coverImg: PropTypes.string,
  }).isRequired,
  originalTest: PropTypes.shape({
    coverImg: PropTypes.string,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  setTest: PropTypes.func.isRequired,
  getImageUrl: PropTypes.func.isRequired,
  setImageFiles: PropTypes.func.isRequired,
  mode: PropTypes.string,
};

export default CoverImage;
