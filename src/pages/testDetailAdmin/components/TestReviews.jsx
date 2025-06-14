"use client";

import { FaStar, FaFilter, FaSort, FaTimes, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DeleteReviewModal from "./DeleteReviewModal";
import toast from "react-hot-toast";

const TestReviews = ({ test, setTest }) => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(10);
  const [sortBy, setSortBy] = useState("reviewDate");
  const [direction, setDirection] = useState("desc");
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    fiveStarCount: 0,
    fourStarCount: 0,
    threeStarCount: 0,
    twoStarCount: 0,
    oneStarCount: 0,
  });

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://https://safeeduapi-dev.sit/api/tests/${id}/reviews`,
        {
          params: {
            page: currentPage,
            size: pageSize,
            sortBy,
            direction,
            rating:
              selectedRatings.length > 0 ? selectedRatings.join(",") : null,
          },
        }
      );
      const {
        reviews,
        totalPages,
        averageRating,
        totalReviews,
        fiveStarCount,
        fourStarCount,
        threeStarCount,
        twoStarCount,
        oneStarCount,
      } = response.data;

      setReviews(reviews);
      setTotalPages(totalPages);
      setStats({
        averageRating,
        totalReviews,
        fiveStarCount,
        fourStarCount,
        threeStarCount,
        twoStarCount,
        oneStarCount,
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [currentPage, sortBy, direction, selectedRatings]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setDirection(direction === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setDirection("desc");
    }
    setShowSortMenu(false);
  };

  const handleRatingFilter = (rating) => {
    setSelectedRatings((prev) => {
      if (prev.includes(rating)) {
        return prev.filter((r) => r !== rating);
      }
      return [...prev, rating];
    });
    setCurrentPage(0);
  };

  const clearFilters = () => {
    setSelectedRatings([]);
    setCurrentPage(0);
  };

  const getPercentage = (count) => {
    if (stats.totalReviews === 0) return 0;
    return Math.round((count / stats.totalReviews) * 100);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    if (totalPages > 0) {
      buttons.push(
        <button
          key={0}
          onClick={() => handlePageChange(0)}
          className={`px-3 py-1 rounded-md ${
            currentPage === 0 ? "bg-emerald-600 text-white" : "bg-gray-100"
          }`}
        >
          1
        </button>
      );
    }

    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    const endPage = Math.min(totalPages - 1, startPage + maxVisibleButtons - 2);

    if (endPage - startPage < maxVisibleButtons - 2) {
      startPage = Math.max(1, endPage - (maxVisibleButtons - 2));
    }

    if (startPage > 1) {
      buttons.push(
        <span key="ellipsis1" className="px-2">
          ...
        </span>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i ? "bg-emerald-600 text-white" : "bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      );
    }

    if (endPage < totalPages - 2) {
      buttons.push(
        <span key="ellipsis2" className="px-2">
          ...
        </span>
      );
    }

    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages - 1}
          onClick={() => handlePageChange(totalPages - 1)}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages - 1
              ? "bg-emerald-600 text-white"
              : "bg-gray-100"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  const handleDeleteClick = (review) => {
    setSelectedReview(review);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedReview) return;

    setDeleting(true);
    try {
      await axios.delete(
        `http://https://safeeduapi-dev.sit/api/tests/${id}/reviews/${selectedReview.id}`
      );
      toast.success("Review deleted successfully");
      setShowDeleteModal(false);

      // Update the test's review count in the parent component
      setTest((prev) => ({
        ...prev,
        reviewCount: prev.reviewCount - 1,
        // Recalculate average rating
        ratings: prev.ratings
          ? (prev.ratings * prev.reviewCount - selectedReview.rating) /
            (prev.reviewCount - 1)
          : 0,
      }));

      fetchReviews(); // Refetch reviews after deletion
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review");
    } finally {
      setDeleting(false);
      setSelectedReview(null);
    }
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-emerald-600 flex items-center justify-center text-white mb-2">
                <span className="text-3xl font-bold">
                  {stats.averageRating.toFixed(1)}
                </span>
              </div>
              <p className="text-gray-600">{stats.totalReviews} reviews</p>
            </div>

            <div className="flex-1">
              <div className="space-y-2">
                {[
                  { rating: 5, field: "fiveStarCount" },
                  { rating: 4, field: "fourStarCount" },
                  { rating: 3, field: "threeStarCount" },
                  { rating: 2, field: "twoStarCount" },
                  { rating: 1, field: "oneStarCount" },
                ].map(({ rating, field }) => (
                  <div key={rating} className="flex items-center">
                    <span className="w-16 text-sm text-gray-600">
                      {rating} stars
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div
                        className="h-2 bg-emerald-600 rounded-full"
                        style={{
                          width: `${getPercentage(stats[field])}%`,
                        }}
                      ></div>
                    </div>
                    <span className="w-8 text-sm text-gray-600">
                      {getPercentage(stats[field])}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap justify-between items-center">
          <div className="flex gap-4 mb-2 sm:mb-0">
            <div className="relative">
              <button
                onClick={() => {
                  setShowFilterMenu(!showFilterMenu);
                  setShowSortMenu(false);
                }}
                className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                  selectedRatings.length > 0
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <FaFilter />
                <span>Filter</span>
                {selectedRatings.length > 0 && (
                  <span className="bg-white text-emerald-600 px-2 py-0.5 rounded-full text-sm">
                    {selectedRatings.length}
                  </span>
                )}
              </button>
              {showFilterMenu && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-10 min-w-[200px] border">
                  <div className="flex justify-between items-center mb-2 pb-2 border-b">
                    <span className="font-semibold">Filter by Rating</span>
                    <button
                      onClick={() => setShowFilterMenu(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes size={14} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={selectedRatings.includes(rating)}
                          onChange={() => handleRatingFilter(rating)}
                          className="rounded text-emerald-600"
                        />
                        <div className="flex items-center justify-center">
                          <span className="mr-1">{rating}</span>
                          <FaStar className="text-yellow-400" />
                        </div>
                      </label>
                    ))}
                  </div>
                  {selectedRatings.length > 0 && (
                    <button
                      onClick={clearFilters}
                      className="mt-3 text-sm text-emerald-600 hover:underline w-full text-center pt-2 border-t"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setShowSortMenu(!showSortMenu);
                  setShowFilterMenu(false);
                }}
                className="px-4 py-2 rounded-md flex items-center gap-2 bg-gray-100 text-gray-700"
              >
                <FaSort />
                <span>Sort</span>
                {sortBy && (
                  <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full text-xs flex items-center">
                    {sortBy === "reviewDate" ? "Date" : "Rating"}
                    <span className="ml-1">
                      {direction === "asc" ? "↑" : "↓"}
                    </span>
                  </span>
                )}
              </button>
              {showSortMenu && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-10 min-w-[200px] border">
                  <div className="flex justify-between items-center mb-2 pb-2 border-b">
                    <span className="font-semibold">Sort by</span>
                    <button
                      onClick={() => setShowSortMenu(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes size={14} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleSortChange("reviewDate")}
                      className={`w-full text-left px-3 py-2 rounded flex justify-between items-center hover:bg-gray-50 ${
                        sortBy === "reviewDate" ? "bg-gray-100" : ""
                      }`}
                    >
                      <span>Date</span>
                      {sortBy === "reviewDate" && (
                        <span>{direction === "asc" ? "↑" : "↓"}</span>
                      )}
                    </button>
                    <button
                      onClick={() => handleSortChange("rating")}
                      className={`w-full text-left px-3 py-2 rounded flex justify-between items-center hover:bg-gray-50 ${
                        sortBy === "rating" ? "bg-gray-100" : ""
                      }`}
                    >
                      <span>Rating</span>
                      {sortBy === "rating" && (
                        <span>{direction === "asc" ? "↑" : "↓"}</span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {selectedRatings.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-emerald-600 hover:underline flex items-center gap-1"
            >
              <FaTimes size={12} />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        {selectedRatings.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedRatings.map((rating) => (
              <div
                key={rating}
                className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1 text-sm"
              >
                <span>
                  {rating}{" "}
                  <FaStar className="text-yellow-400 inline-block" size={12} />
                </span>
                <button
                  onClick={() => handleRatingFilter(rating)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading reviews...</p>
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-md p-8 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={review.userAvatarUrl || "/placeholder.svg"}
                      alt={review.userFullName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between mb-3">
                      <h4 className="font-semibold">{review.userFullName}</h4>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-500 text-sm">
                          {new Date(review.reviewDate).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => handleDeleteClick(review)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                          title="Delete review"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex text-yellow-400 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < review.rating ? "" : "text-yellow-200"}
                        />
                      ))}
                    </div>

                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">No reviews yet</div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex flex-wrap justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="px-3 py-1 rounded-md bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              &laquo;
            </button>

            {renderPaginationButtons()}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1 rounded-md bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              &raquo;
            </button>
          </div>
        )}
      </div>

      <DeleteReviewModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        onConfirm={handleConfirmDelete}
        deleting={deleting}
      />
    </>
  );
};

export default TestReviews;
