"use client"

import { useState } from "react"
import { Avatar, Button, Modal, notification } from "antd"
import { useMutation } from "@tanstack/react-query"
import { CheckCircle, Clock, BookOpen, GraduationCap, ChevronDown, ChevronUp } from "lucide-react"

import api from "../../api/http"
import useToken from "../../hook/user/useToken"
import useAllPublicCourse from "../../hook/course/useAllUserCourse"
import { useParams } from "react-router-dom"
import useAllUser from "../../hook/user/useAllUser"
import CourseDetailPaymentStyle from "./CourseDetailPaymentStyle"

const CourseDetailPayment = () => {
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})
  const [isShowConfirm, setIsShowConfirm] = useState(false)
  const token = useToken()
  const { id } = useParams()

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

  const { courses } = useAllPublicCourse()
  const experts = useAllUser()
  const course = courses?.find((course) => course.id == id)
  const expert = experts?.find((expert) => expert.id == course?.expertId)

  const courseData = {
    id: "58",
    price: 50,
    bannerUrl: "/placeholder.svg?height=300&width=500",
    title: "Tổng hợp ngữ pháp Tiếng Trung Sơ Cấp - HSK1",
    description:
      "Bạn đang tìm kiếm một tài liệu tổng hợp đầy đủ, dễ hiểu về ngữ pháp HSK1? Đây chính là bài viết dành cho bạn!",
    duration: "3 giờ học",
    lessons: "15 bài học",
    level: "Trình độ cơ bản",
    sections: [
      {
        title: "Giới thiệu sơ lược về HSK",
        lessons: [
          {
            id: 1,
            title: "HSK là gì",
            duration: "10:00",
            videoUrl: "https://www.youtube.com/embed/example1",
            description:
              "Trong bài học này, bạn sẽ tìm hiểu về hệ thống kiểm tra HSK (Hanyu Shuiping Kaoshi) - bài kiểm tra năng lực tiếng Trung quốc tế được công nhận rộng rãi.",
            content:
              "HSK (汉语水平考试) là viết tắt của Hanyu Shuiping Kaoshi, có nghĩa là 'Bài kiểm tra trình độ tiếng Trung'. Đây là bài kiểm tra chuẩn hóa quốc tế được thiết kế để đánh giá và chứng nhận năng lực tiếng Trung của những người không phải là người bản xứ.",
            keyPoints: [
              "HSK có 6 cấp độ từ HSK1 đến HSK6",
              "Được công nhận bởi Bộ Giáo dục Trung Quốc",
              "Sử dụng để xin học bổng, du học tại Trung Quốc",
              "Có giá trị trong 2 năm kể từ ngày thi",
            ],
          },
          {
            id: 2,
            title: "Lợi ích của việc học HSK",
            duration: "15:00",
            videoUrl: "https://www.youtube.com/embed/example2",
            description:
              "Khám phá những lợi ích thiết thực khi học và thi HSK, từ cơ hội nghề nghiệp đến phát triển cá nhân.",
            content:
              "Việc học HSK mang lại nhiều lợi ích thiết thực trong cuộc sống và sự nghiệp. Không chỉ giúp bạn nắm vững tiếng Trung một cách có hệ thống, HSK còn mở ra nhiều cơ hội mới.",
            keyPoints: [
              "Tăng cơ hội việc làm tại các công ty có quan hệ với Trung Quốc",
              "Điều kiện cần thiết để du học tại Trung Quốc",
              "Phát triển tư duy logic và khả năng học ngôn ngữ",
              "Hiểu sâu hơn về văn hóa và lịch sử Trung Quốc",
            ],
          },
        ],
      },
      {
        title: "Học tiếng Trung từ con số 0",
        lessons: [
          {
            id: 3,
            title: "Bảng chữ cái cơ bản",
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/example3",
            description: "Làm quen với hệ thống chữ viết Trung Quốc, từ Pinyin đến các nét cơ bản trong chữ Hán.",
            content:
              "Tiếng Trung không có bảng chữ cái như tiếng Anh, thay vào đó sử dụng hệ thống chữ Hán (汉字). Tuy nhiên, để học phát âm, chúng ta sử dụng Pinyin - hệ thống phiên âm La-tinh.",
            keyPoints: [
              "Pinyin gồm 23 phụ âm và 24 nguyên âm",
              "4 thanh điệu cơ bản: ngang, sắc, hỏi, nặng",
              "Các nét cơ bản: ngang (一), dọc (丨), phẩy (丿), nét (丶)",
              "Thứ tự viết: từ trái sang phải, từ trên xuống dưới",
            ],
          },
          {
            id: 4,
            title: "Cấu trúc câu",
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/example4",
            description: "Tìm hiểu cấu trúc câu cơ bản trong tiếng Trung: Chủ ngữ + Vị ngữ + Tân ngữ (SVO).",
            content:
              "Cấu trúc câu tiếng Trung tương đối đơn giản và logic. Thứ tự cơ bản là Chủ ngữ (Subject) + Vị ngữ (Verb) + Tân ngữ (Object), tương tự như tiếng Việt.",
            keyPoints: [
              "Cấu trúc SVO: 我 (tôi) + 吃 (ăn) + 饭 (cơm)",
              "Trạng từ thời gian đặt trước động từ",
              "Tính từ đứng trước danh từ",
              "Câu hỏi sử dụng từ nghi vấn hoặc 吗",
            ],
          },
          {
            id: 5,
            title: "Ngữ pháp cơ bản",
            duration: "25:00",
            videoUrl: "https://www.youtube.com/embed/example5",
            description:
              "Nắm vững các quy tắc ngữ pháp cơ bản nhất trong HSK1, bao gồm cách sử dụng 是, 有, và các cấu trúc câu đơn giản.",
            content:
              "Ngữ pháp HSK1 tập trung vào những cấu trúc câu đơn giản nhất, giúp bạn có thể giao tiếp cơ bản trong các tình huống hàng ngày.",
            keyPoints: [
              "Động từ 是 (shì) - là: 我是学生 (Tôi là học sinh)",
              "Động từ 有 (yǒu) - có: 我有书 (Tôi có sách)",
              "Phủ định với 不 (bù) và 没 (méi)",
              "Câu hỏi với 什么 (shénme - gì), 哪里 (nǎlǐ - đâu)",
            ],
          },
        ],
      },
    ],
    learningPoints: [
      "Các cấu trúc ngữ pháp quan trọng trong HSK1",
      "Cách đặt câu đơn giản, đúng ngữ pháp",
      "Mẹo học nhanh & ứng dụng thực tế",
      "Bài tập thực hành giúp bạn nhớ lâu",
    ],
    learner: [
      "Người mới bắt đầu học tiếng Trung",
      "Người muốn củng cố ngữ pháp cơ bản",
      "Người có mục tiêu thi HSK1",
      "Người yêu thích văn hóa Trung Quốc và muốn giao tiếp tốt hơn",
    ],
    require: [
      "Không yêu cầu kiến thức nền tảng – bạn có thể bắt đầu ngay từ số 0!",
      "Chỉ cần sự kiên trì và luyện tập hàng ngày để đạt kết quả tốt nhất.",
    ],
    detailedDescription: `HSK1 là cấp độ sơ cấp trong hệ thống kiểm tra năng lực tiếng Trung HSK. Ở cấp độ này, bạn sẽ làm quen với 150 từ vựng cơ bản và nh���ng cấu trúc ngữ pháp đơn giản giúp bạn giao tiếp trong các tình huống hàng ngày.`,
    reasons: [
      "Ngữ pháp là nền tảng của giao tiếp – Bạn cần hiểu rõ để có thể nói và viết chính xác.",
      "HSK1 là bước khởi đầu – Nếu bạn muốn thi chứng chỉ hoặc học lên cao hơn, hãy bắt đầu ngay!",
      "Ứng dụng thực tế – Dùng ngay trong hội thoại hàng ngày, giúp bạn giao tiếp với người bản xứ dễ dàng hơn",
    ],
    instructor: {
      name: "Nguyễn Văn A",
      avatar: "/placeholder.svg",
      title: "Chinese Expert",
    },
  }

  // Set default selected lesson to first lesson
  useState(() => {
    if (!selectedLesson && courseData.sections.length > 0) {
      setSelectedLesson(courseData.sections[0].lessons[0])
    }
  }, [])

  const toggleSection = (sectionTitle) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }))
  }

  const selectLesson = (lesson) => {
    setSelectedLesson(lesson)
  }

  // Handle buy confirmation
  const onConfirmBuy = () => {
    const formData = new FormData()
    formData.append("courseId", course.id)
    buyMutation.mutate(formData, {
      onSuccess(data) {
        window.location.replace(data.data)
      },
      onError(data) {
        notification.error({ message: data.response.data.message })
      },
    })
  }

  // Get current lesson content
  const currentLesson = selectedLesson || courseData.sections[0].lessons[0]

  return (
    <CourseDetailPaymentStyle>
      <div className="course-container">
        <div className="course-content">
          {/* Course Sidebar */}
          <div className="font-shopee course-sidebar">
            <h2>Mục lục khóa học</h2>
            {courseData.sections.map((section, index) => (
              <div key={index} className="course-section">
                <div className="section-header" onClick={() => toggleSection(section.title)}>
                  <h3>{section.title}</h3>
                  {expandedSections[section.title] ? <ChevronUp /> : <ChevronDown />}
                </div>
                {expandedSections[section.title] && (
                  <ul className="section-lessons">
                    {section.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        onClick={() => selectLesson(lesson)}
                        className={`${selectedLesson?.id === lesson.id ? "active" : ""} lesson-item`}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="lesson-info">
                          <span className="lesson-title">{lesson.title} </span>
                          <span className="lesson-duration">{lesson.duration}</span>
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
            <h1 className="font-shopee course-title">{courseData.title}</h1>
            <p className="font-shopee course-brief">{courseData.description}</p>

            <div className="font-shopee course-meta">
              <div className="meta-item">
                <Clock className="icon" />
                <span>{courseData.duration}</span>
              </div>
              <div className="meta-item">
                <BookOpen className="icon" />
                <span>{courseData.lessons}</span>
              </div>
              <div className="meta-item">
                <GraduationCap className="icon" />
                <span>{courseData.level}</span>
              </div>
            </div>

            {/* Current Lesson Title */}
            <div className="current-lesson-header">
              <h2 className="font-shopee current-lesson-title text-2xl">Bài học hiện tại: {currentLesson.title}</h2>
              <span className="lesson-duration-badge">{currentLesson.duration}</span>
            </div>

            <div className="video-container">
              <iframe
                src={currentLesson.videoUrl}
                title={currentLesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="course-video"
              />
            </div>

            {/* Lesson Content */}
            <div className="font-shopee content-section lesson-content">
              <h2>Nội dung bài học</h2>
              <p className="lesson-description">{currentLesson.description}</p>
              <div className="lesson-detail">
                <p>{currentLesson.content}</p>
              </div>

              <h3>Điểm chính trong bài học:</h3>
              <div className="key-points">
                {currentLesson.keyPoints?.map((point, index) => (
                  <div key={index} className="key-point">
                    <CheckCircle className="check-icon" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="font-shopee content-section">
              <h2>Mô tả khóa học</h2>
              <p>{courseData.detailedDescription}</p>

              <h3>✨ Lý do nên học HSK ngay bây giờ:</h3>
              <ul>
                {courseData.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>

            <div className="font-shopee content-section">
              <h2>Bạn sẽ được học:</h2>
              <div className="learning-points">
                {courseData.learningPoints.map((point, index) => (
                  <div key={index} className="learning-point">
                    <CheckCircle className="check-icon" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="font-shopee content-section">
              <h2>Khóa học này dành cho ai:</h2>
              <div className="">
                {courseData.learner.map((point, index) => (
                  <div key={index} className="learner">
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="font-shopee content-section">
              <h2>Yêu cầu:</h2>
              <div className="require">
                {courseData.require.map((point, index) => (
                  <div key={index} className="learner">
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="font-shopee instructor-section">
              <Avatar size={64} src={courseData.instructor.avatar} alt={courseData.instructor.name} />
              <div className="instructor-info">
                <h3>{expert?.fullName} </h3>
                <p>{courseData.instructor.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      <Modal
        confirmLoading={buyMutation.isPending}
        title={<span className="text-[#469B74] text-xl font-semibold flex items-center ">Are you sure to buy </span>}
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
      ></Modal>
    </CourseDetailPaymentStyle>
  )
}

export default CourseDetailPayment
