import PropTypes from "prop-types";
import { Select } from "antd";
import { FaCheck, FaLaptop, FaTimes, FaUndo } from "react-icons/fa";

const TestDetails = ({
  test,
  originalTest,
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
              <div className="flex gap-2">
                <input
                  type="text"
                  name="title"
                  value={test.title}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
                <button
                  onClick={() => {
                    setTest((prev) => ({
                      ...prev,
                      title: originalTest.title,
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
                {test.title}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            {isEditing ? (
              <div className="flex gap-2">
                <Select
                  className="flex-1"
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
                <button
                  onClick={() => {
                    setTest((prev) => ({
                      ...prev,
                      typeId: originalTest.typeId,
                      typeName: originalTest.typeName,
                    }));
                  }}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Reset type"
                >
                  <FaUndo />
                </button>
              </div>
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
                onChange={(value) => {
                  // Clear the level when language changes
                  setTest((prev) => ({
                    ...prev,
                    languageId: value,
                    languageName:
                      sortedLanguages.find((lang) => lang.id === value)?.name ||
                      "",
                    testLevelId: null,
                    testLevel: "",
                  }));
                }}
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
              <div className="flex gap-2">
                <Select
                  className="flex-1"
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
                  placeholder="Select a level"
                />
                <button
                  onClick={() => {
                    setTest((prev) => ({
                      ...prev,
                      languageId: originalTest.languageId,
                      languageName: originalTest.languageName,
                      testLevelId: originalTest.testLevelId,
                      testLevel: originalTest.testLevel,
                    }));
                  }}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Reset to original language and level"
                >
                  <FaUndo />
                </button>
              </div>
            ) : (
              <div className="p-2 bg-gray-50 rounded-md border">
                {test.testLevel || "Not selected"}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (mins)
            </label>
            <div className="p-2 bg-gray-50 rounded-md border flex items-center justify-between">
              <span>{test.duration}</span>
              <span className="text-xs text-gray-500 ml-2">
                (Calculated from parts)
              </span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          {isEditing ? (
            <div className="flex gap-2">
              <textarea
                name="description"
                value={test.description}
                onChange={handleChange}
                rows="4"
                className="flex-1 min-w-[300px] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
              <button
                onClick={() => {
                  setTest((prev) => ({
                    ...prev,
                    description: originalTest.description,
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
                {test.testFeatures.map((feature, index) => {
                  const isDeleted = feature.startsWith("__DELETED__");
                  const displayFeature = isDeleted
                    ? feature.replace("__DELETED__", "")
                    : feature;
                  return (
                    <li
                      key={index}
                      className={`flex items-start ${
                        isDeleted ? "opacity-50" : ""
                      }`}
                    >
                      {isEditing ? (
                        <div className="flex items-center w-full">
                          <input
                            type="text"
                            value={displayFeature}
                            onChange={(e) =>
                              handleArrayChange(
                                "testFeatures",
                                index,
                                isDeleted
                                  ? `__DELETED__${e.target.value}`
                                  : e.target.value
                              )
                            }
                            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                          />
                          <div className="flex gap-2 ml-2">
                            {isDeleted ? (
                              <button
                                onClick={() => {
                                  const updatedFeatures = [
                                    ...test.testFeatures,
                                  ];
                                  updatedFeatures[index] = displayFeature;
                                  setTest((prev) => ({
                                    ...prev,
                                    testFeatures: updatedFeatures,
                                  }));
                                }}
                                className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                                title="Restore feature"
                              >
                                <FaUndo />
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  const updatedFeatures = [
                                    ...test.testFeatures,
                                  ];
                                  updatedFeatures[
                                    index
                                  ] = `__DELETED__${feature}`;
                                  setTest((prev) => ({
                                    ...prev,
                                    testFeatures: updatedFeatures,
                                  }));
                                }}
                                className="p-2 text-red-500 hover:text-red-700"
                                title="Delete feature"
                              >
                                <FaTimes />
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <>
                          <FaCheck className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                          <span>{displayFeature}</span>
                        </>
                      )}
                    </li>
                  );
                })}
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
                {test.testRequirements.map((requirement, index) => {
                  const isDeleted = requirement.startsWith("__DELETED__");
                  const displayRequirement = isDeleted
                    ? requirement.replace("__DELETED__", "")
                    : requirement;
                  return (
                    <li
                      key={index}
                      className={`flex items-start ${
                        isDeleted ? "opacity-50" : ""
                      }`}
                    >
                      {isEditing ? (
                        <div className="flex items-center w-full">
                          <input
                            type="text"
                            value={displayRequirement}
                            onChange={(e) =>
                              handleArrayChange(
                                "testRequirements",
                                index,
                                isDeleted
                                  ? `__DELETED__${e.target.value}`
                                  : e.target.value
                              )
                            }
                            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                          />
                          <div className="flex gap-2 ml-2">
                            {isDeleted ? (
                              <button
                                onClick={() => {
                                  const updatedRequirements = [
                                    ...test.testRequirements,
                                  ];
                                  updatedRequirements[index] =
                                    displayRequirement;
                                  setTest((prev) => ({
                                    ...prev,
                                    testRequirements: updatedRequirements,
                                  }));
                                }}
                                className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                                title="Restore requirement"
                              >
                                <FaUndo />
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  const updatedRequirements = [
                                    ...test.testRequirements,
                                  ];
                                  updatedRequirements[
                                    index
                                  ] = `__DELETED__${requirement}`;
                                  setTest((prev) => ({
                                    ...prev,
                                    testRequirements: updatedRequirements,
                                  }));
                                }}
                                className="p-2 text-red-500 hover:text-red-700"
                                title="Delete requirement"
                              >
                                <FaTimes />
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <>
                          <FaLaptop className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                          <span>{displayRequirement}</span>
                        </>
                      )}
                    </li>
                  );
                })}
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
  originalTest: PropTypes.shape({
    title: PropTypes.string.isRequired,
    typeId: PropTypes.number.isRequired,
    typeName: PropTypes.string.isRequired,
    languageId: PropTypes.number.isRequired,
    languageName: PropTypes.string.isRequired,
    testLevelId: PropTypes.number,
    testLevel: PropTypes.string,
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
