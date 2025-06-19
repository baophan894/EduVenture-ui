"use client"

import { useState, useEffect } from "react"
import { Avatar, Button, Card, Modal, notification, Spin } from "antd"
import { useMutation, useQuery } from "@tanstack/react-query"
import { CheckCircle, Clock, BookOpen, GraduationCap, ChevronDown, ChevronUp } from "lucide-react"
import CourseDetailStyle from "./CourseDetailStyle"
import api from "../../api/http"
import useToken from "../../hook/user/useToken"
import { useParams } from "react-router-dom"

const CourseDetail = () => {
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})
  const [isShowConfirm, setIsShowConfirm] = useState(false)
  const token = useToken()
  const { id } = useParams()

  // Fetch course data from API
  const {
    data: courseData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const response = await api.get(`/courses/${id}`)
      return response.data
    },
    enabled: !!id,
  })

  // Fetch user profile for instructor info
  const { data: instructorData } = useQuery({
    queryKey: ["instructor", courseData?.userId],
    queryFn: async () => {
      const response = await api.get(`/public/user-profile/${courseData.userId}`)
      return response.data
    },
    enabled: !!courseData?.userId,
  })

  // Payment mutation
  const buyMutation = useMutation({
    mutationFn: (body) => {
      return api.post("/payment", body, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      })
    },
  })

  // Set default expanded sections when course data loads
  useEffect(() => {
    if (courseData?.mainSections) {
      const defaultExpanded = {}
      courseData.mainSections.forEach((section) => {
        defaultExpanded[section.title] = true
      })
      setExpandedSections(defaultExpanded)
    }
  }, [courseData])

  const toggleSection = (sectionTitle) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }))
  }

  const selectLesson = (subSection, mainSection) => {
    setSelectedLesson({
      ...subSection,
      videoUrl: mainSection.videoUrl, // Use main section video
      sectionTitle: mainSection.title,
    })
  }

  // Handle buy confirmation
  const onConfirmBuy = () => {
    const formData = new FormData()
    formData.append("courseId", courseData.id)
    buyMutation.mutate(formData, {
      onSuccess(data) {
        window.location.replace(data.data)
      },
      onError(data) {
        notification.error({ message: data.response.data.message })
      },
    })
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error loading course</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    )
  }

  // No course data
  if (!courseData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Course not found</h2>
          <p className="text-gray-500">The requested course could not be found.</p>
        </div>
      </div>
    )
  }

  // Calculate total lessons and duration
  const totalLessons =
    courseData.mainSections?.reduce((total, section) => total + (section.subSections?.length || 0), 0) || 0
  const estimatedDuration = `${Math.max(1, Math.floor(totalLessons * 0.5))} giờ học` // Estimate 30 min per lesson

  return (
    <CourseDetailStyle>
      <div className="course-container">
        <div className="course-content">
          {/* Course Sidebar */}
          <div className="font-shopee course-sidebar">
            <h2>Mục lục khóa học</h2>
            {courseData.mainSections?.map((section, index) => (
              <div key={index} className="course-section">
                <div className="section-header" onClick={() => toggleSection(section.title)}>
                  <h3>{section.title}</h3>
                  {expandedSections[section.title] ? <ChevronUp /> : <ChevronDown />}
                </div>
                {expandedSections[section.title] && (
                  <ul className="section-lessons">
                    {section.subSections?.map((subSection, subIndex) => (
                      <li
                        key={subIndex}
                        onClick={() => selectLesson(subSection, section)}
                        className={`${
                          selectedLesson?.title === subSection.title ? "active" : ""
                        } cursor-pointer hover:bg-gray-100`}
                      >
                        {subSection.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Payment Card - Added to sidebar */}
            <div className="payment-card-container mt-6">
              <Card
                style={{ width: "100%", minHeight: "150px" }}
                cover={
                  <img
                    alt={courseData.name}
                    src={courseData.bannerUrl || "/placeholder.svg"}
                    style={{
                      width: "100%",
                      height: "152px",
                      objectFit: "cover",
                    }}
                  />
                }
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center text-black">
                    <span className="mb-[4px]">$</span>
                    <p className="text-4xl font-bold">{courseData.price?.toLocaleString("vi-VN") || "0"}</p>
                  </div>

                  {/* Course benefits */}
                  <div className="mb-3">
                    <div className="flex items-start gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-sm">Truy cập trọn đời</span>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-sm">Chứng chỉ hoàn thành</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-sm">Hỗ trợ 24/7</span>
                    </div>
                  </div>

                  {/* Buy button */}
                  <Button
                    onClick={() => setIsShowConfirm(true)}
                    className="w-full mt-2 h-12 text-lg font-bold"
                    type="primary"
                    size="large"
                  >
                    Đăng ký ngay
                  </Button>

                  {/* Money-back guarantee */}
                  <p className="text-center text-xs text-gray-500 mt-2">Đảm bảo hoàn tiền trong 30 ngày</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <h1 className="font-shopee course-title">{courseData.name}</h1>
            <p className="font-shopee course-brief">{courseData.description}</p>

            <div className="font-shopee course-meta">
              <div className="meta-item">
                <Clock className="icon" />
                <span>{estimatedDuration}</span>
              </div>
              <div className="meta-item">
                <BookOpen className="icon" />
                <span>{totalLessons} bài học</span>
              </div>
              <div className="meta-item">
                <GraduationCap className="icon" />
                <span>Trình độ cơ bản</span>
              </div>
            </div>

            <div className="video-container">
              <iframe
                src={
                  selectedLesson
                    ? selectedLesson.videoUrl
                    : courseData.mainSections?.[0]?.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"
                }
                title="Course Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="course-video"
              />
            </div>

            {/* Selected lesson content */}
            {selectedLesson && (
              <div className="font-shopee content-section">
                <h2>{selectedLesson.title}</h2>
                <p>{selectedLesson.content}</p>
              </div>
            )}

            <div className="font-shopee content-section">
              <h2>Mô tả khóa học</h2>
              <p>{courseData.description}</p>
            </div>

            <div className="font-shopee content-section">
              <h2>Nội dung khóa học:</h2>
              <div className="learning-points">
                {courseData.mainSections?.map((section, index) => (
                  <div key={index} className="learning-point">
                    <CheckCircle className="check-icon" />
                    <span>{section.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="font-shopee content-section">
              <h2>Chi tiết các phần học:</h2>
              {courseData.mainSections?.map((section, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {section.sectionOrder}. {section.title}
                  </h3>
                  <ul className="ml-4">
                    {section.subSections?.map((subSection, subIndex) => (
                      <li key={subIndex} className="mb-1">
                        • {subSection.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="font-shopee instructor-section">
              <Avatar
                size={64}
                src={instructorData?.avatar || "/placeholder.svg"}
                alt={instructorData?.fullName || "Instructor"}
              />
              <div className="instructor-info">
                <h3>{instructorData?.fullName || "Giảng viên"}</h3>
                <p>{instructorData?.title || "Chuyên gia"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      <Modal
        confirmLoading={buyMutation.isPending}
        title={<span className="text-[#469B74] text-xl font-semibold flex items-center">Xác nhận mua khóa học</span>}
        open={isShowConfirm}
        onCancel={() => setIsShowConfirm(false)}
        onOk={onConfirmBuy}
        className="rounded-lg overflow-hidden"
        footer={[
          <Button
            key="cancel"
            onClick={() => setIsShowConfirm(false)}
            className="border border-[#469B74] text-[#469B74] hover:bg-[#469B74]/10 mr-2"
          >
            Hủy
          </Button>,
          <Button key="buy" onClick={onConfirmBuy} loading={buyMutation.isPending} type="primary">
            Xác nhận mua
          </Button>,
        ]}
      >
        <Card
          className="w-full max-w-sm mx-auto border-2 border-[#469B74] rounded-lg overflow-hidden shadow-md"
          cover={
            <img
              alt={courseData?.name}
              src={courseData?.bannerUrl || "/placeholder.svg"}
              className="w-full h-40 object-cover"
            />
          }
        >
          <div className="flex items-center p-4">
            <span className="text-xl font-bold">$</span>
            <p className="text-4xl font-bold ml-1">{courseData?.price?.toLocaleString("vi-VN") || "0"}</p>
          </div>
        </Card>
      </Modal>
    </CourseDetailStyle>
  )
}

export default CourseDetail
