import { FaStar } from "react-icons/fa";

const ReviewsTab = ({ test }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-shopee">Student Reviews</h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-[#469B74] mb-2 font-shopee">
              {test.ratings}
            </div>
            <div className="flex text-yellow-400 mb-2">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar className="text-yellow-200" />
            </div>
            <p className="text-gray-600 font-shopee">
              {test.reviewCount} reviews
            </p>
          </div>

          <div className="flex-1">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="w-16 text-sm font-shopee">5 stars</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                  <div
                    className="h-2 bg-[#469B74] rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
                <span className="w-8 text-sm text-gray-600 font-shopee">
                  70%
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-16 text-sm font-shopee">4 stars</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                  <div
                    className="h-2 bg-[#469B74] rounded-full"
                    style={{ width: "20%" }}
                  ></div>
                </div>
                <span className="w-8 text-sm text-gray-600 font-shopee">
                  20%
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-16 text-sm font-shopee">3 stars</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                  <div
                    className="h-2 bg-[#469B74] rounded-full"
                    style={{ width: "7%" }}
                  ></div>
                </div>
                <span className="w-8 text-sm text-gray-600 font-shopee">
                  7%
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-16 text-sm font-shopee">2 stars</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                  <div
                    className="h-2 bg-[#469B74] rounded-full"
                    style={{ width: "2%" }}
                  ></div>
                </div>
                <span className="w-8 text-sm text-gray-600 font-shopee">
                  2%
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-16 text-sm font-shopee">1 star</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                  <div
                    className="h-2 bg-[#469B74] rounded-full"
                    style={{ width: "1%" }}
                  ></div>
                </div>
                <span className="w-8 text-sm text-gray-600 font-shopee">
                  1%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Reviews */}
      <div className="space-y-6">
        {test.sampleReviews.map((review, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between mb-3">
              <h4 className="font-semibold font-shopee">{review.name}</h4>
              <span className="text-gray-500 text-sm font-shopee">
                {review.date}
              </span>
            </div>

            <div className="flex text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < review.rating ? "" : "text-yellow-200"}
                />
              ))}
            </div>

            <p className="text-gray-700 font-shopee">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsTab;
