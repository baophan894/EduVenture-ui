"use client"

import React from "react"
import { Avatar, Button, Input, Modal, notification, Card, Typography, Divider, Tooltip } from "antd"
import {
  ImageIcon,
  SmileIcon,
  MapPinIcon,
  Users,
  X,
  Camera,
  Globe,
  MessageCircle,
  Heart,
  MoreHorizontal,
} from "lucide-react"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useUserInfo from "../../hook/user/useUserInfo"
import PostScreenStyle from "./PostScreenStyle"
import api from "../../api/http"
import useAllPost from "../../hook/posts/useAllPost"
import useAllUser from "../../hook/user/useAllUser"
import Post from "./components/post"
import Loading from "../../components/loading"
import useIsLogin from "../../hook/user/useIsLogin"

const { Title, Text } = Typography

const EnhancedPostScreen = () => {
  const queryClient = useQueryClient()
  const user = useUserInfo()
  const isLogin = useIsLogin()
  const allUsers = useAllUser()
  const getAuthorByUserId = (userId) => {
    return allUsers?.find((user) => user.id == userId)
  }
  const posts = useAllPost()
  const [imageFile, setImageFile] = useState()
  const [content, setContent] = useState("")
  const token = localStorage.getItem("token")
  const fileInputRef = React.useRef(null)

  const handleChangeImage = (event) => {
    const file = event.target.files[0]
    if (!file.type.includes("image")) {
      notification.error({
        message: "Just post an image",
        style: { backgroundColor: "#242526", color: "#e4e6eb", borderLeft: "4px solid #ff4d4f" },
      })
      setImageFile(null)
    } else {
      setImageFile(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const createPost = useMutation({
    mutationFn: (formData) => {
      return api.post("/create-post", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      })
    },
  })

  const onCreatePost = () => {
    const formData = new FormData()
    formData.append("content", content)
    if (imageFile) {
      formData.append("file", imageFile)
    }
    createPost.mutate(formData, {
      onSuccess() {
        queryClient.invalidateQueries("posts")
        setIsViewModal(false)
        setContent("")
        setImageFile(null)
        notification.success({
          message: "Post created successfully",
          style: { backgroundColor: "#242526", color: "#e4e6eb", borderLeft: "4px solid #469B74" },
        })
      },
    })
  }

  const [isViewModal, setIsViewModal] = useState(false)
  const isDataReady = posts && allUsers

  return !isDataReady ? (
    <Loading />
  ) : (
    <PostScreenStyle>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Create Post Card */}
        {!!user && (
          <Card className="shadow-lg border-0 rounded-xl overflow-hidden">
            <div className="p-4">
              <div className="flex items-center space-x-3">
                <Avatar size={50} src={user?.avatarUrl} className="border-2 border-[#469B74]" />
                <div className="flex-1">
                  <Input
                    onClick={() => setIsViewModal(true)}
                    placeholder={`Hello ${user?.fullName}, do you have question to discuss?`}
                    className="rounded-full border-gray-300 hover:border-[#469B74] focus:border-[#469B74] cursor-pointer"
                    size="large"
                    style={{
                      backgroundColor: "#f0f2f5",
                      border: "none",
                      fontSize: "16px",
                    }}
                  />
                </div>
              </div>

              <Divider className="my-4" />

              <div className="flex justify-around">
                <Button
                  type="text"
                  icon={<Camera className="w-5 h-5 text-[#469B74]" />}
                  className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 rounded-lg px-4 py-2 font-medium"
                  onClick={() => setIsViewModal(true)}
                >
                  <span>Photo</span>
                </Button>
                <Button
                  type="text"
                  icon={<MessageCircle className="w-5 h-5 text-[#FCB80B]" />}
                  className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 rounded-lg px-4 py-2 font-medium"
                  onClick={() => setIsViewModal(true)}
                >
                  <span>Discussion</span>
                </Button>
                <Button
                  type="text"
                  icon={<Heart className="w-5 h-5 text-red-500" />}
                  className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 rounded-lg px-4 py-2 font-medium"
                  onClick={() => setIsViewModal(true)}
                >
                  <span>Feeling</span>
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts?.map((post) => (
            <Post key={post.id} post={post} author={getAuthorByUserId(post.userId)} />
          ))}
        </div>

        {/* Create Post Modal */}
        {isLogin && user && (
          <Modal
            title={null}
            open={isViewModal}
            onCancel={() => setIsViewModal(false)}
            footer={null}
            closeIcon={null}
            width={540}
            className="create-post-modal"
            styles={{
              content: {
                padding: 0,
                borderRadius: "12px",
                overflow: "hidden",
              },
            }}
          >
            {/* Modal Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 relative">
              <Title level={4} className="text-center text-gray-800 mb-0 font-semibold">
                Create Post
              </Title>
              <Button
                type="text"
                icon={<X className="w-5 h-5" />}
                onClick={() => setIsViewModal(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              />
            </div>

            {/* User Info Section */}
            <div className="p-4 bg-white">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar size={40} src={user?.avatarUrl} className="border border-gray-200" />
                <div>
                  <Text className="font-semibold text-gray-800 block">{user?.fullName}</Text>
                  <Button
                    size="small"
                    icon={<Globe className="w-3 h-3" />}
                    className="bg-gray-100 border-gray-200 text-gray-600 text-xs rounded-md mt-1"
                  >
                    Public
                  </Button>
                </div>
              </div>

              {/* Text Input */}
              <Input.TextArea
                placeholder={`What's on your mind, ${user?.fullName}?`}
                autoSize={{ minRows: 3, maxRows: 8 }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border-none resize-none text-lg"
                style={{
                  fontSize: "18px",
                  lineHeight: "1.4",
                  padding: "0",
                }}
              />

              {/* Selected Image Preview */}
              {imageFile && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <ImageIcon className="w-4 h-4" />
                    <Text className="text-sm">{imageFile.name}</Text>
                    <Button
                      type="text"
                      size="small"
                      icon={<X className="w-3 h-3" />}
                      onClick={() => setImageFile(null)}
                      className="ml-auto"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Toolbar */}
            <div className="px-4 py-3 bg-white border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Text className="text-sm font-medium text-gray-700">Add to your post</Text>
                <div className="flex space-x-2">
                  <Tooltip title="Photo/Video">
                    <Button
                      type="text"
                      icon={<ImageIcon className="w-5 h-5 text-[#469B74]" />}
                      onClick={handleUploadClick}
                      className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center"
                    />
                  </Tooltip>
                  <Tooltip title="Tag People">
                    <Button
                      type="text"
                      icon={<Users className="w-5 h-5 text-blue-500" />}
                      className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center"
                    />
                  </Tooltip>
                  <Tooltip title="Feeling/Activity">
                    <Button
                      type="text"
                      icon={<SmileIcon className="w-5 h-5 text-yellow-500" />}
                      className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center"
                    />
                  </Tooltip>
                  <Tooltip title="Check In">
                    <Button
                      type="text"
                      icon={<MapPinIcon className="w-5 h-5 text-red-500" />}
                      className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center"
                    />
                  </Tooltip>
                  <Tooltip title="More">
                    <Button
                      type="text"
                      icon={<MoreHorizontal className="w-5 h-5 text-gray-500" />}
                      className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center"
                    />
                  </Tooltip>
                </div>
              </div>

              {/* Post Button */}
              <Button
                type="primary"
                size="large"
                onClick={onCreatePost}
                disabled={!content.trim() && !imageFile}
                loading={createPost.isPending}
                className="w-full bg-[#469B74] hover:bg-[#3d8a67] border-[#469B74] hover:border-[#3d8a67] font-semibold rounded-lg h-10"
              >
                {createPost.isPending ? "Posting..." : "Post"}
              </Button>
            </div>

            {/* Hidden File Input */}
            <input ref={fileInputRef} type="file" onChange={handleChangeImage} accept="image/*" className="hidden" />
          </Modal>
        )}
      </div>
    </PostScreenStyle>
  )
}

export default EnhancedPostScreen
