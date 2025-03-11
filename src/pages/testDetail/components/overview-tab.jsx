import { FaRegClock, FaCheck } from "react-icons/fa";

const OverviewTab = ({ test }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-shopee">Test Overview</h2>

      {/* Test Format */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 font-shopee">Test Format</h3>
        <p className="mb-6 font-shopee">
          This IELTS Academic test simulation follows the exact format of the
          official IELTS Academic test, with four modules: Listening, Reading,
          Writing, and Speaking. The total test time is approximately 2 hours
          and 45 minutes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {test.modules.map((module, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:border-[#469B74] transition-colors"
            >
              <div className="flex items-center mb-3">
                <div className="text-[#469B74] text-xl mr-3">{module.icon}</div>
                <h4 className="font-semibold font-shopee">{module.name}</h4>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <FaRegClock className="mr-1" />
                <span className="font-shopee">{module.duration} minutes</span>
                {module.questions && (
                  <span className="ml-3 font-shopee">
                    {module.questions} questions
                  </span>
                )}
                {module.tasks && (
                  <span className="ml-3 font-shopee">{module.tasks} tasks</span>
                )}
                {module.parts && (
                  <span className="ml-3 font-shopee">{module.parts} parts</span>
                )}
              </div>
              <p className="text-sm text-gray-600 font-shopee">
                {module.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 font-shopee">
          Test Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {test.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="text-[#469B74] mt-1 mr-3">
                <FaCheck />
              </div>
              <p className="font-shopee">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 font-shopee">Requirements</h3>
        <ul className="space-y-2">
          {test.requirements.map((req, index) => (
            <li key={index} className="flex items-start">
              <div className="text-[#469B74] mt-1 mr-3">•</div>
              <p className="font-shopee">{req}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OverviewTab;
