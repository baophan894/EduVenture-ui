import React from "react";
import * as FaIcons from "react-icons/fa";

function FaIconConverter({ icon }) {
  const IconComponent = FaIcons[icon]; // Lấy component icon từ chuỗi

  if (!IconComponent) return <div>Invalid icon</div>;

  return <IconComponent />;
}

export default FaIconConverter;
