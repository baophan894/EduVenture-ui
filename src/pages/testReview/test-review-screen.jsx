"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AnswerSection from "./answer-section";
import BottomNavigation from "../testSimulation/bottom-navigation";
import NavigationModal from "../testSimulation/navigation-modal";
import ProgressBar from "../testSimulation/progress-bar";
import QuestionDisplay from "../testSimulation/question-display";
import QuestionHeader from "../testSimulation/question-header";

// Layout options
const LAYOUTS = {
  VERTICAL: "vertical", // Question on top, answer below
  HORIZONTAL: "horizontal", // Question on left, answer on right
  REVERSE_VERTICAL: "reverse-vertical", // Answer on top, question below
  REVERSE_HORIZONTAL: "reverse-horizontal", // Answer on left, question on right
};

const TestReviewScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showNavigationModal, setShowNavigationModal] = useState(false);
  const [layout, setLayout] = useState(LAYOUTS.VERTICAL);
  const [submissionData, setSubmissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch submission data
  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = token;
        }

        const response = await fetch(
          `http://https://safeeduapi-dev.site/api/test-submissions/${id}`,
          {
            headers,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch submission data");
        }

        const data = await response.json();
        setSubmissionData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissionData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!submissionData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        No submission data found
      </div>
    );
  }

  // Flatten all questions from all parts
  const flattenedQuestions = submissionData.partSubmissions
    .sort((a, b) => a.partOrder - b.partOrder)
    .flatMap((part) =>
      part.answers
        .sort((a, b) => a.order - b.order)
        .map((answer) => ({
          ...answer,
          id: answer.questionId,
          partId: part.partId,
          partName: part.partName,
          typeName: answer.questionType,
          title: answer.questionTitle,
          questionInstruction: answer.questionInstruction,
          answerInstruction: answer.answerInstruction,
          questionNumber: answer.order,
          questionOptions: answer.questionOptions || [],
        }))
    );

  const filteredTestQuestions = flattenedQuestions.filter(
    (question) => question.typeName !== "PART_INSTRUCTION"
  );

  const currentQuestion = flattenedQuestions[currentQuestionIndex];

  const actualIndex = filteredTestQuestions.findIndex(
    (q) => q.id === currentQuestion.id
  );

  // Navigation functions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < flattenedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setShowNavigationModal(false);
  };

  const toggleNavigationModal = () => {
    setShowNavigationModal(!showNavigationModal);
  };

  // Calculate answered questions
  const getAnsweredQuestionsCount = () => {
    return flattenedQuestions.filter(
      (question) =>
        question.typeName !== "PART_INSTRUCTION" &&
        (question.selectedOptionIds?.length > 0 || question.writtenAnswer)
    ).length;
  };

  const handleReturnToHistory = () => {
    navigate("/test-history");
  };

  // Render content based on layout
  const renderContent = () => {
    const isPartInstruction = currentQuestion.typeName === "PART_INSTRUCTION";

    switch (layout) {
      case LAYOUTS.HORIZONTAL:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuestionDisplay
              test={{ typeName: submissionData.testTypeName }}
              question={currentQuestion}
              onAudioEnd={() => {}}
              showResultsModal={false}
            />
            {!isPartInstruction && <AnswerSection question={currentQuestion} />}
          </div>
        );
      case LAYOUTS.REVERSE_VERTICAL:
        return (
          <div className="grid grid-cols-1 gap-6">
            {!isPartInstruction && <AnswerSection question={currentQuestion} />}
            <QuestionDisplay
              test={{ typeName: submissionData.testTypeName }}
              question={currentQuestion}
              onAudioEnd={() => {}}
              showResultsModal={false}
            />
          </div>
        );
      case LAYOUTS.REVERSE_HORIZONTAL:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!isPartInstruction && <AnswerSection question={currentQuestion} />}
            <QuestionDisplay
              test={{ typeName: submissionData.testTypeName }}
              question={currentQuestion}
              onAudioEnd={() => {}}
              showResultsModal={false}
            />
          </div>
        );
      case LAYOUTS.VERTICAL:
      default:
        return (
          <div className="grid grid-cols-1 gap-6">
            <QuestionDisplay
              test={{ typeName: submissionData.testTypeName }}
              question={currentQuestion}
              onAudioEnd={() => {}}
              showResultsModal={false}
            />
            {!isPartInstruction && <AnswerSection question={currentQuestion} />}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-shopee pb-20">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 font-shopee">
              {submissionData.testTitle}
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        <ProgressBar
          filteredTotalQuestions={filteredTestQuestions.length}
          answeredCount={getAnsweredQuestionsCount()}
        />

        <QuestionHeader
          question={currentQuestion}
          questionNumber={actualIndex + 1}
          filteredTotalQuestions={filteredTestQuestions.length}
          isFlagged={false}
          onToggleFlag={() => {}}
          onPrevious={goToPreviousQuestion}
          onNext={goToNextQuestion}
          disableNavigation={false}
          layout={layout}
          setLayout={setLayout}
          isReviewMode={true}
        />

        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation
        currentQuestionIndex={currentQuestionIndex}
        currentQuestion={currentQuestion}
        filteredTotalQuestions={filteredTestQuestions}
        totalQuestions={flattenedQuestions.length}
        onPrevious={goToPreviousQuestion}
        onNext={goToNextQuestion}
        onFinish={handleReturnToHistory}
        onOpenNavigation={toggleNavigationModal}
        disableNavigation={false}
        actualIndex={actualIndex}
        isReviewMode={true}
      />

      {/* Navigation Modal */}
      {showNavigationModal && (
        <NavigationModal
          isOpen={showNavigationModal}
          onClose={toggleNavigationModal}
          test={{ typeName: submissionData.testTypeName }}
          questions={flattenedQuestions}
          currentQuestionIndex={currentQuestionIndex}
          answers={flattenedQuestions.reduce((acc, q) => {
            // Only include answered questions
            if (q.selectedOptionIds?.length > 0 || q.writtenAnswer) {
              return {
                ...acc,
                [q.id]: {
                  isCorrect: q.isCorrect,
                  selectedOptionIds: q.selectedOptionIds,
                  writtenAnswer: q.writtenAnswer,
                },
              };
            }
            return acc;
          }, {})}
          flaggedQuestions={[]}
          onQuestionSelect={goToQuestion}
          onFinish={() => {}}
          isReviewMode={true}
        />
      )}
    </div>
  );
};

export default TestReviewScreen;
