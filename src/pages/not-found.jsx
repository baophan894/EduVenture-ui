"use client";

import { useNavigate } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-[120px] font-bold text-[#469B74] font-shopee leading-none">
            404
          </div>
          <div className="text-4xl font-bold text-gray-800 mb-2 font-shopee">
            Page Not Found
          </div>
          <p className="text-gray-600 mb-8 font-shopee">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-shopee"
          >
            <FaArrowLeft />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#469B74] text-white rounded-lg hover:bg-[#3a7d5d] transition-colors font-shopee"
          >
            <FaHome />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
