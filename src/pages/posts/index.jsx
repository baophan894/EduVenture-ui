"use client"

import React from "react"

import { Avatar, Button, Input, Modal, notification } from "antd"
import useUserInfo from "../../hook/user/useUserInfo"
import PostScreenStyle from "./PostScreenStyle"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../api/http"
import useAllPost from "../../hook/posts/useAllPost"
import useAllUser from "../../hook/user/useAllUser"
import Post from "./components/post"
import Loading from "../../components/loading"
import useIsLogin from "../../hook/user/useIsLogin"
import styled from "styled-components"
import { ImageIcon, SmileIcon, MapPinIcon, Users, X } from "lucide-react"

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: #ffffff;
    border-radius: 8px;
    
    padding: 0;
  }

  .ant-modal-header {
    background-color: #ffffff;
    border-bottom: 1px solid #469B74;
    padding: 16px;
    margin: 0;
    border-radius: 8px 8px 0 0;
    text-align: center;
    position: relative;
  }

  .ant-modal-title {
    color: #469B74 !important;
    font-size: 20px;
    font-weight: 700;
  }

  .ant-modal-body {
    padding: 0;
  }

  .ant-modal-close {
    color: #469B74;
    
    &:hover {
      color: #469B74;
      background-color: #949997;
    }
  }

  .close-button {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #469B74;
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #e4e6eb;
    
    &:hover {
      background-color: #469B74;
    }
  }

  .user-section {
    padding: 16px 16px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .privacy-button {
    background-color: #469B74;
    border: none;
    color: #e4e6eb;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 4px;
    
    &:hover {
      background-color: #539f7b;
    }
  }

  .composer {
    padding: 0 16px;
    margin-top: 12px;

    .ant-input {
      background-color: transparent;
      border: none;
      color: #3a3b3c;
      font-size: 24px;
      padding: 0;
      resize: none;
      
      &::placeholder {
        color: #3a3b3c;
      }
      
      &:focus {
        box-shadow: none;
      }
    }
  }

  .toolbar {
    margin-top: 20px;
    padding: 8px 16px;
    border-top: 1px solid #469B74;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tools {
    display: flex;
    gap: 8px;
  }

  .tool-button {
    background: none;
    border: none;
    color: #469B74;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background-color: #d9dee4;
    }
  }

  .post-button {
    width: 94%;
    background-color: #469B74;
    border: none;
    color: white;
    padding: 8px;
    border-radius: 6px;
    font-weight: 600;
    margin: 16px;

    &:hover {
      background-color: #FCB80B;
    }

    &:disabled {
      background-color: #bac0bd;
      color: #4e4f50;
      cursor: not-allowed;
    }
  }

  .file-input {
    display: none;
  }

  .selected-file {
    margin-top: 8px;
    color: #3a3b3c;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 16px;
  }
`

const PostScreen = () => {
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
      <div className="posts">
        {!!user && (
          <div className="posts_heading">
            <Avatar size={50} src={user?.avatarUrl} />
            <Input
              onClick={() => setIsViewModal(true)}
              placeholder={`Hello ${user?.fullName}, do you have question to discuss ?`}
            />
          </div>
        )}
        <div className="posts_content mt-10">
          {posts?.map((post) => (
            <Post key={post.id} post={post} author={getAuthorByUserId(post.userId)} />
          ))}
        </div>

        {isLogin && user && (
          <StyledModal
            title="Tạo bài viết"
            open={isViewModal}
            onCancel={() => setIsViewModal(false)}
            footer={null}
            closeIcon={<X />}
            width={500}
          >
            <div className="user-section">
              <Avatar size={40} src={user?.avatarUrl} />
              <button className="privacy-button">
                <Users size={16} />
                Công khai
              </button>
            </div>

            <div className="composer">
              <Input.TextArea
                placeholder={`${user?.fullName} ơi, bạn đang nghĩ gì thế?`}
                autoSize={{ minRows: 3, maxRows: 8 }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {imageFile && (
                <div className="selected-file">
                  <ImageIcon size={16} />
                  {imageFile.name}
                </div>
              )}
            </div>

            <div className="toolbar">
              <div className="tools">
                <button className="tool-button" onClick={handleUploadClick}>
                  <ImageIcon size={20} />
                </button>
                <button className="tool-button">
                  <Users size={20} />
                </button>
                <button className="tool-button">
                  <SmileIcon size={20} />
                </button>
                <button className="tool-button">
                  <MapPinIcon size={20} />
                </button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleChangeImage}
              accept="image/*"
              className="file-input"
            />

            <Button
              className="post-button"
              onClick={onCreatePost}
              disabled={!content.trim() && !imageFile}
              loading={createPost.isPending}
            >
              Đăng
            </Button>
          </StyledModal>
        )}
      </div>
    </PostScreenStyle>
  )
}

export default PostScreen

