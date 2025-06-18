"use client";
import { Button, Form, Input, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginWithGoogleButton from "../../components/loginWithGoogle";
import api from "../../api/http";
import { trackUserLogin, trackNewUser } from "../../services/analytics";

const SignInWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: flex-end;
  background-image: url("/cover-login.png");

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .form-container {
    width: 100%;
    max-width: 500px;
    padding: 40px;
    background: rgb(255, 255, 255);
    backdrop-filter: blur(10px);
    position: relative;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid #469b74;
    border-radius: 8px;
    margin: 40px;
    margin-right: 200px;
  }

  .form-title {
    font-size: 50px;
    font-weight: 800;

    color: #469b74;
    margin-bottom: 20px;
  }

  .ant-form-item-label {
    text-align: left;
  }

  .ant-input,
  .ant-input-password {
    height: 50px;
  }

  .ant-btn {
    height: 50px;
    font-size: 18px;
  }

  @media (max-width: 768px) {
    justify-content: center;

    .form-container {
      max-width: 100%;
    }
  }
`;

const SignInScreen = () => {
  const navigate = useNavigate();

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

  const onFinish = (body) => {
    // Track login attempt
    trackUserLogin("email");

    loginMutation.mutate(body, {
      onSuccess(data) {
        // Track successful login
        trackUserLogin("email_success");

        // Check if this is a new user (first login)
        const isFirstLogin = !localStorage.getItem("hasLoggedIn");
        if (isFirstLogin) {
          trackNewUser(data.data.id || "new_user", "email_login");
          localStorage.setItem("hasLoggedIn", "true");
        }

        notification.success({ message: "Login successful!" });
      },
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
        // Track failed login
        trackUserLogin("email_failed");
        notification.error({ message: data.response.data.message });
      },
    });
  };

  return (
    <SignInWrapper>
      <div className="form-container">
        <div className="text-center">
          <h1 className="font-shopee-bold form-title">Sign In</h1>
          <p className="font-shopee text-gray-600">Sign in to your account</p>
        </div>

        <div className="social mt-6 mb-6">
          <LoginWithGoogleButton />
        </div>

        <div className="font-shopee text-center mb-6">Or Email</div>

        <Form
          onFinish={onFinish}
          layout="vertical"
          name="signin"
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            style={{ fontFamily: "font-shopee" }}
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
          <Form.Item className="text-right">
            <Link
              className="font-shopee text-[#469B74] hover:underline"
              to="/forgot-password"
            >
              Forgot password
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#469B74] text-white hover:bg-[#3a8963]"
              loading={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing in..." : "Sign in"}
            </Button>
          </Form.Item>
          <Form.Item className=" font-shopee text-center">
            <span>You don`t have an account? </span>{" "}
            <Link
              className="font-shopee text-[#469B74] hover:underline"
              to="/register"
            >
              Sign up
            </Link>
          </Form.Item>
        </Form>
      </div>
    </SignInWrapper>
  );
};

export default SignInScreen;
