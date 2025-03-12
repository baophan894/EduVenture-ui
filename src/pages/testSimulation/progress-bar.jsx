const ProgressBar = ({
  currentQuestionIndex,
  totalQuestions,
  answeredCount,
}) => {
  // Calculate progress based on questions answered
  const progress = (answeredCount / totalQuestions) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span className="font-shopee">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
        <span className="font-shopee">
          {answeredCount} of {totalQuestions} answered ({Math.round(progress)}%)
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#469B74]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
