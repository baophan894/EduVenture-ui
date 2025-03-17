const ProgressBar = ({ filteredTotalQuestions, answeredCount }) => {
  // Calculate progress based on questions answered
  const progress = (answeredCount / filteredTotalQuestions) * 100;

  return (
    <div className="mb-6">
      <div className="flex text-sm text-gray-600 mb-1">
        <span className="font-shopee ml-auto">
          {answeredCount} of {filteredTotalQuestions} answered (
          {Math.round(progress)}%)
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#469B74] transition-[width] duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
