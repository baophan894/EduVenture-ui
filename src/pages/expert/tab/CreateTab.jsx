"use client"

import { Button, Form, Input, Select, notification, Card, Typography, Tooltip } from "antd"
import { useState } from "react"
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
  PlayCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"
import useAllTopic from "../../../hook/topic/useAllTopic"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../../api/http"

const { Title, Text } = Typography
const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024

const CreateTab = () => {
  const token = localStorage.getItem("token")
  const queryClient = useQueryClient()
  const createCourse = useMutation({
    mutationFn: (formData) => {
      return api.post("/expert/course", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      })
    },
  })

  const topics = useAllTopic()
  const topicOptions = () => {
    return topics?.map((topic) => ({
      value: topic.id,
      label: <span>{topic.name}</span>,
    }))
  }

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
  ]

  const [bannerFileList, setBannerFileList] = useState()
  const [lessonList, setLessonList] = useState()
  const isDisableCreate = bannerFileList && lessonList

  const handleChangeLessons = (info) => {
    const regex = /^\d+-[^.]+\.mp4$/
    const list = info.files
    for (let i = 0; i < list.length; i++) {
      if (!list[i].type.includes("video")) {
        notification.error({ message: "Lesson must be an mp4 video" })
        setLessonList(null)
        return
      }
      if (!regex.test(list[i].name)) {
        notification.error({
          message: "Please follow platform format <order>-<filename.mp4> ",
        })
        setLessonList(null)
        return
      }
      if (list[i].size > MAX_FILE_SIZE_BYTES) {
        notification.error({
          message: "Maximum is 20MB ",
        })
        setLessonList(null)
        return
      }
    }
    setLessonList(list)
  }

  const handleChangeBanner = (info) => {
    const file = info.files[0]
    if (!file.type.includes("image")) {
      notification.error({ message: "Banner must be an image" })
      setBannerFileList(null)
    } else {
      setBannerFileList(info.files)
    }
  }

  const onFinish = (values) => {
    const formData = new FormData()
    formData.append("banner", bannerFileList[0])
    for (let i = 0; i < lessonList.length; i++) {
      formData.append("files", lessonList[i])
    }

    formData.append("topic_id", values.topic)
    formData.append("description", values.description)
    formData.append("price", values.price)
    formData.append("name", values.name)
    formData.append("mode", values.mode)

    // Add table of contents data
    if (values.tableOfContents) {
      formData.append("tableOfContents", JSON.stringify(values.tableOfContents))
    }

    createCourse.mutate(formData, {
      onSuccess() {
        queryClient.invalidateQueries("EXPERT_COURSE")
        notification.success({ message: "Created successfully" })
      },
      onError(data) {
        notification.error({ message: data.response.data.message })
      },
    })
  }

  return (
    <div className="content bg-gray-50 p-6 rounded-lg">
      <div className="mb-6">
        <Title level={2} className="text-[#469B74] flex items-center gap-2 my-4">
          <BookOutlined /> Create New Course
        </Title>
        <Text className="text-gray-500">Fill in the details below to create your new course</Text>
      </div>

      <Form layout="vertical" onFinish={onFinish} initialValues={{ mode: "private" }} className="space-y-6">
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
              <Select placeholder="Select course mode" options={modeOptions} className="rounded-md" />
            </Form.Item>

            <Form.Item
              name="price"
              label={
                <span className="flex items-center gap-1">
                  <DollarOutlined /> Price (USD)
                </span>
              }
              rules={[{ required: true }]}
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
            <Input.TextArea placeholder="Enter a detailed description of your course" rows={4} className="rounded-md" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Form.Item
                label={
                  <span className="flex items-center gap-1">
                    <FileImageOutlined /> Banner Image
                  </span>
                }
                rules={[{ required: true }]}
                tooltip="Upload an eye-catching banner for your course"
              >
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#FCB80B] transition-colors">
                  <input
                    onChange={(e) => handleChangeBanner(e.target)}
                    type="file"
                    title="Choose course banner"
                    className="w-full cursor-pointer"
                  />
                  <p className="text-gray-500 text-sm mt-2">
                    {bannerFileList ? `Selected: ${bannerFileList[0]?.name}` : "Recommended size: 1280x720px"}
                  </p>
                </div>
              </Form.Item>
            </div>

            <div>
              <Form.Item
                label={
                  <span className="flex items-center gap-1">
                    <VideoCameraOutlined /> Lesson Videos
                  </span>
                }
                tooltip="Upload your lesson videos in the correct format"
              >
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#FCB80B] transition-colors">
                  <input
                    multiple
                    onChange={(e) => handleChangeLessons(e.target)}
                    type="file"
                    title="Choose lesson videos"
                    className="w-full cursor-pointer"
                  />
                  <p className="text-gray-500 text-sm mt-2">
                    Format: <code className="bg-gray-100 px-1 rounded">order-filename.mp4</code> (Ex: 1-Lesson1.mp4)
                  </p>
                  <p className="text-gray-500 text-sm">Maximum size: 20MB per video</p>
                  <p className="text-gray-500 text-sm">
                    {lessonList ? `Selected: ${lessonList.length} videos` : "No videos selected"}
                  </p>
                </div>
              </Form.Item>
            </div>
          </div>
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
                {fields.map(({ key: mainKey, name: mainIndex, ...mainField }) => (
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
                      rules={[{ required: true, message: "Please input section title" }]}
                    >
                      <Input
                        placeholder="Enter main section title"
                        className="rounded-md"
                        prefix={<BookOutlined className="text-[#FCB80B]" />}
                      />
                    </Form.Item>

                    {/* Sub-sections */}
                    <Form.List name={[mainIndex, "subSections"]}>
                      {(subFields, { add: addSubSection, remove: removeSubSection }) => (
                        <div className="pl-6 border-l-2 border-[#FCB80B] ml-4 mt-6">
                          <div className="mb-4">
                            <Text strong className="text-[#469B74]">
                              Sub-sections
                            </Text>
                          </div>

                          {subFields.map(({ key: subKey, name: subIndex, ...subField }) => (
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
                                rules={[{ required: true, message: "Please input sub-section title" }]}
                              >
                                <Input
                                  placeholder="Enter sub-section title"
                                  className="rounded-md"
                                  prefix={<OrderedListOutlined className="text-[#469B74]" />}
                                />
                              </Form.Item>

                              {/* Lessons/Content sections */}
                              <Form.List name={[subIndex, "lessons"]}>
                                {(lessonFields, { add: addLesson, remove: removeLesson }) => (
                                  <div className="pl-6 border-l-2 border-[#469B74] ml-4 mt-6">
                                    <div className="mb-4">
                                      <Text strong className="text-[#FCB80B]">
                                        Lessons
                                      </Text>
                                    </div>

                                    {lessonFields.map(({ key: lessonKey, name: lessonIndex, ...lessonField }) => (
                                      <div
                                        key={lessonKey}
                                        className="flex items-center gap-3 mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#FCB80B] transition-colors"
                                      >
                                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#FCB80B] text-white rounded-full">
                                          {lessonIndex + 1}
                                        </div>

                                        <Form.Item
                                          {...lessonField}
                                          name={[lessonIndex, "title"]}
                                          className="mb-0 flex-1"
                                          rules={[{ required: true, message: "Lesson title required" }]}
                                        >
                                          <Input
                                            placeholder="Lesson title"
                                            className="rounded-md"
                                            prefix={<PlayCircleOutlined className="text-[#FCB80B]" />}
                                          />
                                        </Form.Item>

                                        <Form.Item
                                          {...lessonField}
                                          name={[lessonIndex, "duration"]}
                                          className="mb-0 w-32"
                                        >
                                          <Input
                                            placeholder="Duration"
                                            className="rounded-md"
                                            prefix={<ClockCircleOutlined className="text-[#469B74]" />}
                                          />
                                        </Form.Item>

                                        <Button
                                          type="text"
                                          danger
                                          icon={<MinusCircleOutlined />}
                                          onClick={() => removeLesson(lessonIndex)}
                                        />
                                      </div>
                                    ))}

                                    <Form.Item>
                                      <Button
                                        type="dashed"
                                        onClick={() => addLesson()}
                                        icon={<PlusOutlined />}
                                        className="w-full"
                                        style={{
                                          borderColor: "#FCB80B",
                                          color: "#FCB80B",
                                          borderRadius: "8px",
                                        }}
                                      >
                                        Add Lesson
                                      </Button>
                                    </Form.Item>
                                  </div>
                                )}
                              </Form.List>
                            </Card>
                          ))}

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
                ))}

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
                e.currentTarget.style.backgroundColor = "rgba(252, 184, 11, 0.9)"
                e.currentTarget.style.borderColor = "rgba(252, 184, 11, 0.9)"
                e.currentTarget.style.boxShadow = "0 6px 8px rgba(252, 184, 11, 0.3)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FCB80B"
                e.currentTarget.style.borderColor = "#FCB80B"
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(252, 184, 11, 0.2)"
              }}
            >
              Create Course
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateTab

