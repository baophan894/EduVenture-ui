"use client";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto">
          <button
            className={`py-4 px-6 font-medium border-b-2 transition-colors font-shopee ${
              activeTab === "overview"
                ? "border-[#469B74] text-[#469B74]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`py-4 px-6 font-medium border-b-2 transition-colors font-shopee ${
              activeTab === "modules"
                ? "border-[#469B74] text-[#469B74]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("modules")}
          >
            Test Modules
          </button>
          <button
            className={`py-4 px-6 font-medium border-b-2 transition-colors font-shopee ${
              activeTab === "instructor"
                ? "border-[#469B74] text-[#469B74]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("instructor")}
          >
            Instructor
          </button>
          <button
            className={`py-4 px-6 font-medium border-b-2 transition-colors font-shopee ${
              activeTab === "reviews"
                ? "border-[#469B74] text-[#469B74]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
