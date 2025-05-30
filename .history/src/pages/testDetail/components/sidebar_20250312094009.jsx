const Sidebar = ({ test }) => {
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
    <div>
      {/* Start Test Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 font-shopee">
          Ready to Start?
        </h3>
        <p className="mb-6 font-shopee">
          Take this complete {test.type} Academic test simulation to assess your
          current level and identify areas for improvement.
        </p>

        <button
          className="w-full bg-[#469B74] text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-[#5bbd8b] transition-colors mb-4 font-shopee"
          onClick={openModal}
        >
          Start Test Simulation
        </button>

        <button className="w-full border border-[#469B74] text-[#469B74] font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-shopee">
          Save for Later
        </button>

        {test.targetBands && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold mb-3 font-shopee">
              Target {test.type} Bands:
            </h4>
            <div className="flex flex-wrap gap-2">
              {test.targetBands.map((band, index) => (
                <span
                  key={index}
                  className="bg-gray-100 rounded-full px-3 py-1 text-sm font-shopee"
                >
                  Band {band}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Tests */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 font-shopee">
          Related Tests
        </h3>
        <div className="space-y-4">
          {test.relatedTests.map((relTest, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
            >
              <a
                href={`/test/detail/${relTest.id}`}
                className="hover:text-[#469B74] transition-colors font-shopee"
              >
                {relTest.title}
              </a>
            </div>
          ))}
        </div>
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

export default Sidebar;
