import React from "react";
import PropTypes from "prop-types";
import {
  FaChevronDown,
  FaChevronUp,
  FaPlay,
  FaPlus,
  FaTrash,
  FaUndo,
  FaArrowUp,
  FaArrowDown,
  FaUpload,
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
  originalTest,
  setImageFiles,
}) => {
  // Add function to handle part reordering
  const handleMovePart = (partIndex, direction) => {
    if (!isEditing) return;

    // Get only active parts and sort them
    const activeParts = test.testParts
      .filter((p) => !p.isDeleted)
      .sort((a, b) => a.order - b.order);

    const partToMove = activeParts[partIndex];
    if (!partToMove) return;

    const newIndex = partIndex + direction;

    // Check if move is valid
    if (newIndex < 0 || newIndex >= activeParts.length) return;

    // Get the parts to swap
    const partToSwap = activeParts[newIndex];

    // Create new array with updated orders
    const newParts = test.testParts.map((part) => {
      if (!part) return part;
      if (part.id === partToMove.id) {
        return { ...part, order: partToSwap.order };
      }
      if (part.id === partToSwap.id) {
        return { ...part, order: partToMove.order };
      }
      return part;
    });

    // Update parts
    handlePartChange(-1, "testParts", newParts);
  };

  return (
    <div className="space-y-6">
      {test.testParts
        .sort((a, b) => a.order - b.order)
        .map((part, partIndex) => (
          <div
            key={part.id || `new-part-${partIndex}`}
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
                  {isEditing && !part.isDeleted ? (
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
                        popupMatchSelectWidth={false}
                        style={{ height: "42px" }}
                      />
                      <input
                        type="text"
                        value={part.name}
                        onChange={(e) =>
                          handlePartChange(
                            part.order - 1,
                            "name",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Part Title"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600">
                        {getIconComponent(part.icon)}
                      </div>
                      <h3 className="text-lg font-semibold">
                        {part.title || part.name}
                      </h3>
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
                            handleUndoDelete(part.order);
                          }}
                          className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Undo delete"
                        >
                          <FaUndo />
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMovePart(partIndex, -1);
                            }}
                            disabled={partIndex === 0}
                            className={`p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors ${
                              partIndex === 0
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            title="Move up"
                          >
                            <FaArrowUp />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMovePart(partIndex, 1);
                            }}
                            disabled={partIndex === test.testParts.length - 1}
                            className={`p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors ${
                              partIndex === test.testParts.length - 1
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            title="Move down"
                          >
                            <FaArrowDown />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePart(part.order);
                            }}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete part"
                          >
                            <FaTrash />
                          </button>
                        </>
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
              <div className="p-6 space-y-6">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Duration Field */}
                    <div className="bg-white p-4 rounded-lg border h-[117px]">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration (minutes)
                      </label>
                      {isEditing && !part.isDeleted ? (
                        <input
                          type="number"
                          value={part.duration}
                          onChange={(e) =>
                            handlePartChange(
                              part.order - 1,
                              "duration",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Duration (minutes)"
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded-lg">
                          {part.duration} minutes
                        </div>
                      )}
                    </div>

                    {/* Audio Section - Only for Listening Tests */}
                    {isListeningTest() && (
                      <div
                        className={`bg-white p-4 rounded-lg border ${
                          isEditing
                            ? "h-[290px]"
                            : !part.audioUrl
                            ? "h-[117px]"
                            : "h-[150px]"
                        }`}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Audio File
                        </label>
                        {isEditing && !part.isDeleted ? (
                          <div className="space-y-3">
                            <div className="rounded-lg overflow-hidden bg-gray-50">
                              {part.audioUrl ? (
                                <div className="relative">
                                  <audio
                                    src={
                                      part.audioUrl?.startsWith("blob:")
                                        ? part.audioUrl
                                        : getImageUrl(part.audioUrl)
                                    }
                                    controls
                                    className="w-full"
                                    onError={(e) => {
                                      e.target.src = "";
                                    }}
                                  />
                                  <div className="absolute top-2 right-2">
                                    <label className="cursor-pointer bg-white text-gray-800 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-sm">
                                      <FaUpload />
                                      <span>Upload</span>
                                      <input
                                        type="file"
                                        accept="audio/*"
                                        className="hidden"
                                        onChange={(e) => {
                                          const file = e.target.files[0];
                                          if (file) {
                                            const partKey = `part_${part.order}_audio`;
                                            setImageFiles((prev) => ({
                                              ...prev,
                                              [partKey]: file,
                                            }));
                                            const previewUrl =
                                              URL.createObjectURL(file);
                                            handlePartChange(
                                              part.order - 1,
                                              "audioUrl",
                                              previewUrl
                                            );
                                          }
                                        }}
                                      />
                                    </label>
                                  </div>
                                </div>
                              ) : (
                                <div className="p-6 text-center text-gray-500 italic relative">
                                  <div className="mb-3">
                                    <FaUpload className="mx-auto text-2xl text-gray-400" />
                                  </div>
                                  <p>No audio provided</p>
                                  <div className="mt-3">
                                    <label className="cursor-pointer bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-100 transition-colors inline-flex">
                                      <FaUpload />
                                      <span>Upload Audio</span>
                                      <input
                                        type="file"
                                        accept="audio/*"
                                        className="hidden"
                                        onChange={(e) => {
                                          const file = e.target.files[0];
                                          if (file) {
                                            const partKey = `part_${part.order}_audio`;
                                            setImageFiles((prev) => ({
                                              ...prev,
                                              [partKey]: file,
                                            }));
                                            const previewUrl =
                                              URL.createObjectURL(file);
                                            handlePartChange(
                                              part.order - 1,
                                              "audioUrl",
                                              previewUrl
                                            );
                                          }
                                        }}
                                      />
                                    </label>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              {originalTest?.testParts?.[partIndex]
                                ?.audioUrl !== part.audioUrl && (
                                <button
                                  onClick={() => {
                                    handlePartChange(
                                      part.order - 1,
                                      "audioUrl",
                                      originalTest?.testParts?.[partIndex]
                                        ?.audioUrl
                                    );
                                    const partKey = `part_${part.order}_audio`;
                                    setImageFiles((prev) => ({
                                      ...prev,
                                      [partKey]: null,
                                    }));
                                  }}
                                  className="flex-1 bg-white text-gray-800 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors border"
                                  title="Restore original audio"
                                >
                                  <FaUndo />
                                  <span>Restore Original</span>
                                </button>
                              )}
                              {part.audioUrl && (
                                <button
                                  onClick={() => {
                                    handlePartChange(
                                      part.order - 1,
                                      "audioUrl",
                                      ""
                                    );
                                    const partKey = `part_${part.order}_audio`;
                                    setImageFiles((prev) => ({
                                      ...prev,
                                      [partKey]: null,
                                    }));
                                  }}
                                  className="flex-1 bg-white text-red-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-50 transition-colors border border-red-200"
                                  title="Remove audio"
                                >
                                  <FaTrash />
                                  <span>Remove Audio</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 bg-gray-50 rounded-lg">
                            {part.audioUrl ? (
                              <audio
                                src={
                                  part.audioUrl?.startsWith("blob:")
                                    ? part.audioUrl
                                    : getImageUrl(part.audioUrl)
                                }
                                controls
                                className="w-full"
                                onError={(e) => {
                                  e.target.src = "";
                                }}
                              />
                            ) : (
                              <span className="text-gray-500 italic">
                                No audio file provided
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Column - Description */}
                  <div
                    className={`bg-white p-4 rounded-lg border ${
                      isEditing
                        ? "h-[430.99px]"
                        : isListeningTest() && !part.audioUrl
                        ? "h-[258px]"
                        : !isEditing && part.description?.trim()
                        ? "h-[291px]"
                        : "h-[116px]"
                    }`}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    {isEditing && !part.isDeleted ? (
                      <textarea
                        value={part.description}
                        onChange={(e) =>
                          handlePartChange(
                            part.order - 1,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none h-[calc(100%-42px)]"
                        placeholder="Enter part description..."
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded-lg h-[calc(100%-42px)] overflow-y-auto">
                        {part.description?.trim() || (
                          <span className="text-gray-500 italic">
                            No description provided
                          </span>
                        )}
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
        id: PropTypes.number,
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
  originalTest: PropTypes.shape({
    testParts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        description: PropTypes.string,
        audioUrl: PropTypes.string,
        isDeleted: PropTypes.bool,
      })
    ).isRequired,
  }),
  setImageFiles: PropTypes.func,
};

export default TestParts;
