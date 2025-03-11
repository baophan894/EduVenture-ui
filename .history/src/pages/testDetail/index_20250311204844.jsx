import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { ieltsTestData } from "./components/test-data";
import TestBanner from "./components/test-banner";
import TabNavigation from "./components/tab-navigation";
import Sidebar from "./components/sidebar";

const TestDetailPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // In a real app, you would fetch the test data based on testId
  const test = ieltsTestData;

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Header with back button */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-[#469B74] transition-colors font-shopee"
          >
            <FaArrowLeft className="mr-2" /> Back to Tests
          </button>
        </div>
      </div>

      {/* Test Banner */}
      <TestBanner test={test} />

      {/* Tabs Navigation */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2">
            {activeTab === "overview" && <OverviewTab test={test} />}
            {activeTab === "modules" && <ModulesTab test={test} />}
            {activeTab === "instructor" && <InstructorTab test={test} />}
            {activeTab === "reviews" && <ReviewsTab test={test} />}
          </div>

          {/* Right Column - Sidebar */}
          <div className="md:col-span-1">
            <Sidebar test={test} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetailPage;
