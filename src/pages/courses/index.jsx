"use client"

import { Pagination, Tabs, Button, Modal, Form, Input, Select, notification } from "antd"
import { useState, useEffect } from "react"
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  ReadOutlined,
  FilePdfOutlined,
} from "@ant-design/icons"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"

// Components
import CourseCard from "./components/courseCard"
import Search from "../../components/search"
import Loading from "../../components/loading"
import DocumentCard from "../documents/components/DocumentCard" // Updated DocumentCard
import FlashCard from "../flashcard/components/FlashCard"

// Hooks
import useAllTopic from "../../hook/topic/useAllTopic"
import useAllPublicCourse from "../../hook/course/useAllUserCourse"
import useAllUser from "../../hook/user/useAllUser"
import useAllFlashCard from "../../hook/flashcard/useAllFlashCard"
import api from "../../api/http"
import { ACTIVE_RESOURCE } from "../../common/constants"

const { TabPane } = Tabs
const ITEM_DISPLAY = 12

const CombinedScreen = () => {
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState("courses")
  const [page, setPage] = useState(1)
  const [isViewModal, setIsViewModal] = useState(false)
  const [isDocumentModal, setIsDocumentModal] = useState(false)
  const [csvFile, setCsvFile] = useState(null)
  const [files, setFiles] = useState(null) // Changed to match the original approach
  const token = localStorage.getItem("token")

  // Data fetching
  const experts = useAllUser()
  const { courses } = useAllPublicCourse()
  const topics = useAllTopic()
  const flashcards = useAllFlashCard()

  // Fetch documents
  const { data: documents, isLoading: documentsLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const response = await api.get("/document/all", {
        headers: { Authorization: token },
      })
      return response.data
    },
  })

  // Filtering state
  const [topicFilter, setTopicFilter] = useState("")
  const [search, setSearch] = useState("")

  // Display state
  const [displayCourses, setDisplayCourses] = useState([])
  const [displayFlashcards, setDisplayFlashcards] = useState([])
  const [displayDocuments, setDisplayDocuments] = useState([])
  const [totalItems, setTotalItems] = useState(0)

  // Mutations
  const createFlashCard = useMutation({
    mutationFn: (formData) => {
      return api.post("/flashcard/create", formData, {
        headers: {
          Authorization: token,
        },
      })
    },
  })

  const uploadFlashCard = useMutation({
    mutationFn: (formData) => {
      return api.post("/flashcard/upload-csv", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      })
    },
  })

  const uploadDocument = useMutation({
    mutationFn: (formData) => {
      return api.post("/upload-document", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      })
    },
  })

  // Helper functions
  const findExpertById = (id) => {
    return experts?.find((expert) => expert.id === id)
  }

  const onChangePage = (pageNumber) => {
    setPage(pageNumber)
  }

  const topicOptions = () => {
    return topics?.map((topic) => ({
      value: topic.id,
      label: <span>{topic.name}</span>,
    }))
  }

  // Document file handling - matching the original approach
  const handleChangeBanner = (info) => {
    const file = info.files[0]
    if (!file.name.includes("pdf")) {
      notification.error({ message: "Document must be pdf file" })
      setFiles(null)
    } else {
      setFiles(info.files)
    }
  }

  const isDisableButton = files == null

  const onSubmitForm = (body) => {
    if (csvFile) {
      const formData = new FormData()
      formData.append("file", csvFile)
      formData.append("name", body.name)
      formData.append("topicId", body.topicId)
      formData.append("description", body.description || "")

      uploadFlashCard.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries("flashcards")
          notification.success({ message: "CSV uploaded successfully" })
          setIsViewModal(false)
          setCsvFile(null)
        },
        onError: (error) => {
          notification.error({
            message: "Failed to upload CSV",
            description: error.response?.data || "Unexpected error occurred",
          })
        },
      })
    } else {
      createFlashCard.mutate(body, {
        onSuccess: () => {
          queryClient.invalidateQueries("flashcards")
          notification.success({ message: "Flashcard created successfully" })
          setIsViewModal(false)
        },
        onError: (error) => {
          notification.error({
            message: "Failed to create flashcard",
            description: error.response?.data || "Unexpected error occurred",
          })
        },
      })
    }
  }

  // Document form submission - matching the original approach
  const onSubmitDocumentForm = (body) => {
    const formData = new FormData()
    formData.append("title", body.title)
    formData.append("topicId", body.topic)
    formData.append("description", body.description)
    formData.append("file", files[0])

    uploadDocument.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries("documents")
        notification.success({ message: "Upload successfully" })
        setIsDocumentModal(false)
        setFiles(null)
      },
      onError: (error) => {
        notification.error({
          message: "Failed to upload document",
          description: error.response?.data || "Unexpected error occurred",
        })
      },
    })
  }

  // Filter and paginate courses
  useEffect(() => {
    if (activeTab === "courses" && courses) {
      let filteredCourses = courses

      if (topicFilter) {
        filteredCourses = courses.filter((course) => course.topicId === topicFilter)
      }

      if (search) {
        filteredCourses = filteredCourses.filter((course) =>
          course.name.toLowerCase().trim().includes(search.toLowerCase().trim()),
        )
      }

      setTotalItems(filteredCourses.length)

      const startIndex = (page - 1) * ITEM_DISPLAY
      const endIndex = startIndex + ITEM_DISPLAY
      setDisplayCourses(filteredCourses?.slice(startIndex, endIndex))
    }
  }, [courses, page, topicFilter, search, activeTab])

  // Filter and paginate flashcards - only show ACTIVE flashcards
  useEffect(() => {
    if (activeTab === "flashcards" && flashcards) {
      let filteredFlashcards = flashcards?.filter((flashcard) => flashcard.state === ACTIVE_RESOURCE)

      if (topicFilter) {
        filteredFlashcards = filteredFlashcards.filter((flashcard) => flashcard.topicId == topicFilter)
      }

      if (search) {
        filteredFlashcards = filteredFlashcards.filter((flashcard) =>
          flashcard.name.toLowerCase().trim().includes(search.toLowerCase().trim()),
        )
      }

      setTotalItems(filteredFlashcards.length)

      const startIndex = (page - 1) * ITEM_DISPLAY
      const endIndex = startIndex + ITEM_DISPLAY
      setDisplayFlashcards(filteredFlashcards?.slice(startIndex, endIndex))
    }
  }, [flashcards, page, topicFilter, search, activeTab])

  // Filter and paginate documents - only show ACTIVE documents
  useEffect(() => {
    if (activeTab === "documents" && documents) {
      let filteredDocuments = documents?.filter((document) => document.state === ACTIVE_RESOURCE)

      if (topicFilter) {
        filteredDocuments = filteredDocuments.filter((document) => document.topicId === topicFilter)
      }

      if (search) {
        filteredDocuments = filteredDocuments.filter((document) =>
          document.title.toLowerCase().trim().includes(search.toLowerCase().trim()),
        )
      }

      setTotalItems(filteredDocuments.length)

      const startIndex = (page - 1) * ITEM_DISPLAY
      const endIndex = startIndex + ITEM_DISPLAY
      setDisplayDocuments(filteredDocuments?.slice(startIndex, endIndex))
    }
  }, [documents, page, topicFilter, search, activeTab])

  // Reset page when changing tabs or filters
  useEffect(() => {
    setPage(1)
  }, [activeTab, topicFilter, search])

  const handleTabChange = (key) => {
    setActiveTab(key)
  }

  const isDataReady = experts && courses && topics && flashcards && !documentsLoading

  return !isDataReady ? (
    <Loading />
  ) : (
    <div className="min-h-[100vh] bg-gray-50">
      {/* Fixed header with tabs and filters */}
      <div className="fixed z-20 inset-x-0 top-[59px] bg-white shadow-md">
        {/* Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          className="px-4 pt-2"
          tabBarExtraContent={
            <div className="mr-5">
              {activeTab === "flashcards" && (
                <div
                  onClick={() => setIsViewModal(true)}
                  className="inline-block p-2 rounded bg-[#469B74] text-white hover:bg-[#3a7d5e] transition-colors cursor-pointer mr-2"
                >
                  <span className="mr-[3px]">Create</span> <PlusCircleOutlined />
                </div>
              )}
              {activeTab === "documents" && (
                <div
                  onClick={() => setIsDocumentModal(true)}
                  className="inline-block p-2 rounded bg-[#469B74] text-white hover:bg-[#3a7d5e] transition-colors cursor-pointer"
                >
                  <span className="mr-[3px]">Upload</span> <UploadOutlined />
                </div>
              )}
            </div>
          }
        >
          <TabPane
            tab={
              <span className="flex items-center gap-1">
                <AppstoreOutlined />
                Courses
              </span>
            }
            key="courses"
          />
          <TabPane
            tab={
              <span className="flex items-center gap-1">
                <ReadOutlined />
                Flashcards
              </span>
            }
            key="flashcards"
          />
          <TabPane
            tab={
              <span className="flex items-center gap-1">
                <FilePdfOutlined />
                Documents
              </span>
            }
            key="documents"
          />
        </Tabs>

        {/* Topic filters and search */}
        <div className="flex justify-between bg-white items-center border-b">
          <div className="flex overflow-x-auto">
            <span
              onClick={() => setTopicFilter("")}
              key="all"
              className={`p-[16px] whitespace-nowrap cursor-pointer transition-colors border-b-2 ${
                !topicFilter ? "border-[#469B74] text-[#469B74] font-medium" : "border-transparent hover:bg-gray-50"
              }`}
            >
              All
            </span>
            {topics?.map((topic) => (
              <span
                onClick={() => setTopicFilter(topic.id)}
                key={topic.id}
                className={`p-[16px] whitespace-nowrap cursor-pointer transition-colors border-b-2 ${
                  topicFilter === topic.id
                    ? "border-[#469B74] text-[#469B74] font-medium"
                    : "border-transparent hover:bg-gray-50"
                }`}
              >
                {topic.name}
              </span>
            ))}
          </div>
          <Search setSearch={setSearch} />
        </div>
      </div>

      {/* Main content area */}
      <div className="px-[50px] pt-[140px] pb-12">
        {/* Courses Tab Content */}
        {activeTab === "courses" && (
          <>
            {displayCourses?.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white rounded-lg shadow-sm p-10 max-w-md mx-auto">
                  <div className="text-[#FCB80B] flex justify-center mb-4">
                    <AppstoreOutlined style={{ fontSize: "48px" }} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                  <p className="text-gray-500 mb-6">Try a different search or topic filter.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayCourses?.map((course) => (
                  <CourseCard key={course.id} expert={findExpertById(course.expertId)} course={course} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Flashcards Tab Content */}
        {activeTab === "flashcards" && (
          <>
            {displayFlashcards?.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white rounded-lg shadow-sm p-10 max-w-md mx-auto">
                  <div className="text-[#469B74] flex justify-center mb-4">
                    <FileTextOutlined style={{ fontSize: "48px" }} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No active flashcards found</h3>
                  <p className="text-gray-500 mb-6">Create your first flashcard or try a different search.</p>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayFlashcards?.map((flashcard) => (
                  <FlashCard key={flashcard.id} flashcard={flashcard} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Documents Tab Content */}
        {activeTab === "documents" && (
          <>
            {displayDocuments?.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white rounded-lg shadow-sm p-10 max-w-md mx-auto">
                  <div className="text-[#469B74] flex justify-center mb-4">
                    <FilePdfOutlined style={{ fontSize: "48px" }} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No active documents found</h3>
                  <p className="text-gray-500 mb-6">Upload your first document or try a different search.</p>
                  <button
                    onClick={() => setIsDocumentModal(true)}
                    className="inline-flex items-center gap-2 py-2 px-4 rounded-md bg-[#469B74] text-white hover:bg-[#3a7d5e] transition-colors"
                  >
                    <span>Upload Document</span>
                    <UploadOutlined />
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayDocuments?.map((document) => (
                  <DocumentCard key={document.id} document={document} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Pagination - shared between tabs */}
        {totalItems > ITEM_DISPLAY && (
          <div className="mt-8 flex justify-center">
            <Pagination
              current={page}
              pageSize={ITEM_DISPLAY}
              total={totalItems}
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
            <Select placeholder="Select topic" options={topicOptions()} className="rounded-md" />
          </Form.Item>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-medium text-gray-700 mb-4">Upload or Create Flashcards</h3>

            <Form.Item name="csvFile" label="Upload CSV File">
              <input
                type="file"
                accept=".csv"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) {
                    setCsvFile(file)
                  }
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#469B74] file:text-white hover:file:bg-[#3a7d5e]"
              />
              {csvFile && <div className="mt-2 text-sm text-green-600">✓ File selected: {csvFile.name}</div>}
            </Form.Item>

            {!csvFile && (
              <Form.List name="questions">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} className="mb-4 p-4 bg-white rounded-lg shadow-sm">
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
                            rules={[{ required: true, message: "Answer is required" }]}
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

          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
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

      {/* Upload document modal - Updated to match original approach */}
      <Modal
        footer=""
        title={
          <div className="flex items-center gap-2 text-[#469B74] py-1">
            <div className="w-1.5 h-5 bg-[#469B74] rounded-full mr-1"></div>
            <span className="font-bold">Upload a document</span>
          </div>
        }
        open={isDocumentModal}
        onCancel={() => {
          setIsDocumentModal(false)
          setFiles(null)
        }}
        width={600}
      >
        <Form onFinish={onSubmitDocumentForm} layout="vertical" className="mt-4">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input className="rounded-md" placeholder="Enter document title" />
          </Form.Item>

          <Form.Item label="Document file" rules={[{ required: true }]}>
            <input
              type="file"
              onChange={(e) => handleChangeBanner(e.target)}
              accept=".pdf"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#469B74] file:text-white hover:file:bg-[#3a7d5e]"
            />
            {files && <div className="mt-2 text-sm text-green-600">✓ File selected: {files[0]?.name}</div>}
            <div className="mt-2 text-xs text-gray-500">Only PDF files are allowed</div>
          </Form.Item>

          <Form.Item name="topic" label="Topic" rules={[{ required: true }]}>
            <Select placeholder="Select topic" options={topicOptions()} className="rounded-md" />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea className="rounded-md" autoSize={{ minRows: 3 }} placeholder="Enter document description" />
          </Form.Item>

          <Form.Item className="text-right mb-0">
            <Button
              loading={uploadDocument.isPending}
              disabled={isDisableButton}
              type="primary"
              htmlType="submit"
              className="bg-[#469B74] hover:bg-[#3a7d5e] border-none rounded-md px-6"
            >
              Upload
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CombinedScreen
