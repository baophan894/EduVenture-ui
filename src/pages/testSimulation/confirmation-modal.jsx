"use client";

import { FaChartBar } from "react-icons/fa";

const ConfirmationModal = ({
  filteredTestQuestions,
  answers,
  flaggedQuestions,
  onClose,
  onSubmit,
}) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-11/12 max-w-md">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-[#FCB80B] bg-opacity-20 mb-4">
              <FaChartBar className="text-[#FCB80B]" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 font-shopee">
              Submit Test?
            </h3>
            <p className="text-gray-600 font-shopee">
              You are about to submit your test. Once submitted, you cannot
              change your answers.
            </p>

            <div className="mt-4 text-left">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 font-shopee">
                  Total Questions:
                </span>
                <span className="font-medium font-shopee">
                  {filteredTestQuestions.length}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 font-shopee">Answered:</span>
                <span className="font-medium font-shopee">
                  {Object.keys(answers).length}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 font-shopee">Unanswered:</span>
                <span className="font-medium text-red-500 font-shopee">
                  {filteredTestQuestions.length - Object.keys(answers).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-shopee">
                  Flagged for review:
                </span>
                <span className="font-medium text-[#FCB80B] font-shopee">
                  {flaggedQuestions.length}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors font-shopee"
            >
              Continue Test
            </button>
            <button
              onClick={onSubmit}
              className="flex-1 py-2 px-4 bg-[#469B74] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors font-shopee"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
