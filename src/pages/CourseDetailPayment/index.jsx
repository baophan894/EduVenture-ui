"use client"

import { useState, useEffect } from "react"
import { Avatar, Button, Modal, notification, Spin } from "antd"
import { useMutation, useQuery } from "@tanstack/react-query"
import { CheckCircle, Clock, BookOpen, GraduationCap, ChevronDown, ChevronUp } from "lucide-react"
import api from "../../api/http"
import useToken from "../../hook/user/useToken"
import { useParams } from "react-router-dom"
import CourseDetailPaymentStyle from "./CourseDetailPaymentStyle"

const CourseDetailPayment = () => {
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})
  const [isShowConfirm, setIsShowConfirm] = useState(false)
  const token = useToken()
  const { id } = useParams()

  //13123123123
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

  // Set default expanded sections and selected lesson when course data loads
  useEffect(() => {
    if (courseData?.mainSections) {
      const defaultExpanded = {}
      courseData.mainSections.forEach((section) => {
        defaultExpanded[section.title] = true
      })
      setExpandedSections(defaultExpanded)

      // Set default selected lesson to first subsection of first main section
      if (courseData.mainSections[0]?.subSections?.[0]) {
        setSelectedLesson({
          ...courseData.mainSections[0].subSections[0],
          videoUrl: courseData.mainSections[0].videoUrl,
          sectionTitle: courseData.mainSections[0].title,
          sectionIndex: 0,
          subSectionIndex: 0,
        })
      }
    }
  }, [courseData])

  const toggleSection = (sectionTitle) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }))
  }

  const selectLesson = (subSection, mainSection, sectionIndex, subSectionIndex) => {
    setSelectedLesson({
      ...subSection,
      videoUrl: mainSection.videoUrl,
      sectionTitle: mainSection.title,
      sectionIndex,
      subSectionIndex,
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

  // Error hêhheheheheadwawdawawdada132331231231212123123123112312312321 tets ătewadeas d
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
  const estimatedDuration = `${Math.max(1, Math.floor(totalLessons * 0.5))} giờ học`

  // Get current lesson content
  const currentLesson = selectedLesson

  return (
    <CourseDetailPaymentStyle>
      <div className="course-container">
        <div className="course-content">
          {/* Course Sidebar */}
          <div className="font-shopee course-sidebar">
            <h2>Mục lục khóa học</h2>
            {courseData.mainSections?.map((section, sectionIndex) => (
              <div key={sectionIndex} className="course-section">
                <div className="section-header" onClick={() => toggleSection(section.title)}>
                  <h3>{section.title}</h3>
                  {expandedSections[section.title] ? <ChevronUp /> : <ChevronDown />}
                </div>
                {expandedSections[section.title] && (
                  <ul className="section-lessons">
                    {section.subSections?.map((subSection, subSectionIndex) => (
                      <li
                        key={subSectionIndex}
                        onClick={() => selectLesson(subSection, section, sectionIndex, subSectionIndex)}
                        className={`${
                          selectedLesson?.title === subSection.title ? "active" : ""
                        } lesson-item cursor-pointer hover:bg-gray-100`}
                      >
                        <div className="lesson-info">
                          <span className="lesson-title">{subSection.title}</span>
                          <span className="lesson-duration">Phần {sectionIndex + 1}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
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

            {/* Current Lesson Title */}
            {currentLesson && (
              <div className="current-lesson-header">
                <h2 className="font-shopee current-lesson-title text-2xl">Bài học hiện tại: {currentLesson.title}</h2>
                <span className="lesson-duration-badge">Phần: {currentLesson.sectionTitle}</span>
              </div>
            )}

            <div className="video-container">
              <iframe
                src={
                  currentLesson
                    ? currentLesson.videoUrl
                    : courseData.mainSections?.[0]?.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"
                }
                title={currentLesson?.title || "Course Preview"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="course-video"
              />
            </div>

            {/* Lesson Content */}
            {currentLesson && (
              <div className="font-shopee content-section lesson-content">
                <h2>Nội dung bài học</h2>
                <p className="lesson-description">{currentLesson.title}</p>
                <div className="lesson-detail">
                  <p>{currentLesson.content}</p>
                </div>
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
        title={<span className="text-[#469B74] text-xl font-semibold flex items-center">Are you sure to buy</span>}
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
            Cancel
          </Button>,
          <Button key="buy" onClick={onConfirmBuy} loading={buyMutation.isPending} type="primary">
            Confirm Purchase
          </Button>,
        ]}
      >
        {/* Modal content can be added here if needed */}
      </Modal>
    </CourseDetailPaymentStyle>
  )
}

export default CourseDetailPayment
