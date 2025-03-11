import { useState } from "react";
import { FaEye, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Individual Test Card Component
const TestCard = ({ test }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/test-library/detail/${test.id}`);
  };

  return (
    <div
      className="flex flex-col cursor-pointer w-full transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Test Image */}
      <div className="relative h-[180px] bg-gray-300 mb-2">
        <img
          src={test.coverImg}
          alt="Test Image"
          className="h-full w-full object-cover bg-gray-300 mb-2"
        />
      </div>

      {/* Test Title */}
      <h3
        className={`text-sm font-shopee font-medium mb-1 transition-colors duration-300 ${
          isHovered ? "text-[#469B74]" : "text-gray-900"
        }`}
      >
        {test.title}
      </h3>

      {/* Stats Section */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex items-center">
          <FaEye className="text-gray-500 mr-1" size={12} />
          <span className="text-xs text-gray-500 font-shopee">
            {test.views}
          </span>
        </div>
        <div className="flex items-center">
          <FaStar className="text-yellow-500 mr-1" size={12} />
          <span className="text-xs text-gray-500 font-shopee">
            {test.ratings}
          </span>
        </div>
        <span className="text-xs text-gray-400 font-shopee">|</span>
        <span className="text-xs text-gray-500 font-shopee">
          {test.participants} participants
        </span>
      </div>

      {/* Duration */}
      <div className="text-xs text-gray-500 mb-1 font-shopee">
        {test.duration} minutes exam
      </div>

      {/* Tags */}
      <div className="text-xs text-gray-500 mb-3 font-shopee">{test.tag}</div>

      {/* Button */}
      <button
        className={`border font-shopee text-sm py-1 px-4 rounded transition-all duration-300 w-fit ${
          isHovered
            ? "bg-[#469B74] text-white border-[#469B74]"
            : "border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
      >
        Details
      </button>
    </div>
  );
};

export default TestCard;
