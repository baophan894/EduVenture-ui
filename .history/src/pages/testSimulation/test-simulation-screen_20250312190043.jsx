"use client"

import { useState, useEffect } from "react"
import { TEST_TYPES } from "./test-types"
import Timer from "./timer"
import ProgressBar from "./progress-bar"
import QuestionDisplay from "./question-display"
import AnswerSection from "./answer-section"
import NavigationPanel from "./navigation-panel"
import CompletionModal from "./completion-modal"
import { sampleListeningTest, sampleReadingTest } from "./mock-data"

const TestSimulationScreen = ({ type = TEST_TYPES.READING }) => {
  // Load appropriate test based on type
  const initialTest = type === TEST_TYPES.LISTENING ? sampleListeningTest : sampleReadingTest

  const [test, setTest] = useState(initialTest)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(test.duration)
  const [answers, setAnswers] = useState({})
  const [flaggedQuestions, setFlaggedQuestions] = useState([])
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [audioCompleted, setAudioCompleted] = useState(false)

  const currentQuestion = test.questions[currentQuestionIndex]
  const isListeningTest = test.type === TEST_TYPES.LISTENING

  // Timer effect
  useEffect(() => {
    if (timeRemaining <= 0 || testCompleted) {
      handleTestCompletion()
      return
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining, testCompleted])

  // Handle audio end for listening tests
  const handleAudioEnd = () => {
    setAudioCompleted(true)
    // You can add specific logic here when audio ends
    console.log("Audio playback completed")
  }

  // Handle answer changes
  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    })
  }

  // Toggle flag for current question
  const toggleFlagQuestion = () => {
    if (flaggedQuestions.includes(currentQuestion.id)) {
      setFlaggedQuestions(flaggedQuestions.filter((id) => id !== currentQuestion.id))
    } else {
      setFlaggedQuestions([...flaggedQuestions, currentQuestion.id])
    }
  }

  // Navigation functions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setAudioCompleted(false)
    } else {
      handleTestCompletion()
    }
  }

  // For reading test only - go to specific question
  const goToQuestion = (index) => {
    if (!isListeningTest) {
      setCurrentQuestionIndex(index)
    }
  }

  // Handle test completion
  const handleTestCompletion = () => {
    setShowCompletionModal(true)
  }

  const submitTest = () => {
    setTestCompleted(true)
    setShowCompletionModal(false)

    // This is where you would trigger an event or callback
    console.log("Test completed with answers:", answers)

    // In a real app, you might send the results to a server
    // onTestComplete(answers);
  }

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 font-shopee">Test Completed!</h2>
          <p className="text-gray-600 mb-6 font-shopee">
            Thank you for completing the {isListeningTest ? "TOEIC Listening" : "TOEIC Reading"} test. Your answers have
            been submitted.
          </p>
          <button
            className="bg-[#469B74] hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors font-shopee"
            onClick={() => window.location.reload()}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-shopee">
      {/* Header with timer */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 font-shopee">{test.title}</h1>
            <Timer timeRemaining={timeRemaining} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        <ProgressBar currentQuestionIndex={currentQuestionIndex} totalQuestions={test.questions.length} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Question Display */}
          <div className="lg:col-span-7">
            <QuestionDisplay
              test={test}
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              isFlagged={flaggedQuestions.includes(currentQuestion.id)}
              onToggleFlag={toggleFlagQuestion}
              onAudioEnd={handleAudioEnd}
            />
          </div>

          {/* Right Column - Answer Section and Navigation */}
          <div className="lg:col-span-5 space-y-6">
            {/* Answer Section */}
            <AnswerSection
              question={currentQuestion}
              answer={answers[currentQuestion.id]}
              onAnswerChange={handleAnswerChange}
            />

            {/* Navigation Panel */}
            <NavigationPanel
              test={test}
              questions={test.questions}
              currentQuestionIndex={currentQuestionIndex}
              answers={answers}
              flaggedQuestions={flaggedQuestions}
              onQuestionSelect={goToQuestion}
              onNext={goToNextQuestion}
              onFinish={handleTestCompletion}
            />
          </div>
        </div>
      </main>

      {/* Completion Modal */}
      {showCompletionModal && (
        <CompletionModal
          test={test}
          answers={answers}
          flaggedQuestions={flaggedQuestions}
          onClose={() => setShowCompletionModal(false)}
          onSubmit={submitTest}
        />
      )}
    </div>
  )
}

export default TestSimulationScreen

