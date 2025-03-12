"use client";

import { useState } from "react";
import {
  FaStar,
  FaEye,
  FaClock,
  FaChartBar,
  FaUserGraduate,
  FaRegCalendarAlt,
  FaCheckCircle,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";

const TestBanner = ({ test }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleStartTest = () => {
    // Logic to start the test
    closeModal();
    // Navigate to test page or other action
    console.log("Starting test...");
  };

  return (
    <div className="bg-[#469B74] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left side - Image */}
          <div className="w-full md:w-1/3 rounded-lg overflow-hidden shadow-lg">
            <img
              src={test.coverImg || "/placeholder.svg"}
              alt="Test Image"
              className="h-full w-full object-cover bg-gray-300"
            />
          </div>

          {/* Right side - Test info */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-4 font-shopee">
              {test.title}
            </h1>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="font-shopee">{test.ratings}</span>
                <span className="text-gray-200 ml-1 font-shopee">
                  ({test.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center">
                <FaEye className="mr-1" />
                <span className="font-shopee">{test.views} views</span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-1" />
                <span className="font-shopee">{test.duration} minutes</span>
              </div>
            </div>

            <p className="text-lg mb-6 font-shopee">{test.description}</p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-white bg-opacity-20 rounded-full px-4 py-1 text-sm flex items-center">
                <FaChartBar className="mr-2" />
                <span className="font-shopee">{test.difficulty}</span>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full px-4 py-1 text-sm flex items-center">
                <FaRegCalendarAlt className="mr-2" />
                <span className="font-shopee">Updated {test.lastUpdated}</span>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full px-4 py-1 text-sm flex items-center">
                <FaUserGraduate className="mr-2" />
                <span className="font-shopee">By {test.instructor.name}</span>
              </div>
            </div>

            <button
              onClick={openModal}
              className="bg-white text-[#469B74] font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-colors font-shopee"
            >
              Start Test Simulation
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={closeModal}
          ></div>

          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-11/12 max-w-md">
            <div className="relative p-6">
              {/* Close button */}
              <button
                onClick={closeModal}
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
                    started, the test timer will begin. Make sure you have
                    enough time to complete the test without interruptions.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                <button
                  onClick={closeModal}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors font-shopee"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartTest}
                  className="flex-1 py-2 px-4 bg-[#469B74] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center font-shopee"
                >
                  <FaCheckCircle className="mr-2" />
                  Start Now
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TestBanner;
