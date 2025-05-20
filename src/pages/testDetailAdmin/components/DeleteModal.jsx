import React from "react";
import PropTypes from "prop-types";
import { FaExclamationCircle } from "react-icons/fa";

const DeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
  handleConfirmDelete,
  deleting,
}) => {
  if (!showDeleteModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-all duration-300 ease-in-out"
          onClick={() => setShowDeleteModal(false)}
          style={{
            animation: showDeleteModal
              ? "fadeIn 0.3s ease-out"
              : "fadeOut 0.3s ease-in",
          }}
        />

        {/* Modal */}
        <div
          className="relative transform overflow-hidden bg-white p-6 shadow-xl transition-all duration-300 ease-in-out rounded-lg"
          style={{
            animation: showDeleteModal
              ? "slideIn 0.3s ease-out"
              : "slideOut 0.3s ease-in",
            maxWidth: "28rem",
            width: "100%",
          }}
        >
          <div className="flex flex-col items-center">
            {/* Icon */}
            <div
              className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-red-100"
              style={{
                animation: "scaleIn 0.3s ease-out 0.1s both",
              }}
            >
              <FaExclamationCircle className="h-6 w-6 text-red-600" />
            </div>

            {/* Content */}
            <div
              className="mt-3 text-center sm:mt-5"
              style={{
                animation: "fadeInUp 0.3s ease-out 0.2s both",
              }}
            >
              <h3 className="text-lg font-semibold leading-6 text-gray-900">
                Delete Test
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this test? This action cannot
                  be undone.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div
            className="mt-6 flex justify-center gap-3 sm:mt-8"
            style={{
              animation: "fadeInUp 0.3s ease-out 0.3s both",
            }}
          >
            <button
              type="button"
              className="inline-flex justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
              onClick={handleConfirmDelete}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Add keyframe animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
          @keyframes slideIn {
            from { 
              opacity: 0;
              transform: translateY(-20px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideOut {
            from { 
              opacity: 1;
              transform: translateY(0);
            }
            to { 
              opacity: 0;
              transform: translateY(-20px);
            }
          }
          @keyframes scaleIn {
            from { 
              opacity: 0;
              transform: scale(0.8);
            }
            to { 
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes fadeInUp {
            from { 
              opacity: 0;
              transform: translateY(10px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

DeleteModal.propTypes = {
  showDeleteModal: PropTypes.bool.isRequired,
  setShowDeleteModal: PropTypes.func.isRequired,
  handleConfirmDelete: PropTypes.func.isRequired,
  deleting: PropTypes.bool.isRequired,
};

export default DeleteModal;
