"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal, Select, notification } from "antd";
import { FlashcardArray } from "react-quizlet-flashcard";
import { useParams } from "react-router-dom";
import api from "../../../../api/http";
import Report from "../../../../components/report";
import getReviewStatus from "../../../../helpers/getReviewStatus";
import useAllFlashCard from "../../../../hook/flashcard/useAllFlashCard";
import useAllTopic from "../../../../hook/topic/useAllTopic";
import useUserInfo from "../../../../hook/user/useUserInfo";

import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
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
          <div className="h-[100%] flex items-center justify-center bg-white text-gray-800 rounded-xl  shadow-md p-8">
            <span className="text-2xl font-bold text-center">
              {question.question}
            </span>
          </div>
        ),
        backHTML: (
          <div className="h-[100%] flex items-center justify-center bg-[#469B74] text-white rounded-xl  shadow-md p-8">
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
    <div className="flex flex-col items-center bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm w-full mb-12 pt-3">
        <div className="max-w-6xl mx-auto px-5 py-4 ">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-[#469B74] text-white px-4 py-1.5 rounded-md text-sm font-bold">
                {topicName}
              </div>
              <h1 className="font-bold text-xl text-gray-800 hidden md:block">
                {activeFlashcard?.name}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {!isAuthor && (
                <div
                  onClick={() => setIsViewModal(true)}
                  className="px-4 py-1.5 h-9 rounded-md bg-[#5CAF91] text-white font-bold hover:bg-[#469B74] transition-colors duration-200 flex items-center gap-2 text-sm cursor-pointer"
                >
                  <span>Update</span>
                  <PlusCircleOutlined />
                </div>
              )}
              <Report
                resourceType="flashcard"
                resourceId={activeFlashcard?.id}
              />
            </div>
          </div>

          <h1 className="font-bold text-xl text-gray-800 mt-2 md:hidden">
            {activeFlashcard?.name}
          </h1>

          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-3">
              <button
                onClick={() => handleReview("helpful")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  isLike
                    ? "bg-[#469B74] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors duration-200 font-medium`}
              >
                {isLike ? <LikeFilled /> : <LikeOutlined />}
                <span>{totalHelpful}</span>
              </button>
              <button
                onClick={() => handleReview("unhelpful")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  isDisLike
                    ? "bg-[#FCB80C] text-black"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors duration-200 font-medium`}
              >
                {isDisLike ? <DislikeFilled /> : <DislikeOutlined />}
                <span>{totalUnhelpful}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl px-4">
        {activeFlashcard && (
          <div className="mb-12 flex justify-center">
            <div className="w-full max-w-2xl">
              <FlashcardArray cards={renderCard()} />
            </div>
          </div>
        )}
      </div>

      {/* All FlashCard  */}
      <div className="w-[1000px] px-4">
        {activeFlashcard?.questions.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12 w-full">
            <div className="p-4 border-b border-gray-100 flex items-center">
              <div className="w-2 h-6 bg-[#469B74] rounded-full mr-3"></div>
              <h2 className="text-lg font-bold text-gray-800">
                All Flashcards
              </h2>
            </div>
            <div className="divide-y">
              {activeFlashcard?.questions?.map((question, index) => (
                <div
                  key={question?.id}
                  className="flex flex-col md:flex-row hover:bg-gray-50 transition-colors"
                >
                  <div className="p-5 md:w-1/2 border-r border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#469B74] text-white flex items-center justify-center font-bold text-sm">
                        Q
                      </div>
                      <div>
                        <p className="text-gray-800">{question.question}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 md:w-1/2 bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#FCB80C] text-black flex items-center justify-center font-bold text-sm">
                        A
                      </div>
                      <div>
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
          <div className="flex items-center gap-2 text-gray-800 py-1">
            <div className="w-1.5 h-5 bg-[#469B74] rounded-full mr-1"></div>
            <span className="font-bold">Update Flashcards</span>
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
                      className="border-[#469B74] text-[#469B74] hover:text-[#469B74] hover:border-[#469B74]"
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
              className="bg-[#469B74] hover:bg-[#3a7d5e] border-none rounded-md px-6"
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
