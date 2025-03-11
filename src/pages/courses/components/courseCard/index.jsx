"use client"

/* eslint-disable react/prop-types */
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaEye } from "react-icons/fa"

const CourseCard = ({ course, expert }) => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleClick = () => {
    if (!token) navigate("/login")
    else navigate(`/course/detail/${course.id}`)
  }

  const handleLikeClick = (e) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  // Calculate likes (using the total from reviews for now)
  // const likes = course?.reviews?.length || 0

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="font-shopee bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer w-[300px] h-[420px] transition-all duration-300 transform hover:-translate-y-2"
      style={{
        boxShadow: isHovered
          ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      }}
    >
      {/* Course Image */}
      <div className="relative h-[180px] overflow-hidden">
        <img
          alt={course.name}
          src={course.bannerUrl || "/placeholder.svg"}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${isHovered ? 'opacity-20' : 'opacity-0'}`}
        ></div>
      </div>

      {/* Course Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className={`text-lg font-semibold text-gray-900 mb-2 transition-colors duration-300 ${isHovered ? 'text-[#469B74]' : ''}`}>
          {course.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
          {course.description || "Learn amazing skills with this comprehensive course."}
        </p>

        {/* Price Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-baseline">
            <span className="text-sm text-gray-500">$</span>
            <span className={`text-xl font-semibold transition-all duration-300 ${isHovered ? 'text-[#469B74] scale-110' : 'text-gray-800'}`}>
              {course.price.toLocaleString("vi-VN")}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleClick()
            }}
            className={`bg-[#469B74] text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${isHovered ? 'bg-[#5bbd8b] shadow-lg scale-105' : ''
              }`}
          >
            Order Now
          </button>
        </div>

        {/* Author Section */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-auto">
          <p className="text-sm text-gray-800">{expert?.fullName}</p>
          <div
            className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer"
            onClick={handleLikeClick}
          >
            <FaEye
              className={`transition-all duration-300 ${isHovered
                  ? 'scale-110 text-black' 
                  : 'text-black'          
                }`}
            />
            <span>100 View</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
