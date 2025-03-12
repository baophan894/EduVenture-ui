"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TEST_TYPES, READING_PARTS } from "./test-types";

const QuestionSection = ({
  test,
  question,
  questionNumber,
  showQuestionInContent = false, // New prop to control question location
  onBack,
  onNext,
  children, // This will be the answer section
}) => {
  const [showNavigation, setShowNavigation] = useState(false);

  // Find the part this question belongs to
  const part = test.parts.find((part) =>
    part.questions.some((q) => q.id === question.id)
  );

  // For reading comprehension, we need to group related questions
  const isReadingComprehension =
    test.type === TEST_TYPES.READING &&
    (part?.partNumber === READING_PARTS.SINGLE_PASSAGES ||
      part?.partNumber === READING_PARTS.GROUPED_PASSAGES);

  // Get all questions for the current passage if it's reading comprehension
  const relatedQuestions = isReadingComprehension
    ? part?.questions.filter((q) => q.passageGroup === question.passageGroup)
    : [question];

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Part Title and Instructions */}
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-800 font-shopee mb-2">
          {part?.title}
        </h2>
        <p className="text-sm text-gray-600 font-shopee">
          {part?.instructions}
        </p>
      </div>

      <div className="p-6">
        {/* Navigation Toggle Button */}
        <button
          onClick={() => setShowNavigation(!showNavigation)}
          className="mb-4 text-sm text-gray-600 hover:text-[#469B74] flex items-center gap-2 font-shopee"
        >
          {showNavigation ? <FaChevronRight /> : <FaChevronLeft />}
          {showNavigation ? "Hide Navigation" : "Show Navigation"}
        </button>

        <div className="flex gap-6">
          {/* Main Content */}
          <div className={`flex-1 ${showNavigation ? "w-3/4" : "w-full"}`}>
            {/* Question Content */}
            {(isReadingComprehension || showQuestionInContent) && (
              <div className="mb-6">
                {question.text.includes("From:") ? (
                  // Email format
                  <div className="border rounded-lg p-4 mb-4">
                    {question.text.split("\n").map((line, index) => (
                      <p key={index} className="mb-2 font-shopee">
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  // Regular text
                  <div className="prose max-w-none mb-4">
                    <p className="font-shopee">{question.text}</p>
                  </div>
                )}

                {question.imageUrl && (
                  <img
                    src={question.imageUrl || "/placeholder.svg"}
                    alt="Question visual"
                    className="max-w-full rounded-lg border border-gray-200"
                  />
                )}
              </div>
            )}

            {/* Answer Section */}
            <div>
              {!showQuestionInContent && (
                <h3 className="text-lg font-semibold mb-4 font-shopee">
                  Question {questionNumber}
                </h3>
              )}
              {children}
            </div>
          </div>

          {/* Navigation Sidebar - Collapsible */}
          {showNavigation && (
            <div className="w-1/4 border-l border-gray-200 pl-6">
              <h3 className="text-sm font-semibold mb-3 font-shopee">
                Questions in this part:
              </h3>
              <div className="space-y-2">
                {part?.questions.map((q, index) => {
                  const qNumber =
                    test.questions.findIndex((tq) => tq.id === q.id) + 1;
                  return (
                    <button
                      key={q.id}
                      className={`w-full text-left p-2 rounded text-sm ${
                        q.id === question.id
                          ? "bg-[#469B74] text-white"
                          : "hover:bg-gray-100"
                      } font-shopee`}
                      onClick={() => onNext(qNumber - 1)}
                    >
                      Question {qNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-600 hover:text-[#469B74] flex items-center gap-2 font-shopee"
          >
            <FaChevronLeft /> Previous
          </button>
          <button
            onClick={onNext}
            className="px-4 py-2 text-gray-600 hover:text-[#469B74] flex items-center gap-2 font-shopee"
          >
            Next <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionSection;
