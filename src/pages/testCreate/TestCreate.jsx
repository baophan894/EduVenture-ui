import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Select } from "antd";

const TestCreate = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [test, setTest] = useState({
    title: "",
    typeId: null,
    typeName: "",
    languageId: null,
    languageName: "",
    testLevelId: null,
    testLevel: "",
    description: "",
    testFeatures: [],
    testRequirements: [],
    testParts: [],
    duration: 0,
  });
  const [testTypes, setTestTypes] = useState([]);
  const [testLevels, setTestLevels] = useState([]);
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
        console.error("Error fetching data:", error);
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
  const filteredTestLevels = test.languageId
    ? sortedTestLevels.filter((level) => level.language.id === test.languageId)
    : [];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Test Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                Title
                <span className="text-red-500 text-sm">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={test.title}
                onChange={(e) =>
                  setTest((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                Type
                <span className="text-red-500 text-sm">*</span>
              </label>
              <Select
                className="w-full"
                value={test.typeId || undefined}
                onChange={(value) => {
                  const selectedType = sortedTestTypes.find(
                    (type) => type.id === value
                  );
                  setTest((prev) => ({
                    ...prev,
                    typeId: value,
                    typeName: selectedType?.name || "",
                  }));
                }}
                options={sortedTestTypes.map((type) => ({
                  value: type.id,
                  label: type.name,
                }))}
                style={{ height: "42px" }}
                placeholder="Select a type"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                Language
                <span className="text-red-500 text-sm">*</span>
              </label>
              <Select
                className="w-full"
                value={test.languageId || undefined}
                onChange={(value) => {
                  // Clear the level when language changes
                  setTest((prev) => ({
                    ...prev,
                    languageId: value,
                    languageName:
                      sortedLanguages.find((lang) => lang.id === value)?.name ||
                      "",
                    testLevelId: null,
                    testLevel: "",
                  }));
                }}
                options={sortedLanguages.map((language) => ({
                  value: language.id,
                  label: language.name,
                }))}
                style={{ height: "42px" }}
                placeholder="Select a language"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                Level
                <span className="text-red-500 text-sm">*</span>
              </label>
              <Select
                className="w-full"
                value={test.testLevelId}
                onChange={(value) => {
                  setTest((prev) => ({
                    ...prev,
                    testLevelId: value,
                    testLevel:
                      filteredTestLevels.find((level) => level.id === value)
                        ?.name || "",
                  }));
                }}
                options={filteredTestLevels.map((level) => ({
                  value: level.id,
                  label: level.name,
                }))}
                style={{ height: "42px" }}
                placeholder="Select a level"
                required
                disabled={!test.languageId}
              />
            </div>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-colors z-50"
          title="Go to top"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default TestCreate;
