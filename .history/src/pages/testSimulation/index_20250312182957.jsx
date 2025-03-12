import { useState, useEffect, useRef } from "react";
import {
  FaClock,
  FaVolumeUp,
  FaVolumeMute,
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaExclamationTriangle,
  FaFlag,
  FaTimes,
} from "react-icons/fa";

// Sample test data - in a real app, this would come from an API or props
const sampleTest = {
  id: "ielts-listening-1",
  title: "IELTS Listening Test - Section 1",
  duration: 30 * 60, // 30 minutes in seconds
  audioUrl: "/sample-audio.mp3",
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      text: "What is the woman's name?",
      imageUrl: null,
      options: [
        { id: "A", text: "Sarah Johnson" },
        { id: "B", text: "Sarah Thompson" },
        { id: "C", text: "Sarah Jackson" },
        { id: "D", text: "Sarah Williams" },
      ],
      correctAnswer: "B",
    },
    {
      id: 2,
      type: "multiple-choice",
      text: "What is the purpose of the woman's call?",
      imageUrl: null,
      options: [
        { id: "A", text: "To book a hotel room" },
        { id: "B", text: "To inquire about job opportunities" },
        { id: "C", text: "To make a restaurant reservation" },
        { id: "D", text: "To register for a course" },
      ],
      correctAnswer: "D",
    },
    {
      id: 3,
      type: "fill-in-blank",
      text: "The course begins on ________.",
      imageUrl: null,
      correctAnswer: "September 15",
    },
    {
      id: 4,
      type: "multiple-choice",
      text: "Which image shows the correct location of the campus?",
      imageUrl: "/placeholder.svg?height=300&width=500",
      options: [
        { id: "A", text: "North entrance" },
        { id: "B", text: "South entrance" },
        { id: "C", text: "East entrance" },
        { id: "D", text: "West entrance" },
      ],
      correctAnswer: "C",
    },
    {
      id: 5,
      type: "fill-in-blank",
      text: "The registration fee is $________.",
      imageUrl: null,
      correctAnswer: "250",
    },
  ],
};

const TestSimulationPage = () => {
  const [test, setTest] = useState(sampleTest);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(test.duration);
  const [answers, setAnswers] = useState({});
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);

  const audioRef = useRef(null);
  const currentQuestion = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;

  // Timer effect
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleTestCompletion();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle audio playback
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => {
        setAudioPlaying(false);
        setAudioEnded(true);
      });
    }
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  // Handle answer changes
  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  // Navigation functions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
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

  // Flag question for review
  const toggleFlagQuestion = () => {
    if (flaggedQuestions.includes(currentQuestion.id)) {
      setFlaggedQuestions(
        flaggedQuestions.filter((id) => id !== currentQuestion.id)
      );
    } else {
      setFlaggedQuestions([...flaggedQuestions, currentQuestion.id]);
    }
  };

  // Handle test completion
  const handleTestCompletion = () => {
    setShowCompletionModal(true);
    // Additional logic for test completion can be added here
    // This is where you would trigger the event for handling test completion
  };

  const submitTest = () => {
    // Logic to submit test answers
    console.log("Test submitted with answers:", answers);
    // Here you would typically send the answers to your backend
    setShowCompletionModal(false);
    // Redirect or show results
  };

  return (
    <div className="min-h-screen bg-gray-50 font-shopee">
      {/* Audio element for listening tests */}
      <audio ref={audioRef} src={test.audioUrl} />

      {/* Header with timer and audio controls */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 font-shopee">
              {test.title}
            </h1>
            <div className="flex items-center gap-4">
              {test.audioUrl && (
                <button
                  onClick={toggleAudio}
                  disabled={audioEnded}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    audioEnded
                      ? "bg-gray-200 text-gray-500"
                      : audioPlaying
                      ? "bg-[#FCB80B] text-white"
                      : "bg-[#FCB80B] bg-opacity-20 text-[#FCB80B]"
                  }`}
                >
                  {audioPlaying ? (
                    <>
                      <FaVolumeMute /> Pause Audio
                    </>
                  ) : audioEnded ? (
                    <>
                      <FaVolumeMute /> Audio Completed
                    </>
                  ) : (
                    <>
                      <FaVolumeUp /> Play Audio
                    </>
                  )}
                </button>
              )}
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  timeRemaining < 300
                    ? "bg-red-100 text-red-600"
                    : "bg-[#469B74] bg-opacity-10 text-[#469B74]"
                }`}
              >
                <FaClock />
                <span className="font-bold font-shopee">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span className="font-shopee">
              Question {currentQuestionIndex + 1} of {test.questions.length}
            </span>
            <span className="font-shopee">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#469B74]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-gray-800 font-shopee">
                Question {currentQuestionIndex + 1}
              </h2>
              <button
                onClick={toggleFlagQuestion}
                className={`p-2 rounded-full ${
                  flaggedQuestions.includes(currentQuestion.id)
                    ? "bg-[#FCB80B] text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
                title={
                  flaggedQuestions.includes(currentQuestion.id)
                    ? "Unflag this question"
                    : "Flag for review"
                }
              >
                <FaFlag />
              </button>
            </div>

            <p className="text-gray-700 mb-4 font-shopee">
              {currentQuestion.text}
            </p>

            {currentQuestion.imageUrl && (
              <div className="mb-4">
                <img
                  src={currentQuestion.imageUrl || "/placeholder.svg"}
                  alt="Question visual"
                  className="max-w-full rounded-lg border border-gray-200"
                />
              </div>
            )}

            {/* Multiple choice options in question section */}
            {currentQuestion.type === "multiple-choice" && (
              <div className="space-y-3 mt-6">
                {currentQuestion.options.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      answers[currentQuestion.id] === option.id
                        ? "border-[#469B74] bg-[#469B74] bg-opacity-5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option.id}
                      checked={answers[currentQuestion.id] === option.id}
                      onChange={() => handleAnswerChange(option.id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                        answers[currentQuestion.id] === option.id
                          ? "border-[#469B74] bg-[#469B74]"
                          : "border-gray-400"
                      }`}
                    >
                      {answers[currentQuestion.id] === option.id && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <div className="flex-1 font-shopee">
                      <span className="font-medium">{option.id}.</span>{" "}
                      {option.text}
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* Fill in the blank in question section */}
            {currentQuestion.type === "fill-in-blank" && (
              <div className="mt-6">
                <input
                  type="text"
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#469B74] focus:border-transparent font-shopee"
                />
              </div>
            )}
          </div>

          {/* Answer Section / Navigation */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 font-shopee">
              Navigation
            </h2>

            {/* Question navigation grid */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {test.questions.map((question, index) => (
                <button
                  key={question.id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`h-10 rounded-md flex items-center justify-center font-medium transition-colors ${
                    index === currentQuestionIndex
                      ? "bg-[#469B74] text-white"
                      : answers[question.id]
                      ? "bg-[#469B74] bg-opacity-20 text-[#469B74]"
                      : flaggedQuestions.includes(question.id)
                      ? "bg-[#FCB80B] bg-opacity-20 text-[#FCB80B]"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } font-shopee`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="mb-6 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-4 h-4 bg-[#469B74] bg-opacity-20 mr-2"></div>
                <span className="font-shopee">Answered</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-4 h-4 bg-[#FCB80B] bg-opacity-20 mr-2"></div>
                <span className="font-shopee">Flagged for review</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-4 h-4 bg-gray-100 mr-2"></div>
                <span className="font-shopee">Not visited</span>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-auto">
              <button
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                  currentQuestionIndex === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } font-shopee`}
              >
                <FaArrowLeft size={14} />
                Previous
              </button>
              {currentQuestionIndex < test.questions.length - 1 ? (
                <button
                  onClick={goToNextQuestion}
                  className="flex-1 py-2 px-4 bg-[#469B74] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 font-shopee"
                >
                  Next
                  <FaArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={handleTestCompletion}
                  className="flex-1 py-2 px-4 bg-[#FCB80B] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 font-shopee"
                >
                  Finish Test
                  <FaCheck size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Test Completion Modal */}
      {showCompletionModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowCompletionModal(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-11/12 max-w-md">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-[#FCB80B] bg-opacity-20 mb-4">
                  <FaExclamationTriangle className="text-[#FCB80B]" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 font-shopee">
                  Submit Test?
                </h3>
                <p className="text-gray-600 font-shopee">
                  You are about to submit your test. Once submitted, you cannot
                  change your answers.
                </p>

                <div className="mt-4 text-left">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 font-shopee">
                      Total Questions:
                    </span>
                    <span className="font-medium font-shopee">
                      {test.questions.length}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 font-shopee">Answered:</span>
                    <span className="font-medium font-shopee">
                      {Object.keys(answers).length}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 font-shopee">
                      Unanswered:
                    </span>
                    <span className="font-medium text-red-500 font-shopee">
                      {test.questions.length - Object.keys(answers).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-shopee">
                      Flagged for review:
                    </span>
                    <span className="font-medium text-[#FCB80B] font-shopee">
                      {flaggedQuestions.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowCompletionModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-shopee"
                >
                  <FaTimes size={14} />
                  Continue Test
                </button>
                <button
                  onClick={submitTest}
                  className="flex-1 py-2 px-4 bg-[#469B74] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 font-shopee"
                >
                  <FaCheck size={14} />
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TestSimulationPage;
