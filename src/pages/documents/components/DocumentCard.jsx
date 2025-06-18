"use client";

/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import {
  LikeOutlined,
  DislikeOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import useAllUser from "../../../hook/user/useAllUser";
import getReviewStatus from "../../../helpers/getReviewStatus";
import { ACTIVE_RESOURCE } from "../../../common/constants";
import { trackDocumentView } from "../../../services/analytics";

const DocumentCard = ({ document }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleViewDocument = () => {
    if (token == null) {
      navigate("/login");
    } else {
      // Track document view
      trackDocumentView(document.id, document.title);
      navigate(`/document/detail/${document.id}`);
    }
  };

  const { totalHelpful, totalUnhelpful } = getReviewStatus(document.reviews);
  const experts = useAllUser();

  const findUserById = (id) => {
    return experts?.find((user) => user.id === id);
  };

  const userName = findUserById(document.userId)?.fullName || "Unknown User";

  const getFileIcon = (url) => {
    if (url?.includes(".pdf")) return "📄";
    if (url?.includes(".doc") || url?.includes(".docx")) return "📝";
    if (url?.includes(".ppt") || url?.includes(".pptx")) return "📊";
    return "📄";
  };

  const getFileType = (url) => {
    if (url?.includes(".pdf")) return "PDF";
    if (url?.includes(".doc") || url?.includes(".docx")) return "DOC";
    if (url?.includes(".ppt") || url?.includes(".pptx")) return "PPT";
    return "DOC";
  };

  return (
    <div
      onClick={handleViewDocument}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer w-[300px] h-[420px] flex flex-col border border-gray-100"
    >
      {/* Card Header with colored accent */}
      <div className="h-2 bg-[#469B74]"></div>

      {/* Card Content */}
      <div className="p-5 flex flex-col h-full">
        {/* Title and Stats */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{getFileIcon(document.url)}</span>
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1">
              {document?.title}
            </h3>
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <UserOutlined className="mr-1" />
            <span className="truncate">{userName}</span>
          </div>
        </div>

        {/* File Type and Status */}
        <div className="flex gap-2 mb-4">
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md flex items-center">
            <FileTextOutlined className="mr-1" />
            {getFileType(document.url)}
          </span>
          {document.state === ACTIVE_RESOURCE ? (
            <span className="bg-[#e6f7ef] text-[#469B74] text-xs font-medium px-2.5 py-1 rounded-md">
              Active
            </span>
          ) : (
            <span className="bg-[#fff8e6] text-[#FCB80C] text-xs font-medium px-2.5 py-1 rounded-md">
              Pending
            </span>
          )}
        </div>

        {/* Description */}
        <div className="flex-grow">
          <p className="text-sm text-gray-600 line-clamp-3">
            {document.description ||
              "No description available for this document."}
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
            Document
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
