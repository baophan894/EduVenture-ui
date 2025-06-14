"use client";

import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Space,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

export default function LanguageManagement() {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  // Fetch languages
  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await fetch("http://https://safeeduapi-dev.sit/api/languages");
      const data = await response.json();
      setLanguages(data);
    } catch (error) {
      message.error("Failed to fetch languages");
      console.error("Error fetching languages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://https://safeeduapi-dev.sit/api/languages/${id}`, {
        method: "DELETE",
      });
      message.success("Language deleted successfully");
      fetchLanguages();
    } catch (error) {
      message.error("Failed to delete language");
      console.error("Error deleting language:", error);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `http://https://safeeduapi-dev.sit/api/languages/${editingId}`
        : "http://https://safeeduapi-dev.sit/api/languages";

      const requestBody = {
        id: editingId || null,
        code: values.code,
        name: values.name,
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to save language");
      }

      message.success(
        `Language ${editingId ? "updated" : "created"} successfully`
      );
      setIsModalVisible(false);
      fetchLanguages();
    } catch (error) {
      message.error(`Failed to ${editingId ? "update" : "create"} language`);
      console.error("Error saving language:", error);
    }
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this language?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F1F2F5] min-w-full">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-[#2C2F31]">
            Language Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage the languages available for tests
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-end mb-4">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
              className="bg-[#469B74] hover:bg-[#3a8963]"
            >
              Add Language
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={languages}
            loading={loading}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} languages`,
            }}
          />
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        title={editingId ? "Edit Language" : "Add New Language"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editingId ? "Update" : "Create"}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="code"
            label="Language Code"
            rules={[
              {
                required: true,
                message: "Please enter the language code",
              },
            ]}
          >
            <Input placeholder="Enter language code (e.g., en)" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Language Name"
            rules={[
              {
                required: true,
                message: "Please enter the language name",
              },
            ]}
          >
            <Input placeholder="Enter language name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
