"use client";

import { useState } from "react";
import { Avatar, Button, Card, Modal, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import {
  CheckCircle,
  Clock,
  BookOpen,
  GraduationCap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import CourseDetailStyle from "./CourseDetailStyle";
import api from "../../api/http";
import useToken from "../../hook/user/useToken";
import useAllPublicCourse from "../../hook/course/useAllUserCourse";
import { useParams } from "react-router-dom";
import useAllUser from "../../hook/user/useAllUser";

const CourseDetail = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const token = useToken();
  const { id } = useParams();
  // Payment mutation
  const buyMutation = useMutation({
    mutationFn: (body) => {
      return api.post("/payment", body, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });
  const { courses } = useAllPublicCourse();
  const experts = useAllUser();
  const course = courses?.find((course) => course.id == id);
  const expert = experts?.find((expert) => expert.id == course?.expertId);
  const courseData = {
    id: "58", // Added course ID for payment
    price: 50, // Added price for payment
    bannerUrl: "/placeholder.svg?height=300&width=500", // Added banner URL for payment card
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
          },
          {
            id: 2,
            title: "Lợi ích của việc học HSK",
            duration: "15:00",
            videoUrl: "https://www.youtube.com/embed/example2",
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
          },
          {
            id: 4,
            title: "Cấu trúc câu",
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/example4",
          },
          {
            id: 5,
            title: "Ngữ pháp cơ bản",
            duration: "25:00",
            videoUrl: "https://www.youtube.com/embed/example5",
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
    detailedDescription: ` HSK1 là cấp độ sơ cấp trong hệ thống kiểm tra năng lực tiếng Trung HSK. Ở cấp độ này, bạn sẽ làm quen với 150 từ vựng cơ bản và những cấu trúc ngữ pháp đơn giản giúp bạn giao tiếp trong các tình huống hàng ngày.
`,
    reasons: [
      "Ngữ pháp là nền tảng của giao tiếp – Bạn cần hiểu rõ để có thể nói và viết chính xác.",
      "HSK1 là bước khởi đầu – Nếu bạn muốn thi chứng chỉ hoặc học lên cao hơn, hãy bắt đầu ngay!",
      " Ứng dụng thực tế – Dùng ngay trong hội thoại hàng ngày, giúp bạn giao tiếp với người bản xứ dễ dàng hơn",
    ],
    instructor: {
      name: "Nguyễn Văn A",
      avatar: "/placeholder.svg",
      title: "Chinese Expert",
    },
  };

  const toggleSection = (sectionTitle) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  const selectLesson = (lesson) => {
    setSelectedLesson(lesson);
  };

  // Handle buy confirmation
  const onConfirmBuy = () => {
    const formData = new FormData();
    formData.append("courseId", course.id);
    buyMutation.mutate(formData, {
      onSuccess(data) {
        window.location.replace(data.data);
      },
      onError(data) {
        notification.error({ message: data.response.data.message });
      },
    });
  };

  return (
    <CourseDetailStyle>
      <div className="course-container">
        <div className="course-content">
          {/* Course Sidebar */}
          <div className="font-shopee course-sidebar">
            <h2>Mục lục khóa học</h2>
            {courseData.sections.map((section, index) => (
              <div key={index} className="course-section">
                <div
                  className="section-header"
                  onClick={() => toggleSection(section.title)}
                >
                  <h3>{section.title}</h3>
                  {expandedSections[section.title] ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </div>
                {expandedSections[section.title] && (
                  <ul className="section-lessons">
                    {section.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        onClick={
                          lesson.id === 1
                            ? () => selectLesson(lesson)
                            : undefined
                        }
                        className={`${
                          selectedLesson?.id === lesson.id ? "active" : ""
                        } ${lesson.id !== 1 ? "disabled" : ""}`}
                      >
                        {lesson.title}
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
                    alt={course.title}
                    src={course.bannerUrl || "/placeholder.svg"}
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
                    <span className="mb-[4px]">$</span>{" "}
                    <p className="text-4xl font-bold">
                      {courseData.price.toLocaleString("vi-VN")}
                    </p>
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
                  <p className="text-center text-xs text-gray-500 mt-2">
                    Đảm bảo hoàn tiền trong 30 ngày
                  </p>
                </div>
              </Card>
            </div>
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

            <div className="video-container">
              <iframe
                src={
                  selectedLesson
                    ? selectedLesson.videoUrl
                    : courseData.sections[0].lessons[0].videoUrl
                }
                title="Course Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="course-video"
              />
            </div>

            <div className="font-shopee content-section">
              <h2>Mô tả</h2>
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
              <Avatar
                size={64}
                src={courseData.instructor.avatar}
                alt={courseData.instructor.name}
              />
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
        title={
          <span className="text-[#469B74] text-xl font-semibold flex items-center ">
            Are you sure to buy{" "}
          </span>
        }
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
          <Button
            key="buy"
            onClick={onConfirmBuy}
            loading={buyMutation.isPending}
            type="primary"
          >
            Confirm Purchase
          </Button>,
        ]}
      >
        <Card
          className="w-full max-w-sm mx-auto border-2 border-[#469B74] rounded-lg overflow-hidden shadow-md"
          cover={
            <img
              alt={course?.name}
              src={course?.bannerUrl || "/placeholder.svg"}
              className="w-full h-40 object-cover"
            />
          }
        >
          <div className="flex items-center p-4">
            <span className=" text-xl font-bold">$</span>
            <p className="text-4xl font-bold  ml-1">
              {course?.price.toLocaleString("vi-VN")}
            </p>
          </div>
        </Card>
      </Modal>
    </CourseDetailStyle>
  );
};

export default CourseDetail;
