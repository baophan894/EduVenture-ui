import React from "react";
import PropTypes from "prop-types";
import { FaUpload } from "react-icons/fa";

const CoverImage = ({ test, isEditing, handleChange, getImageUrl }) => {
  if (!test.coverImg) return null;

  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 group">
          <img
            src={
              test.coverImg.startsWith("blob:")
                ? test.coverImg
                : getImageUrl(test.coverImg) || "/placeholder.svg"
            }
            alt={test.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/800x450/png?text=Image+Not+Found";
            }}
          />
          {isEditing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <label className="cursor-pointer bg-white text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors">
                <FaUpload />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // Create a preview URL for the selected image
                      const previewUrl = URL.createObjectURL(file);
                      handleChange({
                        target: {
                          name: "coverImg",
                          value: previewUrl,
                        },
                      });
                    }
                  }}
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CoverImage.propTypes = {
  test: PropTypes.shape({
    coverImg: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  getImageUrl: PropTypes.func.isRequired,
};

export default CoverImage;
