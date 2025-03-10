"use client"

import { Col, Row, Carousel, Typography, Button } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { SearchOutlined, RightOutlined } from "@ant-design/icons"
import useUserInfo from "../../hook/user/useUserInfo"
import useAllPublicCourse from "../../hook/course/useAllUserCourse"
import useAllUser from "../../hook/user/useAllUser"
import useAllDocuments from "../../hook/documents/useAllDocument"
import useAllFlashCard from "../../hook/flashcard/useAllFlashCard"
import CourseCard from "../courses/components/courseCard"
import FlashCard from "../flashcard/components/FlashCard"

import Loading from "../../components/loading"
import { ACTIVE_RESOURCE } from "../../common/constants"

const { Title, Text } = Typography

const HomePage = () => {
  const user = useUserInfo()
  const navigate = useNavigate()
  const { courses } = useAllPublicCourse()
  const experts = useAllUser()
  const documents = useAllDocuments()?.filter((document) => document.state == ACTIVE_RESOURCE)
  const flashcards = useAllFlashCard()?.filter((flashCard) => flashCard.state == ACTIVE_RESOURCE)

  const findExpertById = (id) => {
    return experts?.find((expert) => expert.id == id)
  }

  const isDataReady = courses && experts && documents && flashcards

  const handleGetStarted = () => {
    navigate("/login")
  }

  const carouselImages = [
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  ]

  // Custom color styles
  const primaryGreen = "#469B74"
  const primaryYellow = "#FCB80B"

  return (
    <div className="bg-white">
      {isDataReady && !user}
      {!isDataReady ? (
        <Loading />
      ) : (
        <div className="bg-white">
          {/* Carousel Section */}
          <div className="mb-8">
            <Carousel autoplay arrows className="h-[500px]">
              {carouselImages.map((image, index) => (
                <div key={index} className="h-[500px]">
                  <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
                    <div className="h-full w-full flex items-center justify-center bg-black bg-opacity-40">
                      <div className="text-center text-white p-8 max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Unlimited Learning</h1>
                        <p className="text-xl mb-6">
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
                            className="hover:opacity-90"
                          >
                            Get Started
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Welcome Section */}
          <div
            className="mx-4 md:mx-8 lg:mx-16 mb-12 rounded-xl overflow-hidden shadow-md"
            style={{ backgroundColor: "rgba(70, 155, 116, 0.1)" }}
          >
            <Row>
              <Col span={24} md={12} className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-4" style={{ color: primaryGreen }}>
                  ABOUT US
                </h2>
                <div className="h-1 w-24 mb-6" style={{ backgroundColor: primaryYellow }}></div>
                <p className="text-gray-700 mb-8">
                Tại EduVenture, chúng tôi tin rằng học tập là một hành trình đầy thú vị, không chỉ là đích đến. Nền tảng của chúng tôi được thiết kế để mang lại trải nghiệm giáo dục hiện đại, tương tác và đầy cảm hứng, giúp người học ở mọi trình độ có thể tiếp cận kiến thức một cách dễ dàng và hiệu quả.
                </p>
                <p className="text-gray-700 mb-8">
                Sứ mệnh của EduVenture là định nghĩa lại cách học trực tuyến, tạo ra một môi trường học tập toàn diện, hỗ trợ tối đa và mang tính ứng dụng cao. Dù bạn là học sinh, sinh viên, người đi làm hay đơn giản là một người yêu thích khám phá kiến thức, EduVenture sẽ là người bạn đồng hành lý tưởng giúp bạn phát triển kỹ năng và chinh phục mọi thử thách học tập.

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
                  className="hover:opacity-90"
                  onClick={() => navigate("/courses")}
                >
                  Explore Now
                </Button>
              </Col>
              <Col span={24} md={12} className="h-full">
                <div className="h-full">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Students learning"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Col>
            </Row>
          </div>

          {/* Courses Section */}
          <div
            className="mx-4 md:mx-8 lg:mx-16 mb-12 bg-white rounded-xl shadow-md relative p-6"
            style={{ borderLeft: `4px solid ${primaryGreen}` }}
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: primaryGreen }}>
              Learning
            </h3>
            <Row gutter={[24, 40]} className="pt-2">
              {courses?.slice(0, 4).map((course) => {
                return (
                  <Col key={course.id} className="gutter-row" xs={24} sm={12} md={6}>
                    <CourseCard expert={findExpertById(course.expertId)} course={course} />
                  </Col>
                )
              })}
            </Row>
            {/* <Link
              className="absolute right-6 bottom-6 font-medium flex items-center hover:underline"
              to={"/courses"}
              style={{ color: primaryYellow }}
            >
              View all <RightOutlined className="ml-1" />
            </Link> */}
          </div>
          {/* Flashcards Section */}
          <div
            className="mx-4 md:mx-8 lg:mx-16 mb-12 bg-white rounded-xl shadow-md relative p-6"
            style={{ borderLeft: `4px solid ${primaryGreen}` }}
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: primaryGreen }}>
              Test Library
            </h3>
            <Row gutter={[24, 40]} className="pt-2">
              {flashcards?.slice(0, 4).map((flashcard) => {
                return (
                  <Col key={flashcard.id} className="gutter-row" xs={24} sm={12} md={6}>
                    <FlashCard flashcard={flashcard} />
                  </Col>
                )
              })}
            </Row>
            {/* <Link
              className="absolute right-6 bottom-6 font-medium flex items-center hover:underline"
              to={"/flashcards"}
              style={{ color: primaryYellow }}
            >
              View all <RightOutlined className="ml-1" />
            </Link> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage

