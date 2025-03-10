import { FlashcardArray } from "react-quizlet-flashcard";
import { useParams } from "react-router-dom";
import useAllFlashCard from "../../../../hook/flashcard/useAllFlashCard";
import FlashcardDetailStyle from "./FlashcardDetailStyle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/http";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Tag,
  notification,
} from "antd";
import useAllTopic from "../../../../hook/topic/useAllTopic";
import getReviewStatus from "../../../../helpers/getReviewStatus";
import useUserInfo from "../../../../hook/user/useUserInfo";
import Report from "../../../../components/report";

import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";
import { useState } from "react";
import { loginRequire } from "../../../../common/protectRoute";
/* eslint-disable react/prop-types */
const FlashCardDetailScreen = () => {
  loginRequire();
  const user = useUserInfo();
  const topics = useAllTopic();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const flashcards = useAllFlashCard();
  const activeFlashcard = flashcards?.find((flashcard) => flashcard.id == id);
  const token = localStorage.getItem("token");
  const [isViewModal, setIsViewModal] = useState(false);
  const topicOptions = () => {
    return topics?.map((topic) => ({
      value: topic.id + "",
      label: <span>{topic.name}</span>,
    }));
  };
  const reviewMutation = useMutation({
    mutationFn: (body) => {
      return api.post("/flashcard/upload-review", body, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });
  const { totalHelpful, totalUnhelpful } = getReviewStatus(
    activeFlashcard?.reviews
  );
  const isAuthor = activeFlashcard?.userId == user?.id;
  const isLike = activeFlashcard?.reviews.some((review) => {
    return review.userId == user.id && review.state == "helpful";
  });
  const isDisLike = activeFlashcard?.reviews.some((review) => {
    return review.userId == user.id && review.state == "unhelpful";
  });
  const renderCard = () => {
    const questions = activeFlashcard?.questions;

    return questions?.map((question) => {
      return {
        id: 1,
        frontHTML: (
          <div className="h-[100%]  flex items-center justify-center bg-[#323639]   text-white rounded">
            {" "}
            <span className="text-xl font-bold text-center">
              {question.question}
            </span>
          </div>
        ),
        backHTML: (
          <div className="h-[100%] flex items-center justify-center  bg-[#323639]   text-white  rounded">
            {" "}
            <span className="text-xl font-bold text-center">
              {question.answer}
            </span>
          </div>
        ),
      };
    });
  };
  const handleReview = (state) => {
    const formData = new FormData();
    formData.append("review", state);
    formData.append("flashcardId", activeFlashcard?.id);
    reviewMutation.mutate(formData, {
      onSuccess() {
        queryClient.invalidateQueries("flashcards");
      },
    });
  };

  const updateFlashCard = useMutation({
    mutationFn: (formData) => {
      return api.put(`/flashcard/update/${activeFlashcard?.id}`, formData, {
        headers: {
          Authorization: token,
        },
      });
    },
  });
  const topicName = topics?.find((i) => i.id == activeFlashcard?.topicId)?.name;
  const onSubmitUpdate = (body) => {
    updateFlashCard.mutate(body, {
      onSuccess() {
        notification.success({ message: "Successfully" });
        queryClient.invalidateQueries("flashcards");
        setIsViewModal(false);
      },
      onError() {
        notification.success({ message: "Failed" });
      },
    });
  };
  return (
    <FlashcardDetailStyle>
      <div className="flashcard-detail  flex items-start justify-center mt-[100px] flashcard-detail">
        <div className="justify-start gap-10 py-5 pl-5 bg-[#323639] text-[#fff] fixed top-[63px] left-0 right-0  z-10  ">
          <div className="flex justify-between ">
            <p className="font-bold text-sm">{topicName}</p>
            <Report
              resourceType={"flashcard"}
              resourceId={activeFlashcard?.id}
            />
          </div>
          <div className="flex justify-between ">
            <p className="font-bold text-xl">{activeFlashcard?.name}</p>
            {isAuthor && (
              <button
                onClick={() => setIsViewModal(true)}
                className="mt-3 mr-1 p-2 w-[100px] rounded hover:bg-[#7F00FF] hover:text-[white]"
              >
                {" "}
                <span className="mr-[3px]">Update</span> <PlusCircleOutlined />
              </button>
            )}
          </div>

          <Tag
            onClick={() => handleReview("helpful")}
            className="hover:opacity-[0.4]"
            style={{ cursor: "pointer" }}
            icon={isLike ? <LikeFilled /> : <LikeOutlined />}
            color="green"
          >
            {totalHelpful}
          </Tag>
          <Tag
            onClick={() => handleReview("unhelpful")}
            className="hover:opacity-[0.4]"
            style={{ cursor: "pointer" }}
            icon={isDisLike ? <DislikeFilled /> : <DislikeOutlined />}
            color="warning"
          >
            {totalUnhelpful}{" "}
          </Tag>
        </div>
        {activeFlashcard && <FlashcardArray cards={renderCard()} />}
      </div>

      {activeFlashcard?.questions.length > 0 && (
        <div className="mt-3 m-3">
          <div className="mt-2 p-3">
            {activeFlashcard?.questions?.map((question) => {
              return (
                <div key={question?.id} className="flex">
                  <div className="border mb-2 p-3 bg-[#323639]   w-[50%]  text-white ">
                    <span>{question.question}</span>{" "}
                  </div>
                  <div className="border mb-2 p-3 bg-[#323639] w-[50%]   text-white ">
                    <span>{question.answer}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <Modal
            footer=""
            title={`Update flashcards`}
            open={isViewModal}
            onCancel={() => setIsViewModal(false)}
          >
            <Form
              initialValues={activeFlashcard}
              onFinish={onSubmitUpdate}
              layout="vertical"
            >
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item
                name="topicId"
                label="Topic"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select topic" options={topicOptions()} />
              </Form.Item>
              <Form.List name="questions">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          marginBottom: 8,
                          justifyContent: "space-around",
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "question"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing first question",
                            },
                          ]}
                        >
                          <Input.TextArea placeholder="question" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "answer"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing last answer",
                            },
                          ]}
                        >
                          <Input.TextArea placeholder="Answer" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add flashcard
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  loading={updateFlashCard.isPending}
                  htmlType="submit"
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </FlashcardDetailStyle>
  );
};
export default FlashCardDetailScreen;