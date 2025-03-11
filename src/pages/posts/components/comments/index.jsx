import { useState } from "react";
import { Avatar, Button, Form, Input, List } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import api from "../../../../api/http";
import styled from "styled-components";
//import useUserInfo from "../../../../hook/user/useUserInfo";
import formatDate from "../../../../helpers/formatDate";

const CommentStyle = styled.div`
  margin-top: 20px;

  .ant-form {
    margin-bottom: 20px;
  }

  .ant-list-item {
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .ant-list-item-meta-title {
    margin-bottom: 0;
    color: #469B74;
  }

  .ant-list-item-meta-description {
    p {
      margin-bottom: 5px;
    }

    span {
      font-size: 12px;
      color: #8c8c8c;
    }
  }

  .ant-btn {
    margin-top: 10px;
  }
`

// eslint-disable-next-line react/prop-types
const Comment = ({ comments, postId }) => {
  const [form] = Form.useForm();
  //const { data: userInfo } = useUserInfo();
  const queryClient = useQueryClient();
  const [showAllComments, setShowAllComments] = useState(false);

  const createCommentMutation = useMutation({
    mutationFn: (data) => api.post("/comment", data, {
      headers: { Authorization: localStorage.getItem("token") },
    }),
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      form.resetFields();
    },
  });

  const handleSubmit = (values) => {
    createCommentMutation.mutate({ ...values, postId });
  };

  // eslint-disable-next-line react/prop-types
  const displayedComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <CommentStyle>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="content" rules={[{ required: true, message: 'Please input your comment!' }]}>
          <Input.TextArea placeholder="Write a comment..." rows={2} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={createCommentMutation.isPending}>
            Comment
          </Button>
        </Form.Item>
      </Form>

      <List
        itemLayout="horizontal"
        dataSource={displayedComments}
        renderItem={(comment) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={comment.user?.avatarUrl} />}
                title={comment.user?.fullName}
                description={
                  <>
                    <p>{comment.content}</p>
                    <span>{formatDate(new Date(comment.createdAt))}</span>
                  </>
                }
              />
            </List.Item>
          </motion.div>
        )}
      />

      {<comments className="length"></comments> > 3 && !showAllComments && (
        <Button onClick={() => setShowAllComments(true)}>View all comments</Button>
      )}
    </CommentStyle>
  );
};

export default Comment;
