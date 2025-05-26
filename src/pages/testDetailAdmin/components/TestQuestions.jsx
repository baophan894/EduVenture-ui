import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import {
  FaChevronDown,
  FaChevronUp,
  FaArrowUp,
  FaArrowDown,
  FaUndo,
  FaTrash,
  FaPlus,
  FaBook,
} from "react-icons/fa";
import QuestionImage from "./QuestionImage";
import FillInBlankAnswer from "./FillInBlankAnswer";
import PostAnswerDetail from "./PostAnswerDetail";
import ReadingPassage from "./ReadingPassage";
import QuestionOptions from "./QuestionOptions";
import AddOptionButton from "./AddOptionButton";

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

    // Get all questions (including part instructions) and sort them
    const allQuestions = part.questions
      .filter((q) => !q.isDeleted)
      .sort((a, b) => a.order - b.order);

    // If only one question left, don't allow moving
    if (allQuestions.length <= 1) return;

    const questionToMove = allQuestions.find((q) => q.order === questionOrder);
    if (!questionToMove) return;

    const currentIndex = allQuestions.findIndex(
      (q) => q.order === questionOrder
    );
    const newIndex = currentIndex + direction;

    // Check if move is valid
    if (newIndex < 0 || newIndex >= allQuestions.length) return;

    // Get the questions to swap
    const questionToSwap = allQuestions[newIndex];

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
            className={`rounded-lg shadow-lg ${
              part.isDeleted ? "bg-red-50" : "bg-white"
            }`}
          >
            {/* Part Header */}
            <div
              className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out"
              onClick={() => toggleQuestion(part.order)}
            >
              <div className="flex items-center gap-3">
                <div className="text-gray-500 transform transition-transform duration-200 ease-in-out">
                  {expandedQuestions[part.order] ? (
                    <FaChevronDown className="transform rotate-180 transition-transform duration-200" />
                  ) : (
                    <FaChevronDown className="transform rotate-0 transition-transform duration-200" />
                  )}
                </div>
                <div className="flex items-center gap-3">
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
                </div>
              </div>
              <div className="flex items-center gap-2">
                {part.isDeleted && (
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded-full">
                    Deleted
                  </span>
                )}
                {!part.isDeleted && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    {
                      part.questions.filter(
                        (q) => !q.isDeleted && q.typeName !== "Part Instruction"
                      ).length
                    }{" "}
                    Questions
                  </span>
                )}
                {part.duration > 0 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    {part.duration} mins
                  </span>
                )}
              </div>
            </div>

            {/* Part Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedQuestions[part.order]
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-6 space-y-4">
                <div className="space-y-4 pl-11">
                  {[...part.questions]
                    .sort((a, b) => a.order - b.order)
                    .map((question) => {
                      const isExpanded =
                        expandedQuestions[`${part.order}-${question.order}`];
                      const isPartInstruction =
                        question.typeName === "Part Instruction";

                      // Get active questions for this part (excluding part instructions)
                      const activeQuestions = part.questions
                        .filter(
                          (q) =>
                            !q.isDeleted && q.typeName !== "Part Instruction"
                        )
                        .sort((a, b) => a.order - b.order);

                      // Get all questions for reordering (including part instructions)
                      const allQuestions = part.questions
                        .filter((q) => !q.isDeleted)
                        .sort((a, b) => a.order - b.order);

                      // Find the index of this question in active questions (for numbering)
                      const questionIndex = activeQuestions.findIndex(
                        (q) => q.order === question.order
                      );

                      // Find the index in all questions (for reordering)
                      const allQuestionsIndex = allQuestions.findIndex(
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
                              question.isDeleted
                                ? "bg-red-50 hover:bg-red-100"
                                : ""
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
                              <span className="font-medium">
                                {question.title}
                              </span>
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
                                        disabled={allQuestionsIndex === 0}
                                        className={`p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors ${
                                          allQuestionsIndex === 0
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
                                          allQuestionsIndex ===
                                          allQuestions.length - 1
                                        }
                                        className={`p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors ${
                                          allQuestionsIndex ===
                                          allQuestions.length - 1
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
                                    {question.questionInstruction || (
                                      <span className="text-gray-500 italic text-sm">
                                        No question instruction provided
                                      </span>
                                    )}
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
                                      <span className="text-gray-500 italic text-sm">
                                        No answer instruction provided
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Reading Passage */}
                              <ReadingPassage
                                question={question}
                                part={part}
                                isEditing={isEditing}
                                handleQuestionChange={handleQuestionChange}
                              />

                              {/* Post Answer Detail */}
                              <PostAnswerDetail
                                question={question}
                                part={part}
                                isEditing={isEditing}
                                handleQuestionChange={handleQuestionChange}
                              />

                              {/* Image Section */}
                              <QuestionImage
                                question={question}
                                part={part}
                                isEditing={isEditing}
                                getImageUrl={getImageUrl}
                                handleQuestionChange={handleQuestionChange}
                                setImageFiles={setImageFiles}
                                test={test}
                              />

                              {/* Fill in Blank Answer */}
                              {isFillInBlank(question) && (
                                <FillInBlankAnswer
                                  question={question}
                                  part={part}
                                  isEditing={isEditing}
                                  handleFillInBlankChange={
                                    handleFillInBlankChange
                                  }
                                />
                              )}

                              {/* Options */}
                              <QuestionOptions
                                question={question}
                                part={part}
                                isEditing={isEditing}
                                isMultipleChoice={isMultipleChoice}
                                isOptionSelected={isOptionSelected}
                                handleOptionChange={handleOptionChange}
                                handleSingleChoiceSelection={
                                  handleSingleChoiceSelection
                                }
                                handleMultipleChoiceSelection={
                                  handleMultipleChoiceSelection
                                }
                                handleQuestionChange={handleQuestionChange}
                              />

                              {/* Show options management for non-Part Instruction and non-Fill in Blank questions */}
                              <AddOptionButton
                                question={question}
                                part={part}
                                isEditing={isEditing}
                                handleQuestionChange={handleQuestionChange}
                              />
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
            postAnswerDetail: PropTypes.string,
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
