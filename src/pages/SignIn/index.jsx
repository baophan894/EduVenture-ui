import { Button, Form, Input, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import SigninStyle from "./Signin.style";
import api from "../../api/http";
import LoginWithGoogleButton from "../../components/loginWithGoogle";
const SignInScreen = () => {
  const navigate = useNavigate();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };

  const loginMutation = useMutation({
    mutationFn: (formData) => {
      return api.post("login", formData);
    },
  });
  const reverifyMutation = useMutation({
    mutationFn: (formData) => {
      return api.post("reverify", formData);
    },
  });
  const onfinish = (body) => {
    loginMutation.mutate(body, {
      onError(data) {
        if (data.response.data.message === "not_verify_yet") {
          reverifyMutation.mutate(
            { email: body.email },
            {
              onSuccess() {
                navigate(`/verify?email=${body.email}`);
              },
            }
          );
        }
        notification.error({ message: data.response.data.message });
      },
    });
  };

  return (
    <SigninStyle>
      <div className="signup">
        <div className="image ">hello</div>
        <div className="signup_content ">
          <span className="signup_content_title">Sign In</span>
          <div className="social mt-3">
            <LoginWithGoogleButton />
          </div>
          <span>Or Email</span>
          <Form
            onFinish={onfinish}
            layout="vertical"
            {...formItemLayout}
            name="register"
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item className="right">
              <Link style={{ color: "blue" }} to="/forgot-password">
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item>
              {loginMutation.isPending ? (
                <Button loading style={{ textAlign: "center" }}>
                  Sign in
                </Button>
              ) : (
                <Button
                  size="large"
                  htmlType="submit"
                  style={{ textAlign: "center" }}
                >
                  Sign in
                </Button>
              )}
            </Form.Item>
            <Form.Item>
              <span>You don not have account? </span>{" "}
              <Link style={{ color: "blue" }} to={"/register"}>
                Sign up
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </SigninStyle>
  );
};
export default SignInScreen;
