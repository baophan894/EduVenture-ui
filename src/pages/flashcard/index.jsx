"use client"

import { useEffect, useState } from "react"
import useAllTopic from "../../hook/topic/useAllTopic"
import { Button, Col, Form, Input, Modal, Pagination, Row, Select, Upload, notification } from "antd"
import Search from "../../components/search"
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  BookOutlined,
} from "@ant-design/icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../api/http"
import useAllFlashCard from "../../hook/flashcard/useAllFlashCard"
import FlashCard from "./components/FlashCard"
import Loading from "../../components/loading"
import { ACTIVE_RESOURCE } from "../../common/constants"

const ITEM_DISPLAY = 12

const FlashcardScreen = () => {
  const queryClient = useQueryClient()
  const [isViewModal, setIsViewModal] = useState(false)
  const [isPurchaseModal, setIsPurchaseModal] = useState(false)
  const [selectedFlashcard, setSelectedFlashcard] = useState(null)
  const [page, setPage] = useState(1)
  const [csvFile, setCsvFile] = useState(null)

  const flashcards = useAllFlashCard()
  const topics = useAllTopic()
  const [topicFilter, setTopicFilter] = useState()
  const [search, setSearch] = useState("")
  const [displayFlashcards, setDisplayFlashcards] = useState([])

  const token = localStorage.getItem("token")

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

  // Payment mutation for flashcard purchase
  const purchaseFlashcard = useMutation({
    mutationFn: (body) => {
      return api.post("/payment", body, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      })
    },
  })

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

  // Handle flashcard purchase
  const onConfirmPurchase = () => {
    if (!selectedFlashcard) return

    const formData = new FormData()
    formData.append("flashcardId", selectedFlashcard.id)

    purchaseFlashcard.mutate(formData, {
      onSuccess: (data) => {
        window.location.replace(data.data)
      },
      onError: (error) => {
        notification.error({
          message: "Lỗi thanh toán",
          description: error.response?.data?.message || "Có lỗi xảy ra khi thanh toán",
        })
      },
    })
  }

  // Handle flashcard click - check if purchase is needed
  const handleFlashcardClick = (flashcard) => {
    // Check if flashcard requires purchase (you can modify this logic based on your requirements)
    const requiresPurchase = flashcard.price && flashcard.price > 0 && !flashcard.isPurchased

    if (requiresPurchase) {
      setSelectedFlashcard(flashcard)
      setIsPurchaseModal(true)
    } else {
      // Navigate to flashcard detail or open flashcard
      // Add your navigation logic here
      console.log("Opening flashcard:", flashcard)
    }
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

  useEffect(() => {
    let filteredFlashcards = flashcards?.filter((flashcard) => flashcard.state === ACTIVE_RESOURCE)
    if (topicFilter) {
      filteredFlashcards = filteredFlashcards.filter((document) => document.topicId == topicFilter)
    }
    if (search) {
      filteredFlashcards = filteredFlashcards.filter((flashcard) =>
        flashcard.name.toLowerCase().trim().includes(search.toLowerCase().trim()),
      )
    }
    const startIndex = (page - 1) * ITEM_DISPLAY
    const endIndex = startIndex + ITEM_DISPLAY
    setDisplayFlashcards(filteredFlashcards?.slice(startIndex, endIndex))
  }, [flashcards, page, topicFilter, search])

  const isDataReady = flashcards && topics

  return !isDataReady ? (
    <Loading />
  ) : (
    <div className="min-h-screen bg-gray-50">
      {/* Header with filters - keeping original structure */}
      <div className="fixed z-20 inset-x-0 top-[59px] bg-white shadow-md">
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

          {/* Keeping original Search and Create button */}
          <Search setSearch={setSearch} />
          <div
            onClick={() => setIsViewModal(true)}
            className="mr-5 p-2 rounded bg-[#469B74] text-white hover:bg-[#3a7d5e] transition-colors cursor-pointer"
          >
            <span className="mr-[3px]">Create</span> <PlusCircleOutlined />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-[50px] pt-[100px] pb-12">
        {displayFlashcards?.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-sm p-10 max-w-md mx-auto">
              <div className="text-[#469B74] flex justify-center mb-4">
                <FileTextOutlined style={{ fontSize: "48px" }} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No flashcards found</h3>
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
          <Row gutter={[16, 40]}>
            {displayFlashcards?.map((flashcard) => (
              <Col key={flashcard.id} className="gutter-row" xs={24} sm={12} md={6}>
                <FlashCard flashcard={flashcard} onFlashcardClick={handleFlashcardClick} />
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
            <Select placeholder="Select topic" options={topicOptions()} className="rounded-md" />
          </Form.Item>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-medium text-gray-700 mb-4">Upload or Create Flashcards</h3>

            <Form.Item name="csvFile" label="Upload CSV File">
              <Upload
                accept=".csv"
                beforeUpload={(file) => {
                  setCsvFile(file)
                  return false
                }}
                maxCount={1}
                onRemove={() => setCsvFile(null)}
              >
                <Button
                  icon={<UploadOutlined />}
                  className="border-[#469B74] text-[#469B74] hover:text-[#469B74] hover:border-[#469B74]"
                >
                  Select CSV File
                </Button>
              </Upload>
              {csvFile && <div className="mt-2 text-sm text-gray-500">File selected: {csvFile.name}</div>}
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

      {/* Purchase Confirmation Modal */}
      <Modal
        title={null}
        open={isPurchaseModal}
        onCancel={() => setIsPurchaseModal(false)}
        footer={null}
        width={600}
        centered
        className="purchase-modal"
      >
        {selectedFlashcard && (
          <div className="purchase-modal-content">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-[#469B74] to-[#5BAE88] text-white p-6 -m-6 mb-6 rounded-t-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <BookOutlined className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Xác nhận mua Flashcard</h2>
                  <p className="text-white/90 text-sm">Mở khóa toàn bộ nội dung học tập!</p>
                </div>
              </div>
            </div>

            {/* Flashcard Information */}
            <div className="flex gap-6 mb-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-24 bg-gradient-to-br from-[#469B74] to-[#5BAE88] rounded-lg shadow-md flex items-center justify-center">
                  <BookOutlined className="text-white text-3xl" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{selectedFlashcard.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{selectedFlashcard.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <ClockCircleOutlined />
                    <span>Truy cập trọn đời</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOutlined />
                    <span>{selectedFlashcard.cardCount || "Nhiều"} thẻ học</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6 border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Giá flashcard</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-[#469B74]">
                      ${selectedFlashcard.price?.toLocaleString() || "0"}
                    </span>
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                      Giá ưu đãi
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm line-through">
                    ${((selectedFlashcard.price || 0) * 1.4).toLocaleString()}
                  </p>
                  <p className="text-green-600 text-sm font-medium">Tiết kiệm 30%</p>
                </div>
              </div>

              {/* What's included */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined className="text-green-500" />
                  <span className="text-sm text-gray-700">Truy cập trọn đời</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined className="text-green-500" />
                  <span className="text-sm text-gray-700">Tải về offline</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined className="text-green-500" />
                  <span className="text-sm text-gray-700">Cập nhật miễn phí</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined className="text-green-500" />
                  <span className="text-sm text-gray-700">Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>

            {/* Topic Info */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-[#469B74] rounded-full flex items-center justify-center">
                <BookOutlined className="text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {topics?.find((t) => t.id === selectedFlashcard.topicId)?.name || "Chủ đề học tập"}
                </p>
                <p className="text-sm text-gray-600">Flashcard chất lượng cao</p>
              </div>
              <div className="ml-auto text-right">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <CheckCircleOutlined key={star} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-500">4.8/5 (892 đánh giá)</p>
              </div>
            </div>

            {/* Money Back Guarantee */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm">
                <CheckCircleOutlined />
                <span className="font-medium">Đảm bảo hoàn tiền 100% trong 30 ngày</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => setIsPurchaseModal(false)}
                className="flex-1 h-12 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800 font-medium"
                size="large"
              >
                Hủy bỏ
              </Button>
              <Button
                onClick={onConfirmPurchase}
                loading={purchaseFlashcard.isPending}
                type="primary"
                size="large"
                className="flex-1 h-12 bg-gradient-to-r from-[#469B74] to-[#5BAE88] border-none font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                icon={<ShoppingCartOutlined />}
              >
                {purchaseFlashcard.isPending ? "Đang xử lý..." : "Mua ngay"}
              </Button>
            </div>

            {/* Security Notice */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                🔒 Thanh toán an toàn và bảo mật • Hỗ trợ 24/7 • Hoàn tiền dễ dàng
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default FlashcardScreen
