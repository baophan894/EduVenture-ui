"use client";

import { useState } from "react";
import {
  FaChartBar,
  FaClock,
  FaEye,
  FaRegCalendarAlt,
  FaStar,
  FaUserGraduate,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TestStartModal from "./test-start-modal";
import PropTypes from "prop-types";

const TestBanner = ({ test, setIsTesting, selectedParts }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleStartTest = () => {
    closeModal();
    setIsTesting(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
                <span className="font-shopee">{test.testLevel}</span>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full px-4 py-1 text-sm flex items-center">
                <FaUserGraduate className="mr-2" />
                <span className="font-shopee">By {test.instructorName}</span>
              </div>
            </div>

            <button
              onClick={openModal}
              disabled={selectedParts.length === 0}
              className={`bg-white text-[#469B74] font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-colors font-shopee ${
                selectedParts.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Start Test Simulation
            </button>

            <TestStartModal
              isOpen={showModal}
              onClose={closeModal}
              onConfirm={handleStartTest}
              test={test}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

TestBanner.propTypes = {
  test: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    coverImg: PropTypes.string,
    views: PropTypes.number.isRequired,
    ratings: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    testLevel: PropTypes.string.isRequired,
    instructorName: PropTypes.string.isRequired,
  }).isRequired,
  setIsTesting: PropTypes.func.isRequired,
  selectedParts: PropTypes.array.isRequired,
};

export default TestBanner;
