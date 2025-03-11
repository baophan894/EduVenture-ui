"use client";

import { useEffect, useState } from "react";
import { Col, Row, Carousel, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import useUserInfo from "../../hook/user/useUserInfo";
import useAllPublicCourse from "../../hook/course/useAllUserCourse";
import useAllUser from "../../hook/user/useAllUser";
import useAllDocuments from "../../hook/documents/useAllDocument";
import useAllFlashCard from "../../hook/flashcard/useAllFlashCard";
import CourseCard from "../courses/components/courseCard";
// import FlashCard from "../flashcard/components/FlashCard"
import Loading from "../../components/loading";
import { ACTIVE_RESOURCE } from "../../common/constants";
import "./animation.css";
import TestCard from "../testLibrary/components/TestCard";
const HomePage = () => {
  const user = useUserInfo();
  const navigate = useNavigate();
  const { courses } = useAllPublicCourse();
  const experts = useAllUser();
  const documents = useAllDocuments()?.filter(
    (document) => document.state == ACTIVE_RESOURCE
  );
  const flashcards = useAllFlashCard()?.filter(
    (flashCard) => flashCard.state == ACTIVE_RESOURCE
  );
  const [animatedSections, setAnimatedSections] = useState({
    welcome: false,
    courses: false,
    flashcards: false,
  });

  const findExpertById = (id) => {
    return experts?.find((expert) => expert.id == id);
  };

  const isDataReady = courses && experts && documents && flashcards;

  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Welcome section animation
      const welcomeSection = document.getElementById("welcome-section");
      if (
        welcomeSection &&
        scrollPosition > welcomeSection.offsetTop - windowHeight * 0.8
      ) {
        setAnimatedSections((prev) => ({ ...prev, welcome: true }));
      }

      // Courses section animation
      const coursesSection = document.getElementById("courses-section");
      if (
        coursesSection &&
        scrollPosition > coursesSection.offsetTop - windowHeight * 0.8
      ) {
        setAnimatedSections((prev) => ({ ...prev, courses: true }));
      }

      // Flashcards section animation
      const flashcardsSection = document.getElementById("flashcards-section");
      if (
        flashcardsSection &&
        scrollPosition > flashcardsSection.offsetTop - windowHeight * 0.8
      ) {
        setAnimatedSections((prev) => ({ ...prev, flashcards: true }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on load
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDataReady]);

  const carouselImages = [
    "/public/carousel1.png",
    "/public/carousel2.png",
    "/public/carousel3.png",
  ];

  // Custom color styles
  const primaryGreen = "#469B74";
  const primaryYellow = "#FCB80B";

  return (
    <div className="bg-white">
      {isDataReady && !user}
      {!isDataReady ? (
        <Loading />
      ) : (
        <div className="bg-white">
          {/* Carousel Section */}
          <div className="mb-8 relative overflow-hidden">
            <Carousel autoplay arrows className="h-[500px]" effect="fade">
              {carouselImages.map((image, index) => (
                <div key={index} className="h-[500px]">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: `url(${image})` }}
                  >
                    {/* <div className="h-full w-full flex items-center justify-center bg-black bg-opacity-40">
                      <div className="font-shopee text-center font-shopee text-white p-8 max-w-4xl animate-fadeIn">
                        <h1 className="font-shopee text-4xl md:text-5xl font-bold mb-4 animate-slideUp">Unlimited Learning</h1>
                        <p className="font-shopee text-xl mb-6 animate-slideUp animation-delay-200">
                          Explore a treasure trove of knowledge with courses, documents, and modern learning tools
                        </p>
                        {!user && (
                          <Button
                            type="primary"
                            size="large"
                            icon={<SearchOutlined />}
                            onClick={handleGetStarted}
                            style={{
                              backgroundColor: primaryGreen,
                              borderColor: primaryGreen,
                              color: "white",
                            }}
                            className="hover:opacity-90 hover:scale-105 transition-all duration-300 animate-fadeIn animation-delay-400"
                          >
                            Get Started
                          </Button>
                        )}
                      </div>
                    </div> */}
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Welcome Section */}
          <div
            id="welcome-section"
            className={`mx-4 md:mx-8 lg:mx-16 mb-12 rounded-xl overflow-hidden shadow-md transition-all duration-1000 ${
              animatedSections.welcome
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ backgroundColor: "rgba(70, 155, 116, 0.1)" }}
          >
            <Row>
              <Col span={24} md={12} className="p-8 md:p-12">
                <h2
                  className={`font-shopee text-5xl font-bold mb-4 transition-all duration-700 delay-100 ${
                    animatedSections.welcome
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-10"
                  }`}
                  style={{ color: primaryGreen }}
                >
                  ABOUT US
                </h2>
                <div
                  className={`h-1 w-24 mb-6 transition-all duration-700 delay-200 ${
                    animatedSections.welcome
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-10"
                  }`}
                  style={{ backgroundColor: primaryYellow }}
                ></div>
                <p
                  className={`font-shopee text-gray-700 text-xl mb-8 transition-all duration-700 delay-300 ${
                    animatedSections.welcome
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-10"
                  }`}
                >
                  Tại EduVenture, chúng tôi tin rằng học tập là một hành trình
                  đầy thú vị, không chỉ là đích đến. Nền tảng của chúng tôi được
                  thiết kế để mang lại trải nghiệm giáo dục hiện đại, tương tác
                  và đầy cảm hứng, giúp người học ở mọi trình độ có thể tiếp cận
                  kiến thức một cách dễ dàng và hiệu quả.
                </p>
                <p
                  className={`font-shopee text-gray-700 text-xl mb-8 transition-all duration-700 delay-400 ${
                    animatedSections.welcome
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-10"
                  }`}
                >
                  Sứ mệnh của EduVenture là định nghĩa lại cách học trực tuyến,
                  tạo ra một môi trường học tập toàn diện, hỗ trợ tối đa và mang
                  tính ứng dụng cao. Dù bạn là học sinh, sinh viên, người đi làm
                  hay đơn giản là một người yêu thích khám phá kiến thức.
                </p>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  size="large"
                  style={{
                    backgroundColor: primaryYellow,
                    borderColor: primaryYellow,
                    color: "white",
                  }}
                  className={`hover:opacity-100 hover:scale-105 transition-all duration-300 delay-500 ${
                    animatedSections.welcome
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  onClick={() => navigate("/courses")}
                >
                  Explore Now
                </Button>
              </Col>
              <Col span={24} md={12} className="h-full overflow-hidden">
                <div className="h-full">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Students learning"
                    className={`w-full h-full object-cover transition-all duration-1000 hover:scale-105 ${
                      animatedSections.welcome
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-110"
                    }`}
                  />
                </div>
              </Col>
            </Row>
          </div>

          {/* Courses Section */}
          <div
            id="courses-section"
            className={`mx-4 md:mx-8 lg:mx-16 mb-12 bg-white rounded-xl shadow-md relative p-6 transition-all duration-1000 ${
              animatedSections.courses
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ borderLeft: `4px solid ${primaryGreen}` }}
          >
            <h3
              className={`font-shopee text-2xl font-bold mb-6 transition-all duration-700 ${
                animatedSections.courses
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
              style={{ color: primaryGreen }}
            >
              Learning
            </h3>
            <Row gutter={[24, 40]} className="pt-2">
              {courses?.slice(0, 4).map((course, index) => {
                return (
                  <Col
                    key={course.id}
                    className={`gutter-row transition-all duration-700 ${
                      animatedSections.courses
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                    xs={24}
                    sm={12}
                    md={6}
                  >
                    <CourseCard
                      expert={findExpertById(course.expertId)}
                      course={course}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>

          {/* Flashcards Section */}
          <div
            id="flashcards-section"
            className={`mx-4 md:mx-8 lg:mx-16 mb-12 bg-white rounded-xl shadow-md relative p-6 transition-all duration-1000 ${
              animatedSections.flashcards
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ borderLeft: `4px solid ${primaryGreen}` }}
          >
            <h3
              className={`font-shopee text-2xl font-bold mb-6 transition-all duration-700 ${
                animatedSections.flashcards
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
              style={{ color: primaryGreen }}
            >
              Test Library
            </h3>
            <Row gutter={[24, 40]} className="pt-2">
              {courses?.slice(0, 4).map((course, index) => {
                return (
                  <Col
                    key={course.id}
                    className={`gutter-row transition-all duration-700 ${
                      animatedSections.courses
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                    xs={24}
                    sm={12}
                    md={6}
                  >
                    <TestCard test></TestCard>
                  </Col>
                );
              })}
            </Row>
            {/* <Row gutter={[24, 40]} className="pt-2">
              {flashcards?.slice(0, 4).map((flashcard, index) => {
                return (
                  <Col 
                    key={flashcard.id} 
                    className={`gutter-row transition-all duration-700 ${
                      animatedSections.flashcards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`} 
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                    xs={24} 
                    sm={12} 
                    md={6}
                  >
                    <FlashCard flashcard={flashcard} />
                  </Col>
                )
              })}
            </Row> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
