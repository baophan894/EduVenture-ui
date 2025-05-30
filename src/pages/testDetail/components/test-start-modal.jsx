import { FaTimes, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import useIsLogin from "../../../hook/user/useIsLogin";

const TestStartModal = ({ isOpen, onClose, onConfirm, test }) => {
  const isLoggedIn = useIsLogin();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-11/12 max-w-md p-6 transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
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
              You are about to start the {test.title}.
            </p>
            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-700 font-shopee">
                <strong className="font-shopee">Important:</strong> Once
                started, the test timer will begin. Make sure you have enough
                time to complete the test without interruptions.
              </p>
            </div>
            {!isLoggedIn && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-700 font-shopee">
                  <strong className="font-shopee">Note:</strong> You are not
                  logged in. Your test results will not be saved and you won't
                  be able to:
                  <ul className="list-disc list-inside mt-2 text-left">
                    <li>View your test history</li>
                    <li>Track your progress</li>
                    <li>Access detailed performance analytics</li>
                  </ul>
                </p>
              </div>
            )}
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

TestStartModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  test: PropTypes.shape({
    title: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
};

export default TestStartModal;
