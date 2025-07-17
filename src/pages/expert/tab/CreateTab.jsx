"use client";

import {
  Button,
  Form,
  Input,
  Select,
  notification,
  Card,
  Typography,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  BookOutlined,
  TagOutlined,
  DollarOutlined,
  FileImageOutlined,
  VideoCameraOutlined,
  LockOutlined,
  GlobalOutlined,
  ShoppingOutlined,
  ReadOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import useAllTopic from "../../../hook/topic/useAllTopic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/http";

const { Title, Text } = Typography;
// const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024

const CreateTab = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const createCourse = useMutation({
    mutationFn: (courseData) => {
      return api.post("/courses/create", courseData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
    },
  });

  const topics = useAllTopic();
  const topicOptions = () => {
    return topics?.map((topic) => ({
      value: topic.id,
      label: <span>{topic.name}</span>,
    }));
  };

  const modeOptions = [
    {
      value: "private",
      label: (
        <>
          <LockOutlined /> Private
        </>
      ),
    },
    {
      value: "public",
      label: (
        <>
          <GlobalOutlined /> Public
        </>
      ),
    },
    {
      value: "sell",
      label: (
        <>
          <ShoppingOutlined /> Sell
        </>
      ),
    },
  ];

  // Remove these states:
  // const [bannerFileList, setBannerFileList] = useState()
  // const [lessonList, setLessonList] = useState()
  // const isDisableCreate = bannerFileList && lessonList

  // Replace with simple validation or remove the disable logic
  const isDisableCreate = true; // Always enable the create button

  const onFinish = (values) => {
    const courseData = {
      name: values.name,
      description: values.description,
      price: Number.parseFloat(values.price),
      bannerUrl: values.bannerUrl, // Changed from file upload to URL
      topicId: values.topic,
      mainSections:
        values.tableOfContents?.map((section) => ({
          title: section.title,
          videoUrl: section.videoUrl,
          sectionOrder: Number.parseInt(section.sectionOrder),
          subSections:
            section.subSections?.map((subSection) => ({
              title: subSection.title,
              content: subSection.content,
            })) || [],
        })) || [],
    };

    createCourse.mutate(courseData, {
      onSuccess() {
        queryClient.invalidateQueries("EXPERT_COURSE");
        notification.success({ message: "Created successfully" });
      },
      onError(data) {
        notification.error({
          message: data.response?.data?.message || "Failed to create course",
        });
      },
    });
  };

  return (
    <div className="content bg-gray-50 p-6 rounded-lg">
      <div className="mb-6">
        <Title
          level={2}
          className="text-[#469B74] flex items-center gap-2 my-4"
        >
          <BookOutlined /> Create New Course
        </Title>
        <Text className="text-gray-500">
          Fill in the details below to create your new course
        </Text>
      </div>

      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ mode: "private" }}
        className="space-y-6"
      >
        {/* Basic Information Card */}
        <Card
          title={
            <span className="text-[#469B74] flex items-center gap-2">
              <ReadOutlined /> Basic Information
            </span>
          }
          className="shadow-md border-t-4 border-t-[#469B74]"
          headStyle={{ borderBottom: "1px solid #f0f0f0" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label={
                <span className="flex items-center gap-1">
                  <BookOutlined /> Course Name
                </span>
              }
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter course name" className="rounded-md" />
            </Form.Item>

            <Form.Item
              name="topic"
              label={
                <span className="flex items-center gap-1">
                  <TagOutlined /> Topic
                </span>
              }
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select topic"
                options={topicOptions()}
                className="rounded-md"
                showSearch
                optionFilterProp="children"
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mode Selection */}
            <Form.Item
              name="mode"
              label={
                <span className="flex items-center gap-1">
                  <GlobalOutlined /> Course Mode
                </span>
              }
              rules={[{ required: true }]}
              tooltip="Choose how your course will be available to students"
            >
              <Select
                placeholder="Select course mode"
                options={modeOptions}
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="price"
              label={
                <span className="flex items-center gap-1">
                  <DollarOutlined /> Price (VNĐ)
                </span>
              }
            >
              <Input placeholder="Enter course price" className="rounded-md" />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label={
              <span className="flex items-center gap-1">
                <OrderedListOutlined /> Description
              </span>
            }
            rules={[{ required: true }]}
          >
            <Input.TextArea
              placeholder="Enter a detailed description of your course"
              rows={4}
              className="rounded-md"
            />
          </Form.Item>
        </Card>

        {/* Media Card */}
        <Card
          title={
            <span className="text-[#FCB80B] flex items-center gap-2">
              <VideoCameraOutlined /> Course Media
            </span>
          }
          className="shadow-md border-t-4 border-t-[#FCB80B]"
          headStyle={{ borderBottom: "1px solid #f0f0f0" }}
        >
          <Form.Item
            name="bannerUrl"
            label={
              <span className="flex items-center gap-1">
                <FileImageOutlined /> Banner Image URL
              </span>
            }
            rules={[
              { required: true, message: "Please input banner URL" },
              { type: "url", message: "Please enter a valid URL" },
            ]}
            tooltip="Enter the URL of your course banner image"
          >
            <Input
              placeholder="Enter banner image URL (e.g., https://example.com/banner.jpg)"
              className="rounded-md"
            />
          </Form.Item>
        </Card>

        {/* Table of Contents Card */}
        <Card
          title={
            <span className="text-[#469B74] flex items-center gap-2">
              <OrderedListOutlined /> Table of Contents
            </span>
          }
          className="shadow-md border-t-4 border-t-[#469B74]"
          headStyle={{ borderBottom: "1px solid #f0f0f0" }}
          extra={
            <Tooltip title="Create a structured outline for your course">
              <Text className="text-gray-500">Course Structure</Text>
            </Tooltip>
          }
        >
          <Form.List name="tableOfContents">
            {(fields, { add: addMainSection, remove: removeMainSection }) => (
              <>
                {fields.map(
                  ({ key: mainKey, name: mainIndex, ...mainField }) => (
                    <Card
                      key={mainKey}
                      className="mb-6 border-l-4 border-l-[#FCB80B] shadow-sm hover:shadow-md transition-shadow"
                      title={
                        <div className="flex items-center gap-2 text-[#FCB80B]">
                          <ReadOutlined />
                          <span>Main Section {mainIndex + 1}</span>
                        </div>
                      }
                      extra={
                        <Button
                          type="text"
                          danger
                          icon={<MinusCircleOutlined />}
                          onClick={() => removeMainSection(mainIndex)}
                        >
                          Remove
                        </Button>
                      }
                    >
                      <Form.Item
                        {...mainField}
                        name={[mainIndex, "title"]}
                        label="Section Title"
                        rules={[
                          {
                            required: true,
                            message: "Please input section title",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter main section title"
                          className="rounded-md"
                          prefix={<BookOutlined className="text-[#FCB80B]" />}
                        />
                      </Form.Item>

                      <Form.Item
                        {...mainField}
                        name={[mainIndex, "sectionOrder"]}
                        label="Section Order"
                        rules={[
                          {
                            required: true,
                            message: "Please input section order",
                          },
                        ]}
                      >
                        <Input
                          type="number"
                          placeholder="Enter section order (1, 2, 3...)"
                          className="rounded-md"
                          min={1}
                        />
                      </Form.Item>

                      <Form.Item
                        {...mainField}
                        name={[mainIndex, "videoUrl"]}
                        label={
                          <span className="flex items-center gap-1">
                            <VideoCameraOutlined /> Section Video URL
                          </span>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Please input video URL for this section",
                          },
                          { type: "url", message: "Please enter a valid URL" },
                        ]}
                      >
                        <Input
                          placeholder="Enter video URL (e.g., https://example.com/video.mp4)"
                          className="rounded-md"
                          prefix={
                            <VideoCameraOutlined className="text-[#FCB80B]" />
                          }
                        />
                      </Form.Item>

                      {/* Sub-sections */}
                      <Form.List name={[mainIndex, "subSections"]}>
                        {(
                          subFields,
                          { add: addSubSection, remove: removeSubSection }
                        ) => (
                          <div className="pl-6 border-l-2 border-[#FCB80B] ml-4 mt-6">
                            <div className="mb-4">
                              <Text strong className="text-[#469B74]">
                                Sub-sections
                              </Text>
                            </div>

                            {subFields.map(
                              ({
                                key: subKey,
                                name: subIndex,
                                ...subField
                              }) => (
                                <Card
                                  key={subKey}
                                  className="mb-4 border-l-4 border-l-[#469B74] shadow-sm hover:shadow-md transition-shadow"
                                  title={
                                    <div className="flex items-center gap-2 text-[#469B74]">
                                      <OrderedListOutlined />
                                      <span>Sub-section {subIndex + 1}</span>
                                    </div>
                                  }
                                  extra={
                                    <Button
                                      type="text"
                                      danger
                                      icon={<MinusCircleOutlined />}
                                      onClick={() => removeSubSection(subIndex)}
                                    >
                                      Remove
                                    </Button>
                                  }
                                >
                                  <Form.Item
                                    {...subField}
                                    name={[subIndex, "title"]}
                                    label="Sub-section Title"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Please input sub-section title",
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder="Enter sub-section title"
                                      className="rounded-md"
                                      prefix={
                                        <OrderedListOutlined className="text-[#469B74]" />
                                      }
                                    />
                                  </Form.Item>

                                  <Form.Item
                                    {...subField}
                                    name={[subIndex, "content"]}
                                    label={
                                      <span className="flex items-center gap-1">
                                        <ReadOutlined /> Content
                                      </span>
                                    }
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Please input content for this sub-section",
                                      },
                                    ]}
                                  >
                                    <Input.TextArea
                                      placeholder="Enter detailed content for this sub-section"
                                      rows={4}
                                      className="rounded-md"
                                    />
                                  </Form.Item>
                                </Card>
                              )
                            )}

                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => addSubSection()}
                                icon={<PlusOutlined />}
                                className="w-full"
                                style={{
                                  borderColor: "#469B74",
                                  color: "#469B74",
                                  borderRadius: "8px",
                                }}
                              >
                                Add Sub-section
                              </Button>
                            </Form.Item>
                          </div>
                        )}
                      </Form.List>
                    </Card>
                  )
                )}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => addMainSection()}
                    icon={<PlusOutlined />}
                    className="w-full"
                    style={{
                      borderColor: "#FCB80B",
                      color: "#FCB80B",
                      borderRadius: "8px",
                      height: "48px",
                      fontSize: "16px",
                    }}
                  >
                    Add Main Section
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Card>

        {/* Submit Button */}
        <Form.Item style={{ textAlign: "right" }}>
          {createCourse.isPending ? (
            <Button
              loading
              type="primary"
              size="large"
              style={{
                backgroundColor: "#FCB80B",
                borderColor: "#FCB80B",
                height: "48px",
                width: "200px",
                fontSize: "16px",
                borderRadius: "8px",
              }}
            >
              Uploading Course...
            </Button>
          ) : (
            <Button
              disabled={!isDisableCreate}
              type="primary"
              htmlType="submit"
              size="large"
              style={{
                backgroundColor: "#FCB80B",
                borderColor: "#FCB80B",
                height: "48px",
                width: "200px",
                fontSize: "16px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(252, 184, 11, 0.2)",
              }}
              className="hover:bg-[#FCB80B]/90"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(252, 184, 11, 0.9)";
                e.currentTarget.style.borderColor = "rgba(252, 184, 11, 0.9)";
                e.currentTarget.style.boxShadow =
                  "0 6px 8px rgba(252, 184, 11, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FCB80B";
                e.currentTarget.style.borderColor = "#FCB80B";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px rgba(252, 184, 11, 0.2)";
              }}
            >
              Create Course
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTab;
