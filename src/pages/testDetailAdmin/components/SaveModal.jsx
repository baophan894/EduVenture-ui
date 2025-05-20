import React from "react";
import PropTypes from "prop-types";
import { FaSave } from "react-icons/fa";

const SaveModal = ({ showModal, setShowModal, onConfirm, saving }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        showModal ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-200`}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 transform transition-all duration-200 scale-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Save Changes
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to save your changes?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Continue Editing
          </button>
          <button
            onClick={onConfirm}
            disabled={saving}
            className={`px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 ${
              saving ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <FaSave /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

SaveModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
};

export default SaveModal;
