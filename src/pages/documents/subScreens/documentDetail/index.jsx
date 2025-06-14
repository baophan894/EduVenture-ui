"use client"

/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom"
import PDFViewer from "../../components/PdfViewer"
import useAllDocuments from "../../../../hook/documents/useAllDocument"
import {
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
  LikeOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons"
import getReviewStatus from "../../../../helpers/getReviewStatus"
import useAllTopic from "../../../../hook/topic/useAllTopic"
import useAllUser from "../../../../hook/user/useAllUser"
import { Tag, Button, Tooltip, Avatar } from "antd"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../../../api/http"
import Report from "../../../../components/report"
import { loginRequire } from "../../../../common/protectRoute"
import useUserInfo from "../../../../hook/user/useUserInfo"
import { useNavigate } from "react-router-dom"

const DocumentDetail = () => {
  loginRequire()
  const user = useUserInfo()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams()
  const documents = useAllDocuments()
  const topics = useAllTopic()
  const users = useAllUser()

  const documentActive = documents?.find((document) => document.id == id)
  const { totalHelpful, totalUnhelpful } = getReviewStatus(documentActive?.reviews)
  const topicName = topics?.find((i) => i.id == documentActive?.topicId)?.name
  const documentAuthor = users?.find((u) => u.id == documentActive?.userId)

  const token = localStorage.getItem("token")

  const reviewMutation = useMutation({
    mutationFn: (body) => {
      return api.post("/upload-review", body, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      })
    },
  })

  const handleReview = (state) => {
    const formData = new FormData()
    formData.append("review", state)
    formData.append("documentId", documentActive?.id)
    reviewMutation.mutate(formData, {
      onSuccess() {
        queryClient.invalidateQueries("documents")
      },
    })
  }

  const isLike = documentActive?.reviews.some((review) => {
    return review.userId == user.id && review.state == "helpful"
  })

  const isDisLike = documentActive?.reviews.some((review) => {
    return review.userId == user.id && review.state == "unhelpful"
  })

  const handleDownload = () => {
    if (documentActive?.fileUrl) {
      window.open(documentActive.fileUrl, "_blank")
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: documentActive?.title,
        text: `Check out this document: ${documentActive?.title}`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const getFileType = (url) => {
    if (url?.includes(".pdf")) return "PDF"
    if (url?.includes(".doc") || url?.includes(".docx")) return "DOC"
    if (url?.includes(".ppt") || url?.includes(".pptx")) return "PPT"
    return "DOC"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar with back button and actions */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-[#469B74]"
              >
                Back
              </Button>
              <div className="h-4 w-px bg-gray-300"></div>
              <Tag color="#469B74" className="text-xs font-medium">
                {topicName}
              </Tag>
              <Tag color="blue" className="text-xs font-medium">
                {getFileType(documentActive?.fileUrl)}
              </Tag>
            </div>

            <div className="flex items-center gap-2">
              <Tooltip title="Download document">
                <Button
                  type="text"
                  icon={<DownloadOutlined />}
                  onClick={handleDownload}
                  className="text-gray-600 hover:text-[#469B74]"
                />
              </Tooltip>
              <Tooltip title="Share document">
                <Button
                  type="text"
                  icon={<ShareAltOutlined />}
                  onClick={handleShare}
                  className="text-gray-600 hover:text-[#469B74]"
                />
              </Tooltip>
              <Report resourceType={"document"} resourceId={documentActive?.id} />
            </div>
          </div>

          {/* Document info */}
          <div className="py-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#469B74] to-[#3a7d5e] rounded-lg flex items-center justify-center">
                    <FileTextOutlined className="text-white text-xl" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">{documentActive?.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <UserOutlined />
                        <span>{documentAuthor?.fullName || "Unknown Author"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarOutlined />
                        <span>{new Date(documentActive?.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {documentActive?.description && (
                  <p className="text-gray-700 mb-4 max-w-3xl">{documentActive.description}</p>
                )}
              </div>

              {/* Review actions */}
              <div className="flex items-center gap-3 ml-6">
                <div className="flex items-center gap-2">
                  <Button
                    type={isLike ? "primary" : "default"}
                    icon={isLike ? <LikeFilled /> : <LikeOutlined />}
                    onClick={() => handleReview("helpful")}
                    loading={reviewMutation.isPending}
                    className={`flex items-center gap-1 ${
                      isLike
                        ? "bg-[#469B74] border-[#469B74] hover:bg-[#3a7d5e]"
                        : "border-[#469B74] text-[#469B74] hover:border-[#3a7d5e] hover:text-[#3a7d5e]"
                    }`}
                  >
                    <span className="font-medium">{totalHelpful}</span>
                  </Button>

                  <Button
                    type={isDisLike ? "primary" : "default"}
                    icon={isDisLike ? <DislikeFilled /> : <DislikeOutlined />}
                    onClick={() => handleReview("unhelpful")}
                    loading={reviewMutation.isPending}
                    className={`flex items-center gap-1 ${
                      isDisLike
                        ? "bg-orange-500 border-orange-500 hover:bg-orange-600"
                        : "border-orange-500 text-orange-500 hover:border-orange-600 hover:text-orange-600"
                    }`}
                  >
                    <span className="font-medium">{totalUnhelpful}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {documentActive?.fileUrl ? (
            <PDFViewer file={documentActive.fileUrl} />
          ) : (
            <div className="flex items-center justify-center h-96 text-gray-500">
              <div className="text-center">
                <FileTextOutlined className="text-4xl mb-2" />
                <p>Document not available</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Document metadata sidebar - could be added later */}
      <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 w-64">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Document Info</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-500">Author:</span>
              <div className="flex items-center gap-2 mt-1">
                <Avatar size="small" icon={<UserOutlined />} />
                <span className="font-medium">{documentAuthor?.fullName || "Unknown"}</span>
              </div>
            </div>
            <div>
              <span className="text-gray-500">Topic:</span>
              <p className="font-medium text-[#469B74]">{topicName}</p>
            </div>
            <div>
              <span className="text-gray-500">File Type:</span>
              <p className="font-medium">{getFileType(documentActive?.fileUrl)}</p>
            </div>
            <div>
              <span className="text-gray-500">Uploaded:</span>
              <p className="font-medium">{new Date(documentActive?.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-gray-500">Reviews:</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[#469B74] font-medium">{totalHelpful} helpful</span>
                <span className="text-orange-500 font-medium">{totalUnhelpful} unhelpful</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentDetail
