import PropTypes from "prop-types";
import { FaUpload } from "react-icons/fa";

const TestInstructor = ({ test, isEditing, handleChange }) => {
  if (!test.instructorName) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {test.instructorAvatar && (
          <div className="md:w-1/4">
            <div className="rounded-lg overflow-hidden bg-gray-100 w-32 h-32 md:w-full md:h-auto aspect-square relative group">
              <img
                src={
                  test.instructorAvatar.startsWith("blob:")
                    ? test.instructorAvatar
                    : test.instructorAvatar || "/placeholder.svg"
                }
                alt={test.instructorName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/400x400/png?text=Instructor";
                }}
              />
              {isEditing && (
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
                          // Create a preview URL for the selected image
                          const previewUrl = URL.createObjectURL(file);
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
                </div>
              )}
            </div>
          </div>
        )}

        <div className="md:w-3/4">
          <h2 className="text-xl font-bold mb-4">Instructor Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="instructorName"
                  value={test.instructorName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
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
                <input
                  type="text"
                  name="instructorTitle"
                  value={test.instructorTitle || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
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
                <input
                  type="text"
                  name="instructorExperience"
                  value={test.instructorExperience || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
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
              <textarea
                name="instructorDescription"
                value={test.instructorDescription || ""}
                onChange={handleChange}
                rows="4"
                className="w-full min-w-[300px] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
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
  isEditing: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TestInstructor;
