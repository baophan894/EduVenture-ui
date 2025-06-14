import { useState, useEffect, useCallback } from "react";
import { Col, Row, Spin, Select, Input, Button } from "antd";
import TestCard from "./components/TestCard";
import { Search, Filter, GraduationCap } from "lucide-react";
import { message } from "antd";
import debounce from "lodash/debounce";

function TestLibraryScreen() {
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

  // Fetch test types, levels and languages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesResponse, levelsResponse, languagesResponse] =
          await Promise.all([
            fetch("http://baseURL/api/test-types"),
            fetch("http://baseURL/api/test-levels"),
            fetch("http://baseURL/api/languages"),
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
    : sortedTestLevels;

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
        `http://baseURL/api/tests?${queryParams.toString()}`
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
    setCurrentPage(0); // Reset to first page when filter changes
  };

  // Handle level change
  const handleLevelChange = (value) => {
    setSelectedLevel(value);
    setCurrentPage(0); // Reset to first page when filter changes
  };

  return (
    <div className="bg-white min-h-screen pb-10 pt-[50px]">
      {/* Search and Filter Bar */}
      <div className="fixed z-20 border-1 inset-x-0 top-[59px] border-2 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
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
            </div>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="container mx-auto px-4 pt-12 pb-8">
        <h2 className="text-3xl font-bold text-center font-shopee text-[#469B74]">
          Test Library
        </h2>
      </div>

      {/* Tests Grid */}
      <div className="container mx-auto px-4">
        <div className="relative min-h-[400px]">
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center z-10">
              <Spin size="large" />
            </div>
          )}

          <Row gutter={[24, 24]}>
            {tests.map((test) => (
              <Col key={test.id} xs={24} sm={12} md={8} lg={6}>
                <TestCard test={test} />
              </Col>
            ))}
          </Row>

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
                <Button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  className={`p-2 rounded-md ${
                    currentPage === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-[#2C2F31] hover:bg-gray-100"
                  }`}
                >
                  Previous
                </Button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i
                        ? "bg-[#469B74] text-white"
                        : "bg-white text-[#2C2F31] hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className={`p-2 rounded-md ${
                    currentPage === totalPages - 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-[#2C2F31] hover:bg-gray-100"
                  }`}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestLibraryScreen;
