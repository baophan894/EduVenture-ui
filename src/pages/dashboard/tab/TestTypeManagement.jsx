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

export default function TestTypeManagement() {
  const [testTypes, setTestTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  // Fetch test types
  useEffect(() => {
    fetchTestTypes();
  }, []);

  const fetchTestTypes = async () => {
    try {
      const response = await fetch("http://https://safeeduapi-dev.sit/api/test-types");
      const data = await response.json();
      setTestTypes(data);
    } catch (error) {
      message.error("Failed to fetch test types");
      console.error("Error fetching test types:", error);
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
      await fetch(`http://https://safeeduapi-dev.sit/api/test-types/${id}`, {
        method: "DELETE",
      });
      message.success("Test type deleted successfully");
      fetchTestTypes();
    } catch (error) {
      message.error("Failed to delete test type");
      console.error("Error deleting test type:", error);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `http://https://safeeduapi-dev.sit/api/test-types/${editingId}`
        : "http://https://safeeduapi-dev.sit/api/test-types";

      const requestBody = {
        id: editingId || null,
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
        throw new Error("Failed to save test type");
      }

      message.success(
        `Test type ${editingId ? "updated" : "created"} successfully`
      );
      setIsModalVisible(false);
      fetchTestTypes();
    } catch (error) {
      message.error(`Failed to ${editingId ? "update" : "create"} test type`);
      console.error("Error saving test type:", error);
    }
  };

  const columns = [
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
            title="Are you sure you want to delete this test type?"
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
            Test Type Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage the types of tests available in the system
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
              Add Test Type
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={testTypes}
            loading={loading}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} test types`,
            }}
          />
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        title={editingId ? "Edit Test Type" : "Add New Test Type"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editingId ? "Update" : "Create"}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Type Name"
            rules={[
              {
                required: true,
                message: "Please enter the type name",
              },
            ]}
          >
            <Input placeholder="Enter type name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
