import React from "react";
import PropTypes from "prop-types";
import {
  FaChevronDown,
  FaChevronUp,
  FaPlay,
  FaPlus,
  FaTrash,
  FaUndo,
} from "react-icons/fa";
import { Select } from "antd";

const TestParts = ({
  test,
  isEditing,
  expandedParts,
  togglePart,
  handlePartChange,
  handlePartIconChange,
  handleAddPart,
  handleDeletePart,
  handleUndoDelete,
  availableIcons,
  getIconComponent,
  isListeningTest,
  getImageUrl,
}) => {
  return (
    <div className="space-y-6">
      {test.testParts.map((part, partIndex) => (
        <div
          key={part.id}
          className={`bg-white rounded-lg shadow-lg overflow-hidden ${
            part.isDeleted ? "opacity-50" : ""
          }`}
        >
          <div
            className={`border-b p-4 cursor-pointer transition-colors ${
              part.isDeleted
                ? "bg-red-50 hover:bg-red-100"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => togglePart(part.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {isEditing ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600">
                      {getIconComponent(part.icon)}
                    </div>
                    <Select
                      className="flex-1"
                      value={part.icon}
                      onChange={(value) =>
                        handlePartIconChange(partIndex, value)
                      }
                      options={availableIcons.map((icon) => ({
                        value: icon.name,
                        label: (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 flex items-center justify-center text-base">
                              {React.createElement(icon.component)}
                            </div>
                            <span className="text-base">{icon.name}</span>
                          </div>
                        ),
                      }))}
                      dropdownStyle={{ minWidth: "200px" }}
                      dropdownMatchSelectWidth={false}
                      style={{ height: "42px" }}
                    />
                    <input
                      type="text"
                      value={part.name}
                      onChange={(e) =>
                        handlePartChange(partIndex, "name", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-base"
                      placeholder="Part name"
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600">
                      {getIconComponent(part.icon)}
                    </div>
                    <h3 className="text-lg font-semibold">{part.name}</h3>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                {isEditing && (
                  <>
                    {part.isDeleted ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUndoDelete(partIndex);
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
                          handleDeletePart(partIndex);
                        }}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete part"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </>
                )}
                {expandedParts[part.id] ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expandedParts[part.id]
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (mins)
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={part.duration}
                      onChange={(e) =>
                        handlePartChange(partIndex, "duration", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded-md border">
                      {part.duration}
                    </div>
                  )}
                </div>

                {/* Only show audioUrl for listening tests */}
                {isListeningTest() && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Audio URL
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={part.audioUrl || ""}
                        onChange={(e) =>
                          handlePartChange(
                            partIndex,
                            "audioUrl",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded-md border truncate flex items-center justify-between">
                        <span className="truncate">
                          {part.audioUrl || "No audio URL provided"}
                        </span>
                        {part.audioUrl && (
                          <button
                            className="ml-2 p-1 bg-emerald-100 text-emerald-600 rounded-full hover:bg-emerald-200 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(getImageUrl(part.audioUrl), "_blank");
                            }}
                          >
                            <FaPlay className="text-xs" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  {isEditing ? (
                    <textarea
                      value={part.description}
                      onChange={(e) =>
                        handlePartChange(
                          partIndex,
                          "description",
                          e.target.value
                        )
                      }
                      rows="2"
                      className="w-full min-w-[400px] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-md border whitespace-pre-wrap">
                      {part.description?.trim() || "No description provided"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Add Part Button - Moved to bottom */}
      {isEditing && (
        <button
          onClick={handleAddPart}
          className="w-full p-4 bg-white rounded-lg shadow-lg border-2 border-dashed border-gray-300 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 flex items-center justify-center gap-2 text-gray-600 hover:text-emerald-600"
        >
          <FaPlus className="text-lg" />
          <span>Add New Part</span>
        </button>
      )}
    </div>
  );
};

TestParts.propTypes = {
  test: PropTypes.shape({
    testParts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        description: PropTypes.string,
        audioUrl: PropTypes.string,
        isDeleted: PropTypes.bool,
      })
    ).isRequired,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  expandedParts: PropTypes.object.isRequired,
  togglePart: PropTypes.func.isRequired,
  handlePartChange: PropTypes.func.isRequired,
  handlePartIconChange: PropTypes.func.isRequired,
  handleAddPart: PropTypes.func.isRequired,
  handleDeletePart: PropTypes.func.isRequired,
  handleUndoDelete: PropTypes.func.isRequired,
  availableIcons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      component: PropTypes.elementType.isRequired,
    })
  ).isRequired,
  getIconComponent: PropTypes.func.isRequired,
  isListeningTest: PropTypes.func.isRequired,
  getImageUrl: PropTypes.func.isRequired,
};

export default TestParts;
