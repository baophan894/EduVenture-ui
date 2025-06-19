"use client"

/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  LikeOutlined,
  DislikeOutlined,
  UserOutlined,
  BookOutlined,
  DollarOutlined,
  LockOutlined,
} from "@ant-design/icons"
import getReviewStatus from "../../../helpers/getReviewStatus"
import { ACTIVE_RESOURCE } from "../../../common/constants"

const FlashCard = ({ flashcard }) => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const [userName, setUserName] = useState("Loading...")
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  // Check if flashcard is paid/locked
  const isPaidFlashcard = flashcard.price !== null && flashcard.price !== undefined && flashcard.price > 0

  // Fetch user profile by ID
  const fetchUserProfile = async (userId) => {
    try {
      setIsLoadingUser(true)
      const response = await fetch(`/api/public/user-profile/${userId}`)
      if (response.ok) {
        const userProfile = await response.json()
        setUserName(userProfile.fullName || "Unknown User")
      } else {
        setUserName("Unknown User")
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
      setUserName("Unknown User")
    } finally {
      setIsLoadingUser(false)
    }
  }

  // Fetch user profile when component mounts
  useEffect(() => {
    if (flashcard.userId) {
      fetchUserProfile(flashcard.userId)
    }
  }, [flashcard.userId])

  const handleViewDocument = () => {
    if (token == null) {
      navigate("/login")
      return
    }

    // If it's a paid flashcard, show purchase modal or redirect to purchase page
    if (isPaidFlashcard) {
      // For now, we'll just show an alert. You can replace this with a purchase modal
      alert("This is a premium flashcard. Please purchase to access the content.")
      // navigate(`/flashCard/purchase/${flashcard.id}`) // Uncomment when purchase page is ready
      return
    }

    // Only allow access to free flashcards
    navigate(`/flashCard/detail/${flashcard.id}`)
  }

  const { totalHelpful, totalUnhelpful } = getReviewStatus(flashcard.reviews)

  // Format price display
  const formatPrice = (price) => {
    if (price === null || price === undefined || price === 0) {
      return "Free"
    }
    return `$${price.toFixed(2)}`
  }

  const getPriceStyle = (price) => {
    if (price === null || price === undefined || price === 0) {
      return "bg-[#e6f7ef] text-[#469B74]" // Light green for free
    }
    return "bg-[#fff8e6] text-[#FCB80C]" // Light yellow for paid
  }

  return (
    <div
      onClick={handleViewDocument}
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer w-[300px] h-[420px] flex flex-col border border-gray-100 ${
        isPaidFlashcard ? "relative" : ""
      }`}
    >
      {/* Lock overlay for paid flashcards */}
      {isPaidFlashcard && (
        <div className="absolute inset-0 bg-black bg-opacity-10 z-10 flex items-center justify-center">
          <div className="bg-white rounded-full p-3 shadow-lg">
            <LockOutlined className="text-2xl text-[#FCB80C]" />
          </div>
        </div>
      )}

      {/* Card Header with colored accent */}
      <div className={`h-2 ${isPaidFlashcard ? "bg-[#FCB80C]" : "bg-[#469B74]"}`}></div>

      {/* Card Content */}
      <div className="p-5 flex flex-col h-full">
        {/* Title and Stats */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
            {flashcard?.name}
            {isPaidFlashcard && <LockOutlined className="ml-2 text-[#FCB80C]" />}
          </h3>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <UserOutlined className="mr-1" />
            <span className="truncate">{isLoadingUser ? "Loading..." : userName}</span>
          </div>
        </div>

        {/* Card Count, Status, and Price */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md flex items-center">
            <BookOutlined className="mr-1" />
            {flashcard.questions.length} cards
          </span>
          {flashcard.state === ACTIVE_RESOURCE ? (
            <span className="bg-[#e6f7ef] text-[#469B74] text-xs font-medium px-2.5 py-1 rounded-md">Active</span>
          ) : (
            <span className="bg-[#fff8e6] text-[#FCB80C] text-xs font-medium px-2.5 py-1 rounded-md">Pending</span>
          )}
          <span
            className={`${getPriceStyle(flashcard.price)} text-xs font-medium px-2.5 py-1 rounded-md flex items-center`}
          >
            {isPaidFlashcard && <DollarOutlined className="mr-1" />}
            {formatPrice(flashcard.price)}
          </span>
        </div>

        {/* Description or Preview */}
        <div className="flex-grow">
          <p className={`text-sm text-gray-600 line-clamp-3 ${isPaidFlashcard ? "opacity-70" : ""}`}>
            {isPaidFlashcard
              ? "This is a premium flashcard set. Purchase to view full content and description."
              : flashcard.description || "No description available for this flashcard set."}
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

          <div
            className={`text-xs px-2 py-1 rounded-full ${
              isPaidFlashcard ? "bg-[#fff8e6] text-[#FCB80C]" : "bg-gray-100 text-gray-700"
            }`}
          >
            {isPaidFlashcard ? "Premium" : "Flashcard"}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlashCard
