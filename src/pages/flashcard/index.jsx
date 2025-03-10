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
  Space,
  Upload,
  notification,
} from "antd";
import Search from "../../components/search";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
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
    <>
      <div className="min-h-[100vh] px-[50px]">
        <div className="fixed z-20 border-1 inset-x-0 top-[59px] border-2">
          <div className="flex justify-between bg-white items-center border-b">
            <div className="flex overflow-x-auto">
              <span
                onClick={() => setTopicFilter("")}
                key="all"
                className="p-[16px] hover:bg-slate-200 whitespace-nowrap"
              >
                All
              </span>
              {topics?.map((topic) => (
                <span
                  onClick={() => setTopicFilter(topic.id)}
                  key={topic.id}
                  className="p-[16px] hover:bg-slate-200 whitespace-nowrap"
                >
                  {topic.name}
                </span>
              ))}
            </div>
            <Search setSearch={setSearch} />
            <div
              onClick={() => setIsViewModal(true)}
              className="mr-5 p-2 rounded hover:bg-[#7F00FF] hover:text-[white]"
            >
              {" "}
              <span className="mr-[3px]">Create</span> <PlusCircleOutlined />
            </div>
          </div>
        </div>
        <Row gutter={[16, 40]} className="pt-[100px]">
          {displayFlashcards?.map((flashcard) => (
            <Col
              key={flashcard.id}
              className="gutter-row"
              xs={24}
              sm={12}
              md={6}
            >
              <FlashCard flashcard={flashcard} />
            </Col>
          ))}
        </Row>
        <Pagination
          style={{ textAlign: "center", marginTop: "1rem" }}
          current={page}
          pageSize={ITEM_DISPLAY}
          total={flashcards?.length}
          onChange={onChangePage}
        />
      </div>
      <Modal
        footer=""
        title={`Create flashcards`}
        open={isViewModal}
        onCancel={() => setIsViewModal(false)}
      >
        <Form onFinish={onSubmitForm} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="topicId" label="Topic" rules={[{ required: true }]}>
            <Select placeholder="Select topic" options={topicOptions()} />
          </Form.Item>
          <Form.Item name="csvFile" label="Upload CSV">
            <Upload
              accept=".csv"
              beforeUpload={(file) => {
                setCsvFile(file);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
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
                        { required: true, message: "Missing first question" },
                      ]}
                    >
                      <Input.TextArea placeholder="question" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "answer"]}
                      rules={[
                        { required: true, message: "Missing last answer" },
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
              loading={createFlashCard.isPending || uploadFlashCard.isPending}
              type="primary"
              htmlType="submit"
            >
              {csvFile ? "Upload CSV" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FlashcardScreen;