import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  Menu,
  Modal,
  Popover,
  Select,
  Tag,
  notification,
} from "antd";
import useUserInfo from "../../hook/user/useUserInfo";
import ProfileStyle from "./profileStyle";
import { useEffect, useState } from "react";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/http";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import MyLearning from "./components/myLearning";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading";

import { FaMoneyBillWave } from "react-icons/fa";
import {
  ADMIN,
  EXPERT,
  EXPERT_MARK_DEMAND,
  USER,
} from "../../common/constants";

const Profile = () => {
  const role = localStorage.getItem("role");
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const updateProfile = useMutation({
    mutationFn: (body) => {
      return api.put("/user/profile", body, {
        headers: {
          Authorization: token,
        },
      });
    },
  });
  const user = useUserInfo();
  const [form] = Form.useForm();
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  const [_dob, setDob] = useState(null);
  const [file, setFile] = useState();
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
        gender: user.gender,
        price: user.price,
        about: user.about,
        dob: user.dob ? moment(user.dob) : null,
      });
    }
  }, [user, form]);
  const userBalance = Number(user?.balance);
  const onFinish = (values) => {
    const body = { ...values, dob: new Date(_dob) };
    updateProfile.mutate(body, {
      onSuccess() {
        queryClient.invalidateQueries("PROFILE");
        notification.success({ message: "Update successfully" });
      },
      onError() {
        notification.error({ message: "Update failed, try again" });
      },
    });
  };

  const uploadAvatar = useMutation({
    mutationFn: (formData) => {
      return api.patch("/update-avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });
  const sendExpertRequest = useMutation({
    mutationFn: (formData) => {
      return api.post("/expert-request", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });
  const withdrawMutation = useMutation({
    mutationFn: (amount) => {
      return api.post("/transfer", amount, {
        headers: {
          Authorization: token,
        },
      });
    },
  });
  const [files, setFiles] = useState(null);
  const handleChangeCV = (info) => {
    const file = info.files[0];
    if (!file.name.includes("pdf")) {
      notification.error({ message: "CV must be pdf file" });
      setFiles(null);
    } else {
      setFiles(info.files);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowExertRequest, setIsShowExertRequest] = useState(false);
  const [isShowWithdrawModal, setIsShowWithdrawModal] = useState(false);
  const handleCloseWithdrawModal = () => {
    setIsShowWithdrawModal(false);
  };
  const handleOpenWithdrawModal = () => setIsShowWithdrawModal(true);

  const handleWithdraw = () => {
    withdrawMutation.mutate(withDrawAmount, {
      onSuccess() {
        notification.success({ message: "Successfully" });
        setIsShowWithdrawModal(false);
      },
      onError() {
        notification.error({
          message:
            "Withdraw failed, make sure you checked mail and provided wallet information, try again later",
        });
      },
    });
  };
  const handleCancelRequestModal = () => {
    setIsShowExertRequest(false);
  };
  const handleSendRequest = () => {
    const formData = new FormData();
    formData.append("cv", files[0]);
    sendExpertRequest.mutate(formData, {
      onSuccess() {
        queryClient.invalidateQueries("documents");
        notification.success({
          message:
            "Upload successfully, We will respond via your email within 2 days at the latest.",
        });
        setIsShowExertRequest(false);
        setFiles(null);
      },
      onError(data) {
        notification.error({ message: data.response.data.message });
      },
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (!file) {
      return;
    }
    let formData = new FormData();
    formData.append("image", file);
    uploadAvatar.mutate(formData, {
      onSuccess() {
        queryClient.invalidateQueries("PROFILE");
        notification.success({ message: "Update avatar successfully" });
      },
      onError() {
        notification.error({ message: "Update avatar failed" });
      },
    });

    setIsModalOpen(false);
  };
  const [withDrawAmount, setWithdrawAmount] = useState(0);
  const handleChangeAmount = (amount) => {
    setWithdrawAmount(amount);
  };
  const isDisableWithdrawButton =
    withDrawAmount < 10 ||
    withDrawAmount > userBalance ||
    !Number.isInteger(Number(withDrawAmount));
  const navigate = useNavigate();
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const menuOnclick = (e) => {
    switch (e.key) {
      case "logout": {
        localStorage.clear();
        window.location.replace("/login");
        break;
      }
      case "changePassword": {
        navigate("/update-password");
        break;
      }
      case "dashboard": {
        navigate("/dashboard");
        break;
      }
      case "courseManagement": {
        navigate("/expert");
        break;
      }
    }
  };
  const getManagement = () => {
    switch (role) {
      case ADMIN: {
        return {
          key: "sub1",
          icon: <AppstoreOutlined />,
          label: "Management",
          children: [{ key: "dashboard", label: "Admin Dashboard" }],
        };
      }
      case EXPERT: {
        return {
          key: "sub1",
          icon: <AppstoreOutlined />,
          label: "Management",
          children: [{ key: "courseManagement", label: "Course management" }],
        };
      }
    }
  };

  const getLegitMarkTag = (mark) => {
    if (mark < 0) return <Tag color="black">Legit {mark}</Tag>;
    if (mark == 0) return <Tag color="green">Legit {mark}</Tag>;
    if (mark >= 0 && mark < 200) return <Tag color="purple">Legit {mark}</Tag>;
    return <Tag color="gold">Legit {mark}</Tag>;
  };
  const getRoleTag = () => {
    switch (role) {
      case ADMIN: {
        return <Tag color="gold">ADMIN</Tag>;
      }
      case EXPERT: {
        return <Tag color="purple">EXPERT</Tag>;
      }
      case USER: {
        return <Tag color="green">USER</Tag>;
      }
    }
  };
  const getLegitHoverContent = (mark) => {
    if (mark < EXPERT_MARK_DEMAND) {
      return (
        <p>
          By contributing useful material and gaining 200 reputation points, you
          can become an expert of the platform
        </p>
      );
    } else if (role !== EXPERT)
      return (
        <div>
          <p>Let request to be an FU Records Expert</p>
        </div>
      );
    return <p>Keep your contribute</p>;
  };
  const isShowRequestButton =
    user?.legitMark >= EXPERT_MARK_DEMAND && role == "USER";

  const menuItems = [
    getManagement(),
    {
      key: "sub2",
      label: "Security",
      icon: <SettingOutlined />,
      children: [
        { key: "changePassword", label: "Change password" },
        { key: "logout", label: "Logout" },
      ],
    },
  ];
  return !user ? (
    <Loading />
  ) : (
    <ProfileStyle>
     <div className="profile">
      <div className="profile_avatar">
        <div className="profile_avatar_top">
          {uploadAvatar.isPending ? (
            <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full">
              <span className="text-gray-500">Uploading...</span>
            </div>
          ) : (
            <div className="relative group">
              <Avatar className="profile_avatar_top_image" size={120} src={user?.avatarUrl} />
              <button
                onClick={showModal}
                className="profile_avatar_top_update absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                Update
              </button>
            </div>
          )}
          <p className="mt-3 text-lg font-semibold text-gray-800">{user?.fullName}</p>
        </div>

        <div className="flex items-center gap-2 mb-3">
          {getRoleTag()}
          <Popover content={getLegitHoverContent(user?.legitMark)}>
            <span className="cursor-pointer">{getLegitMarkTag(user?.legitMark)}</span>
          </Popover>
        </div>

        {!!userBalance && (
          <div className="mb-4">
            <Tag color="#FCB80B" className="mb-2 py-1 px-2">
              Balance: {Number(user.balance).toLocaleString()}$
            </Tag>
            {userBalance > 5 && (
              <Button
                onClick={handleOpenWithdrawModal}
                className="w-full flex items-center justify-center gap-2 border-[#469B74] text-[#469B74] hover:text-white hover:bg-[#469B74]"
              >
                <FaMoneyBillWave />
                <span>Withdraw</span>
              </Button>
            )}
          </div>
        )}

        {isShowRequestButton && (
          <Button
            onClick={() => setIsShowExertRequest(true)}
            type="primary"
            className="mb-4 w-full bg-[#FCB80B] border-[#FCB80B] hover:bg-[#e0a50a] hover:border-[#e0a50a]"
          >
            Apply to be Platform Expert
          </Button>
        )}

        <div className="w-full mt-2">
          <Menu onClick={menuOnclick} mode="vertical" items={menuItems} className="border-r-0 menu-custom" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden profile_information">
        <div className="bg-[#469B74] px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Public profile</h2>
          <p className="text-white/80 text-sm mt-1">Add information about yourself</p>
        </div>

        <div className="p-6 profile_information_content">
          <Form onFinish={onFinish} form={form} layout="vertical">
            <Form.Item
              label={<span className="text-gray-700 font-medium">Full Name</span>}
              name="fullName"
              rules={[{ required: true }]}
            >
              <Input
                className="border-gray-300 hover:border-[#469B74] focus:border-[#469B74]"
                placeholder="Enter your full name"
              />
            </Form.Item>

            <Form.Item label={<span className="text-gray-700 font-medium">Email</span>} name="email">
              <Input readOnly className="bg-gray-50 border-gray-300" placeholder="Email" />
            </Form.Item>

            <Form.Item label={<span className="text-gray-700 font-medium">Gender</span>} name="gender">
              <Select
                options={genderOptions}
                placeholder="Select your gender"
                className="border-gray-300 hover:border-[#469B74]"
              />
            </Form.Item>

            <Form.Item label={<span className="text-gray-700 font-medium">Birthday</span>} name="dob">
              <DatePicker
                onChange={(_, dateString) => {
                  setDob(dateString)
                }}
                placeholder="Select your birthday"
                className="w-full border-gray-300 hover:border-[#469B74]"
              />
            </Form.Item>

            <Form.Item label={<span className="text-gray-700 font-medium">About you</span>} name="about">
              <Input.TextArea
                placeholder="Tell us about yourself..."
                className="border-gray-300 hover:border-[#469B74] focus:border-[#469B74]"
                rows={4}
              />
            </Form.Item>

            <Form.Item className="flex justify-end mb-0">
              {updateProfile.isPending ? (
                <Button
                  loading
                  className="bg-[#469B74] hover:bg-[#3d8a67] border-[#469B74] hover:border-[#3d8a67] text-white"
                >
                  Saving...
                </Button>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-[#FCB80B] hover:bg-[#e0a50a] border-[#FCB80B] hover:border-[#e0a50a] text-white"
                >
                  Save Changes
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
      <MyLearning />
      <Modal
        title="Update avatar ?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          type="file"
          placeholder="Choose avatar"
        />
      </Modal>
      <Modal
        title="Apply to be expert"
        open={isShowExertRequest}
        onCancel={handleCancelRequestModal}
        onOk={handleSendRequest}
        confirmLoading={sendExpertRequest.isPending}
      >
        <Form.Item label="Upload your cv" rules={[{ required: true }]}>
          <input type="file" onChange={(e) => handleChangeCV(e.target)} />
        </Form.Item>
        <p className="text-[orange]">
          If your request is pending, please do not resubmit
        </p>
      </Modal>

      <Modal
        title="Withdraw money"
        open={isShowWithdrawModal}
        onCancel={handleCloseWithdrawModal}
        onOk={handleWithdraw}
        okButtonProps={{ disabled: isDisableWithdrawButton }}
        confirmLoading={withdrawMutation.isPending}
      >
        <Form>
          <Form.Item
            label="Amount"
            rules={[
              {
                type: "number",
                message: "Amount must be a number",
              },
              {
                required: true,
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Amount"
              value={withDrawAmount}
              onChange={(e) => handleChangeAmount(e.target.value)}
              suffix="USD"
            />
            <div className="mt-2">
              {" "}
              <Tag color="green">min: 10$</Tag>{" "}
              <Tag color="green">max: {userBalance}$</Tag>
              <Tag color="gold">Allow Integer</Tag>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </ProfileStyle>
  );
};
export default Profile;
