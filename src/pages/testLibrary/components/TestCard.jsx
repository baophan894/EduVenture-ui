import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import {
  ClockCircleOutlined,
  EyeOutlined,
  StarOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { trackTestStart } from "../../../../services/analytics";

const TestCard = ({ test }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Track test view when user clicks on test card
    trackTestStart(test.id, test.title);
    navigate(`/test-library/detail/${test.id}`);
  };

  return (
    <Card
      hoverable
      cover={
        <img
          alt={test.title}
          src={test.coverImg}
          className="h-48 w-full object-cover"
        />
      }
      onClick={handleClick}
      className="h-full"
    >
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {test.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {test.description}
        </p>

        <div className="mt-auto">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <ClockCircleOutlined className="mr-1" />
              <span>{test.duration} min</span>
            </div>
            <div className="flex items-center">
              <EyeOutlined className="mr-1" />
              <span>{test.views}</span>
            </div>
            <div className="flex items-center">
              <StarOutlined className="mr-1" />
              <span>{test.ratings}</span>
            </div>
          </div>

          {test.testLevel && (
            <div className="mt-2">
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                {test.testLevel}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

TestCard.propTypes = {
  test: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    coverImg: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    ratings: PropTypes.number.isRequired,
    testLevel: PropTypes.string,
  }).isRequired,
};

export default TestCard;
