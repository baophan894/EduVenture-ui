"use client";

import { useState, useEffect } from "react";
import { Avatar, Button, Card, Modal, notification, Spin } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CheckCircle,
  Clock,
  BookOpen,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Lock,
} from "lucide-react";
import CourseDetailStyle from "./CourseDetailStyle";
import api from "../../api/http";
import useToken from "../../hook/user/useToken";
import { useParams } from "react-router-dom";
import { formatVNPrice, formatVNNumber } from "../../helpers/formatPrice";

const CourseDetail = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const token = useToken();
  const { id } = useParams();

  // Fetch course data from API
  const {
    data: courseData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  // Fetch user profile for instructor info
  const { data: instructorData } = useQuery({
    queryKey: ["instructor", courseData?.userId],
    queryFn: async () => {
      const response = await api.get(
        `/public/user-profile/${courseData.userId}`
      );
      return response.data;
    },
    enabled: !!courseData?.userId,
  });

  // Payment mutation
  const buyMutation = useMutation({
    mutationFn: (courseId) => {
      return api.post(`/payment?courseId=${courseId}`, null, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  // Set default expanded sections and selected lesson when course data loads
  useEffect(() => {
    if (courseData?.mainSections) {
      const defaultExpanded = {};
      courseData.mainSections.forEach((section) => {
        defaultExpanded[section.title] = true;
      });
      setExpandedSections(defaultExpanded);

      // Set default selected lesson to first subsection of first main section
      if (courseData.mainSections[0]?.subSections?.[0]) {
        setSelectedLesson({
          ...courseData.mainSections[0].subSections[0],
          videoUrl: courseData.mainSections[0].videoUrl,
          sectionTitle: courseData.mainSections[0].title,
          sectionIndex: 0,
          subSectionIndex: 0,
        });
      }
    }
  }, [courseData]);

  const toggleSection = (sectionTitle) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  // Check if subsection is accessible (only first subsection of first main section)
  const isSubSectionAccessible = (sectionIndex, subSectionIndex) => {
    return sectionIndex === 0 && subSectionIndex === 0;
  };

  const selectLesson = (
    subSection,
    mainSection,
    sectionIndex,
    subSectionIndex
  ) => {
    if (!isSubSectionAccessible(sectionIndex, subSectionIndex)) {
      notification.warning({
        message: "Nội dung bị khóa",
        description: "Vui lòng mua khóa học để truy cập toàn bộ nội dung",
      });
      return;
    }

    setSelectedLesson({
      ...subSection,
      videoUrl: mainSection.videoUrl,
      sectionTitle: mainSection.title,
      sectionIndex,
      subSectionIndex,
    });
  };

  const onConfirmBuy = () => {
    buyMutation.mutate(courseData.id, {
      onSuccess(data) {
        window.location.replace(data.data); // redirect sang PayOS
      },
      onError(error) {
        notification.error({ message: error.response.data.message });
      },
    });
  };
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error loading course
          </h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  // No course data
  if (!courseData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Course not found
          </h2>
          <p className="text-gray-500">
            The requested course could not be found.
          </p>
        </div>
      </div>
    );
  }

  // Calculate total lessons and duration
  const totalLessons =
    courseData.mainSections?.reduce(
      (total, section) => total + (section.subSections?.length || 0),
      0
    ) || 0;
  const estimatedDuration = `${Math.max(
    1,
    Math.floor(totalLessons * 0.5)
  )} giờ học`;

  return (
    <CourseDetailStyle>
      <div className="course-container">
        <div className="course-content">
          {/* Course Sidebar */}
          <div className="font-shopee course-sidebar">
            <h2>Mục lục khóa học</h2>
            {courseData.mainSections?.map((section, sectionIndex) => (
              <div key={sectionIndex} className="course-section">
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
                    {section.subSections?.map((subSection, subSectionIndex) => {
                      const isAccessible = isSubSectionAccessible(
                        sectionIndex,
                        subSectionIndex
                      );
                      return (
                        <li
                          key={subSectionIndex}
                          onClick={() =>
                            selectLesson(
                              subSection,
                              section,
                              sectionIndex,
                              subSectionIndex
                            )
                          }
                          className={`${
                            selectedLesson?.title === subSection.title
                              ? "active"
                              : ""
                          } cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                            !isAccessible ? "opacity-60" : ""
                          }`}
                        >
                          <span>{subSection.title}</span>
                          {!isAccessible && (
                            <Lock className="w-4 h-4 text-gray-400" />
                          )}
                        </li>
                      );
                    })}
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
                    <span className="mb-[4px]">VNĐ</span>
                    <p className="text-4xl font-bold">
                      {formatVNNumber(courseData.price)}
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
            {selectedLesson && (
              <div className="current-lesson-header mb-4">
                <h2 className="font-shopee current-lesson-title text-2xl">
                  Bài học hiện tại: {selectedLesson.title}
                </h2>
                <span className="text-sm text-gray-500">
                  Phần: {selectedLesson.sectionTitle}
                </span>
              </div>
            )}

            <div className="video-container">
              <iframe
                src={
                  selectedLesson
                    ? selectedLesson.videoUrl
                    : courseData.mainSections?.[0]?.videoUrl ||
                      "https://www.youtube.com/embed/dQw4w9WgXcQ"
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
                <h2>Nội dung bài học</h2>
                <p>{selectedLesson.content}</p>
              </div>
            )}

            {/* Preview notice for locked content */}
            <div className="font-shopee content-section bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-5 h-5 text-yellow-600" />
                <h3 className="text-yellow-800 font-semibold">
                  Xem trước miễn phí
                </h3>
              </div>
              <p className="text-yellow-700">
                Bạn đang xem bài học đầu tiên của khóa học. Để truy cập toàn bộ{" "}
                {totalLessons} bài học và tài liệu, vui lòng mua khóa học.
              </p>
            </div>

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
                      <li
                        key={subIndex}
                        className="mb-1 flex items-center gap-2"
                      >
                        <span>• {subSection.title}</span>
                        {!isSubSectionAccessible(index, subIndex) && (
                          <Lock className="w-3 h-3 text-gray-400" />
                        )}
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

      {/* Enhanced Payment Confirmation Modal */}
      <Modal
        confirmLoading={buyMutation.isPending}
        title={null}
        open={isShowConfirm}
        onCancel={() => setIsShowConfirm(false)}
        className="purchase-modal"
        width={600}
        footer={null}
        centered
      >
        <div className="purchase-modal-content">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-[#469B74] to-[#5BAE88] text-white p-6 -m-6 mb-6 rounded-t-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Xác nhận mua khóa học</h2>
                <p className="text-white/90 text-sm">
                  Bạn sắp sở hữu khóa học tuyệt vời này!
                </p>
              </div>
            </div>
          </div>

          {/* Course Information */}
          <div className="flex gap-6 mb-6">
            <div className="flex-shrink-0">
              <img
                alt={courseData?.name}
                src={courseData?.bannerUrl || "/placeholder.svg"}
                className="w-32 h-24 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                {courseData?.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {courseData?.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{estimatedDuration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{totalLessons} bài học</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6 border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Giá khóa học</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-[#469B74]">
                    VNĐ {formatVNNumber(courseData?.price)}
                  </span>
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                    Giá ưu đãi
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-sm line-through">
                  VNĐ {formatVNNumber(299000)}
                </p>
                <p className="text-green-600 text-sm font-medium">
                  Tiết kiệm 40%
                </p>
              </div>
            </div>

            {/* What's included */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">Truy cập trọn đời</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">
                  Chứng chỉ hoàn thành
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">Hỗ trợ 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">Cập nhật miễn phí</span>
              </div>
            </div>
          </div>

          {/* Instructor Info */}
          <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
            <Avatar
              size={48}
              src={instructorData?.avatar || "/placeholder.svg"}
              alt={instructorData?.fullName || "Instructor"}
            />
            <div>
              <p className="font-medium text-gray-800">
                {instructorData?.fullName || "Giảng viên"}
              </p>
              <p className="text-sm text-gray-600">Chuyên gia hàng đầu</p>
            </div>
            <div className="ml-auto text-right">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <CheckCircle
                    key={star}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">4.9/5 (1,234 đánh giá)</p>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm">
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">
                Đảm bảo hoàn tiền 100% trong 30 ngày
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              key="cancel"
              onClick={() => setIsShowConfirm(false)}
              className="flex-1 h-12 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800 font-medium"
              size="large"
            >
              Hủy bỏ
            </Button>
            <Button
              key="buy"
              onClick={onConfirmBuy}
              loading={buyMutation.isPending}
              type="primary"
              size="large"
              className="flex-1 h-12 bg-gradient-to-r from-[#469B74] to-[#5BAE88] border-none font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {buyMutation.isPending
                ? "Đang xử lý..."
                : "Mua ngay - Bắt đầu học"}
            </Button>
          </div>

          {/* Security Notice */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              🔒 Thanh toán an toàn và bảo mật • Hỗ trợ 24/7 • Hoàn tiền dễ dàng
            </p>
          </div>
        </div>
      </Modal>
    </CourseDetailStyle>
  );
};

export default CourseDetail;
