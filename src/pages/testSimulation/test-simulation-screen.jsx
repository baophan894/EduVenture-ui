"use client";

import { useEffect, useState, useCallback } from "react";
import AnswerSection from "./answer-section";
import BottomNavigation from "./bottom-navigation";
import ConfirmationModal from "./confirmation-modal";
import ResultsModal from "./results-modal";
import NavigationModal from "./navigation-modal";
import ProgressBar from "./progress-bar";
import QuestionDisplay from "./question-display";
import QuestionHeader from "./question-header";
import Timer from "./timer";
import AudioPlayer from "./audio-player";
import PropTypes from "prop-types";

// Layout options
const LAYOUTS = {
  VERTICAL: "vertical", // Question on top, answer below
  HORIZONTAL: "horizontal", // Question on left, answer on right
  REVERSE_VERTICAL: "reverse-vertical", // Answer on top, question below
  REVERSE_HORIZONTAL: "reverse-horizontal", // Answer on left, question on right
};

const TestSimulationScreen = ({
  selectedParts = [],
  onExit,
  test,
  totalTime,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(totalTime * 60); // Convert minutes to seconds
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [testCompleted] = useState(false);
  const [showNavigationModal, setShowNavigationModal] = useState(false);
  const [layout, setLayout] = useState(LAYOUTS.VERTICAL); // Default layout
  const [testResult, setTestResult] = useState(null);
  const [currentAudioPartIndex, setCurrentAudioPartIndex] = useState(0);

  // Filter parts based on selected parts
  const filteredParts =
    selectedParts.length > 0
      ? test.testParts
          .filter((part) => selectedParts.includes(part.id))
          .sort((a, b) => a.order - b.order)
      : test.testParts.sort((a, b) => a.order - b.order);

  const flattenedQuestions = filteredParts.flatMap((part) =>
    part.questions
      .sort((a, b) => a.order - b.order)
      .map((question) => ({
        ...question,
        partId: part.id,
        partName: part.name,
      }))
  );

  const filteredTestQuestions = flattenedQuestions.filter(
    (question) => question.typeName !== "Part Instruction" // Filter out PART_INSTRUCTION type
  );

  const currentQuestion = flattenedQuestions[currentQuestionIndex];

  const actualIndex = filteredTestQuestions.findIndex(
    (q) => q.id === currentQuestion.id
  );

  const filteredTotalQuestions = filteredTestQuestions.length;
  const isListeningTest = test.typeName === "LISTENING"; // Check typeName from API
  const answeredCount = Object.values(answers).filter(
    (value) => Boolean(value) && !(Array.isArray(value) && value.length === 0)
  ).length;

  const handleAnswerChange = useCallback((questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  }, []);

  // Submit the test
  const submitTest = useCallback(async () => {
    try {
      // Format answers according to question types
      const formattedAnswers = Object.entries(answers)
        .map(([questionId, answer]) => {
          const question = flattenedQuestions.find(
            (q) => q.id === parseInt(questionId)
          );

          if (!question) return null;

          // Skip if no answer provided
          if (!answer || (Array.isArray(answer) && answer.length === 0)) {
            return {
              questionId: parseInt(questionId),
              writtenAnswer: null,
              selectedOptions: null,
            };
          }

          // Handle different question types
          switch (question.typeName) {
            case "Fill in Blank":
              return {
                questionId: parseInt(questionId),
                writtenAnswer: answer,
                selectedOptions: null,
              };

            case "Single Choice":
              return {
                questionId: parseInt(questionId),
                writtenAnswer: null,
                selectedOptions: [
                  {
                    optionId: answer,
                  },
                ],
              };

            case "Multiple Choice":
              return {
                questionId: parseInt(questionId),
                writtenAnswer: null,
                selectedOptions: Array.isArray(answer)
                  ? answer.map((opt) => ({ optionId: opt }))
                  : [{ optionId: answer }],
              };

            default:
              return null;
          }
        })
        .filter(Boolean); // Remove any null entries

      const submissionData = {
        testId: test.id,
        submittedAt: new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString(), // Add 7 hours for Vietnam timezone
        partIds: selectedParts,
        submittedAnswers: formattedAnswers,
        timeSpent: totalTime * 60 - timeRemaining,
      };

      console.log("Submitting test with data:", submissionData);

      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = token;
      }

      const response = await fetch(
        "http://localhost:8080/api/test-submissions",
        {
          method: "POST",
          headers,
          body: JSON.stringify(submissionData),
        }
      );

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to submit test");
      }

      const result = await response.json();
      console.log("Response data:", result);
      setTestResult(result);
      setShowResultsModal(true);
    } catch (error) {
      console.error("Error submitting test:", error);
      // TODO: Show error message to user
    }
  }, [
    answers,
    flattenedQuestions,
    test.id,
    selectedParts,
    totalTime,
    timeRemaining,
  ]);

  // Handle timeout - automatically show results without confirmation
  const handleTimeOut = useCallback(() => {
    setShowResultsModal(true);
    submitTest();
  }, [submitTest]);

  // Timer effect - only stop when results are shown
  useEffect(() => {
    if (timeRemaining <= 0 || showResultsModal) {
      // Auto-submit when time runs out
      if (timeRemaining <= 0 && !showResultsModal) {
        handleTimeOut();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, showResultsModal, handleTimeOut]);

  // Handle audio end for listening tests
  const handleAudioEnd = () => {
    if (isListeningTest) {
      // Move to next part's audio if available
      if (currentAudioPartIndex < filteredParts.length - 1) {
        setCurrentAudioPartIndex((prev) => prev + 1);
      }
    }
  };

  // Toggle flag for current question
  const toggleFlagQuestion = () => {
    if (flaggedQuestions.includes(currentQuestion.id)) {
      setFlaggedQuestions(
        flaggedQuestions.filter((id) => id !== currentQuestion.id)
      );
    } else {
      setFlaggedQuestions([...flaggedQuestions, currentQuestion.id]);
    }
  };

  // Navigation functions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < flattenedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleTestCompletion();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  // Handle test completion - show confirmation first
  const handleTestCompletion = () => {
    setShowConfirmationModal(true);
  };

  // Handle confirmation submission
  const handleConfirmSubmit = () => {
    setShowConfirmationModal(false);
    setShowResultsModal(true);
    submitTest();
  };

  // Close modals
  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  // Toggle navigation modal
  const toggleNavigationModal = () => {
    setShowNavigationModal(!showNavigationModal);
  };

  // Add ESC key handler
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        if (showNavigationModal) {
          setShowNavigationModal(false);
        }
        if (showConfirmationModal) {
          setShowConfirmationModal(false);
        }
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [showNavigationModal, showConfirmationModal]);

  // If test is completed, show completion screen
  if (testCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 font-shopee flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#469B74] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 font-shopee">
            Test Completed!
          </h2>
          <p className="text-gray-600 mb-6 font-shopee">
            Thank you for completing the {test.typeName} test. Your answers have
            been submitted.
          </p>
          <button
            className="bg-[#469B74] hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors font-shopee"
            onClick={onExit}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Modify the renderContent function
  const renderContent = () => {
    const currentPart = filteredParts[currentAudioPartIndex];
    const audioPlayer = isListeningTest && currentPart?.audioUrl && (
      <AudioPlayer
        audioUrl={currentPart.audioUrl}
        onAudioEnd={handleAudioEnd}
        showResultsModal={showResultsModal}
      />
    );

    switch (layout) {
      case LAYOUTS.HORIZONTAL:
        return (
          <div className="flex flex-col h-full">
            {audioPlayer}
            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <QuestionDisplay
                  test={test}
                  question={currentQuestion}
                  onAudioEnd={handleAudioEnd}
                  showResultsModal={showResultsModal}
                />
                <AnswerSection
                  question={currentQuestion}
                  answer={answers[currentQuestion.id]}
                  onAnswerChange={handleAnswerChange}
                />
              </div>
            </div>
          </div>
        );
      case LAYOUTS.REVERSE_VERTICAL:
        return (
          <div className="flex flex-col h-full">
            {audioPlayer}
            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-1 gap-6">
                <AnswerSection
                  question={currentQuestion}
                  answer={answers[currentQuestion.id]}
                  onAnswerChange={handleAnswerChange}
                />
                <QuestionDisplay
                  test={test}
                  question={currentQuestion}
                  onAudioEnd={handleAudioEnd}
                  showResultsModal={showResultsModal}
                />
              </div>
            </div>
          </div>
        );
      case LAYOUTS.REVERSE_HORIZONTAL:
        return (
          <div className="flex flex-col h-full">
            {audioPlayer}
            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnswerSection
                  question={currentQuestion}
                  answer={answers[currentQuestion.id]}
                  onAnswerChange={handleAnswerChange}
                />
                <QuestionDisplay
                  test={test}
                  question={currentQuestion}
                  onAudioEnd={handleAudioEnd}
                  showResultsModal={showResultsModal}
                />
              </div>
            </div>
          </div>
        );
      case LAYOUTS.VERTICAL:
      default:
        return (
          <div className="flex flex-col h-full">
            {audioPlayer}
            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-1 gap-6">
                <QuestionDisplay
                  test={test}
                  question={currentQuestion}
                  onAudioEnd={handleAudioEnd}
                  showResultsModal={showResultsModal}
                />
                <AnswerSection
                  question={currentQuestion}
                  answer={answers[currentQuestion.id]}
                  onAnswerChange={handleAnswerChange}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-shopee pb-20">
      {/* Header with timer */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 font-shopee">
              {test.title}
            </h1>
            <div className="flex items-center gap-4">
              <Timer timeRemaining={timeRemaining} />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        <ProgressBar
          filteredTotalQuestions={filteredTotalQuestions}
          answeredCount={answeredCount}
        />

        <QuestionHeader
          question={currentQuestion}
          questionNumber={actualIndex + 1}
          filteredTotalQuestions={filteredTotalQuestions}
          isFlagged={flaggedQuestions.includes(currentQuestion.id)}
          onToggleFlag={toggleFlagQuestion}
          onPrevious={goToPreviousQuestion}
          onNext={goToNextQuestion}
          disableNavigation={false}
          layout={layout}
          setLayout={setLayout}
        />

        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={flattenedQuestions.length}
        filteredTotalQuestions={filteredTestQuestions}
        onPrevious={goToPreviousQuestion}
        onNext={goToNextQuestion}
        onFinish={handleTestCompletion}
        onOpenNavigation={toggleNavigationModal}
        disableNavigation={false}
        actualIndex={actualIndex}
        currentQuestion={currentQuestion}
      />

      {/* Navigation Modal */}
      <NavigationModal
        isOpen={showNavigationModal}
        onClose={toggleNavigationModal}
        test={test}
        questions={flattenedQuestions}
        currentQuestionIndex={currentQuestionIndex}
        answers={answers}
        flaggedQuestions={flaggedQuestions}
        onQuestionSelect={goToQuestion}
        onFinish={handleTestCompletion}
      />

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <ConfirmationModal
          filteredTestQuestions={filteredTestQuestions}
          answers={answers}
          flaggedQuestions={flaggedQuestions}
          onClose={handleCloseConfirmationModal}
          onSubmit={handleConfirmSubmit}
        />
      )}

      {/* Results Modal */}
      {showResultsModal && (
        <ResultsModal
          test={test}
          testResult={testResult}
          flattenedQuestions={flattenedQuestions}
          onClose={() => {
            setShowResultsModal(false);
            onExit();
          }}
        />
      )}
    </div>
  );
};

TestSimulationScreen.propTypes = {
  selectedParts: PropTypes.arrayOf(PropTypes.number),
  onExit: PropTypes.func,
  test: PropTypes.shape({
    id: PropTypes.number.isRequired,
    typeId: PropTypes.number.isRequired,
    typeName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    testParts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        questions: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            typeId: PropTypes.number.isRequired,
            typeName: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
  totalTime: PropTypes.number.isRequired,
};

export default TestSimulationScreen;
