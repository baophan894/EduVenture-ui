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
} from "react-icons/fa";

const TestQuestions = ({
  test,
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
}) => {
  return (
    <div className="space-y-8">
      {test.testParts.map((part, partIndex) => (
        <div key={part.id} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600">
              {getIconComponent(part.icon)}
            </div>
            <h3 className="text-lg font-semibold">{part.name}</h3>
          </div>

          <div className="space-y-4 pl-11">
            {part.questions.map((question, questionIndex) => {
              const isExpanded = expandedQuestions[question.id];
              const isPartInstruction =
                question.typeName === "Part Instruction";
              const questionNumber = isPartInstruction
                ? null
                : part.questions.filter(
                    (q, idx) =>
                      idx < questionIndex && q.typeName !== "Part Instruction"
                  ).length + 1;

              return (
                <div
                  key={question.id}
                  className="border rounded-lg bg-white shadow-sm overflow-hidden"
                >
                  <div
                    className="px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleQuestion(question.id)}
                  >
                    <div className="flex items-center gap-2">
                      {!isPartInstruction && (
                        <span className="px-2 py-1 bg-gray-100 text-xs font-medium rounded-full">
                          Q{questionNumber}
                        </span>
                      )}
                      <span className="font-medium">{question.title}</span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {question.typeName}
                      </span>
                    </div>
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
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
                          {isEditing ? (
                            <input
                              type="text"
                              value={question.title}
                              onChange={(e) =>
                                handleQuestionChange(
                                  partIndex,
                                  questionIndex,
                                  "title",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                            />
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
                          {isEditing ? (
                            <Select
                              className="w-full"
                              value={question.typeId}
                              onChange={(value) =>
                                handleQuestionTypeChange(
                                  partIndex,
                                  questionIndex,
                                  value
                                )
                              }
                              options={sortedQuestionTypes.map((type) => ({
                                value: type.id,
                                label: type.name,
                              }))}
                              style={{ height: "42px" }}
                            />
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
                        {isEditing ? (
                          <textarea
                            value={question.questionInstruction}
                            onChange={(e) =>
                              handleQuestionChange(
                                partIndex,
                                questionIndex,
                                "questionInstruction",
                                e.target.value
                              )
                            }
                            rows="2"
                            className="w-full min-w-[300px] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-md border whitespace-pre-wrap">
                            {question.questionInstruction}
                          </div>
                        )}
                      </div>

                      {question.answerInstruction && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Answer Instruction
                          </label>
                          {isEditing ? (
                            <textarea
                              value={question.answerInstruction}
                              onChange={(e) =>
                                handleQuestionChange(
                                  partIndex,
                                  questionIndex,
                                  "answerInstruction",
                                  e.target.value
                                )
                              }
                              rows="2"
                              className="w-full min-w-[300px] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-md border whitespace-pre-wrap">
                              {question.answerInstruction}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Reading Passage */}
                      {question.readingPassage && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Reading Passage
                          </label>
                          {isEditing ? (
                            <textarea
                              value={question.readingPassage}
                              onChange={(e) =>
                                handleQuestionChange(
                                  partIndex,
                                  questionIndex,
                                  "readingPassage",
                                  e.target.value
                                )
                              }
                              rows="6"
                              className="w-full min-w-[300px] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-mono"
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-md border whitespace-pre-wrap font-mono text-sm">
                              {question.readingPassage}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Fill in Blank Answer */}
                      {isFillInBlank(question) && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Correct Answer
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={question.correctAnswer || ""}
                              onChange={(e) =>
                                handleFillInBlankChange(
                                  partIndex,
                                  questionIndex,
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                              placeholder="Enter correct answer"
                            />
                          ) : (
                            <div className="p-2 bg-gray-50 rounded-md border font-medium text-emerald-600">
                              {question.correctAnswer || "No answer provided"}
                            </div>
                          )}
                        </div>
                      )}

                      {question.imageUrl && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <FaImage className="text-xs" /> Image
                          </label>
                          <div className="rounded-lg overflow-hidden bg-gray-100 mb-2 relative group">
                            <img
                              src={
                                question.imageUrl.startsWith("blob:")
                                  ? question.imageUrl
                                  : getImageUrl(question.imageUrl) ||
                                    "/placeholder.svg"
                              }
                              alt={question.title}
                              className="w-full h-auto max-h-64 object-contain"
                              onError={(e) => {
                                e.target.src =
                                  "https://placehold.co/800x450/png?text=Image+Not+Found";
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
                                        const previewUrl =
                                          URL.createObjectURL(file);
                                        handleQuestionChange(
                                          partIndex,
                                          questionIndex,
                                          "imageUrl",
                                          previewUrl
                                        );
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            )}
                          </div>
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
                              {isEditing && (
                                <div className="text-xs text-gray-500">
                                  {isMultipleChoice(question)
                                    ? "Click options to select/deselect correct answers"
                                    : "Click an option to set as correct answer"}
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
                                      isOptionSelected(
                                        question.id,
                                        option.optionId
                                      )
                                        ? "bg-emerald-50"
                                        : isEditing
                                        ? "hover:bg-gray-50 cursor-pointer"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      if (isEditing) {
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
                                      {option.optionId}
                                    </div>

                                    <div className="flex-1">
                                      {isEditing ? (
                                        <input
                                          type="text"
                                          value={option.text}
                                          onChange={(e) =>
                                            handleOptionChange(
                                              partIndex,
                                              questionIndex,
                                              optionIndex,
                                              "text",
                                              e.target.value
                                            )
                                          }
                                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                      ) : (
                                        option.text
                                      )}
                                    </div>

                                    {isEditing ? (
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
                              question.correctAnswer && (
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
                        question.typeName !== "Part Instruction" &&
                        question.typeName !== "Fill in Blank" && (
                          <div className="mt-4">
                            <button
                              onClick={() => {
                                const newOption = {
                                  id: Date.now(),
                                  optionId: String.fromCharCode(
                                    65 + question.questionOptions.length
                                  ), // A, B, C, etc.
                                  text: "",
                                };
                                handleQuestionChange(
                                  partIndex,
                                  questionIndex,
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
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        questions: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            typeId: PropTypes.number.isRequired,
            typeName: PropTypes.string.isRequired,
            questionInstruction: PropTypes.string,
            answerInstruction: PropTypes.string,
            readingPassage: PropTypes.string,
            correctAnswer: PropTypes.string,
            imageUrl: PropTypes.string,
            questionOptions: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.number.isRequired,
                optionId: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
              })
            ),
          })
        ).isRequired,
      })
    ).isRequired,
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
};

export default TestQuestions;
