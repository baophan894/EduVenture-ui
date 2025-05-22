"use client";

import { FaTimes } from "react-icons/fa";
import { createPortal } from "react-dom";

const DeleteReviewModal = ({
  showModal,
  setShowModal,
  onConfirm,
  deleting,
}) => {
  if (!showModal) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Delete Review</h3>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this review? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className={`px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors ${
              deleting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {deleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                Deleting...
              </>
            ) : (
              "Delete Review"
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteReviewModal;
