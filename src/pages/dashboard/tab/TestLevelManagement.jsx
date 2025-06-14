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
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

export default function TestLevelManagement() {
  const [testLevels, setTestLevels] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  // Fetch test levels and languages
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [levelsResponse, languagesResponse] = await Promise.all([
        fetch("http://baseURL/api/test-levels"),
        fetch("http://baseURL/api/languages"),
      ]);

      const levelsData = await levelsResponse.json();
      const languagesData = await languagesResponse.json();

      setTestLevels(levelsData);
      setLanguages(languagesData);
    } catch (error) {
      message.error("Failed to fetch data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter test levels based on selected language
  const filteredTestLevels = selectedLanguage
    ? testLevels.filter((level) => level.language.id === selectedLanguage)
    : testLevels;

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    form.setFieldsValue({
      ...record,
      languageId: record.language.id,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://baseURL/api/test-levels/${id}`, {
        method: "DELETE",
      });
      message.success("Test level deleted successfully");
      fetchData();
    } catch (error) {
      message.error("Failed to delete test level");
      console.error("Error deleting test level:", error);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `http://baseURL/api/test-levels/${editingId}`
        : "http://baseURL/api/test-levels";

      const requestBody = {
        id: editingId || null,
        name: values.name,
        languageId: values.languageId,
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to save test level");
      }

      message.success(
        `Test level ${editingId ? "updated" : "created"} successfully`
      );
      setIsModalVisible(false);
      fetchData();
    } catch (error) {
      message.error(`Failed to ${editingId ? "update" : "create"} test level`);
      console.error("Error saving test level:", error);
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
      title: "Language",
      dataIndex: ["language", "name"],
      key: "language",
      sorter: (a, b) => a.language.name.localeCompare(b.language.name),
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
            title="Are you sure you want to delete this test level?"
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
            Test Level Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage the test levels available for each language
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <Select
                placeholder="Filter by language"
                allowClear
                style={{ width: 200 }}
                onChange={(value) => setSelectedLanguage(value)}
                value={selectedLanguage}
              >
                {languages.map((language) => (
                  <Select.Option key={language.id} value={language.id}>
                    {language.name}
                  </Select.Option>
                ))}
              </Select>
              {selectedLanguage && (
                <Button
                  onClick={() => setSelectedLanguage(null)}
                  className="text-gray-600"
                >
                  Clear Filter
                </Button>
              )}
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
              className="bg-[#469B74] hover:bg-[#3a8963]"
            >
              Add Test Level
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={filteredTestLevels}
            loading={loading}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} test levels`,
            }}
          />
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        title={editingId ? "Edit Test Level" : "Add New Test Level"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editingId ? "Update" : "Create"}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Level Name"
            rules={[
              {
                required: true,
                message: "Please enter the level name",
              },
            ]}
          >
            <Input placeholder="Enter level name" />
          </Form.Item>
          <Form.Item
            name="languageId"
            label="Language"
            rules={[
              {
                required: true,
                message: "Please select a language",
              },
            ]}
          >
            <Select placeholder="Select a language">
              {languages.map((language) => (
                <Select.Option key={language.id} value={language.id}>
                  {language.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
