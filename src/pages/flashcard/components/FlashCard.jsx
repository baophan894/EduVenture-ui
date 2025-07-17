/* eslint-disable react/prop-types */
"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LikeOutlined,
  DislikeOutlined,
  UserOutlined,
  BookOutlined,
  DollarOutlined,
  LockOutlined,
} from "@ant-design/icons";
import getReviewStatus from "../../../helpers/getReviewStatus";
import { ACTIVE_RESOURCE } from "../../../common/constants";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import api from "../../../api/http";
import { formatVNPrice } from "../../../helpers/formatPrice";

const FlashCard = ({ flashcard, onFlashcardClick }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Loading...");
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Check if flashcard is paid/locked
  const isPaidFlashcard =
    flashcard.price !== null &&
    flashcard.price !== undefined &&
    flashcard.price > 0;

  // Payment mutation for direct purchase
  const buyMutation = useMutation({
    mutationFn: (flashcardId) => {
      return api.post(`/payment-flashcard?flashcardId=${flashcardId}`, null, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  // Fetch user profile by ID
  const fetchUserProfile = async (userId) => {
    try {
      setIsLoadingUser(true);
      const response = await fetch(`/api/public/user-profile/${userId}`);
      if (response.ok) {
        const userProfile = await response.json();
        setUserName(userProfile.fullName || "Unknown User");
      } else {
        setUserName("Unknown User");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUserName("Unknown User");
    } finally {
      setIsLoadingUser(false);
    }
  };

  // Fetch user profile when component mounts
  useEffect(() => {
    if (flashcard.userId) {
      fetchUserProfile(flashcard.userId);
    }
  }, [flashcard.userId]);

  const handleViewDocument = () => {
    if (token == null) {
      navigate("/login");
      return;
    }

    // Check if flashcard requires purchase (locked)
    const requiresPurchase = isPaidFlashcard && !flashcard.isPurchased;

    if (requiresPurchase) {
      // Show purchase modal for locked flashcards
      if (onFlashcardClick) {
        onFlashcardClick(flashcard);
      } else {
        alert(
          "This is a premium flashcard. Please purchase to access the content."
        );
      }
    } else {
      // Navigate to flashcard detail for free or purchased flashcards
      navigate(`/flashCard/detail/${flashcard.id}`);
    }
  };

  const onConfirmBuyFlashcard = () => {
    buyMutation.mutate(flashcard.id, {
      onSuccess(data) {
        window.location.replace(data.data); // redirect sang PayOS
      },
      onError(error) {
        notification.error({
          message:
            error.response?.data?.message || "Có lỗi xảy ra khi thanh toán",
        });
      },
    });
  };

  const { totalHelpful, totalUnhelpful } = getReviewStatus(flashcard.reviews);

  const getPriceStyle = (price) => {
    if (price === null || price === undefined || price === 0) {
      return "bg-[#e6f7ef] text-[#469B74]"; // Light green for free
    }
    return "bg-[#fff8e6] text-[#FCB80C]"; // Light yellow for paid
  };

  return (
    <div
      onClick={handleViewDocument}
      className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer w-[300px] h-[420px] flex flex-col border border-gray-100 relative ${
        isPaidFlashcard
          ? "hover:border-[#FCB80C] hover:shadow-orange-200"
          : "hover:border-[#469B74] hover:shadow-green-200"
      } transform hover:scale-105`}
    >
      {/* Premium badge for paid flashcards */}
      {isPaidFlashcard && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-gradient-to-r from-[#FCB80C] to-[#FF8C00] text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <LockOutlined className="text-xs" />
            PREMIUM
          </div>
        </div>
      )}

      {/* Card Header with colored accent */}
      <div
        className={`h-2 ${isPaidFlashcard ? "bg-[#FCB80C]" : "bg-[#469B74]"}`}
      ></div>

      {/* Card Content */}
      <div className="p-5 flex flex-col h-full">
        {/* Title and Author */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
            {flashcard?.name}
            {isPaidFlashcard && (
              <LockOutlined className="ml-2 text-[#FCB80C]" />
            )}
          </h3>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <UserOutlined className="mr-1" />
            <span className="truncate">
              {isLoadingUser ? "Loading..." : userName}
            </span>
          </div>
        </div>

        {/* Card Count, Status, and Price */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md flex items-center">
            <BookOutlined className="mr-1" />
            {flashcard.questions?.length || 0} cards
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
          <span
            className={`${getPriceStyle(
              flashcard.price
            )} text-xs font-medium px-2.5 py-1 rounded-md flex items-center`}
          >
            {isPaidFlashcard && <DollarOutlined className="mr-1" />}
            {formatVNPrice(flashcard.price)}
          </span>
        </div>

        {/* Description or Preview */}
        <div className="flex-grow">
          {isPaidFlashcard ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 line-clamp-2">
                {flashcard.description ||
                  "Premium flashcard set with exclusive content."}
              </p>
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <LockOutlined className="text-[#FCB80C] text-sm" />
                  <span className="text-sm font-medium text-[#FCB80C]">
                    Premium Content
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Unlock advanced study materials, detailed explanations, and
                  exclusive content.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600 line-clamp-3">
              {flashcard.description ||
                "No description available for this flashcard set."}
            </p>
          )}
        </div>

        {/* Call to Action for Premium Cards */}
        {isPaidFlashcard && (
          <div className="mt-3 mb-2">
            <button
              onClick={onConfirmBuyFlashcard}
              disabled={buyMutation.isPending}
              className="w-full bg-gradient-to-r from-[#FCB80C] to-[#FF8C00] text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-[#FF8C00] hover:to-[#FCB80C] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <DollarOutlined />
              {buyMutation.isPending
                ? "Processing..."
                : `Buy Now - ${formatVNPrice(flashcard.price)}`}
            </button>
          </div>
        )}

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

          <div
            className={`text-xs px-2 py-1 rounded-full ${
              isPaidFlashcard
                ? "bg-[#fff8e6] text-[#FCB80C]"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {isPaidFlashcard ? "Premium" : "Flashcard"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
