"use client";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginWithGoogleButton from "../../components/loginWithGoogle";
import api from "../../api/http";
import { trackUserRegistration, trackNewUser } from "../../services/analytics";

const SignUpWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: flex-end;
  background-image: url("/cover-login.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;

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
    margin-bottom: 10px;
  }

  .ant-form-item-label {
    text-align: left;
    font-family: "font-shopee";
  }

  .ant-input,
  .ant-input-password {
    height: 50px;
    font-family: "font-shopee";
  }

  .ant-btn {
    height: 50px;
    font-size: 18px;
    font-family: "font-shopee";
  }

  @media (max-width: 768px) {
    justify-content: center;

    .form-container {
      max-width: 100%;
    }
  }
`;

const SignUpScreen = () => {
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: (formData) => {
      return api.post("signup", formData);
    },
  });

  const navigate = useNavigate();

  const onFinish = (body) => {
    // Track registration attempt
    trackUserRegistration("email");

    registerMutation.mutate(body, {
      onSuccess(data) {
        // Track successful registration
        trackUserRegistration("email_success");

        // Track new user registration
        trackNewUser(data.data?.id || "new_registration", "email_registration");

        navigate(`/verify?email=${data.data.email}`);
        notification.success({ message: "Register successfully" });
        queryClient.invalidateQueries("PUBLIC_USER");
      },
      onError(data) {
        // Track failed registration
        trackUserRegistration("email_failed");
        notification.error({ message: data.response.data.message });
      },
    });
  };

  return (
    <SignUpWrapper>
      <div className="form-container">
        <div className="text-center">
          <h1 className="font-shopee-bold form-title">Sign Up</h1>
          <p className="text-gray-600">Create a new account</p>
        </div>

        <div className="font-shopee social mt-6 mb-6">
          <LoginWithGoogleButton />
        </div>

        <div className="font-shopee text-center mb-6">Or Email</div>

        <Form
          onFinish={onFinish}
          layout="vertical"
          name="signup"
          scrollToFirstError
        >
          <Form.Item
            className="font-shopee"
            name="full_name"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
            ]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>
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
            className="font-shopee"
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};:"|,.<>\\/?]).{8,}$/,
                message:
                  "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item
            name="confirm"
            className="font-shopee"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              className="font-shopee"
              placeholder="Confirm your password"
            />
          </Form.Item>
          <Form.Item
            name="agree"
            valuePropName="checked"
            className="font-shopee"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Please accept the policy!")),
              },
            ]}
          >
            <Checkbox className="font-shopee">
              I have read and accept all policy
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="font-shopee w-full bg-[#469B74] text-white hover:bg-[#3a8963]"
              loading={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Signing up..." : "Sign up"}
            </Button>
          </Form.Item>
          <Form.Item className="font-shopee text-center">
            <span>Already have an account? </span>
            <Link
              className="font-shopee text-[#469B74] hover:underline"
              to="/login"
            >
              Sign in
            </Link>
          </Form.Item>
        </Form>
      </div>
    </SignUpWrapper>
  );
};

export default SignUpScreen;
