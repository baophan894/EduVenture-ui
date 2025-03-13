"use client";

/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import {
  LikeOutlined,
  DislikeOutlined,
  UserOutlined,
  BookOutlined,
} from "@ant-design/icons";
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

  const userName = findUserById(flashcard.userId)?.fullName || "Unknown User";

  return (
    <div
      onClick={handleViewDocument}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer h-[320px] flex flex-col border border-gray-100"
    >
      {/* Card Header with colored accent */}
      <div className="h-2 bg-[#469B74]"></div>

      {/* Card Content */}
      <div className="p-5 flex flex-col h-full">
        {/* Title and Stats */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
            {flashcard?.name}
          </h3>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <UserOutlined className="mr-1" />
            <span className="truncate">{userName}</span>
          </div>
        </div>

        {/* Card Count and Status */}
        <div className="flex gap-2 mb-4">
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md flex items-center">
            <BookOutlined className="mr-1" />
            {flashcard.questions.length} cards
          </span>
          {flashcard.state === ACTIVE_RESOURCE ? (
            <span className="bg-[#e6f7ef] text-[#469B74] text-xs font-medium px-2.5 py-1 rounded-md">
              Active
            </span>
          ) : (
            <span className="bg-[#fff8e6] text-[#FCB80C] text-xs font-medium px-2.5 py-1 rounded-md">
              Pending
            </span>
          )}
        </div>

        {/* Description or Preview */}
        <div className="flex-grow">
          <p className="text-sm text-gray-600 line-clamp-3">
            {flashcard.description ||
              "No description available for this flashcard set."}
          </p>
        </div>

        {/* Footer with Reviews */}
        <div className="flex justify-between items-center pt-3 mt-auto border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm">
              <LikeOutlined className="text-[#469B74]" />
              <span className="text-gray-700">{totalHelpful}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <DislikeOutlined className="text-[#FCB80C]" />
              <span className="text-gray-700">{totalUnhelpful}</span>
            </div>
          </div>

          <div className="bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded-full">
            Flashcard
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
