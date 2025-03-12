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
      className="flex flex-col cursor-pointer w-full transition-all duration-300 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        boxShadow: isHovered
          ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      {/* Test Image */}
      <div className="relative h-[180px] bg-gray-300 mb-2 overflow-hidden">
        <img
          src={test.coverImg}
          alt="Test Image"
          className={`h-full w-full object-cover bg-gray-300 transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isHovered ? "opacity-20" : "opacity-0"
          }`}
        ></div>
      </div>

      {/* Test Title */}
      <h3
        className={`text-sm font-shopee font-medium mb-1 transition-colors duration-300 pl-3 ${
          isHovered ? "text-[#469B74]" : "text-gray-900"
        }`}
      >
        {test.title}
      </h3>

      {/* Stats Section */}
      <div className="flex items-center gap-2 mb-1 pl-3">
        <div className="flex items-center">
          <FaEye
            className={`mr-1 transition-all duration-300 ${
              isHovered ? "scale-110 text-black" : "text-gray-500"
            }`}
            size={12}
          />
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
      <div className="text-xs text-gray-500 mb-1 font-shopee pl-3">
        {test.duration} minutes exam
      </div>

      {/* Tags */}
      <div className="text-xs text-gray-500 mb-3 font-shopee pl-3">
        {test.tag}
      </div>

      {/* Button */}
      <button
        className={`border font-shopee text-sm py-1 px-4 rounded transition-all duration-300 w-fit ml-3 ${
          isHovered
            ? "bg-[#469B74] text-white border-[#469B74] shadow-lg scale-105"
            : "border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
      >
        Details
      </button>
    </div>
  );
};

export default TestCard;
