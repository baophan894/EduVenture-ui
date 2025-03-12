/* eslint-disable react/prop-types */
"use client"

import { useState } from "react"
import { Avatar, Button, Form, Image, Input, Modal, notification } from "antd"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { motion } from "framer-motion"
import api from "../../../../api/http"
import styled from "styled-components"
import formatDate from "../../../../helpers/formatDate"
import useAllUser from "../../../../hook/user/useAllUser"
import useUserInfo from "../../../../hook/user/useUserInfo"
import useToken from "../../../../hook/user/useToken"
import useIsLogin from "../../../../hook/user/useIsLogin"
import { ImageIcon } from "lucide-react"
import React from "react"

const CommentStyle = styled.div`
  .comment-section {
    margin-top: 16px;
  }

  .comment-form {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    align-items: flex-start;
    
    .ant-form {
      flex-grow: 1;
    }
    
    .ant-input {
      background-color: #f0f0f0;
      border: none;
      border-radius: 20px;
      padding: 8px 16px;
      
      &:focus {
        background-color: white;
        box-shadow: 0 0 0 2px rgba(70, 155, 116, 0.2);
      }
    }
    
    .submit-button {
      background-color: #469B74;
      border: none;
      color: white;
      border-radius: 20px;
      padding: 4px 16px;
      height: auto;
      
      &:hover {
        background-color: #FCB80B;
      }
      
      &:disabled {
        background-color: #e0e0e0;
      }
    }
  }

  .comment-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .comment-item {
    display: flex;
    gap: 12px;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transition: transform 0.2s, box-shadow 0.2s;
    .comment-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
} 
    .comment-content {
      flex-grow: 1;
      
      
      .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
        
        .username {
          font-weight: 600;
          color: #469B74;
        }
        
        .timestamp {
          font-size: 12px;
          color: #666;
        }
      }
      
      .comment-text {
        color: #333;
        margin-bottom: 8px;
      }
      
      .comment-image {
        border-radius: 8px;
        overflow: hidden;
        margin-top: 8px;
      }
      
      .comment-actions {
        display: flex;
        gap: 8px;
        margin-top: 8px;
        
        button {
          padding: 4px 12px;
          border-radius: 16px;
          
          &.edit {
            color: #469B74;
            border-color: #469B74;
            
            &:hover {
              background-color: rgba(70, 155, 116, 0.1);
            }
          }
          
          &.delete {
            color: #ff4d4f;
            border-color: #ff4d4f;
            
            &:hover {
              background-color: rgba(255, 77, 79, 0.1);
            }
          }
        }
      }
    }
  }
  .file-input {
    display: none;
  }
  .show-more {
    color: #469B74;
    font-weight: 500;
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    width: 100%;
    text-align: left;
    
    &:hover {
      color: #FCB80B;
    }
  }

  .upload-icon {
    color: #469B74;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s;
    
    &:hover {
      color: #FCB80B;
      background-color: rgba(70, 155, 116, 0.1);
    }
  }

  .file-input {
    display: none;
  }

  .selected-file {
    margin-top: 8px;
    color: #666;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: #1c1c1c;
    border-radius: 16px;
    padding: 0;
  }

  .ant-modal-header {
    background-color: #1c1c1c;
    border-bottom: 1px solid #2d2d2d;
    padding: 16px 20px;
    margin: 0;
    border-radius: 16px 16px 0 0;
  }

  .ant-modal-title {
    color: white !important;
  }

  .ant-modal-body {
    padding: 20px;
  }

  .ant-input {
    background-color: #1c1c1c;
    border: 1px solid #333;
    color: white;
    
    &:focus {
      border-color: #469B74;
    }
  }

  .ant-btn-primary {
    background-color: #469B74;
    border-color: #469B74;
    
    &:hover {
      background-color: #FCB80B;
      border-color: #FCB80B;
    }
  }
`

const Comment = ({ comments, postId }) => {
  const [numberCommentShow, setNumberCommentShow] = useState(3)
  const [imageFile, setImageFile] = useState()
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [setDeleteId] = useState()
  const [setEditComment] = useState()
  const [setEditContent] = useState("")

  const token = useToken()
  const isLogin = useIsLogin()
  const queryClient = useQueryClient()
  const users = useAllUser()
  const userInfo = useUserInfo()
  const [form] = Form.useForm()
  const [formComment] = Form.useForm()
  const fileInputRef = React.useRef(null)

  const getUserById = (userId) => users?.find((user) => user.id == userId)
  const isOwnerComment = (comment) => comment.userId == userInfo?.id
  const commentData = comments?.slice(0, numberCommentShow)

  const handleChangeImage = (info) => {
    const file = info.fileList[0]?.originFileObj
    if (file && !file.type.includes("image")) {
      notification.error({ message: "Please, just upload image in comment" })
      setImageFile(null)
    } else {
      setImageFile(file)
    }
  }

  const commentMutation = useMutation({
    mutationFn: (formData) => {
      return api.post("/post/comment", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      })
    },
  })

  const handleComment = ({ content }) => {
    const formData = new FormData()
    formData.append("content", content)
    formData.append("file", imageFile)
    formData.append("postId", postId)
    commentMutation.mutate(formData, {
      onSuccess() {
        setImageFile(undefined)
        queryClient.invalidateQueries("posts")
        queryClient.invalidateQueries("myposts")
        formComment.resetFields()
      },
    })
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <CommentStyle>
      <div className="comment-section">
        {isLogin && (
          <div className="comment-form">
            <Avatar src={userInfo?.avatarUrl} />
            <Form form={formComment} onFinish={handleComment} style={{ flex: 1 }}>
              <Form.Item name="content" rules={[{ required: true }]} style={{ marginBottom: 8 }}>
                <Input.TextArea placeholder="Write a comment..." autoSize={{ minRows: 1, maxRows: 4 }} />
              </Form.Item>
              {imageFile && (
                <div className="selected-file">
                  <ImageIcon size={16} />
                  {imageFile.name}
                </div>
              )}
              <div className="flex justify-between items-center">
                <ImageIcon className="upload-icon" size={35} onClick={handleUploadClick} />
                {/* <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleChangeImage}
                  accept="image/*"
                  className="hidden !important"
                /> */}
                <Button className="submit-button" htmlType="submit" loading={commentMutation.isPending}>
                  Reply
                </Button>
              </div>
            </Form>
          </div>
        )}

        <div className="comment-list">
          {commentData?.map((comment) => {
            const user = getUserById(comment.userId)
            return (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="comment-item"
              >
                <Avatar src={user?.avatarUrl} />
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="username">{user?.fullName}</span>
                    <span className="timestamp">{formatDate(new Date(comment.createdAt))}</span>
                  </div>
                  <div className="comment-text">{comment.content}</div>
                  {comment.fileUrl && (
                    <div className="comment-image">
                      <Image width={200} src={comment.fileUrl || "/placeholder.svg"} />
                    </div>
                  )}
                  {isOwnerComment(comment) && (
                    <div className="comment-actions">
                      <Button className="edit" size="small" onClick={() => setEditComment(comment)}>
                        Edit
                      </Button>
                      <Button className="delete" size="small" onClick={() => setDeleteId(comment.id)}>
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {comments?.length > 3 && (
          <button
            className="show-more"
            onClick={() => setNumberCommentShow((prev) => (prev === 3 ? comments.length : 3))}
          >
            {numberCommentShow === 3 ? `Show all ${comments.length} comments` : "Show less"}
          </button>
        )}
      </div>

      {/* Edit Modal */}
      <StyledModal
        title="Edit Comment"
        open={isShowEditModal}
        onOk={() => {
          /* Handle edit */
        }}
        onCancel={() => setIsShowEditModal(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="content" rules={[{ required: true }]}>
            <Input.TextArea onChange={(e) => setEditContent(e.target.value)} />
          </Form.Item>
          <Form.Item label="Image">
            <Input type="file" onChange={(e) => handleChangeImage(e.target)} />
          </Form.Item>
        </Form>
      </StyledModal>

      {/* Delete Modal */}
      <StyledModal
        title="Delete Comment"
        open={isShowDeleteModal}
        onOk={() => {
          /* Handle delete */
        }}
        onCancel={() => setIsShowDeleteModal(false)}
      >
        <p style={{ color: "white" }}>Are you sure you want to delete this comment?</p>
      </StyledModal>
    </CommentStyle>
  )
}

export default Comment

