"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Star,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  GraduationCap,
} from "lucide-react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Tag,
  Rate,
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";

export default function TestManagement() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [testLevels, setTestLevels] = useState([]);
  const [testTypes, setTestTypes] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  // Fetch test types, levels and languages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesResponse, levelsResponse, languagesResponse] =
          await Promise.all([
            fetch("http://localhost:8080/api/test-types"),
            fetch("http://localhost:8080/api/test-levels"),
            fetch("http://localhost:8080/api/languages"),
          ]);

        const typesData = await typesResponse.json();
        const levelsData = await levelsResponse.json();
        const languagesData = await languagesResponse.json();

        setTestTypes(typesData);
        setTestLevels(levelsData);
        setLanguages(languagesData);
      } catch (error) {
        message.error("Failed to fetch test data");
        console.error("Error fetching test data:", error);
      }
    };
    fetchData();
  }, []);

  // Sort test types, levels and languages alphabetically
  const sortedTestTypes = [...testTypes].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedTestLevels = [...testLevels].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedLanguages = [...languages].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Filter test levels based on selected language
  const filteredTestLevels = selectedLanguage
    ? sortedTestLevels.filter((level) => level.language.id === selectedLanguage)
    : [];

  const fetchTests = useCallback(async () => {
    try {
      setLoading(true);

      // Construct query parameters
      const queryParams = new URLSearchParams({
        page: currentPage,
        size: pageSize,
        ...(searchTerm && { search: searchTerm }),
        ...(filterType && { typeId: filterType }),
        ...(selectedLevel && { testLevelId: selectedLevel }),
        ...(selectedLanguage && { languageId: selectedLanguage }),
      });

      const response = await fetch(
        `http://localhost:8080/api/tests?${queryParams.toString()}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTests(data.tests);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } catch (error) {
      message.error("Failed to fetch tests");
      console.error("Error fetching tests:", error);
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    pageSize,
    searchTerm,
    filterType,
    selectedLevel,
    selectedLanguage,
  ]);

  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
      setCurrentPage(0); // Reset to first page when searching
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  // Handle filter type change
  const handleTypeChange = (value) => {
    setFilterType(value);
    setCurrentPage(0); // Reset to first page when filter changes
  };

  // Handle language change
  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
    setSelectedLevel(null); // Reset selected level when language changes
  };

  // Handle level change
  const handleLevelChange = (value) => {
    setSelectedLevel(value);
    setCurrentPage(0); // Reset to first page when filter changes
  };

  // Remove the filteredTests variable since filtering is now handled by the API
  const handlePageChange = (page) => {
    setCurrentPage(page - 1); // Convert to 0-based index for API
  };

  // Format duration from minutes to hours and minutes
  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "25%",
    },
    {
      title: "Type",
      dataIndex: "typeName",
      key: "typeName",
      render: (type) => (
        <Tag color={type === "LISTENING" ? "blue" : "green"}>{type}</Tag>
      ),
    },
    {
      title: "Level",
      dataIndex: "testLevel",
      key: "testLevel",
      render: (level) => (
        <Tag
          color={
            level === "Beginner"
              ? "green"
              : level === "Intermediate"
              ? "orange"
              : "red"
          }
        >
          {level}
        </Tag>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => `${Math.floor(duration / 60)} minutes`,
    },
    {
      title: "Rating",
      dataIndex: "ratings",
      key: "ratings",
      render: (rating, record) => (
        <Space>
          <Rate disabled defaultValue={rating} />
          <span>({record.reviewCount})</span>
        </Space>
      ),
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
      render: (views) => (
        <Space>
          <Eye className="h-4 w-4 mr-1" />
          {views}
        </Space>
      ),
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
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    form.setFieldsValue({
      ...record,
      duration: Math.floor(record.duration / 60), // Convert seconds to minutes
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      // Replace with actual API call
      await fetch(
        `http://localhost:8080/api/tests/${id}?typeId=${filterType || ""}`,
        {
          method: "DELETE",
        }
      );
      setTests(tests.filter((test) => test.id !== id));
      message.success("Test deleted successfully");
    } catch (error) {
      message.error("Failed to delete test");
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const testData = {
        ...values,
        duration: values.duration * 60, // Convert minutes to seconds
        typeId: filterType, // Add typeId to the test data
      };

      if (editingId) {
        // Update existing test
        await fetch(
          `http://localhost:8080/api/tests/${editingId}?typeId=${
            filterType || ""
          }`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testData),
          }
        );
        setTests(
          tests.map((test) =>
            test.id === editingId ? { ...test, ...testData } : test
          )
        );
        message.success("Test updated successfully");
      } else {
        // Add new test
        const response = await fetch(
          `http://localhost:8080/api/tests?typeId=${filterType || ""}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testData),
          }
        );
        const newTest = await response.json();
        setTests([...tests, newTest]);
        message.success("Test added successfully");
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F2F5] min-w-full">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-[#2C2F31]">Test Management</h1>
          <p className="text-gray-600 mt-1">
            Browse and manage your test library
          </p>
        </div>
      </header>

      {/* Search and Filter Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tests..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#469B74]"
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <Select
                className="w-full md:w-[200px]"
                placeholder="Select Type"
                allowClear
                value={filterType}
                onChange={handleTypeChange}
                options={sortedTestTypes.map((type) => ({
                  value: type.id,
                  label: type.name,
                }))}
                dropdownStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
                dropdownRender={(menu) => <div className="p-2">{menu}</div>}
              />
            </div>
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <GraduationCap className="h-5 w-5 text-gray-400" />
              </div>
              <Select
                className="w-full md:w-[200px]"
                placeholder="Select Language"
                allowClear
                value={selectedLanguage}
                onChange={handleLanguageChange}
                options={sortedLanguages.map((language) => ({
                  value: language.id,
                  label: language.name,
                }))}
                dropdownStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
                dropdownRender={(menu) => <div className="p-2">{menu}</div>}
              />
            </div>
            <div
              className={`relative w-full md:w-auto transition-all duration-300 ease-in-out ${
                selectedLanguage
                  ? "opacity-100 max-h-[100px]"
                  : "opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <GraduationCap className="h-5 w-5 text-gray-400" />
              </div>
              <Select
                className="w-full md:w-[200px]"
                placeholder="Select Level"
                allowClear
                value={selectedLevel}
                onChange={handleLevelChange}
                options={filteredTestLevels.map((level) => ({
                  value: level.id,
                  label: level.name,
                }))}
                dropdownStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
                dropdownRender={(menu) => <div className="p-2">{menu}</div>}
              />
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
              className="bg-[#469B74] text-white px-4 py-2 rounded-lg hover:bg-[#3a8963] transition-colors"
            >
              Add New Test
            </Button>
          </div>
        </div>

        {/* Test List Section */}
        <div className="relative min-h-[400px]">
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#469B74]"></div>
            </div>
          )}

          {/* Test Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Card Header with Type Badge */}
                <div className="relative">
                  <img
                    src={
                      test.coverImg || "/placeholder.svg?height=256&width=402"
                    }
                    alt={test.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        test.typeName === "LISTENING"
                          ? "bg-[#FCB80B] text-[#2C2F31]"
                          : test.typeName === "READING"
                          ? "bg-[#469B74] text-white"
                          : "bg-[#2C2F31] text-white"
                      }`}
                    >
                      {test.typeName}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2C2F31] to-transparent h-16"></div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-[#2C2F31] line-clamp-2 h-14">
                    {test.title}
                  </h3>

                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <div className="flex items-center mr-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{formatDuration(test.duration)}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{test.views.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.round(test.ratings)
                              ? "text-[#FCB80B] fill-[#FCB80B]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {test.ratings > 0
                        ? test.ratings.toFixed(1)
                        : "No ratings"}
                      {test.reviewCount > 0 && ` (${test.reviewCount})`}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center">
                    <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                      <img
                        src={test.instructorAvatar || "/placeholder.svg"}
                        alt={test.instructorName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {test.instructorName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {test.instructorTitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">
                      {test.testLevel}
                    </span>
                    <button
                      className="bg-[#469B74] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#3a8963] transition-colors"
                      onClick={() => navigate(`/test-detail-admin/${test.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {!loading && tests.length === 0 && (
            <div className="bg-white rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold text-[#2C2F31]">
                No tests found
              </h3>
              <p className="text-gray-600 mt-2">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 0 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage)}
                  disabled={currentPage === 0}
                  className={`p-2 rounded-md ${
                    currentPage === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-[#2C2F31] hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i
                        ? "bg-[#469B74] text-white"
                        : "bg-white text-[#2C2F31] hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 2)}
                  disabled={currentPage === totalPages - 1}
                  className={`p-2 rounded-md ${
                    currentPage === totalPages - 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-[#2C2F31] hover:bg-gray-100"
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        title={editingId ? "Edit Test" : "Add New Test"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter test title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter test description" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="typeName"
            label="Type"
            rules={[{ required: true, message: "Please select test type" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="testLevel"
            label="Level"
            rules={[{ required: true, message: "Please select test level" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration (minutes)"
            rules={[{ required: true, message: "Please enter test duration" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
