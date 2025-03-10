"use client";

/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const CourseCard = ({ course, expert }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleClick = () => {
    if (!token) navigate("/login");
    else navigate(`/course/detail/${course.id}`);
  };

  // Calculate likes (using the total from reviews for now)
  const likes = course?.reviews?.length || 0;

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer w-[300px] h-[420px]"
    >
      {/* Course Image */}
      <div className="relative h-[180px] overflow-hidden">
        <img
          alt={course.name}
          src={course.bannerUrl || "/placeholder.svg"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Course Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
          {course.description || "Learn amazing skills with this comprehensive course."}
        </p>

        {/* Price Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-baseline">
            <span className="text-sm text-gray-500">$</span>
            <span className="text-xl font-semibold text-gray-800">
              {course.price.toLocaleString("vi-VN")}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="bg-[#469B74] hover:bg-[#5bbd8b] text-white font-semibold px-4 py-2 rounded-lg"
          >
            Order Now
          </button>
        </div>

        {/* Author Section */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-auto">
          <p className="text-sm text-gray-800">{expert?.fullName}</p>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <FaHeart className="text-red-500" />
            <span>{likes} likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
