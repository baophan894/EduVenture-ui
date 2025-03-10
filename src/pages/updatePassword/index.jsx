import { Button, Form, Input, notification } from "antd";
import ChangePasswordStyle from "../changePassword/ChangePassword.style.js";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/http";
import { useNavigate } from "react-router-dom";
const UpdatePassword = () => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };
  const navigate = useNavigate();
  const updatePasswordMutation = useMutation({
    mutationFn: (body) => {
      return api.patch("update-password", body, {
        headers: {
          Authorization: token,
        },
      });
    },
  });
  const token = localStorage.getItem("token");
  const onSend = (formValue) => {
    const { oldPassword, newPassword } = formValue;
    const body = { oldPassword, newPassword };
    updatePasswordMutation.mutate(body, {
      onSuccess() {

        notification.success({ message: "Updated password successfully" });
        navigate("/")
      },
      onError(data) {
        notification.error({
          message: data.response.data.message 
        });
      },
    });
  };

  return (
    <ChangePasswordStyle>
      <div className="change-password">
        <div className="image">hello</div>
        <div className="change-password_content ">
          <span className="change-password_content_title">Update Password</span>

          <Form
            onFinish={onSend}
            layout="vertical"
            {...formItemLayout}
            name="change-password"
            scrollToFirstError
          >
            <Form.Item
              name="oldPassword"
              label="Enter your old password"
              rules={[
                {
                  required: true,
                  message: "Please input your old password",
                },
              ]}
            >
              <Input.Password placeholder="Enter your new password" />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="Enter your new password"
              rules={[
                {
                  required: true,
                  message: "Please input your new password",
                },
                {
                  pattern: new RegExp(
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:"\\|,.<>\\/?]).{8,}$'
                  ),
                  message:
                    "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.",
                },
              ]}
            >
              <Input.Password placeholder="Enter your new password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm your email" />
            </Form.Item>

            <Form.Item>
              {updatePasswordMutation.isPending  ?  <Button
                size="large"
                loading
                style={{ textAlign: "center" }}
              >
                Update
              </Button> : <Button
                size="large"
                htmlType="submit"
                style={{ textAlign: "center" }}
              >
                Update
              </Button>}
              
            </Form.Item>
          </Form>
        </div>
      </div>
    </ChangePasswordStyle>
  );
};
export default UpdatePassword;
