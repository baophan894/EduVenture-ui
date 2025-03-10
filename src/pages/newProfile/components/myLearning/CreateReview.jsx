/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Button, Input, notification } from "antd";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import api from "../../../../api/http";
import useUserInfo from "../../../../hook/user/useUserInfo";
import useAllUser from "../../../../hook/user/useAllUser";
const CreateReview = ({ course, isShowCreate=true }) => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const [rate, setRate] = useState();
  const [comment, setComment] = useState();
  const [isShowSave, setShowSave] = useState(false);
  const user = useUserInfo();
  const users = useAllUser();
  const findUserById = (id) => {
    return users?.find((user) => user?.id == id);
  };
  const isShowCreateReview = !course?.reviews.find(
    (review) => review.userId == user.id
  );
  const onChangeRate = (value) => {
    setRate(value);
    setShowSave(true);
  };
  const onChangeComment = (e) => {
    setComment(e.target.value);
  };
  const reviewCourse = useMutation({
    mutationFn: (body) => {
      return api.post("/course/review", body, {
        headers: {
          Authorization: token,
        },
      });
    },
  });
  const [show, setShow] = useState(5);
  const sendReview = () => {
    reviewCourse.mutate(
      { rate, comment, content: comment, courseId: course?.id },
      {
        onSuccess() {
          queryClient.invalidateQueries("BOUGHT_COURSE");
          queryClient.invalidateQueries("PUBLIC_COURSE");
          setShowSave(false);
          notification.success({ message: "Review successfully" });
        },
        onError(data) {
          setShowSave(false);
          notification.error({ message: data.response.data.message });
        },
      }
    );
  };
  return (
    <div className="mt-6">
      {isShowCreateReview && isShowCreate && (
        <div>
          <p className="text-3xl">Leave a review</p>
          <ReactStars
            half={true}
            value={rate}
            count={5}
            onChange={onChangeRate}
            size={24}
          />
          <Input.TextArea
            value={comment}
            onChange={onChangeComment}
            placeholder="Give a comment"
          />
          {isShowSave && (
            <Button
              loading={reviewCourse.isPending}
              onClick={sendReview}
              className="mt-2 mb-3 "
              type="primary"
            >
              Send
            </Button>
          )}
        </div>
      )}
      {course?.reviews.length >0 && (<div className="mt-3 border py-3">
        <p className="text-3xl font-bold">Product reviews</p>
        <div className="mt-2 p-3">
          {course?.reviews.slice(0,show).map((review) => {
            const user = findUserById(review.userId);
            return (
              <div className="border mb-2 p-3" key={review?.id}>
                <div className="flex items-center">
                  {" "}
                  <Avatar src={user.avatarUrl} />{" "}
                  <p className="ml-2 font-bold">{user.fullName}</p>
                </div>

                <ReactStars
                  value={review?.rate}
                  count={5}
                  edit={false}
                  onChange={onChangeRate}
                  size={24}
                />
                <p>{review?.content}</p>
              </div>
            );
          })}
        </div>
        { show ==5 ? <span onClick={()=> setShow(10000)} className="font-bold hover:text-[#7F00FF] ml-3">Show more....</span>:  <span onClick={()=> setShow(5)} className="font-bold hover:text-[#7F00FF] ml-3">Show less....</span>}
      </div>)}
     
    </div>
  );
};
export default CreateReview;
