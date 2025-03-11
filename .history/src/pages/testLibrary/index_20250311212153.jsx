import { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { FaEye, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TestCard from "./components/TestCard";
import Search from "../../components/search";

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

const topics = [
  { id: "ielts", name: "IELTS" },
  { id: "toeic", name: "TOEIC" },
  { id: "toefl", name: "TOEFL" },
  { id: "hsk1", name: "HSK 1" },
  { id: "hsk2", name: "HSK 2" },
  { id: "hsk3", name: "HSK 3" },
];

function TestLibraryScreen() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const primaryGreen = "#469B74";

  return (
    <div className="bg-white min-h-screen pb-10 pt-[50px]">
      {/* Search Bar */}
      <div className="fixed z-20 border-1  inset-x-0 top-[59px] border-2  ">
        <div className="flex justify-between bg-white items-center border-b">
          <div className="flex overflow-x-auto">
            <span
              onClick={() => setTopicFilter("")}
              key="all"
              className="p-[16px] hover:text-[#469B74] cursor-pointer whitespace-nowrap font-shopee"
            >
              All
            </span>
            {topics?.map((topic) => (
              <span
                onClick={() => setTopicFilter(topic.id)}
                key={topic.id}
                className="p-[16px] hover:text-[#469B74] cursor-pointer whitespace-nowrap font-shopee"
              >
                {topic.name}
              </span>
            ))}
          </div>
          <Search />
        </div>
      </div>
      {/* Header Section */}
      <div
        className={`mx-4 md:mx-8 lg:mx-16 mb-8 transition-all duration-1000 ${
          isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
          isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
      <div
        className={`flex justify-center mt-6 transition-all duration-1000 ${
          isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <button
          className={`bg-black text-white px-8 py-2 rounded-full hover:bg-[#469B74] focus:outline-none transition-all duration-300`}
        >
          MORE
        </button>
      </div>
    </div>
  );
}

export default TestLibraryScreen;
