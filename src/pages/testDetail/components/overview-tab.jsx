"use client";

import { FaRegClock, FaCheck, FaCheckCircle } from "react-icons/fa";
import FaIconConverter from "./FaIconConverter";

const OverviewTab = ({ test, selectedParts, setSelectedParts }) => {
  const handleCheckboxChange = (partName) => {
    if (selectedParts.includes(partName)) {
      setSelectedParts(selectedParts.filter((part) => part !== partName));
    } else {
      setSelectedParts([...selectedParts, partName]);
    }
  };

  const handleSelectAll = () => {
    const allPartNames = test.parts.map((part) => part.name);
    if (selectedParts.length === allPartNames.length) {
      setSelectedParts([]);
    } else {
      setSelectedParts(allPartNames);
    }
  };

  // Calculate total time for selected parts
  const totalSelectedTime = test.parts
    .filter((part) => selectedParts.includes(part.name))
    .reduce((total, part) => total + part.duration, 0);

  // Calculate total questions for selected parts
  const totalSelectedQuestions = test.parts
    .filter((part) => selectedParts.includes(part.name))
    .reduce((total, part) => total + part.questions.length, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-shopee">Test Overview</h2>

      {/* Test Format */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 font-shopee">Test Format</h3>
        <p className="mb-6 font-shopee">
          This IELTS Academic test simulation follows the exact format of the
          official IELTS Academic test, with four parts: Listening, Reading,
          Writing, and Speaking. The total test time is approximately 2 hours
          and 45 minutes.
        </p>

        {/* Part Selection */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-5">
            <h4 className="text-lg font-semibold font-shopee">
              Customize Your Test
            </h4>
            <button
              onClick={handleSelectAll}
              className="text-[#469B74] hover:text-green-700 text-sm font-medium transition-colors font-shopee flex items-center"
            >
              <span className="underline">
                {selectedParts.length === test.parts.length
                  ? "Deselect All"
                  : "Select All"}
              </span>
            </button>
          </div>

          {/* Selected Parts Summary */}
          {selectedParts.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 rounded-lg p-5 mb-6 shadow-sm">
              <div className="flex justify-between items-center">
                <h5 className="font-semibold text-gray-800 font-shopee text-lg">
                  Your Test Plan
                </h5>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-500 font-shopee">
                    Selected Parts
                  </div>
                  <div className="text-xl font-semibold text-gray-800 font-shopee">
                    {selectedParts.length} of {test.parts.length}
                  </div>
                </div>

                <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-500 font-shopee">
                    Total Time
                  </div>
                  <div className="text-xl font-semibold text-gray-800 font-shopee">
                    {(totalSelectedTime / 60).toFixed(2)} minutes
                  </div>
                </div>

                <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-500 font-shopee">
                    Questions
                  </div>
                  <div className="text-xl font-semibold text-gray-800 font-shopee">
                    {totalSelectedQuestions}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* part Selection Cards */}
          <div className="grid grid-cols-1 gap-3">
            {test.parts.map((part, index) => (
              <div
                key={index}
                className={`border rounded-lg transition-all duration-200 ${
                  selectedParts.includes(part.name)
                    ? "border-[#469B74] bg-gradient-to-r from-green-50 to-white shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <label
                  htmlFor={`part-${index}`}
                  className="flex items-center p-4 cursor-pointer"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      id={`part-${index}`}
                      checked={selectedParts.includes(part.name)}
                      onChange={() => handleCheckboxChange(part.name)}
                      className="w-5 h-5 opacity-0 absolute"
                    />
                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                        selectedParts.includes(part.name)
                          ? "border-[#469B74] bg-[#469B74] text-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {selectedParts.includes(part.name) && (
                        <FaCheck className="text-xs" />
                      )}
                    </div>
                  </div>

                  <div className="ml-4 flex-1">
                    <div className="flex items-center">
                      <div
                        className={`text-xl mr-3 ${
                          selectedParts.includes(part.name)
                            ? "text-[#469B74]"
                            : "text-gray-500"
                        }`}
                      >
                        <FaIconConverter icon={part.icon} />
                      </div>
                      <h4
                        className={`font-semibold font-shopee ${
                          selectedParts.includes(part.name)
                            ? "text-[#469B74]"
                            : "text-gray-800"
                        }`}
                      >
                        {part.name}
                      </h4>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <FaRegClock className="mr-1" />
                      <span className="font-shopee">
                        {(part.duration / 60).toFixed(2)} minutes
                      </span>
                      {part.questions && (
                        <span className="ml-3 font-shopee">
                          {part.questions.length} questions
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 font-shopee mt-1 pr-4">
                      {part.description}
                    </p>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <h3 className="text-xl font-semibold mb-4 font-shopee border-t border-gray-100 pt-6">
          Test Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {test.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="text-[#469B74] mt-1 mr-3">
                <FaCheckCircle />
              </div>
              <p className="font-shopee">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 font-shopee">Requirements</h3>
        <ul className="space-y-2">
          {test.requirements.map((req, index) => (
            <li key={index} className="flex items-start">
              <div className="text-[#469B74] mt-1 mr-3">•</div>
              <p className="font-shopee">{req}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OverviewTab;
