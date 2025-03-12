"use client"

/* eslint-disable react/prop-types */
import { Avatar, Button, Form, Image, Input, Modal, notification } from "antd"
import PostStyle from "./PostStyle"
import formatDate from "../../../../helpers/formatDate"
import { LikeOutlined, LikeFilled, CommentOutlined, MoreOutlined, ShareAltOutlined } from "@ant-design/icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../../../api/http"
import useUserInfo from "../../../../hook/user/useUserInfo"
import useIsLogin from "../../../../hook/user/useIsLogin"
import Comment from "../comments"
import useToken from "../../../../hook/user/useToken"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useForm } from "antd/es/form/Form"

const Post = ({ post, author, modifyAble = false }) => {
  //state
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [imageFile, setImageFile] = useState()
  const [editContent, setEditContent] = useState("")
  const [showComments, setShowComments] = useState(false)
  //state

  //common
  const token = useToken()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isLogin = useIsLogin()
  const userInfo = useUserInfo()
  const [form] = useForm()
  const likes = post?.likes
  const totalLike = likes?.length
  const comments = post?.comments.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
  const totalComment = comments?.length
  const isLiked = isLogin ? likes?.some((like) => like.userId == userInfo?.id) : false
  //common

  //effect
  useEffect(() => {
    form.setFieldsValue(post)
  }, [post, form])
  //effect

  //mutation
  const editPostMutation = useMutation({
    mutationFn: (formData) => {
      return api.put(`/update-post/${post.id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      })
    },
  })

  const likePostMutation = useMutation({
    mutationFn: (formData) => {
      return api.post("/post/like", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      })
    },
  })
  const deletePostMutation = useMutation({
    mutationFn: ({ id }) => {
      return api.delete(`/deletePost/${id}`, {
        headers: {
          Authorization: token,
        },
      })
    },
  })
  //mutation

  //call api
  const likePostHandle = () => {
    if (isLogin) {
      const formData = new FormData()
      formData.append("postId", post.id)
      likePostMutation.mutate(formData, {
        onSuccess() {
          queryClient.invalidateQueries("posts")
        },
      })
    }
  }
  const handleEditPost = () => {
    const formData = new FormData()
    formData.append("content", editContent)
    formData.append("file", imageFile)
    editPostMutation.mutate(formData, {
      onSuccess() {
        setIsShowEditModal(false)
        setImageFile(undefined)
        queryClient.invalidateQueries("posts")
        queryClient.invalidateQueries("myposts")
      },
    })
  }
  const handleDeletePost = () => {
    deletePostMutation.mutate(
      { id: post.id },
      {
        onSuccess() {
          queryClient.invalidateQueries("myposts")
          queryClient.invalidateQueries("posts")
          notification.success({
            message: "Delete post successfully",
            style: { borderLeft: "4px solid #469B74" },
          })
        },
        onError() {
          notification.error({
            message: "Delete post failed",
            style: { borderLeft: "4px solid #ff4d4f" },
          })
        },
      },
    )
    setIsShowDeleteModal(false)
  }
  //call api

  //onChange
  const handleViewPostDetail = (id) => {
    navigate(`/post/detail/${id}`)
  }
  const handleCancelDelete = () => {
    setIsShowDeleteModal(false)
  }
  const showDeletePostModal = () => {
    setIsShowDeleteModal(true)
  }
  const showEditPostModal = () => {
    setIsShowEditModal(true)
  }
  const handleCancelEditPost = () => {
    setIsShowEditModal(false)
  }
  const handleChangeImage = (info) => {
    const file = info.files[0]
    if (!file.type.includes("image")) {
      notification.error({
        message: "Please, just upload image in post",
        style: { borderLeft: "4px solid #ff4d4f" },
      })
      setImageFile(null)
    } else {
      setImageFile(info.files[0])
    }
  }

  const toggleComments = () => {
    setShowComments(!showComments)
  }
  //onChange

  return (
    <PostStyle>
      <div className="post">
        <div className="post_header">
          <div className="post_avatar">
            <Avatar
              size={40}
              src={author?.avatarUrl}
              onClick={() => handleViewPostDetail(post?.id)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="post_user_info">
            <p className="username" onClick={() => handleViewPostDetail(post?.id)} style={{ cursor: "pointer" }}>
              {author?.fullName}
            </p>
            <div className="post_time">{formatDate(new Date(post?.createdAt))}</div>
          </div>
          <div className="post_actions">
            {modifyAble ? (
              <>
                <Button className="action_button" size="small" onClick={showEditPostModal}>
                  Edit
                </Button>
                <Button className="action_button danger" size="small" onClick={showDeletePostModal}>
                  Delete
                </Button>
              </>
            ) : (
              <button className="more_button">
                <MoreOutlined />
              </button>
            )}
          </div>
        </div>

        <div className="post_content">
          <p>{post?.content}</p>
          {post?.fileUrl && (
            <div className="post_image">
              <Image preview={false} width={"100%"} src={post?.fileUrl || "/placeholder.svg"} />
            </div>
          )}
        </div>

        <div className="post_interactions">
          <div className="interaction_item" onClick={likePostHandle} style={{ cursor: "pointer" }}>
            {isLiked ? <LikeFilled className="icon active" /> : <LikeOutlined className="icon" />}
            {!!totalLike && <span className="count">{totalLike}</span>}
          </div>

          <div className="interaction_item" onClick={toggleComments} style={{ cursor: "pointer" }}>
            <CommentOutlined className="icon" />
            {!!totalComment && <span className="count">{totalComment}</span>}
          </div>

          <div className="interaction_item">
            <ShareAltOutlined className="icon" />
          </div>
        </div>

        {(showComments || totalComment === 0) && (
          <div className="comments_section">
            <Comment comments={comments} postId={post?.id} />
          </div>
        )}
      </div>

      <Modal
        title={<div style={{ color: "#469B74" }}>Delete Post</div>}
        open={isShowDeleteModal}
        onOk={handleDeletePost}
        confirmLoading={deletePostMutation.isPending}
        onCancel={handleCancelDelete}
        okButtonProps={{ style: { backgroundColor: "#FCB80B", borderColor: "#FCB80B" } }}
      >
        <p>Are you sure to delete this post?</p>
      </Modal>

      <Modal
        title={<div style={{ color: "#469B74" }}>Edit Post</div>}
        open={isShowEditModal}
        onOk={handleEditPost}
        confirmLoading={editPostMutation.isPending}
        onCancel={handleCancelEditPost}
        okButtonProps={{ style: { backgroundColor: "#FCB80B", borderColor: "#FCB80B" } }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="content" rules={[{ required: true }]}>
            <Input.TextArea onChange={(e) => setEditContent(e.target.value)} style={{ borderColor: "#469B74" }} />
          </Form.Item>
          <Form.Item label="Image">
            <Input onChange={(e) => handleChangeImage(e.target)} type="file" style={{ borderColor: "#469B74" }} />
          </Form.Item>
        </Form>
      </Modal>
    </PostStyle>
  )
}
export default Post

