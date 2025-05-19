"use client";

import { FaRegClock, FaCheck, FaSpinner } from "react-icons/fa";
import FaIconConverter from "./FaIconConverter";
import PropTypes from "prop-types";

const OverviewTab = ({
  test,
  selectedParts,
  setSelectedParts,
  onStartTest,
  isLoading,
}) => {
  const handleCheckboxChange = (partId) => {
    if (selectedParts.includes(partId)) {
      setSelectedParts(selectedParts.filter((id) => id !== partId));
    } else {
      setSelectedParts([...selectedParts, partId]);
    }
  };

  const handleSelectAll = () => {
    const allPartIds = test.testParts.map((part) => part.id);
    if (selectedParts.length === allPartIds.length) {
      setSelectedParts([]);
    } else {
      setSelectedParts(allPartIds);
    }
  };

  // Calculate total time for selected parts
  const totalSelectedTime = test.testParts
    .filter((part) => selectedParts.includes(part.id))
    .reduce((total, part) => total + part.duration, 0);

  // Calculate total questions excluding instructions for each part
  const getPartQuestionCount = (part) => {
    return part.questions.filter((q) => q.typeName !== "Part Instruction")
      .length;
  };

  // Calculate total questions excluding instructions
  const totalSelectedQuestions = test.testParts
    .filter((part) => selectedParts.includes(part.id))
    .reduce((total, part) => total + getPartQuestionCount(part), 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <FaSpinner className="w-8 h-8 text-[#469B74] animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-shopee">Test Overview</h2>

      {/* Test Format */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 font-shopee">Test Format</h3>
        <p className="mb-6 font-shopee">{test.description}</p>

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
                {selectedParts.length === test.testParts.length
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
                    {selectedParts.length} of {test.testParts.length}
                  </div>
                </div>

                <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-500 font-shopee">
                    Total Time
                  </div>
                  <div className="text-xl font-semibold text-gray-800 font-shopee">
                    {totalSelectedTime} minutes
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

          {/* Part Selection Cards */}
          <div className="grid grid-cols-1 gap-3">
            {test.testParts
              .sort((a, b) => a.order - b.order)
              .map((part, index) => {
                const questionCount = getPartQuestionCount(part);
                return (
                  <div
                    key={index}
                    className={`border rounded-lg transition-all duration-200 ${
                      selectedParts.includes(part.id)
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
                          checked={selectedParts.includes(part.id)}
                          onChange={() => handleCheckboxChange(part.id)}
                          className="w-5 h-5 opacity-0 absolute"
                        />
                        <div
                          className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                            selectedParts.includes(part.id)
                              ? "border-[#469B74] bg-[#469B74] text-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {selectedParts.includes(part.id) && (
                            <FaCheck className="text-xs" />
                          )}
                        </div>
                      </div>

                      <div className="ml-4 flex-1">
                        <div className="flex items-center">
                          <div
                            className={`text-xl mr-3 ${
                              selectedParts.includes(part.id)
                                ? "text-[#469B74]"
                                : "text-gray-500"
                            }`}
                          >
                            <FaIconConverter icon={part.icon} />
                          </div>
                          <h4
                            className={`font-semibold font-shopee ${
                              selectedParts.includes(part.id)
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
                            {part.duration} minutes
                          </span>
                          {part.questions && (
                            <span className="ml-3 font-shopee">
                              {questionCount} questions
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 font-shopee mt-1 pr-4">
                          {part.description}
                        </p>
                      </div>
                    </label>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 font-shopee">Features</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 font-shopee">
          {test.testFeatures.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 font-shopee">Requirements</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 font-shopee">
          {test.testRequirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

OverviewTab.propTypes = {
  test: PropTypes.shape({
    description: PropTypes.string.isRequired,
    testFeatures: PropTypes.arrayOf(PropTypes.string).isRequired,
    testRequirements: PropTypes.arrayOf(PropTypes.string).isRequired,
    testParts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        questions: PropTypes.arrayOf(
          PropTypes.shape({
            typeName: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
  selectedParts: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSelectedParts: PropTypes.func.isRequired,
  onStartTest: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default OverviewTab;
