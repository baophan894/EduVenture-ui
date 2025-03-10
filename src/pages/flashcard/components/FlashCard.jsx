"use client";

/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import useAllUser from "../../../hook/user/useAllUser";
import getReviewStatus from "../../../helpers/getReviewStatus";
import { ACTIVE_RESOURCE } from "../../../common/constants";

const FlashCard = ({ flashcard }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleViewDocument = () => {
    if (token == null) {
      navigate("/login");
    } else {
      navigate(`/flashCard/detail/${flashcard.id}`);
    }
  };

  const { totalHelpful, totalUnhelpful } = getReviewStatus(flashcard.reviews);
  const experts = useAllUser();

  const findUserById = (id) => {
    return experts?.find((user) => user.id === id);
  };

  return (
    <div
      onClick={handleViewDocument}
      className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer w-[300px] h-[380px] flex flex-col p-4"
    >
      {/* Card Title */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{flashcard?.name}</h3>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 text-green-600">
            <LikeOutlined />
            <span>{totalHelpful}</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            <DislikeOutlined />
            <span>{totalUnhelpful}</span>
          </div>
        </div>
      </div>

      {/* User and Flashcard Details */}
      <div className="flex-1">
        <p className="text-sm font-bold text-gray-800 mb-2">
          {findUserById(flashcard.userId)?.fullName || "Unknown User"}
        </p>
        <div className="mb-4">
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-lg mr-2">
            {flashcard.questions.length} cards
          </span>
          {flashcard.state === ACTIVE_RESOURCE ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-lg">
              Active
            </span>
          ) : (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-lg">
              Pending
            </span>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-auto">
        <p className="text-sm text-gray-600">{findUserById(flashcard.userId)?.fullName}</p>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <LikeOutlined className="text-green-600" />
          <span>{totalHelpful}</span>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
