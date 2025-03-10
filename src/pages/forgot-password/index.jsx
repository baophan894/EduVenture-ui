

import { Button, Form, Input, notification } from 'antd';
import ForgotPasswordStyle from './forgotpassword.style';
import { useMutation } from '@tanstack/react-query';
import api from '../../api/http';
import { useNavigate } from 'react-router-dom';
function ForgotpasswordScreen() {
    const navigate = useNavigate();
    const forgotPasswordMutation = useMutation({ 
        mutationFn: (body) => {
            return api.post("reset-password", body);
        },
    });
    
    const onSend = (body) => {
        forgotPasswordMutation.mutate(body, {
            onSuccess() {
                navigate(`/verify?email=${body.email}`);
                notification.success({ message: "Email is sent successfully" })
            },
            onError() {
                notification.error({ message: "Email is sent failed" })
            }
        })
    }
    return (
        <ForgotPasswordStyle>
            <div className="forgot-password relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-[#fff]">
                <div className="max-w-xl px-5 text-center">
                    <h2 className="mb-2 text-[45px] font-bold text-black">
                        Reset your password
                    </h2>
                    <h2 className="mb-2 text-[15px]  text-black">
                        Enter the email you signed up with. We'll send you a link to log in and reset your password. If you signed up with your parent’s email, we’ll send them a link.
                    </h2>
                    <Form
                        onFinish={onSend}
                        name="wrap"
                        labelCol={{
                            flex: '110px',
                        }}
                        labelAlign="left"
                        labelWrap
                        wrapperCol={{
                            flex: 1,
                        }}
                        colon={false}
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: "email",
                                    message: "The input is not valid E-mail!",
                                },

                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="Name@gmail.com" />
                        </Form.Item>
                        <Form.Item >
                            {forgotPasswordMutation.isPending ? (
                                <Button loading style={{ textAlign: "center" }}>
                                    Reset
                                </Button>
                            ) : (
                                <Button type="primary" htmlType="submit">
                                    Send Email
                                </Button>
                            )}

                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ForgotPasswordStyle>



    )
}

export default ForgotpasswordScreen;