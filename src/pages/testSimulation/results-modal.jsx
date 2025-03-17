"use client";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaChartBar,
  FaArrowRight,
  FaDownload,
  FaRedo,
} from "react-icons/fa";

const ResultsModal = ({ test, answers }) => {
  // Mock result data - in a real app, this would be calculated based on actual answers
  const mockResults = {
    score: {
      total: 85,
      correct: 17,
      incorrect: 3,
      unanswered: 0,
    },
    sections: [
      {
        name: "Listening Comprehension",
        score: 90,
        correct: 9,
        total: 10,
      },
      {
        name: "Reading Comprehension",
        score: 80,
        correct: 8,
        total: 10,
      },
    ],
    details: [
      {
        id: 1,
        question: "What is the woman's name?",
        yourAnswer: "Sarah Thompson",
        correctAnswer: "Sarah Thompson",
        isCorrect: true,
      },
      {
        id: 2,
        question: "What is the purpose of the woman's call?",
        yourAnswer: "To register for a course",
        correctAnswer: "To register for a course",
        isCorrect: true,
      },
      {
        id: 3,
        question: "When does the course begin?",
        yourAnswer: "September 10",
        correctAnswer: "September 15",
        isCorrect: false,
      },
      // More detailed results would be here
    ],
    feedback:
      "Great job! You've demonstrated strong listening and reading skills. Consider reviewing dates and specific details in conversations to improve further.",
    timeSpent: "28:45",
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto">
        <div className="max-h-[90vh] overflow-hidden rounded-lg">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-[#469B74] bg-opacity-20 mb-4">
                  <FaCheckCircle className="text-[#469B74]" size={36} />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800 font-shopee">
                  Test Completed!
                </h2>
                <p className="text-gray-600 font-shopee">
                  You've completed the {test.title}. Here are your results:
                </p>
              </div>

              {/* Score Overview */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="text-center mb-4 md:mb-0">
                    <div className="text-4xl font-bold text-[#469B74] font-shopee">
                      {mockResults.score.total}%
                    </div>
                    <div className="text-gray-500 font-shopee">
                      Overall Score
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#469B74] font-shopee">
                        {mockResults.score.correct}
                      </div>
                      <div className="text-gray-500 font-shopee">Correct</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-500 font-shopee">
                        {mockResults.score.incorrect}
                      </div>
                      <div className="text-gray-500 font-shopee">Incorrect</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-400 font-shopee">
                        {mockResults.score.unanswered}
                      </div>
                      <div className="text-gray-500 font-shopee">
                        Unanswered
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-4 md:mt-0">
                    <div className="text-xl font-bold text-gray-700 font-shopee">
                      {mockResults.timeSpent}
                    </div>
                    <div className="text-gray-500 font-shopee">Time Spent</div>
                  </div>
                </div>
              </div>

              {/* Section Scores */}
              <h3 className="text-xl font-bold mb-4 font-shopee">
                Section Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {mockResults.sections.map((section, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold font-shopee">
                        {section.name}
                      </h4>
                      <div className="text-lg font-bold text-[#469B74] font-shopee">
                        {section.score}%
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div
                        className="bg-[#469B74] h-2.5 rounded-full"
                        style={{ width: `${section.score}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 font-shopee">
                      {section.correct} correct out of {section.total} questions
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed Results */}
              <h3 className="text-xl font-bold mb-4 font-shopee">
                Question Details
              </h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shopee"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shopee"
                      >
                        Question
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shopee"
                      >
                        Your Answer
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shopee"
                      >
                        Correct Answer
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-shopee"
                      >
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockResults.details.map((detail) => (
                      <tr key={detail.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-shopee">
                          {detail.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-shopee">
                          {detail.question}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 font-shopee">
                          {detail.yourAnswer}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 font-shopee">
                          {detail.correctAnswer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {detail.isCorrect ? (
                            <span className="px-2 flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 font-shopee">
                              <FaCheckCircle className="mr-1" /> Correct
                            </span>
                          ) : (
                            <span className="px-2 flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 font-shopee">
                              <FaTimesCircle className="mr-1" /> Incorrect
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Feedback */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaChartBar className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 font-shopee">
                      Feedback
                    </h3>
                    <div className="mt-2 text-sm text-blue-700 font-shopee">
                      <p>{mockResults.feedback}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="py-2 px-4 bg-[#469B74] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center font-shopee"
                >
                  <FaRedo className="mr-2" />
                  Take Another Test
                </button>
                <button
                  onClick={() => window.print()}
                  className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center font-shopee"
                >
                  <FaDownload className="mr-2" />
                  Download Results
                </button>
                <button
                  onClick={() => (window.location.href = "/dashboard")}
                  className="py-2 px-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center font-shopee"
                >
                  <FaArrowRight className="mr-2" />
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsModal;
