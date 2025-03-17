"use client";

import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  sampleListeningTest,
  sampleReadingTest,
} from "../testSimulation/mock-data";
import TestSimulationScreen from "../testSimulation/test-simulation-screen";
import { TEST_TYPES } from "../testSimulation/test-types";
import InstructorTab from "./components/instructor-tab";
import OverviewTab from "./components/overview-tab";
import ReviewsTab from "./components/reviews-tab";
import Sidebar from "./components/sidebar";
import TabNavigation from "./components/tab-navigation";
import TestBanner from "./components/test-banner";

const TestDetailPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isTesting, setIsTesting] = useState(false);
  const [selectedParts, setSelectedParts] = useState([]);

  const test = testId == 1 ? sampleReadingTest : sampleListeningTest;

  const handleStartTest = () => {
    setIsTesting(true);
  };

  return !isTesting ? (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Test Banner */}
      <TestBanner
        test={test}
        setIsTesting={() => handleStartTest()}
        selectedParts={selectedParts}
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
              />
            )}
            {activeTab === "instructor" && <InstructorTab test={test} />}
            {activeTab === "reviews" && <ReviewsTab test={test} />}
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
      type={testId == 1 ? TEST_TYPES.READING : TEST_TYPES.LISTENING}
      selectedParts={selectedParts}
      onExit={() => {
        setIsTesting(false);
      }}
    />
  );
};

export default TestDetailPage;
