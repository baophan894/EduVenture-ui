"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TestSubmissionHistory() {
  const navigate = useNavigate();
  // State for submissions and pagination
  const [submissions, setSubmissions] = useState([]);
  const [pagination, setPagination] = useState({
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
    pageSize: 10,
    first: true,
    last: false,
    numberOfElements: 0,
  });

  // State for filters and sorting
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSubmission, setExpandedSubmission] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Fetch submissions based on current filters, sorting, and pagination
  const fetchSubmissions = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://safeeduapi-dev.site/api/test-submissions?sort=submittedAt,desc&page=${pagination.pageNumber}&size=${pagination.pageSize}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch submissions");
      }

      const data = await response.json();

      setSubmissions(data.content || []);
      setPagination({
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        pageNumber: data.number,
        pageSize: data.size,
        first: data.first,
        last: data.last,
        numberOfElements: data.numberOfElements,
      });
    } catch (error) {
      console.error("Error fetching submissions:", error);
      alert("Failed to load test submissions");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a submission
  const deleteSubmission = async (submissionId) => {
    console.log("Deleting submission with ID:", submissionId);
    try {
      const response = await fetch(
        `https://safeeduapi-dev.site/api/test-submissions/${submissionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Delete response not OK:", response.status);
        throw new Error("Failed to delete submission");
      }

      console.log("Submission deleted successfully");
      showNotification("Test submission deleted successfully");
      setDeleteConfirmation(null);
      // Refresh the list
      fetchSubmissions();
    } catch (error) {
      console.error("Error deleting submission:", error);
      showNotification(
        "Failed to delete test submission: " + error.message,
        "error"
      );
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        pageNumber: newPage,
      }));
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return dateString;
    }
  };

  // Format time for display
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (remainingSeconds > 0 || parts.length === 0)
      parts.push(`${remainingSeconds}s`);

    return parts.join(" ");
  };

  // Calculate score percentage
  const calculateScore = (correct, total) => {
    if (total === 0) return "0%";
    return `${Math.round((correct / total) * 100)}%`;
  };

  // Toggle expanded submission
  const toggleExpand = (submissionId) => {
    if (expandedSubmission === submissionId) {
      setExpandedSubmission(null);
    } else {
      setExpandedSubmission(submissionId);
    }
  };

  // Navigate to test detail
  const viewTest = (testId) => {
    navigate(`/test-library/detail/${testId}`);
  };

  // Navigate to submission detail
  const viewSubmission = (submissionId) => {
    navigate(`/test-review/${submissionId}`);
  };

  // Effect to fetch submissions when dependencies change
  useEffect(() => {
    fetchSubmissions();
  }, [pagination.pageNumber, pagination.pageSize]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed bottom-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg 
            transform transition-all duration-500 ease-in-out
            ${notification.type === "error" ? "bg-red-500" : "bg-[#469B74]"} 
            text-white
            animate-slide-in`}
          style={{
            animation: "slideIn 0.5s ease-out forwards",
          }}
        >
          <div className="flex items-center space-x-2">
            {notification.type === "success" ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            0% {
              transform: translateX(100%) translateY(100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0) translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>

      <h1 className="text-3xl font-bold mb-6 text-[#469B74]">
        Test Submission History
      </h1>

      {/* Submissions Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex-grow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Submitted At
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Test Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Test Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Instructor
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Time Spent
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Score
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Loading submissions...
                  </td>
                </tr>
              ) : submissions.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No submissions found
                  </td>
                </tr>
              ) : (
                submissions.map((submission) => (
                  <React.Fragment key={submission.id}>
                    <tr
                      className="hover:bg-gray-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(submission.id);
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(submission.submittedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {submission.testTitle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {submission.testTypeName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {submission.instructorName || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatTime(submission.timeSpent)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {submission.totalCorrectAnswers} /{" "}
                        {submission.totalQuestions}
                        <span className="ml-2 text-xs text-gray-500">
                          (
                          {calculateScore(
                            submission.totalCorrectAnswers,
                            submission.totalQuestions
                          )}
                          )
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              viewTest(submission.testId);
                            }}
                            className="text-white bg-[#469B74] hover:bg-[#3a8963] px-3 py-1 rounded text-xs"
                          >
                            View Test
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              viewSubmission(submission.id);
                            }}
                            className="text-white bg-[#469B74] hover:bg-[#3a8963] px-3 py-1 rounded text-xs"
                          >
                            View Submission
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirmation(submission.id);
                            }}
                            className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(submission.id);
                            }}
                            className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded border border-gray-300 text-xs"
                          >
                            {expandedSubmission === submission.id ? "▲" : "▼"}
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedSubmission === submission.id && (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 bg-gray-50">
                          <div className="border-t border-gray-200 pt-4">
                            <h3 className="text-sm font-medium text-[#469B74] mb-2">
                              Part Submissions
                            </h3>
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Part Name
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Score
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Part Score
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {submission.partSubmissions
                                    .sort((a, b) => a.partOrder - b.partOrder)
                                    .map((part) => (
                                      <tr
                                        key={part.partId}
                                        className="hover:bg-gray-50"
                                      >
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                          {part.partName}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                          {part.correctAnswers} /{" "}
                                          {part.totalQuestions}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                          {part.partScore}
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(pagination.pageNumber - 1)}
              disabled={pagination.first}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                pagination.first
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(pagination.pageNumber + 1)}
              disabled={pagination.last}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                pagination.last
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {pagination.numberOfElements}
                </span>{" "}
                of{" "}
                <span className="font-medium">{pagination.totalElements}</span>{" "}
                submissions
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handlePageChange(pagination.pageNumber - 1)}
                  disabled={pagination.first}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    pagination.first
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      i === pagination.pageNumber
                        ? "z-10 bg-[#FCB80B] border-[#FCB80B] text-white"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(pagination.pageNumber + 1)}
                  disabled={pagination.last}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    pagination.last
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
            <div>
              <select
                value={pagination.pageSize}
                onChange={(e) => {
                  setPagination((prev) => ({
                    ...prev,
                    pageSize: Number(e.target.value),
                    pageNumber: 0,
                  }));
                }}
                className="ml-3 border border-gray-300 rounded-md text-sm py-1 px-2"
              >
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Delete Submission
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this test submission? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteSubmission(deleteConfirmation)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestSubmissionHistory;
