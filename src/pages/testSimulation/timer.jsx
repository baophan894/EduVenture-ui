import { FaClock } from "react-icons/fa";
import { memo } from "react";

const Timer = ({ timeRemaining }) => {
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-full ${
        timeRemaining < 300
          ? "bg-red-100 text-red-600"
          : "bg-[#469B74] bg-opacity-10 text-[#469B74]"
      }`}
    >
      <FaClock />
      <span className="font-bold font-shopee">{formatTime(timeRemaining)}</span>
    </div>
  );
};

// Add display name for debugging purposes
Timer.displayName = "Timer";

export default Timer;
