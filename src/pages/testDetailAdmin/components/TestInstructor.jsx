import PropTypes from "prop-types";
import { FaUpload, FaUndo, FaTrash } from "react-icons/fa";

const TestInstructor = ({
  test,
  originalTest,
  isEditing,
  handleChange,
  setTest,
  setImageFiles,
}) => {
  // Check if the instructor image has changed
  const hasImageChanged =
    test.instructorAvatar !== originalTest.instructorAvatar;

  // Check if the current image is not the placeholder
  const isPlaceholderImage =
    !test.instructorAvatar ||
    test.instructorAvatar === "https://placehold.co/400x400/png" ||
    test.instructorAvatar === "https://placehold.co/400x400/png";

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <div className="rounded-lg overflow-hidden bg-gray-100 w-32 h-32 md:w-full md:h-auto aspect-square relative">
            <img
              src={
                test.instructorAvatar?.startsWith("blob:")
                  ? test.instructorAvatar
                  : test.instructorAvatar || "https://placehold.co/400x400/png"
              }
              alt={test.instructorName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://placehold.co/400x400/png";
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
                        instructorAvatar: file,
                      }));
                      handleChange({
                        target: {
                          name: "instructorAvatar",
                          value: previewUrl,
                        },
                      });
                    }
                  }}
                />
              </label>
              {hasImageChanged && (
                <button
                  onClick={() => {
                    setTest((prev) => ({
                      ...prev,
                      instructorAvatar: originalTest.instructorAvatar,
                    }));
                    setImageFiles((prev) => ({
                      ...prev,
                      instructorAvatar: null,
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
                      instructorAvatar: "https://placehold.co/400x400/png",
                    }));
                    setImageFiles((prev) => ({
                      ...prev,
                      instructorAvatar: null,
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

        <div className="md:w-3/4">
          <h2 className="text-xl font-bold mb-4">Instructor Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              {isEditing ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="instructorName"
                    value={test.instructorName}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                  <button
                    onClick={() => {
                      setTest((prev) => ({
                        ...prev,
                        instructorName: originalTest.instructorName,
                      }));
                    }}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                    title="Reset name"
                  >
                    <FaUndo />
                  </button>
                </div>
              ) : (
                <div className="p-2 bg-gray-50 rounded-md border">
                  {test.instructorName}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              {isEditing ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="instructorTitle"
                    value={test.instructorTitle || ""}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                  <button
                    onClick={() => {
                      setTest((prev) => ({
                        ...prev,
                        instructorTitle: originalTest.instructorTitle,
                      }));
                    }}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                    title="Reset title"
                  >
                    <FaUndo />
                  </button>
                </div>
              ) : (
                <div className="p-2 bg-gray-50 rounded-md border">
                  {test.instructorTitle || "N/A"}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience
              </label>
              {isEditing ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="instructorExperience"
                    value={test.instructorExperience || ""}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                  <button
                    onClick={() => {
                      setTest((prev) => ({
                        ...prev,
                        instructorExperience: originalTest.instructorExperience,
                      }));
                    }}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                    title="Reset experience"
                  >
                    <FaUndo />
                  </button>
                </div>
              ) : (
                <div className="p-2 bg-gray-50 rounded-md border">
                  {test.instructorExperience || "N/A"}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            {isEditing ? (
              <div className="flex gap-2">
                <textarea
                  name="instructorDescription"
                  value={test.instructorDescription || ""}
                  onChange={handleChange}
                  rows="4"
                  className="flex-1 min-w-[300px] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
                <button
                  onClick={() => {
                    setTest((prev) => ({
                      ...prev,
                      instructorDescription: originalTest.instructorDescription,
                    }));
                  }}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Reset description"
                >
                  <FaUndo />
                </button>
              </div>
            ) : (
              <div className="p-3 bg-gray-50 rounded-md border whitespace-pre-wrap">
                {test.instructorDescription || "No description available."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

TestInstructor.propTypes = {
  test: PropTypes.shape({
    instructorName: PropTypes.string,
    instructorTitle: PropTypes.string,
    instructorExperience: PropTypes.string,
    instructorDescription: PropTypes.string,
    instructorAvatar: PropTypes.string,
  }).isRequired,
  originalTest: PropTypes.shape({
    instructorName: PropTypes.string,
    instructorTitle: PropTypes.string,
    instructorExperience: PropTypes.string,
    instructorDescription: PropTypes.string,
    instructorAvatar: PropTypes.string,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  setTest: PropTypes.func.isRequired,
  setImageFiles: PropTypes.func.isRequired,
};

export default TestInstructor;
