/* eslint-disable react/prop-types */
import { Button, Form, Image, Input, Modal, notification } from "antd";
import useAllUser from "../../../../hook/user/useAllUser";
import formatDate from "../../../../helpers/formatDate";
import useUserInfo from "../../../../hook/user/useUserInfo";
import { useEffect, useState } from "react";
import { SHOW_COMMENT_NUM } from "../../../../common/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/http";
import useToken from "../../../../hook/user/useToken";
import useIsLogin from "../../../../hook/user/useIsLogin";
import { useForm } from "antd/es/form/Form";
const Comment = ({ comments, postId }) => {
  //state
  const [numberCommentShow, setNumberCommentShow] = useState(SHOW_COMMENT_NUM);
  const [imageFile, setImageFile] = useState();
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [editComment, setEditComment] = useState();
  const [editContent, setEditContent] = useState("");
  //state
  // get common
  const token = useToken();
  const isLogin = useIsLogin();
  const queryClient = useQueryClient();
  const users = useAllUser();
  const userInfo = useUserInfo();
  const getUserById = (userId) => users?.find((user) => user.id == userId);
  const isOwnerComment = (comment) => comment.userId == userInfo?.id;
  const commentData = comments?.slice(0, numberCommentShow);
  const [form] = useForm();
  // get common

  // onchange
  const handleChangeImage = (info) => {
    const file = info.files[0];
    if (!file.type.includes("image")) {
      notification.error({ message: "Please, just upload image in comment" });
      setImageFile(null);
    } else {
      setImageFile(info.files[0]);
    }
  };

  const handleCancelDeleteComment = () => {
    setIsShowDeleteModal(false);
  };
  const handleCancelEditComment = () => {
    setIsShowEditModal(false);
  };

  const handleSetDeleteComment = (id) => {
    setDeleteId(id);
    setIsShowDeleteModal(true);
  };
  const handleSetEditComment = (comment) => {
    setEditComment(comment);
    setIsShowEditModal(true);
  };
  // onchange

  //mutation
  const commentMutation = useMutation({
    mutationFn: (formData) => {
      return api.post("/post/comment", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });
  const editCommentMutation = useMutation({
    mutationFn: ({ id, formData }) => {
      return api.put(`/update-comment/${id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });
  const deleteCommentMutation = useMutation({
    mutationFn: ({ commentId }) => {
      return api.delete(`/delete-comment/${commentId}`, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });
  //mutation

  //call api
  const handleComment = ({ content }) => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("file", imageFile);
    formData.append("postId", postId);
    commentMutation.mutate(formData, {
      onSuccess() {
        setImageFile(undefined);
        queryClient.invalidateQueries("posts");
        queryClient.invalidateQueries("myposts");
      },
    });
  };
  const handleDeleteComment = () => {
    deleteCommentMutation.mutate(
      { commentId: deleteId },
      {
        onSuccess() {
          queryClient.invalidateQueries("posts");
          queryClient.invalidateQueries("myposts");
        },
      }
    );
    setIsShowDeleteModal(false);
  };
  const handleEditComment = () => {
    const formData = new FormData();
    formData.append("content", editContent);
    formData.append("file", imageFile);
    formData.append("postId", postId);
    editCommentMutation.mutate(
      { id: editComment.id, formData },
      {
        onSuccess() {
          setIsShowEditModal(false);
          setImageFile(undefined);
          queryClient.invalidateQueries("posts");
          queryClient.invalidateQueries("myposts");
        },
      }
    );
  };

  //call api

  //effect
  useEffect(() => {
    form.setFieldsValue(editComment);
  }, [editComment, form]);
  //effect

  return (
    <section className="bg-white  py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
            Discussion ({comments?.length})
          </h2>
        </div>
        {isLogin && (
          <Form onFinish={handleComment} layout="vertical">
            <Form.Item name="content" rules={[{ required: true }]}>
              <Input.TextArea placeholder="enter your comment" />
            </Form.Item>
            <Form.Item label="Image">
              <Input
                onChange={(e) => handleChangeImage(e.target)}
                type="file"
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button
                loading={commentMutation.isPending}
                type="primary"
                htmlType="submit"
              >
                Comment
              </Button>
            </Form.Item>
          </Form>
        )}
        {commentData?.map((comment) => {
          const { fullName, avatarUrl } = getUserById(comment.userId);
          return (
            <article
              key={comment.id}
              className="p-6 text-base bg-white border-t border-gray-200  "
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src={avatarUrl}
                      alt="user"
                    />
                    {fullName}
                  </p>
                  <p className="text-sm text-gray-600 ">
                    <time dateTime="2022-06-23" title="June 23rd, 2022">
                      {formatDate(new Date(comment.createdAt))}
                    </time>
                  </p>
                </div>
              </footer>
              <p className="text-gray-500 ">{comment.content}</p>
              {comment.fileUrl && <Image width={200} src={comment.fileUrl} />}
              {isOwnerComment(comment) && (
                <div className="flex justify-end gap-2">
                  {" "}
                  <Button onClick={() => handleSetEditComment(comment)}>
                    Edit
                  </Button>{" "}
                  <Button
                    onClick={() => handleSetDeleteComment(comment.id)}
                    danger
                  >
                    Delete
                  </Button>
                </div>
              )}
            </article>
          );
        })}
        {comments?.length > SHOW_COMMENT_NUM && (
          <div className="flex justify-end">
            {numberCommentShow == SHOW_COMMENT_NUM ? (
              <button
                onClick={() => setNumberCommentShow(comments.length)}
                className="font-bold hover:text-[blue]"
              >
                Show more
              </button>
            ) : (
              <button
                onClick={() => setNumberCommentShow(SHOW_COMMENT_NUM)}
                className="font-bold hover:text-[blue]"
              >
                Show less
              </button>
            )}
          </div>
        )}
      </div>
      <Modal
        title="Delete Comment"
        open={isShowDeleteModal}
        onOk={handleDeleteComment}
        confirmLoading={deleteCommentMutation.isPending}
        onCancel={handleCancelDeleteComment}
      >
        <p>Are you sure to delete this comment</p>
      </Modal>
      <Modal
        title="Edit Comment"
        open={isShowEditModal}
        onOk={handleEditComment}
        confirmLoading={editCommentMutation.isPending}
        onCancel={handleCancelEditComment}
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
    </section>
  );
};
export default Comment;
