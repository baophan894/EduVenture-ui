"use client";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaDownload,
  FaRedo,
  FaTrophy,
  FaClock,
  FaChartBar,
  FaSpinner,
} from "react-icons/fa";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ResultsModal = ({ test, testResult, flattenedQuestions, onClose }) => {
  const [loading, setLoading] = useState(!testResult);
  const navigate = useNavigate();

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  // Simulate loading if needed (remove this in production)
  useEffect(() => {
    if (!testResult) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [testResult]);

  const scorePercentage = testResult?.totalCorrectAnswers
    ? Math.round(
        (testResult.totalCorrectAnswers / testResult.totalQuestions) * 100
      )
    : 0;

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto">
        <div
          className="max-h-[95vh] overflow-hidden rounded-xl w-full max-w-5xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-xl shadow-2xl w-full max-h-[95vh] overflow-auto border border-gray-100">
            {/* Header - Trophy and title always visible */}
            <div className="p-8 text-center relative">
              <div className="relative">
                <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-r from-[#3a7d5f] to-[#469B74] mb-5 shadow-md">
                  <FaTrophy className="text-white" size={42} />
                </div>
                <h2 className="text-3xl font-bold mb-3 font-shopee text-gray-800">
                  Test Completed!
                </h2>
                <p className="text-gray-600 font-shopee text-lg mb-6">
                  You've completed the {test.title}
                </p>
              </div>

              {/* Score Overview - Show loading state or actual data */}
              {loading ? (
                <div className="bg-gray-50 rounded-xl p-6 mb-2 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-center py-4">
                    <FaSpinner
                      className="text-[#469B74] animate-spin mr-3"
                      size={24}
                    />
                    <p className="text-gray-600 font-shopee">
                      Loading score overview...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-6 mb-2 shadow-sm border border-gray-100">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#469B74] font-shopee">
                          {testResult?.totalCorrectAnswers || 0}
                        </div>
                        <div className="text-gray-600 font-shopee">Correct</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-500 font-shopee">
                          {(testResult?.totalQuestions || 0) -
                            (testResult?.totalCorrectAnswers || 0)}
                        </div>
                        <div className="text-gray-600 font-shopee">
                          Incorrect
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-700 font-shopee">
                          {testResult?.totalQuestions || 0}
                        </div>
                        <div className="text-gray-600 font-shopee">
                          Total Questions
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-8 mt-6 md:mt-0">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-700 font-shopee">
                          {formatTime(testResult?.timeSpent || 0)}
                        </div>
                        <div className="text-gray-600 font-shopee">
                          Time Spent
                        </div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-3xl font-bold ${getScoreColor(
                            scorePercentage
                          )} font-shopee`}
                        >
                          {scorePercentage}%
                        </div>
                        <div className="text-gray-600 font-shopee">Score</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Body - Shows loading spinner when loading */}
            <div className="p-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <FaSpinner
                    className="text-[#469B74] animate-spin mb-4"
                    size={48}
                  />
                  <p className="text-gray-600 font-shopee text-lg">
                    Loading your results...
                  </p>
                </div>
              ) : (
                <>
                  {/* Section Scores */}
                  {testResult?.partSubmissions && (
                    <>
                      <div className="flex items-center mb-5">
                        <FaChartBar className="text-[#469B74] mr-3" size={24} />
                        <h3 className="text-2xl font-bold font-shopee text-gray-800">
                          Section Breakdown
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                        {testResult.partSubmissions.map((part) => (
                          <div
                            key={part.partId}
                            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="font-semibold text-lg font-shopee text-gray-800">
                                {part.partName}
                              </h4>
                              <div
                                className={`text-xl font-bold ${getScoreColor(
                                  Math.round(
                                    (part.correctAnswers /
                                      part.totalQuestions) *
                                      100
                                  )
                                )} font-shopee`}
                              >
                                {part.correctAnswers} / {part.totalQuestions}
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                              <div
                                className={`${
                                  part.correctAnswers / part.totalQuestions >=
                                  0.8
                                    ? "bg-emerald-500"
                                    : part.correctAnswers /
                                        part.totalQuestions >=
                                      0.6
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                                } h-3 rounded-full transition-all duration-500`}
                                style={{
                                  width: `${
                                    (part.correctAnswers /
                                      part.totalQuestions) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <div className="text-sm text-gray-600 font-shopee">
                              {Math.round(
                                (part.correctAnswers / part.totalQuestions) *
                                  100
                              )}
                              % correct ({part.correctAnswers} out of{" "}
                              {part.totalQuestions} questions)
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Question Details */}
                  {testResult?.partSubmissions && (
                    <>
                      <div className="flex items-center mb-5">
                        <FaClock className="text-[#469B74] mr-3" size={24} />
                        <h3 className="text-2xl font-bold font-shopee text-gray-800">
                          Question Details
                        </h3>
                      </div>
                      <div className="border border-gray-200 rounded-xl overflow-hidden mb-10 shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shopee"
                              >
                                Question
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shopee"
                              >
                                Your Answer
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shopee"
                              >
                                Correct Answer
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shopee"
                              >
                                Result
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {testResult.partSubmissions
                              .sort((a, b) => a.partOrder - b.partOrder)
                              .map((part) => (
                                <React.Fragment key={`part-${part.partId}`}>
                                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                                    <td colSpan="4" className="px-6 py-4">
                                      <div className="flex items-center">
                                        <div className="text-lg font-semibold text-gray-800 font-shopee">
                                          {part.partName}
                                        </div>
                                        <div className="ml-4 text-sm text-gray-500 font-shopee">
                                          ({part.correctAnswers} of{" "}
                                          {part.totalQuestions} correct)
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  {part.answers
                                    .filter((answer) => {
                                      const question = flattenedQuestions.find(
                                        (q) => q.id === answer.questionId
                                      );
                                      return (
                                        question &&
                                        question.typeName !== "Part Instruction"
                                      );
                                    })
                                    .sort((a, b) => a.order - b.order)
                                    .map((answer, questionIndex) => {
                                      const questionNumber = questionIndex + 1;
                                      return (
                                        <tr
                                          key={answer.questionId}
                                          className="hover:bg-gray-50 transition-colors"
                                        >
                                          <td className="px-6 py-4 text-sm text-gray-900 font-shopee">
                                            Question {questionNumber}
                                          </td>
                                          <td className="px-6 py-4 text-sm text-gray-500 font-shopee">
                                            {answer.writtenAnswer ||
                                              (answer.selectedOptionIds
                                                ? answer.selectedOptionIds.join(
                                                    ", "
                                                  )
                                                : "Not answered")}
                                          </td>
                                          <td className="px-6 py-4 text-sm text-gray-500 font-shopee">
                                            {answer.correctAnswer || "N/A"}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                            {answer.isCorrect ? (
                                              <span className="px-3 py-1 flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 font-shopee">
                                                <FaCheckCircle className="mr-1" />{" "}
                                                Correct
                                              </span>
                                            ) : (
                                              <span className="px-3 py-1 flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 font-shopee">
                                                <FaTimesCircle className="mr-1" />{" "}
                                                Incorrect
                                              </span>
                                            )}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </React.Fragment>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Action Buttons - Always visible */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="py-3 px-6 bg-[#469B74] text-white rounded-lg font-medium hover:bg-[#3a7d5f] transition-colors flex items-center font-shopee shadow-sm hover:shadow-md"
                >
                  <FaRedo className="mr-2" />
                  Take Another Test
                </button>
                <button
                  onClick={() => window.print()}
                  className="py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center font-shopee shadow-sm hover:shadow-md"
                >
                  <FaDownload className="mr-2" />
                  Download Results
                </button>
                <button
                  onClick={() => navigate("/test-history")}
                  className="py-3 px-6 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center font-shopee shadow-sm hover:shadow-md"
                >
                  <FaArrowRight className="mr-2" />
                  View All Submissions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ResultsModal.propTypes = {
  test: PropTypes.shape({
    title: PropTypes.string.isRequired,
    typeName: PropTypes.string.isRequired,
    testParts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        order: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  testResult: PropTypes.shape({
    totalCorrectAnswers: PropTypes.number,
    totalQuestions: PropTypes.number,
    timeSpent: PropTypes.number,
    partSubmissions: PropTypes.arrayOf(
      PropTypes.shape({
        partId: PropTypes.number.isRequired,
        partName: PropTypes.string.isRequired,
        correctAnswers: PropTypes.number.isRequired,
        totalQuestions: PropTypes.number.isRequired,
        answers: PropTypes.arrayOf(
          PropTypes.shape({
            questionId: PropTypes.number.isRequired,
            writtenAnswer: PropTypes.string,
            isCorrect: PropTypes.bool.isRequired,
            selectedOptionIds: PropTypes.arrayOf(PropTypes.string),
            correctAnswer: PropTypes.string,
          })
        ).isRequired,
      })
    ),
  }),
  flattenedQuestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      typeName: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ResultsModal;
