import { useState } from "react";
import TestStartModal from "./test-start-modal";
import PropTypes from "prop-types";

const Sidebar = ({ test, setIsTesting, selectedParts }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleStartTest = () => {
    closeModal();
    setIsTesting(true);
  };

  return (
    <div>
      {/* Start Test Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 font-shopee">
          Ready to Start?
        </h3>
        <p className="mb-6 font-shopee">
          Take this complete test simulation to assess your current level and
          identify areas for improvement.
        </p>

        <button
          className={`w-full bg-[#469B74] text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-[#5bbd8b] transition-colors mb-4 font-shopee ${
            selectedParts.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={openModal}
          disabled={selectedParts.length === 0}
        >
          Start Test Simulation
        </button>

        <button className="w-full border border-[#469B74] text-[#469B74] font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-shopee">
          Save for Later
        </button>
      </div>

      <TestStartModal
        isOpen={showModal}
        onClose={closeModal}
        onConfirm={handleStartTest}
        test={test}
      />
    </div>
  );
};

Sidebar.propTypes = {
  test: PropTypes.shape({
    testRequirements: PropTypes.arrayOf(PropTypes.string),
    testFeatures: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setIsTesting: PropTypes.func.isRequired,
  selectedParts: PropTypes.array.isRequired,
};

export default Sidebar;
