import {
  FaStar,
  FaEye,
  FaClock,
  FaChartBar,
  FaUserGraduate,
  FaRegCalendarAlt,
} from "react-icons/fa";

const TestBanner = ({ test }) => {
  return (
    <div className="bg-[#469B74] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left side - Image */}
          <div className="w-full md:w-1/3 rounded-lg overflow-hidden shadow-lg">
            <img
              src={test.coverImg}
              alt="Test Image"
              className="h-full w-full object-cover bg-gray-300 mb-2"
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

            <button className="bg-white text-[#469B74] font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-colors font-shopee">
              Start Test Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestBanner;
