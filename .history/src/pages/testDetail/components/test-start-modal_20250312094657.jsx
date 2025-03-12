import { FaTimes, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const TestStartModal = ({ isOpen, onClose, onConfirm, test }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-11/12 max-w-md">
        <div className="relative p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>

          {/* Modal content */}
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-[#FCB80B] bg-opacity-20 mb-4">
              <FaExclamationTriangle className="text-[#FCB80B]" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 font-shopee">
              Start Test Confirmation
            </h3>
            <p className="text-gray-600 font-shopee">
              You are about to start the {test.title}. This test will take
              approximately {test.duration} minutes to complete.
            </p>
            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-700 font-shopee">
                <strong className="font-shopee">Important:</strong> Once
                started, the test timer will begin. Make sure you have enough
                time to complete the test without interruptions.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors font-shopee"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2 px-4 bg-[#469B74] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center font-shopee"
            >
              <FaCheckCircle className="mr-2" />
              Start Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestStartModal;
