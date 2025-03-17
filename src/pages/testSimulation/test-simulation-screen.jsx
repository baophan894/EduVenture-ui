"use client";

import { useEffect, useState, useCallback } from "react";
import AnswerSection from "./answer-section";
import BottomNavigation from "./bottom-navigation";
import ConfirmationModal from "./confirmation-modal";
import ResultsModal from "./results-modal";
import { sampleListeningTest, sampleReadingTest } from "./mock-data";
import NavigationModal from "./navigation-modal";
import ProgressBar from "./progress-bar";
import QuestionDisplay from "./question-display";
import QuestionHeader from "./question-header";
import { QUESTION_TYPES, TEST_TYPES } from "./test-types";
import Timer from "./timer";

// Layout options
const LAYOUTS = {
  VERTICAL: "vertical", // Question on top, answer below
  HORIZONTAL: "horizontal", // Question on left, answer on right
  REVERSE_VERTICAL: "reverse-vertical", // Answer on top, question below
  REVERSE_HORIZONTAL: "reverse-horizontal", // Answer on left, question on right
};

const TestSimulationScreen = ({ type = TEST_TYPES.LISTENING }) => {
  // Load appropriate test based on type
  const initialTest =
    type === TEST_TYPES.LISTENING ? sampleListeningTest : sampleReadingTest;

  const [test, setTest] = useState(initialTest);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(test.duration);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [showNavigationModal, setShowNavigationModal] = useState(false);
  const [layout, setLayout] = useState(LAYOUTS.VERTICAL); // Default layout

  const flattenedQuestions = initialTest.parts.flatMap(
    (part) => part.questions
  );

  const filteredTestQuestions = flattenedQuestions.filter(
    (question) => question.type != QUESTION_TYPES.PART_INSTRUCTION
  );

  const currentQuestion = flattenedQuestions[currentQuestionIndex];

  const actualIndex = filteredTestQuestions.findIndex(
    (q) => q.id === currentQuestion.id
  );

  const filteredTotalQuestions = filteredTestQuestions.length;
  const isListeningTest = test.type === TEST_TYPES.LISTENING;
  const answeredCount = Object.values(answers).filter(
    (value) => Boolean(value) && !(Array.isArray(value) && value.length === 0)
  ).length;

  const handleAnswerChange = useCallback((questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  }, []);

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
  }, [timeRemaining, showResultsModal]);

  // Handle timeout - automatically show results without confirmation
  const handleTimeOut = () => {
    setShowResultsModal(true);
    submitTest();
  };

  // Handle audio end for listening tests
  const handleAudioEnd = () => {
    true;

    // For listening test, automatically go to next question when audio ends
    if (isListeningTest) {
      // If it's the last question, submit the test
      if (currentQuestionIndex === flattenedQuestions.length - 1) {
        handleTestCompletion();
      } else {
        // Otherwise, go to next question after a short delay
        setTimeout(() => {
          goToNextQuestion();
        }, 1500); // 1.5 second delay to allow user to see the question before moving on
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
      false;
    } else {
      handleTestCompletion();
    }
  };

  // Navigation functions
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0 && !isListeningTest) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      false;
    }
  };

  // For reading test only - go to specific question
  const goToQuestion = (index) => {
    if (!isListeningTest || index === currentQuestionIndex) {
      setCurrentQuestionIndex(index);
    }
  };

  // Handle test completion - show confirmation first
  const handleTestCompletion = () => {
    setShowConfirmationModal(true);
  };

  // Submit the test
  const submitTest = () => {
    // This is where you would trigger an event or callback
    console.log("Test completed with answers:", answers);
    // In a real app, you might send the results to a server
    // onTestComplete(answers);
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
            Thank you for completing the{" "}
            {isListeningTest ? "TOEIC Listening" : "TOEIC Reading"} test. Your
            answers have been submitted.
          </p>
          <button
            className="bg-[#469B74] hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors font-shopee"
            onClick={() => window.location.reload()}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Render content based on layout
  const renderContent = () => {
    switch (layout) {
      case LAYOUTS.HORIZONTAL:
        return (
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
        );
      case LAYOUTS.REVERSE_VERTICAL:
        return (
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
        );
      case LAYOUTS.REVERSE_HORIZONTAL:
        return (
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
        );
      case LAYOUTS.VERTICAL:
      default:
        return (
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
          disableNavigation={isListeningTest}
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
        disableNavigation={isListeningTest}
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
      {showResultsModal && <ResultsModal test={test} answers={answers} />}
    </div>
  );
};

export default TestSimulationScreen;
