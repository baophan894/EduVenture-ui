import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import {
  FaChevronDown,
  FaChevronUp,
  FaCheck,
  FaImage,
  FaUpload,
  FaRegCheckSquare,
  FaRegSquare,
  FaArrowUp,
  FaArrowDown,
  FaUndo,
  FaTrash,
  FaPlus,
  FaBook,
} from "react-icons/fa";

const TestQuestions = ({
  test,
  originalTest,
  isEditing,
  expandedQuestions,
  toggleQuestion,
  handleQuestionChange,
  handleQuestionTypeChange,
  handleOptionChange,
  handleSingleChoiceSelection,
  handleMultipleChoiceSelection,
  handleFillInBlankChange,
  selectedCorrectAnswers,
  sortedQuestionTypes,
  getIconComponent,
  getImageUrl,
  isMultipleChoice,
  isFillInBlank,
  isOptionSelected,
  handleAddQuestion,
  handleDeleteQuestion,
  handleUndoDeleteQuestion,
  setImageFiles,
}) => {
  // Add function to handle question reordering
  const handleMoveQuestion = (partOrder, questionOrder, direction) => {
    if (!isEditing) return;

    const part = test.testParts.find((part) => part.order === partOrder);
    if (!part) return;

    // Get only active questions and sort them
    const activeQuestions = part.questions
      .filter((q) => !q.isDeleted)
      .sort((a, b) => a.order - b.order);

    // If only one active question left, don't allow moving
    if (activeQuestions.length <= 1) return;

    const questionToMove = activeQuestions.find(
      (q) => q.order === questionOrder
    );
    if (!questionToMove) return;

    const currentIndex = activeQuestions.findIndex(
      (q) => q.order === questionOrder
    );
    const newIndex = currentIndex + direction;

    // Check if move is valid
    if (newIndex < 0 || newIndex >= activeQuestions.length) return;

    // Get the questions to swap
    const questionToSwap = activeQuestions[newIndex];

    // Create new array with updated orders
    const newQuestions = part.questions.map((question) => {
      if (!question) return question;
      if (question.order === questionToMove.order) {
        return { ...question, order: questionToSwap.order };
      }
      if (question.order === questionToSwap.order) {
        return { ...question, order: questionToMove.order };
      }
      return question;
    });

    // Sort questions by order before updating
    const sortedQuestions = newQuestions.sort((a, b) => a.order - b.order);

    // Update questions
    handleQuestionChange(partOrder - 1, -1, "questions", sortedQuestions);
  };

  // Add this before the main return statement
  if (!test.testParts || test.testParts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-white rounded-lg shadow-lg border-2 border-dashed border-gray-200">
        <div className="text-center space-y-3">
          <div className="text-gray-400">
            <FaBook className="w-12 h-12 mx-auto mb-4" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">
            No Parts Available
          </h3>
          <p className="text-gray-500 max-w-sm">
            Start by adding a part to organize your test questions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {[...test.testParts]
        .sort((a, b) => a.order - b.order)
        .map((part) => (
          <div
            key={part.id || `new-part-${part.order}`}
            className={`rounded-lg shadow-lg p-6 ${
              part.isDeleted ? "bg-red-50" : "bg-white"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  part.isDeleted
                    ? "bg-red-100 text-red-600"
                    : "bg-emerald-100 text-emerald-600"
                }`}
              >
                {getIconComponent(part.icon)}
              </div>
              <h3
                className={`text-lg font-semibold ${
                  part.isDeleted ? "text-red-600" : ""
                }`}
              >
                {part.name}
              </h3>
              {part.isDeleted && (
                <span className="ml-auto px-2 py-1 bg-red-100 text-red-600 text-sm rounded-full">
                  Deleted
                </span>
              )}
              {!part.isDeleted && (
                <span className="ml-auto px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  {
                    part.questions.filter(
                      (q) => !q.isDeleted && q.typeName !== "Part Instruction"
                    ).length
                  }{" "}
                  Questions
                </span>
              )}
            </div>

            <div className="space-y-4 pl-11">
              {[...part.questions]
                .sort((a, b) => a.order - b.order)
                .map((question) => {
                  const isExpanded =
                    expandedQuestions[`${part.order}-${question.order}`];
                  const isPartInstruction =
                    question.typeName === "Part Instruction";

                  // Get active questions for this part
                  const activeQuestions = part.questions
                    .filter((q) => !q.isDeleted)
                    .sort((a, b) => a.order - b.order);

                  // Find the index of this question in active questions
                  const questionIndex = activeQuestions.findIndex(
                    (q) => q.order === question.order
                  );

                  // Simple counter for active questions
                  const questionNumber =
                    !isPartInstruction && !question.isDeleted
                      ? questionIndex + 1
                      : null;

                  return (
                    <div
                      key={`${part.order}-${question.order}`}
                      className={`border rounded-lg bg-white shadow-sm overflow-hidden ${
                        question.isDeleted ? "opacity-50" : ""
                      }`}
                    >
                      <div
                        className={`px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 ${
                          question.isDeleted ? "bg-red-50 hover:bg-red-100" : ""
                        }`}
                        onClick={() =>
                          toggleQuestion(`${part.order}-${question.order}`)
                        }
                      >
                        <div className="flex items-center gap-2">
                          {!isPartInstruction && !question.isDeleted && (
                            <span className="px-2 py-1 bg-gray-100 text-xs font-medium rounded-full">
                              Q{questionNumber}
                            </span>
                          )}
                          <span className="font-medium">{question.title}</span>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {question.typeName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {isEditing && !part.isDeleted && (
                            <>
                              {question.isDeleted ? (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUndoDeleteQuestion(
                                      part.order,
                                      question.order
                                    );
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
                                      handleMoveQuestion(
                                        part.order,
                                        question.order,
                                        -1
                                      );
                                    }}
                                    disabled={questionIndex === 0}
                                    className={`p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors ${
                                      questionIndex === 0
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
                                      handleMoveQuestion(
                                        part.order,
                                        question.order,
                                        1
                                      );
                                    }}
                                    disabled={
                                      questionIndex ===
                                      activeQuestions.length - 1
                                    }
                                    className={`p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors ${
                                      questionIndex ===
                                      activeQuestions.length - 1
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
                                      handleDeleteQuestion(
                                        part.order,
                                        question.order
                                      );
                                    }}
                                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete question"
                                  >
                                    <FaTrash />
                                  </button>
                                </>
                              )}
                            </>
                          )}
                          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isExpanded
                            ? "max-h-[2000px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-4 pb-4 border-t">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                              </label>
                              {isEditing &&
                              !question.isDeleted &&
                              !part.isDeleted ? (
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={question.title}
                                    onChange={(e) =>
                                      handleQuestionChange(
                                        part.order - 1,
                                        question.order - 1,
                                        "title",
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Question Title"
                                  />
                                </div>
                              ) : (
                                <div className="p-2 bg-gray-50 rounded-md border">
                                  {question.title}
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Type
                              </label>
                              {isEditing &&
                              !question.isDeleted &&
                              !part.isDeleted ? (
                                <div className="flex gap-2">
                                  <Select
                                    className="flex-1"
                                    value={question.typeId}
                                    onChange={(value) =>
                                      handleQuestionTypeChange(
                                        part.order - 1,
                                        question.order - 1,
                                        value
                                      )
                                    }
                                    options={sortedQuestionTypes.map(
                                      (type) => ({
                                        value: type.id,
                                        label: type.name,
                                      })
                                    )}
                                    style={{ height: "42px" }}
                                  />
                                </div>
                              ) : (
                                <div className="p-2 bg-gray-50 rounded-md border">
                                  {question.typeName}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Question Instruction
                            </label>
                            {isEditing &&
                            !question.isDeleted &&
                            !part.isDeleted ? (
                              <div className="flex gap-2">
                                <textarea
                                  value={question.questionInstruction}
                                  onChange={(e) =>
                                    handleQuestionChange(
                                      part.order - 1,
                                      question.order - 1,
                                      "questionInstruction",
                                      e.target.value
                                    )
                                  }
                                  rows="2"
                                  className="flex-1 min-w-[300px] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                />
                              </div>
                            ) : (
                              <div className="p-3 bg-gray-50 rounded-md border whitespace-pre-wrap">
                                {question.questionInstruction}
                              </div>
                            )}
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Answer Instruction
                            </label>
                            {isEditing &&
                            !question.isDeleted &&
                            !part.isDeleted ? (
                              <div className="flex gap-2">
                                <textarea
                                  value={question.answerInstruction}
                                  onChange={(e) =>
                                    handleQuestionChange(
                                      part.order - 1,
                                      question.order - 1,
                                      "answerInstruction",
                                      e.target.value
                                    )
                                  }
                                  rows="2"
                                  className="flex-1 min-w-[300px] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                />
                              </div>
                            ) : (
                              <div className="p-3 bg-gray-50 rounded-md border whitespace-pre-wrap">
                                {question.answerInstruction || (
                                  <span className="text-gray-500 italic">
                                    No answer instruction provided
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Reading Passage */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Reading Passage
                            </label>
                            {isEditing &&
                            !question.isDeleted &&
                            !part.isDeleted ? (
                              <div className="flex gap-2">
                                <textarea
                                  value={question.readingPassage || ""}
                                  onChange={(e) =>
                                    handleQuestionChange(
                                      part.order - 1,
                                      question.order - 1,
                                      "readingPassage",
                                      e.target.value
                                    )
                                  }
                                  rows="6"
                                  className="flex-1 min-w-[300px] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-mono"
                                />
                              </div>
                            ) : (
                              <div className="p-3 bg-gray-50 rounded-md border whitespace-pre-wrap font-mono text-sm">
                                {question.readingPassage || (
                                  <span className="text-gray-500 italic">
                                    No reading passage provided
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Image Section */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                              <FaImage className="text-xs" /> Image
                            </label>
                            {isEditing &&
                            !question.isDeleted &&
                            !part.isDeleted ? (
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
                                      e.target.src =
                                        "https://placehold.co/800x450/png?text=No+Image";
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
                                            // Use question.order for the key
                                            const questionKey = `question_${part.order}_${question.order}`;
                                            // Store the actual file object
                                            setImageFiles((prev) => ({
                                              ...prev,
                                              [questionKey]: file,
                                            }));
                                            // Use blob URL only for preview
                                            const previewUrl =
                                              URL.createObjectURL(file);
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
                                      test.testParts[
                                        part.order
                                      ]?.questions?.find(
                                        (q) => q.id === question.id
                                      )?.imageUrl && (
                                      <button
                                        onClick={() => {
                                          handleQuestionChange(
                                            part.order - 1,
                                            question.order - 1,
                                            "imageUrl",
                                            test.testParts[
                                              part.order
                                            ]?.questions?.find(
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
                                    e.target.src =
                                      "https://placehold.co/800x450/png?text=No+Image";
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          {/* Fill in Blank Answer */}
                          {isFillInBlank(question) && (
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Correct Answer
                              </label>
                              {isEditing &&
                              !question.isDeleted &&
                              !part.isDeleted ? (
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={question.correctAnswer || ""}
                                    onChange={(e) =>
                                      handleFillInBlankChange(
                                        part.order - 1,
                                        question.order - 1,
                                        e.target.value
                                      )
                                    }
                                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                    placeholder="Enter correct answer"
                                  />
                                </div>
                              ) : (
                                <div className="p-2 bg-gray-50 rounded-md border font-medium text-emerald-600">
                                  {question.correctAnswer ||
                                    "No answer provided"}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Options */}
                          {question.typeName !== "Part Instruction" &&
                            question.typeName !== "Fill in Blank" &&
                            question.questionOptions.length > 0 && (
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <label className="block text-sm font-medium text-gray-700">
                                    Options{" "}
                                    {isMultipleChoice(question)
                                      ? "(Multiple Choice)"
                                      : "(Single Choice)"}
                                  </label>
                                  {isEditing &&
                                    !question.isDeleted &&
                                    !part.isDeleted && (
                                      <div className="flex items-center gap-2">
                                        <div className="text-xs text-gray-500">
                                          {isMultipleChoice(question)
                                            ? "Click options to select/deselect correct answers"
                                            : "Click an option to set as correct answer"}
                                        </div>
                                      </div>
                                    )}
                                </div>
                                <div className="rounded-md border overflow-hidden">
                                  {question.questionOptions.map(
                                    (option, optionIndex) => (
                                      <div
                                        key={option.id}
                                        className={`flex items-center gap-4 p-3 ${
                                          optionIndex !==
                                          question.questionOptions.length - 1
                                            ? "border-b"
                                            : ""
                                        } ${
                                          option.isDeleted
                                            ? "bg-red-50 opacity-50"
                                            : isOptionSelected(
                                                question.id,
                                                option.optionId
                                              )
                                            ? "bg-emerald-50"
                                            : isEditing &&
                                              !question.isDeleted &&
                                              !part.isDeleted
                                            ? "hover:bg-gray-50 cursor-pointer"
                                            : ""
                                        }`}
                                        onClick={() => {
                                          if (
                                            isEditing &&
                                            !question.isDeleted &&
                                            !part.isDeleted &&
                                            !option.isDeleted
                                          ) {
                                            if (isMultipleChoice(question)) {
                                              handleMultipleChoiceSelection(
                                                question.id,
                                                option.optionId
                                              );
                                            } else {
                                              handleSingleChoiceSelection(
                                                question.id,
                                                option.optionId
                                              );
                                            }
                                          }
                                        }}
                                      >
                                        {!option.isDeleted && (
                                          <div
                                            className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                              isOptionSelected(
                                                question.id,
                                                option.optionId
                                              )
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-gray-100 text-gray-700"
                                            } font-medium`}
                                          >
                                            {String.fromCharCode(
                                              65 +
                                                question.questionOptions.filter(
                                                  (opt, idx) =>
                                                    !opt.isDeleted &&
                                                    idx <= optionIndex
                                                ).length -
                                                1
                                            )}
                                          </div>
                                        )}

                                        <div className="flex-1">
                                          {isEditing &&
                                          !question.isDeleted &&
                                          !part.isDeleted ? (
                                            <div className="flex gap-2">
                                              <input
                                                type="text"
                                                value={option.text}
                                                onChange={(e) =>
                                                  handleOptionChange(
                                                    part.order - 1,
                                                    question.order - 1,
                                                    optionIndex,
                                                    "text",
                                                    e.target.value
                                                  )
                                                }
                                                className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${
                                                  option.isDeleted
                                                    ? "bg-red-50"
                                                    : ""
                                                }`}
                                                onClick={(e) =>
                                                  e.stopPropagation()
                                                }
                                              />
                                              {option.isDeleted ? (
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    const updatedOptions =
                                                      question.questionOptions.map(
                                                        (opt, idx) =>
                                                          idx === optionIndex
                                                            ? {
                                                                ...opt,
                                                                isDeleted: false,
                                                              }
                                                            : opt
                                                      );
                                                    handleQuestionChange(
                                                      part.order - 1,
                                                      question.order - 1,
                                                      "questionOptions",
                                                      updatedOptions
                                                    );
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
                                                    const updatedOptions =
                                                      question.questionOptions.map(
                                                        (opt, idx) =>
                                                          idx === optionIndex
                                                            ? {
                                                                ...opt,
                                                                isDeleted: true,
                                                              }
                                                            : opt
                                                      );
                                                    handleQuestionChange(
                                                      part.order - 1,
                                                      question.order - 1,
                                                      "questionOptions",
                                                      updatedOptions
                                                    );
                                                  }}
                                                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                                  title="Delete option"
                                                >
                                                  <FaTrash />
                                                </button>
                                              )}
                                            </div>
                                          ) : (
                                            <div
                                              className={
                                                option.isDeleted
                                                  ? "line-through text-red-500 bg-red-50 px-2 py-1 rounded"
                                                  : ""
                                              }
                                            >
                                              {option.text}
                                            </div>
                                          )}
                                        </div>

                                        {isEditing &&
                                        !question.isDeleted &&
                                        !part.isDeleted ? (
                                          isMultipleChoice(question) ? (
                                            isOptionSelected(
                                              question.id,
                                              option.optionId
                                            ) ? (
                                              <FaRegCheckSquare className="text-emerald-600 text-lg" />
                                            ) : (
                                              <FaRegSquare className="text-gray-400 text-lg" />
                                            )
                                          ) : (
                                            <div
                                              className={`w-5 h-5 rounded-full border ${
                                                isOptionSelected(
                                                  question.id,
                                                  option.optionId
                                                )
                                                  ? "border-emerald-600 bg-emerald-600"
                                                  : "border-gray-300"
                                              } flex items-center justify-center`}
                                            >
                                              {isOptionSelected(
                                                question.id,
                                                option.optionId
                                              ) && (
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                              )}
                                            </div>
                                          )
                                        ) : (
                                          isOptionSelected(
                                            question.id,
                                            option.optionId
                                          ) && (
                                            <FaCheck className="text-emerald-600" />
                                          )
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>

                                {/* Display selected answers for multiple choice */}
                                {isMultipleChoice(question) &&
                                  question.correctAnswer &&
                                  question.correctAnswer
                                    .split(",")
                                    .every((answer) =>
                                      question.questionOptions.some(
                                        (option) => option.optionId === answer
                                      )
                                    ) && (
                                    <div className="mt-2 text-sm">
                                      <span className="font-medium">
                                        Correct answers:
                                      </span>{" "}
                                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                                        {question.correctAnswer}
                                      </span>
                                    </div>
                                  )}
                              </div>
                            )}

                          {/* Show options management for non-Part Instruction and non-Fill in Blank questions */}
                          {isEditing &&
                            !question.isDeleted &&
                            !part.isDeleted &&
                            question.typeName !== "Part Instruction" &&
                            question.typeName !== "Fill in Blank" && (
                              <div className="mt-4">
                                <button
                                  onClick={() => {
                                    const newOption = {
                                      optionId: String.fromCharCode(
                                        65 + question.questionOptions.length
                                      ), // A, B, C, etc.
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
                            )}
                        </div>
                      </div>
                    </div>
                  );
                })}

              {/* Add Question Button */}
              {isEditing && !part.isDeleted && (
                <button
                  onClick={() => handleAddQuestion(part.order)}
                  className="w-full p-4 bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 flex items-center justify-center gap-2 text-gray-600 hover:text-emerald-600"
                >
                  <FaPlus className="text-lg" />
                  <span>Add New Question</span>
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

TestQuestions.propTypes = {
  test: PropTypes.shape({
    testParts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string.isRequired,
        questions: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            typeId: PropTypes.number.isRequired,
            typeName: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            correctAnswer: PropTypes.string,
            imageUrl: PropTypes.string,
            questionOptions: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.number,
                optionId: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
              })
            ),
          })
        ),
      })
    ),
  }).isRequired,
  originalTest: PropTypes.shape({
    testParts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        questions: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            typeId: PropTypes.number.isRequired,
            typeName: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            correctAnswer: PropTypes.string,
            imageUrl: PropTypes.string,
            questionOptions: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.number,
                optionId: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
              })
            ),
          })
        ),
      })
    ),
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  expandedQuestions: PropTypes.object.isRequired,
  toggleQuestion: PropTypes.func.isRequired,
  handleQuestionChange: PropTypes.func.isRequired,
  handleQuestionTypeChange: PropTypes.func.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
  handleSingleChoiceSelection: PropTypes.func.isRequired,
  handleMultipleChoiceSelection: PropTypes.func.isRequired,
  handleFillInBlankChange: PropTypes.func.isRequired,
  selectedCorrectAnswers: PropTypes.object.isRequired,
  sortedQuestionTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  getIconComponent: PropTypes.func.isRequired,
  getImageUrl: PropTypes.func.isRequired,
  isMultipleChoice: PropTypes.func.isRequired,
  isFillInBlank: PropTypes.func.isRequired,
  isOptionSelected: PropTypes.func.isRequired,
  handleAddQuestion: PropTypes.func.isRequired,
  handleDeleteQuestion: PropTypes.func.isRequired,
  handleUndoDeleteQuestion: PropTypes.func.isRequired,
  setImageFiles: PropTypes.func.isRequired,
};

export default TestQuestions;
