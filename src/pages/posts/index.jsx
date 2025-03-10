import { Avatar, Button, Form, Input, Modal, notification } from "antd";
import useUserInfo from "../../hook/user/useUserInfo";
import PostScreenStyle from "./PostScreenStyle";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/http";
import useAllPost from "../../hook/posts/useAllPost";
import useAllUser from "../../hook/user/useAllUser";
import Post from "./components/post";
import Loading from "../../components/loading";
import useIsLogin from "../../hook/user/useIsLogin";

const PostScreen = () => {
  const queryClient = useQueryClient();
  const user = useUserInfo();
  const isLogin = useIsLogin();
  const allUsers = useAllUser();
  const getAuthorByUserId = (userId) => {
    return allUsers?.find((user) => user.id == userId);
  };
  const posts = useAllPost();
  const [imageFile, setImageFile] = useState();
  const token = localStorage.getItem("token");
  const handleChangeImage = (info) => {
    const file = info.files[0];
    if (!file.type.includes("image")) {
      notification.error({ message: "Just post an image" });
      setImageFile(null);
    } else {
      setImageFile(info.files[0]);
    }
  };
  const createPost = useMutation({
    mutationFn: (formData) => {
      return api.post("/create-post", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });
  const onCreatePost = ({ content }) => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("file", imageFile);
    createPost.mutate(formData, {
      onSuccess() {
        queryClient.invalidateQueries("posts");
        setIsViewModal(false);
        notification.success({ message: "Create post successfully" });
      },
    });
  };
  const [isViewModal, setIsViewModal] = useState(false);
  const isDataReady = posts && allUsers;
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
            <Post
              key={post.id}
              post={post}
              author={getAuthorByUserId(post.userId)}
            />
          ))}
        </div>

        {isLogin && user && (
          <Modal
            className="text-center"
            footer=""
            title={
              <>
                <Avatar src={user?.avatarUrl} /> <span>Create a post</span>
              </>
            }
            open={isViewModal}
            onCancel={() => setIsViewModal(false)}
          >
            <Form onFinish={onCreatePost} layout="vertical">
              <Form.Item name="content" rules={[{ required: true }]}>
                <Input.TextArea placeholder="enter your post content" />
              </Form.Item>
              <Form.Item label="Image">
                <Input
                  onChange={(e) => handleChangeImage(e.target)}
                  type="file"
                />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={createPost.isPending}
                  type="primary"
                  htmlType="submit"
                >
                  Create
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
    </PostScreenStyle>
  );
};
export default PostScreen;
