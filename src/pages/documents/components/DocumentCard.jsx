/* eslint-disable react/prop-types */
import { Card, Tag } from "antd";
import DocumentCardStyle from "../DocumentCard.style";
import { useNavigate } from "react-router-dom";
import getReviewStatus from "../../../helpers/getReviewStatus";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import useAllUser from "../../../hook/user/useAllUser";
import Meta from "antd/es/card/Meta";
import { ACTIVE_RESOURCE } from "../../../common/constants";
const DocumentCard = ({ document }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleViewDocument = () => {
    if (token == null) {
      navigate("/login");
    }
    navigate(`/document/detail/${document.id}`);
  };
  const { totalHelpful, totalUnhelpful } = getReviewStatus(document.reviews);
  const experts = useAllUser();
  const findUserById = (id) => {
    return experts?.find((user) => user.id == id);
  };
  return (
    <DocumentCardStyle>
      <Card onClick={handleViewDocument} hoverable title={document?.title}>
        <Meta
          className="mb-3"
          title={
            <>
              <Tag icon={<LikeOutlined />} color="green">
                {totalHelpful}{" "}
              </Tag>{" "}
              <Tag icon={<DislikeOutlined />} color="warning">
                {totalUnhelpful}{" "}
              </Tag>
            </>
          }
          description={
            <>
              <p className="font-bold text-black">
                {findUserById(document.userId)?.fullName}
              </p>
              {document.state === ACTIVE_RESOURCE ? (
                <Tag color="green">Active</Tag>
              ) : (
                <Tag color="gold">Pending</Tag>
              )}
            </>
          }
        />
      </Card>
    </DocumentCardStyle>
  );
};
export default DocumentCard;
