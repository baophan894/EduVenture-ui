import * as FaIcons from "react-icons/fa";
import PropTypes from "prop-types";

function FaIconConverter({ icon }) {
  const IconComponent = FaIcons[icon]; // Lấy component icon từ chuỗi

  if (!IconComponent) return <div>Invalid icon</div>;

  return <IconComponent />;
}

FaIconConverter.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default FaIconConverter;
