"use client";

import { FlashcardArray } from "react-quizlet-flashcard";
import { useParams } from "react-router-dom";
import useAllFlashCard from "../../../../hook/flashcard/useAllFlashCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/http";
import { Button, Form, Input, Modal, Select, notification } from "antd";
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
          <div className="h-[100%] flex items-center justify-center bg-[#469B74] text-white rounded-xl shadow-lg p-8">
            <span className="text-2xl font-bold text-center">
              {question.question}
            </span>
          </div>
        ),
        backHTML: (
          <div className="h-[100%] flex items-center justify-center bg-[#FCB80C] text-black rounded-xl shadow-lg p-8">
            <span className="text-2xl font-bold text-center">
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
    <div className="flex flex-col items-center mt-24 bg-gray-50 min-h-screen">
      <div className="fixed top-16 left-0 right-0 z-10 bg-[#469B74] text-white py-5 px-5 shadow-md">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="bg-[#FCB80C] text-black px-4 py-1 rounded-full text-sm font-bold">
              {topicName}
            </div>
            <Report resourceType="flashcard" resourceId={activeFlashcard?.id} />
          </div>

          <div className="flex justify-between items-center mt-4">
            <h1 className="font-bold text-2xl">{activeFlashcard?.name}</h1>
            {!isAuthor && (
              <button
                onClick={() => setIsViewModal(true)}
                className="px-4 py-2 rounded-full bg-[#FCB80C] text-black font-bold hover:bg-yellow-500 transition-colors duration-200 flex items-center gap-2 shadow-md"
              >
                <span>Update</span>
                <PlusCircleOutlined />
              </button>
            )}
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => handleReview("helpful")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                isLike
                  ? "bg-[#FCB80C] text-black"
                  : "bg-white text-[#469B74] hover:bg-gray-100"
              } transition-colors duration-200 font-medium shadow-sm`}
            >
              {isLike ? <LikeFilled /> : <LikeOutlined />}
              <span>{totalHelpful}</span>
            </button>
            <button
              onClick={() => handleReview("unhelpful")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                isDisLike
                  ? "bg-[#FCB80C] text-black"
                  : "bg-white text-[#469B74] hover:bg-gray-100"
              } transition-colors duration-200 font-medium shadow-sm`}
            >
              {isDisLike ? <DislikeFilled /> : <DislikeOutlined />}
              <span>{totalUnhelpful}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mt-32 px-4">
        {activeFlashcard && (
          <div className="mb-12">
            <FlashcardArray cards={renderCard()} />
          </div>
        )}

        {activeFlashcard?.questions.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <div className="p-6 bg-[#469B74] text-white">
              <h2 className="text-xl font-bold">All Flashcards</h2>
            </div>
            <div className="divide-y">
              {activeFlashcard?.questions?.map((question, index) => (
                <div key={question?.id} className="flex flex-col md:flex-row">
                  <div className="p-6 bg-white md:w-1/2 border-r border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#469B74] text-white flex items-center justify-center font-bold">
                        Q
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-700 mb-1">
                          Question {index + 1}
                        </h3>
                        <p className="text-gray-800">{question.question}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-gray-50 md:w-1/2">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FCB80C] text-black flex items-center justify-center font-bold">
                        A
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-700 mb-1">Answer</h3>
                        <p className="text-gray-800">{question.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal
        footer={null}
        title={
          <div className="flex items-center gap-2 text-[#469B74]">
            <PlusCircleOutlined />
            <span>Update Flashcards</span>
          </div>
        }
        open={isViewModal}
        onCancel={() => setIsViewModal(false)}
        width={700}
      >
        <Form
          initialValues={activeFlashcard}
          onFinish={onSubmitUpdate}
          layout="vertical"
          className="mt-4"
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input className="rounded-md" />
          </Form.Item>
          <Form.Item name="topicId" label="Topic" rules={[{ required: true }]}>
            <Select
              placeholder="Select topic"
              options={topicOptions()}
              className="rounded-md"
            />
          </Form.Item>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-medium text-gray-700 mb-4">Flashcards</h3>
            <Form.List name="questions">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div
                      key={key}
                      className="mb-4 p-4 bg-white rounded-lg shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Card #{name + 1}</h4>
                        <button
                          type="button"
                          onClick={() => remove(name)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <MinusCircleOutlined />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                          {...restField}
                          name={[name, "question"]}
                          rules={[
                            { required: true, message: "Question is required" },
                          ]}
                          label="Question"
                        >
                          <Input.TextArea
                            placeholder="Enter question"
                            className="rounded-md"
                            autoSize={{ minRows: 3 }}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "answer"]}
                          rules={[
                            { required: true, message: "Answer is required" },
                          ]}
                          label="Answer"
                        >
                          <Input.TextArea
                            placeholder="Enter answer"
                            className="rounded-md"
                            autoSize={{ minRows: 3 }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      className="border-[#469B74] text-[#469B74] hover:border-[#469B74] hover:text-[#469B74]"
                    >
                      Add Flashcard
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea className="rounded-md" autoSize={{ minRows: 3 }} />
          </Form.Item>
          <Form.Item className="text-right">
            <Button
              type="primary"
              loading={updateFlashCard.isPending}
              htmlType="submit"
              className="bg-[#469B74] hover:bg-[#3a7d5e] border-none rounded-full px-6"
            >
              Update Flashcards
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default FlashCardDetailScreen;
