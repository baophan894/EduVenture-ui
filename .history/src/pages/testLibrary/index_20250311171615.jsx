"use client";

import { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { FaEye, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Mock data for tests
const testData = [
  {
    id: 1,
    title: "TOEIC Reading Practice Test 1",
    views: 27,
    ratings: 4.9,
    participants: 100,
    duration: 120,
    tag: "#TOEIC #Reading",
  },
  {
    id: 2,
    title: "TOEIC Listening Practice Test 1",
    views: 23,
    ratings: 4.8,
    participants: 90,
    duration: 120,
    tag: "#TOEIC #Listening",
  },
  {
    id: 3,
    title: "HSK 1 Listening Test 1",
    views: 19,
    ratings: 4.7,
    participants: 50,
    duration: 30,
    tag: "#HSK1 #Listening",
  },
  {
    id: 4,
    title: "JLPT N2 Listening Practice Test 1",
    views: 20,
    ratings: 4.6,
    participants: 45,
    duration: 35,
    tag: "#JLPT #N2 #Listening",
  },
  {
    id: 5,
    title: "JLPT N3 Listening Practice Test 1",
    views: 18,
    ratings: 4.5,
    participants: 40,
    duration: 30,
    tag: "#JLPT #N3 #Listening",
  },
  {
    id: 6,
    title: "HSK 3 Listening Test 1",
    views: 17,
    ratings: 4.4,
    participants: 35,
    duration: 25,
    tag: "#HSK3 #Listening",
  },
  {
    id: 7,
    title: "JLPT N5 Listening Practice Test 1",
    views: 16,
    ratings: 4.3,
    participants: 30,
    duration: 20,
    tag: "#JLPT #N5 #Listening",
  },
  {
    id: 8,
    title: "TOEIC Listening Practice Test 2",
    views: 15,
    ratings: 4.2,
    participants: 25,
    duration: 15,
    tag: "#TOEIC #Listening",
  },
];

// Individual Test Card Component
const TestCard = ({ test }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/test/detail/${test.id}`);
  };

  return (
    <div
      className="flex flex-col cursor-pointer w-full transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Test Image */}
      <div className="relative h-[180px] bg-gray-300 mb-2">
        {/* Placeholder image */}
      </div>

      {/* Test Title */}
      <h3
        className={`text-sm font-medium mb-1 transition-colors duration-300 ${
          isHovered ? "text-[#469B74]" : "text-gray-900"
        }`}
      >
        {test.title}
      </h3>

      {/* Stats Section */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex items-center">
          <FaEye className="text-gray-500 mr-1" size={12} />
          <span className="text-xs text-gray-500">{test.views}</span>
        </div>
        <div className="flex items-center">
          <FaStar className="text-yellow-500 mr-1" size={12} />
          <span className="text-xs text-gray-500">{test.ratings}</span>
        </div>
        <span className="text-xs text-gray-400">|</span>
        <span className="text-xs text-gray-500">
          {test.participants} người thi
        </span>
      </div>

      {/* Duration */}
      <div className="text-xs text-gray-500 mb-1">{test.duration} phút thi</div>

      {/* Tags */}
      <div className="text-xs text-gray-500 mb-3">{test.tag}</div>

      {/* Button */}
      <button
        onClick={handleClick}
        className={`border text-sm py-1 px-4 rounded transition-all duration-300 w-fit ${
          isHovered
            ? "bg-[#469B74] text-white border-[#469B74]"
            : "border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
      >
        Chi tiết
      </button>
    </div>
  );
};

// Main Test Library Screen Component
function TestLibraryScreen() {
  const [animatedSections, setAnimatedSections] = useState({
    header: false,
    tests: false,
  });

  useEffect(() => {
    setAnimatedSections({
      header: true,
      tests: true,
    });
  }, []);

  const primaryGreen = "#469B74";

  return (
    <div className="bg-white min-h-screen pb-10">
      {/* Header Section */}
      <div
        className={`mx-4 md:mx-8 lg:mx-16 mb-8 transition-all duration-1000 ${
          animatedSections.header
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2
          className="text-3xl font-bold pb-4 pt-8 text-center"
          style={{ color: primaryGreen }} // Keeping the blue color from the image for the header
        >
          Test Library
        </h2>
      </div>

      {/* Tests Grid */}
      <div
        className={`mx-4 md:mx-8 lg:mx-16 mb-8 transition-all duration-1000 ${
          animatedSections.tests
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <Row gutter={[24, 24]}>
          {testData.map((test, index) => (
            <Col
              key={test.id}
              className={`transition-all duration-700`}
              style={{ transitionDelay: `${index * 100}ms` }}
              xs={24}
              sm={12}
              md={6}
            >
              <TestCard test={test} />
            </Col>
          ))}
        </Row>
      </div>

      {/* More Button */}
      <div className="flex justify-center mt-6">
        <button className="bg-black text-white px-8 py-2 rounded-full hover:bg-[#469B74] hover:border-[#469B74] transition-colors">
          MORE
        </button>
      </div>
    </div>
  );
}

export default TestLibraryScreen;
