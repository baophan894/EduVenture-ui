"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import TestSimulationScreen from "../testSimulation/test-simulation-screen";
import InstructorTab from "./components/instructor-tab";
import OverviewTab from "./components/overview-tab";
import ReviewsTab from "./components/reviews-tab";
import Sidebar from "./components/sidebar";
import TabNavigation from "./components/tab-navigation";
import TestBanner from "./components/test-banner";

const TestDetailPage = () => {
  const { testId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [isTesting, setIsTesting] = useState(false);
  const [selectedParts, setSelectedParts] = useState([]);
  const [test, setTest] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        setLoading(true);
        const [testResponse, reviewsResponse] = await Promise.all([
          axios.get(`http://https://safeeduapi-dev.site/api/tests/${testId}`),
          axios.get(`http://https://safeeduapi-dev.site/api/tests/${testId}/reviews`),
        ]);
        setTest(testResponse.data);
        setReviews(reviewsResponse.data);
        setSelectedParts(testResponse.data.testParts.map((part) => part.id));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching test data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, [testId]);

  const handleStartTest = () => {
    setIsTesting(true);
  };

  const calculateTotalTime = () => {
    if (!test) return 0;
    return test.testParts
      .filter((part) => selectedParts.includes(part.id))
      .reduce((total, part) => total + part.duration, 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="w-8 h-8 text-[#469B74] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!test) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Test not found
      </div>
    );
  }

  return !isTesting ? (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Test Banner */}
      <TestBanner
        test={test}
        setIsTesting={() => handleStartTest()}
        selectedParts={selectedParts}
        totalTime={calculateTotalTime()}
      />

      {/* Tabs Navigation */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2">
            {activeTab === "overview" && (
              <OverviewTab
                test={test}
                selectedParts={selectedParts}
                setSelectedParts={setSelectedParts}
                onStartTest={handleStartTest}
              />
            )}
            {activeTab === "instructor" && <InstructorTab test={test} />}
            {activeTab === "reviews" && (
              <ReviewsTab test={test} reviews={reviews} />
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="md:col-span-1">
            <Sidebar
              test={test}
              setIsTesting={() => handleStartTest()}
              selectedParts={selectedParts}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <TestSimulationScreen
      test={test}
      selectedParts={selectedParts}
      totalTime={calculateTotalTime()}
      onExit={() => {
        setIsTesting(false);
      }}
    />
  );
};

export default TestDetailPage;
