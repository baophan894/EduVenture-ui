/* eslint-disable react/prop-types */
import { Avatar, Button, Form, Image, Input, Modal, notification } from "antd";
import PostStyle from "./PostStyle";
import formatDate from "../../../../helpers/formatDate";
import Report from "../../../../components/report";
import { LikeOutlined, LikeFilled, CommentOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/http";
import useUserInfo from "../../../../hook/user/useUserInfo";
import useIsLogin from "../../../../hook/user/useIsLogin";
import Comment from "../comments";
import useToken from "../../../../hook/user/useToken";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
const Post = ({ post, author, modifyAble = false }) => {
  //state
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [editContent, setEditContent] = useState("");
  //state

  //common
  const token = useToken();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isLogin = useIsLogin();
  const userInfo = useUserInfo();
  const [form] = useForm();
  const likes = post?.likes;
  const totalLike = likes?.length;
  const comments = post?.comments.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  const totalComment = comments?.length;
  const isLiked = isLogin
    ? likes?.some((like) => like.userId == userInfo?.id)
    : false;
  //common

  //effect
  useEffect(() => {
    form.setFieldsValue(post);
  }, [post, form]);
  //effect

  //mutation

  const editPostMutation = useMutation({
    mutationFn: (formData) => {
      return api.put(`/update-post/${post.id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });

  const likePostMutation = useMutation({
    mutationFn: (formData) => {
      return api.post("/post/like", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });
  const deletePostMutation = useMutation({
    mutationFn: ({ id }) => {
      return api.delete(`/deletePost/${id}`, {
        headers: {
          Authorization: token,
        },
      });
    },
  });
  //mutation

  //call api
  const likePostHandle = () => {
    if (isLogin) {
      const formData = new FormData();
      formData.append("postId", post.id);
      likePostMutation.mutate(formData, {
        onSuccess() {
          queryClient.invalidateQueries("posts");
        },
      });
    }
  };
  const handleEditPost = () => {
    const formData = new FormData();
    formData.append("content", editContent);
    formData.append("file", imageFile);
    editPostMutation.mutate(formData, {
      onSuccess() {
        setIsShowEditModal(false);
        setImageFile(undefined);
        queryClient.invalidateQueries("posts");
        queryClient.invalidateQueries("myposts");
      },
    });
  };
  const handleDeletePost = () => {
    deletePostMutation.mutate(
      { id: post.id },
      {
        onSuccess() {
          queryClient.invalidateQueries("myposts");
          queryClient.invalidateQueries("posts");
          notification.success({ message: "Delete post successfully" });
        },
        onError() {
          notification.error({ message: "Delete post failed" });
        },
      }
    );
    setIsShowDeleteModal(false);
  };
  //call api

  //onChange
  const handleViewPostDetail = (id) => {
    navigate(`/post/detail/${id}`);
  };
  const handleCancelDelete = () => {
    setIsShowDeleteModal(false);
  };
  const showDeletePostModal = () => {
    setIsShowDeleteModal(true);
  };
  const showEditPostModal = () => {
    setIsShowEditModal(true);
  };
  const handleCancelEditPost = () => {
    setIsShowEditModal(false);
  };
  const handleChangeImage = (info) => {
    const file = info.files[0];
    if (!file.type.includes("image")) {
      notification.error({ message: "Please, just upload image in post" });
      setImageFile(null);
    } else {
      setImageFile(info.files[0]);
    }
  };

  //onChange
  return (
    <PostStyle>
      <div className="post">
        <div className="post_info justify-between">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleViewPostDetail(post?.id)}
          >
            <Avatar size={40} src={author?.avatarUrl} />
            <div className="ml-2">
              <p>{author?.fullName}</p>
              <span>{formatDate(new Date(post?.createdAt))}</span>
            </div>
          </div>
          {modifyAble ? (
            <div className="flex gap-3">
              <Button onClick={showEditPostModal}>Edit</Button>
              <Button onClick={showDeletePostModal} danger>
                Delete
              </Button>
            </div>
          ) : (
            <Report resourceType={"post"} resourceId={post?.id} />
          )}
        </div>
        <div className="post_content">
          <p className="mb-5">{post?.content}</p>
          <Image preview={false} width={"100%"} src={post?.fileUrl} />
        </div>
        <div>
          {!!totalLike && <span className="mr-1">{totalLike}</span>}
          {isLiked ? (
            <LikeFilled
              style={{ fontSize: "25px" }}
              className="text-[blue]"
              onClick={likePostHandle}
            />
          ) : (
            <LikeOutlined
              onClick={likePostHandle}
              style={{ fontSize: "25px" }}
              className="hover:text-[blue]"
            />
          )}
          {!!totalComment && <span className="mr-1  ml-2">{totalComment}</span>}
          <CommentOutlined
            style={{ fontSize: "25px" }}
            className="hover:text-[blue]"
          />
        </div>
        <Comment comments={comments} postId={post?.id} />
        <></>
      </div>
      <Modal
        title="Delete Post"
        open={isShowDeleteModal}
        onOk={handleDeletePost}
        confirmLoading={deletePostMutation.isPending}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure to delete this post</p>
      </Modal>

      <Modal
        title="Edit Post"
        open={isShowEditModal}
        onOk={handleEditPost}
        confirmLoading={editPostMutation.isPending}
        onCancel={handleCancelEditPost}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="content" rules={[{ required: true }]}>
            <Input.TextArea onChange={(e) => setEditContent(e.target.value)} />
          </Form.Item>
          <Form.Item label="Image">
            <Input onChange={(e) => handleChangeImage(e.target)} type="file" />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}></Form.Item>
        </Form>
      </Modal>
    </PostStyle>
  );
};
export default Post;
