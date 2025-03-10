import { Button, Card, Modal, notification } from "antd";
import CourseDetailStyle from "./CourseDetailStyle";
import useAllPublicCourse from "../../hook/course/useAllUserCourse";
import { useParams } from "react-router-dom";
import { useState } from "react";
import VideoPlayer from "../expert/conponents/Video";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/http";
import useAllUser from "../../hook/user/useAllUser";
import CreateReview from "../newProfile/components/myLearning/CreateReview";
import calculateRating from "../../helpers/CalculateRating";
import { FaStar } from "react-icons/fa";
import useToken from "../../hook/user/useToken";
const CourseDetail = () => {
  const { id } = useParams();
  const token = useToken();
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
  const [isView, setIsView] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const preview = course?.lessons[0];
  const { total, rate } = calculateRating(course?.reviews);
  const lessonItem = (course, i) => {
    if (i == 0) {
      return (
        <div
          key={i}
          onClick={() => setIsView(true)}
          className="course-detail_content__lessons__item hover:bg-slate-300 font-bold"
        >
          <p className="ml-3">
            {course?.lessonOrder}. {course?.name}{" "}
            <span style={{ color: "#7F00FF", fontSize: "14px" }}>Preview</span>
          </p>
        </div>
      );
    }
    return (
      <div key={i} className="course-detail_content__lessons__item font-bold">
        <p className="ml-3">
          {course?.lessonOrder}. {course?.name}
        </p>
      </div>
    );
  };
  const onConfirmBuy = () => {
    let formData = new FormData();
    formData.append("courseId", course?.id);
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
      <div className="course-detail">
        <div className="course-detail_banner">
          <div className="course-detail_banner__info">
            <h1 className="course-detail_banner__info___title mb-3">
              {course?.name}
            </h1>
            <div className="flex items-center mb-2">
              {" "}
              <div className="flex items-center">
                {" "}
                <p className="text-[#FFD700] font-bold mr-1">
                  {rate?.toFixed(1)}
                </p>{" "}
                <FaStar className="text-[#FFD700] " />
              </div>
              <span className="underline text-white cursor-pointer">
                ({total} ratings)
              </span>
            </div>
            <span className="text-white">Created by</span>{" "}
            <span className="underline text-sky-400 cursor-pointer">
              {" "}
              {expert?.fullName}{" "}
            </span>
            <p className="text-white text-sm ">
              Last updated{" "}
              <span className="text-sky-400">
                {new Date(course?.updatedAt)?.getMonth() +
                  1 +
                  "/" +
                  new Date(course?.updatedAt)?.getFullYear()}
              </span>
            </p>
          </div>
          <div>
            <Card
              style={{ width: "300px", minHeight: "150px", margin: "auto" }}
              cover={
                <img
                  alt={course?.name}
                  src={course?.bannerUrl}
                  style={{
                    width: "100%",
                    height: "152px",
                    objectFit: "cover",
                  }}
                />
              }
            >
              <div className="flex items-center  text-black ">
                <span className="mb-[4px]">$</span>{" "}
                <p className="  text-4xl ">
                  {course?.price.toLocaleString("vi-VN")}
                </p>
              </div>
              <Button
                 onClick={() => setIsShowConfirm(true)}
                className="w-full mt-2 "
                type="primary"
              >
                Buy now
              </Button>
            </Card>
          </div>
        </div>

        <div className="course-detail_content">
          <div className="course-detail_content__lessons">
            {course?.lessons.map((lesson, i) => lessonItem(lesson, i))}
          </div>

          <div className="course-detail_content_description">
            <h1>Description</h1>
            <p>{course?.description}</p>
          </div>
          <CreateReview course={course} isShowCreate={false} />
        </div>
        <Modal
          width={"80%"}
          title={`1.${preview?.name}`}
          open={isView}
          onCancel={() => setIsView(false)}
          footer=""
        >
          <VideoPlayer isShowTitle={false} lesson={preview} />{" "}
        </Modal>

        <Modal
          confirmLoading={buyMutation.isPending}
          title={`Are you sure to buy  "${course?.name}"`}
          open={isShowConfirm}
          onCancel={() => setIsShowConfirm(false)}
          onOk={onConfirmBuy}
        >
          <Card
            style={{ width: "300px", minHeight: "150px", margin: "auto" }}
            cover={
              <img
                alt={course?.name}
                src={course?.bannerUrl}
                style={{
                  width: "100%",
                  height: "152px",
                  objectFit: "cover",
                }}
              />
            }
          >
            <div className="flex items-center  text-black ">
              <span className="mb-[4px]">$</span>{" "}
              <p className="  text-4xl ">
                {course?.price.toLocaleString("vi-VN")}
              </p>
            </div>
          </Card>
        </Modal>
      </div>
    </CourseDetailStyle>
  );
};
export default CourseDetail;
