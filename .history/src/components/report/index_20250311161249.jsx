import { useState } from "react";
import { ExclamationOutlined } from "@ant-design/icons";
import ReportStyle from "./report.style";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/http";
import { Button, Form, Input, Modal, notification } from "antd";

// eslint-disable-next-line react/prop-types
const Report = ({ resourceType, resourceId }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const uploadReport = useMutation({
    mutationFn: (formData) => {
      return api.post("/upload-report", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
  });

  const onSubmitForm = (body) => {
    const formData = new FormData();
    formData.append("resourceType", resourceType);
    formData.append("resourceId", resourceId);
    formData.append("reason", body.reason);
    uploadReport.mutate(formData, {
      onSuccess() {
        notification.success({ message: "Upload Report successfully" });
        setIsModalOpen(false);
        queryClient.invalidateQueries("reports");
      },
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <ReportStyle>
      <div className="btn-container">
        {token && (
          <Button
            onClick={showModal}
            className="hover:text-white hover:bg-[#f91206] bg-white text-red-500 "
          >
            <ExclamationOutlined />
          </Button>
        )}
      </div>

      <Modal
        title="Report Resource"
        footer=" "
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Form onFinish={onSubmitForm} layout="vertical">
          <Form.Item name="reason" label="Reason">
            <Input className="input-item"></Input>
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button htmlType="submit">Report</Button>
          </Form.Item>
        </Form>
      </Modal>
    </ReportStyle>
  );
};
export default Report;
