import PropTypes from "prop-types";
import { Select } from "antd";
import { FaCheck, FaLaptop, FaTimes } from "react-icons/fa";

const TestDetails = ({
  test,
  isEditing,
  handleChange,
  handleArrayChange,
  handleAddArrayItem,
  handleRemoveArrayItem,
  sortedTestTypes,
  sortedLanguages,
  filteredTestLevels,
  setTest,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Test Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={test.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded-md border">
                {test.title}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            {isEditing ? (
              <Select
                className="w-full"
                value={test.typeId}
                onChange={(value) =>
                  handleChange({ target: { name: "typeId", value } })
                }
                options={sortedTestTypes.map((type) => ({
                  value: type.id,
                  label: type.name,
                }))}
                style={{ height: "42px" }}
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded-md border">
                {test.typeName}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            {isEditing ? (
              <Select
                className="w-full"
                value={test.languageId}
                onChange={(value) =>
                  handleChange({ target: { name: "languageId", value } })
                }
                options={sortedLanguages.map((language) => ({
                  value: language.id,
                  label: language.name,
                }))}
                style={{ height: "42px" }}
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded-md border">
                {test.languageName}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Level
            </label>
            {isEditing ? (
              <Select
                className="w-full"
                value={test.testLevelId}
                onChange={(value) => {
                  setTest((prev) => ({
                    ...prev,
                    testLevelId: value,
                    testLevel:
                      filteredTestLevels.find((level) => level.id === value)
                        ?.name || "",
                  }));
                }}
                options={filteredTestLevels.map((level) => ({
                  value: level.id,
                  label: level.name,
                }))}
                style={{ height: "42px" }}
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded-md border">
                {test.testLevel}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (mins)
            </label>
            {isEditing ? (
              <input
                type="number"
                name="duration"
                value={test.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded-md border">
                {test.duration}
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          {isEditing ? (
            <textarea
              name="description"
              value={test.description}
              onChange={handleChange}
              rows="4"
              className="w-full min-w-[300px] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded-md border whitespace-pre-wrap">
              {test.description}
            </div>
          )}
        </div>

        {/* Test Features */}
        {test.testFeatures && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Features
            </label>
            <div className="bg-gray-50 rounded-md border p-3">
              <ul className="space-y-2">
                {test.testFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {isEditing ? (
                      <div className="flex items-center w-full">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) =>
                            handleArrayChange(
                              "testFeatures",
                              index,
                              e.target.value
                            )
                          }
                          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                        <button
                          onClick={() =>
                            handleRemoveArrayItem("testFeatures", index)
                          }
                          className="ml-2 p-2 text-red-500 hover:text-red-700"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <>
                        <FaCheck className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </>
                    )}
                  </li>
                ))}
                {isEditing && (
                  <li>
                    <button
                      onClick={() => handleAddArrayItem("testFeatures")}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                    >
                      + Add Feature
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Test Requirements */}
        {test.testRequirements && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Requirements
            </label>
            <div className="bg-gray-50 rounded-md border p-3">
              <ul className="space-y-2">
                {test.testRequirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    {isEditing ? (
                      <div className="flex items-center w-full">
                        <input
                          type="text"
                          value={requirement}
                          onChange={(e) =>
                            handleArrayChange(
                              "testRequirements",
                              index,
                              e.target.value
                            )
                          }
                          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                        <button
                          onClick={() =>
                            handleRemoveArrayItem("testRequirements", index)
                          }
                          className="ml-2 p-2 text-red-500 hover:text-red-700"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <>
                        <FaLaptop className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{requirement}</span>
                      </>
                    )}
                  </li>
                ))}
                {isEditing && (
                  <li>
                    <button
                      onClick={() => handleAddArrayItem("testRequirements")}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                    >
                      + Add Requirement
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

TestDetails.propTypes = {
  test: PropTypes.shape({
    title: PropTypes.string.isRequired,
    typeId: PropTypes.number.isRequired,
    typeName: PropTypes.string.isRequired,
    languageId: PropTypes.number.isRequired,
    languageName: PropTypes.string.isRequired,
    testLevelId: PropTypes.number,
    testLevel: PropTypes.string,
    duration: PropTypes.number.isRequired,
    description: PropTypes.string,
    testFeatures: PropTypes.arrayOf(PropTypes.string),
    testRequirements: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleArrayChange: PropTypes.func.isRequired,
  handleAddArrayItem: PropTypes.func.isRequired,
  handleRemoveArrayItem: PropTypes.func.isRequired,
  sortedTestTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  sortedLanguages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  filteredTestLevels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setTest: PropTypes.func.isRequired,
};

export default TestDetails;
