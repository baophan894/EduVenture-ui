"use client";

import { useEffect, useState } from "react";
import useAllTopic from "../../hook/topic/useAllTopic";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Upload,
  notification,
} from "antd";
import Search from "../../components/search";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/http";
import useAllFlashCard from "../../hook/flashcard/useAllFlashCard";
import FlashCard from "./components/FlashCard";
import Loading from "../../components/loading";
import { ACTIVE_RESOURCE } from "../../common/constants";

const ITEM_DISPLAY = 12;

const FlashcardScreen = () => {
  const queryClient = useQueryClient();
  const [isViewModal, setIsViewModal] = useState(false);
  const [page, setPage] = useState(1);
  const [csvFile, setCsvFile] = useState(null);

  const flashcards = useAllFlashCard();
  const topics = useAllTopic();
  const [topicFilter, setTopicFilter] = useState();
  const [search, setSearch] = useState("");
  const [displayFlashcards, setDisplayFlashcards] = useState([]);

  const token = localStorage.getItem("token");

  const createFlashCard = useMutation({
    mutationFn: (formData) => {
      return api.post("/flashcard/create", formData, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  const uploadFlashCard = useMutation({
    mutationFn: (formData) => {
      return api.post("/flashcard/upload-csv", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });

  const onSubmitForm = (body) => {
    if (csvFile) {
      const formData = new FormData();
      formData.append("file", csvFile);
      formData.append("name", body.name);
      formData.append("topicId", body.topicId);
      formData.append("description", body.description || "");

      uploadFlashCard.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries("flashcards");
          notification.success({ message: "CSV uploaded successfully" });
          setIsViewModal(false);
          setCsvFile(null);
        },
        onError: (error) => {
          notification.error({
            message: "Failed to upload CSV",
            description: error.response?.data || "Unexpected error occurred",
          });
        },
      });
    } else {
      createFlashCard.mutate(body, {
        onSuccess: () => {
          queryClient.invalidateQueries("flashcards");
          notification.success({ message: "Flashcard created successfully" });
          setIsViewModal(false);
        },
        onError: (error) => {
          notification.error({
            message: "Failed to create flashcard",
            description: error.response?.data || "Unexpected error occurred",
          });
        },
      });
    }
  };

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const topicOptions = () => {
    return topics?.map((topic) => ({
      value: topic.id,
      label: <span>{topic.name}</span>,
    }));
  };

  useEffect(() => {
    let filteredFlashcards = flashcards?.filter(
      (flashcard) => flashcard.state === ACTIVE_RESOURCE
    );
    if (topicFilter) {
      filteredFlashcards = filteredFlashcards.filter(
        (document) => document.topicId == topicFilter
      );
    }
    if (search) {
      filteredFlashcards = filteredFlashcards.filter((flashcard) =>
        flashcard.name
          .toLowerCase()
          .trim()
          .includes(search.toLowerCase().trim())
      );
    }
    const startIndex = (page - 1) * ITEM_DISPLAY;
    const endIndex = startIndex + ITEM_DISPLAY;
    setDisplayFlashcards(filteredFlashcards?.slice(startIndex, endIndex));
  }, [flashcards, page, topicFilter, search]);

  const isDataReady = flashcards && topics;

  return !isDataReady ? (
    <Loading />
  ) : (
    <div className="min-h-screen bg-gray-50">
      {/* Header with filters */}
      <div className="fixed z-20 inset-x-0 top-[59px] bg-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            {/* <div className="flex overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setTopicFilter("")}
                className={`py-4 px-6 font-medium text-sm transition-colors whitespace-nowrap border-b-2 ${
                  !topicFilter
                    ? "border-[#469B74] text-[#469B74] font-semibold"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                All Topics
              </button>
              {topics?.map((topic) => (
                <button
                  onClick={() => setTopicFilter(topic.id)}
                  key={topic.id}
                  className={`py-4 px-6 font-medium text-sm transition-colors whitespace-nowrap border-b-2 ${
                    topicFilter === topic.id
                      ? "border-[#469B74] text-[#469B74] font-semibold"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {topic.name}
                </button>
              ))}
            </div> */}

            <div className="flex items-center gap-3 px-4">
              <div className="w-64">
                <Search setSearch={setSearch} />
              </div>
              <button
                onClick={() => setIsViewModal(true)}
                className="flex items-center gap-2 py-2 px-4 rounded-md bg-[#469B74] text-white hover:bg-[#3a7d5e] transition-colors"
              >
                <span>Create</span>
                <PlusCircleOutlined />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-[130px] pb-12">
        {displayFlashcards?.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-sm p-10 max-w-md mx-auto">
              <div className="text-[#469B74] flex justify-center mb-4">
                <FileTextOutlined style={{ fontSize: "48px" }} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No flashcards found
              </h3>
              <p className="text-gray-500 mb-6">
                Create your first flashcard or try a different search.
              </p>
              <button
                onClick={() => setIsViewModal(true)}
                className="inline-flex items-center gap-2 py-2 px-4 rounded-md bg-[#469B74] text-white hover:bg-[#3a7d5e] transition-colors"
              >
                <span>Create Flashcard</span>
                <PlusCircleOutlined />
              </button>
            </div>
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {displayFlashcards?.map((flashcard) => (
              <Col
                key={flashcard.id}
                className="gutter-row"
                xs={24}
                sm={12}
                md={8}
                lg={6}
              >
                <FlashCard flashcard={flashcard} />
              </Col>
            ))}
          </Row>
        )}

        {flashcards?.length > ITEM_DISPLAY && (
          <div className="mt-8 flex justify-center">
            <Pagination
              current={page}
              pageSize={ITEM_DISPLAY}
              total={flashcards?.length}
              onChange={onChangePage}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>

      {/* Create flashcard modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-[#469B74] py-1">
            <div className="w-1.5 h-5 bg-[#469B74] rounded-full mr-1"></div>
            <span className="font-bold">Create Flashcards</span>
          </div>
        }
        open={isViewModal}
        onCancel={() => setIsViewModal(false)}
        footer={null}
        width={700}
      >
        <Form onFinish={onSubmitForm} layout="vertical" className="mt-4">
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
            <h3 className="font-medium text-gray-700 mb-4">
              Upload or Create Flashcards
            </h3>

            <Form.Item name="csvFile" label="Upload CSV File">
              <Upload
                accept=".csv"
                beforeUpload={(file) => {
                  setCsvFile(file);
                  return false;
                }}
                maxCount={1}
                onRemove={() => setCsvFile(null)}
              >
                <Button
                  icon={<UploadOutlined />}
                  className={`border-[#469B74] text-[#469B74] hover:text-[#469B74] hover:border-[#469B74]`}
                >
                  Select CSV File
                </Button>
              </Upload>
              {csvFile && (
                <div className="mt-2 text-sm text-gray-500">
                  File selected: {csvFile.name}
                </div>
              )}
            </Form.Item>

            {!csvFile && (
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
                              {
                                required: true,
                                message: "Question is required",
                              },
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
            )}
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
              loading={createFlashCard.isPending || uploadFlashCard.isPending}
              type="primary"
              htmlType="submit"
              className="bg-[#469B74] hover:bg-[#3a7d5e] border-none rounded-md px-6"
            >
              {csvFile ? "Upload CSV" : "Create Flashcards"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FlashcardScreen;
