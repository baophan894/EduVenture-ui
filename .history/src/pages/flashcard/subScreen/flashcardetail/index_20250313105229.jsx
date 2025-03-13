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
    <div className="flex flex-col items-center mt-24">
      <div className="fixed top-16 left-0 right-0 z-10 bg-[#469B74] text-white py-5 px-5 flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="font-bold text-sm">{topicName}</p>
          <Report resourceType="flashcard" resourceId={activeFlashcard?.id} />
        </div>
        <div className="flex justify-between">
          <p className="font-bold text-xl">{activeFlashcard?.name}</p>
          {!isAuthor && (
            <button
              onClick={() => setIsViewModal(true)}
              className="mt-3 mr-1 p-2 w-24 rounded bg-[#FCB80C] text-black hover:bg-yellow-600"
            >
              <span className="mr-1 font-bold">Update</span>
              <PlusCircleOutlined />
            </button>
          )}
        </div>
        <div className="flex gap-3">
          <Tag
            onClick={() => handleReview("helpful")}
            className="cursor-pointer hover:opacity-50"
            icon={isLike ? <LikeFilled /> : <LikeOutlined />}
            color="green"
          >
            {totalHelpful}
          </Tag>
          <Tag
            onClick={() => handleReview("unhelpful")}
            className="cursor-pointer hover:opacity-50"
            icon={isDisLike ? <DislikeFilled /> : <DislikeOutlined />}
            color="warning"
          >
            {totalUnhelpful}
          </Tag>
        </div>
      </div>
  
      {activeFlashcard && <FlashcardArray cards={renderCard()} />}
  
      {activeFlashcard?.questions.length > 0 && (
        <div className="mt-5 w-full max-w-4xl">
          <div className="p-3">
            {activeFlashcard?.questions?.map((question) => (
              <div key={question?.id} className="flex">
                <div className="border p-3 bg-[#FCB80C] w-1/2 text-black font-semibold">
                  <span>{question.question}</span>
                </div>
                <div className="border p-3 bg-[#469B74] w-1/2 text-white">
                  <span>{question.answer}</span>
                </div>
              </div>
            ))}
          </div>
  
          <Modal
            footer={null}
            title="Update Flashcards"
            open={isViewModal}
            onCancel={() => setIsViewModal(false)}
          >
            <Form initialValues={activeFlashcard} onFinish={onSubmitUpdate} layout="vertical">
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="topicId" label="Topic" rules={[{ required: true }]}>
                <Select placeholder="Select topic" options={topicOptions()} />
              </Form.Item>
              <Form.List name="questions">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} className="flex gap-3 items-center">
                        <Form.Item
                          {...restField}
                          name={[name, "question"]}
                          rules={[{ required: true, message: "Missing question" }]}
                        >
                          <Input.TextArea placeholder="Question" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "answer"]}
                          rules={[{ required: true, message: "Missing answer" }]}
                        >
                          <Input.TextArea placeholder="Answer" />
                        </Form.Item>
                        <MinusCircleOutlined className="text-red-500 cursor-pointer" onClick={() => remove(name)} />
                      </div>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Flashcard
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item className="text-right">
                <Button type="primary" loading={updateFlashCard.isPending} htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </div>
  );
  
export default FlashCardDetailScreen;
