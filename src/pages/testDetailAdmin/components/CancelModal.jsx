import React from "react";
import PropTypes from "prop-types";

const CancelModal = ({ showModal, setShowModal, onConfirm }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        showModal ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-200`}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 transform transition-all duration-200 scale-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Cancel Changes
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to cancel your changes? All unsaved changes will
          be lost.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Keep Editing
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Cancel Changes
          </button>
        </div>
      </div>
    </div>
  );
};

CancelModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default CancelModal;
