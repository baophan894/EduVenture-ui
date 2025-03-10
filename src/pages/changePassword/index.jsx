import { Button, Form, Input, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/http";
import ChangePasswordStyle from "./ChangePassword.style";
const ChangePassword = () => {
    const navigate = useNavigate();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const changePasswordMutation = useMutation({
    mutationFn: (body) => {
      return api.patch("change-password", body);
    },
  });

  const onSend = (value) => {
    const body = { newPassword: value.newPassword, token };
    changePasswordMutation.mutate(body, {
      onSuccess() {
        navigate("/login")
        notification.success({ message: "Reset password successfully" });
      },
      onError() {
        notification.error({
          message: "Reset password failed, Try again later",
        });
      },
    });
  };

  return (
    <ChangePasswordStyle>
      <div className="change-password">
        <div className="image">hello</div>
        <div className="change-password_content ">
          <span className="change-password_content_title">Reset Password</span>

          <Form
            onFinish={onSend}
            layout="vertical"
            {...formItemLayout}
            name="change-password"
            scrollToFirstError
          >
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
              dependencies={["password"]}
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
              {changePasswordMutation.isPending ? (
                <Button loading style={{ textAlign: "center" }}>
                  Reset
                </Button>
              ) : (
                <Button
                  size="large"
                  htmlType="submit"
                  style={{ textAlign: "center" }}
                >
                   Reset
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </ChangePasswordStyle>
  );
};
export default ChangePassword;
