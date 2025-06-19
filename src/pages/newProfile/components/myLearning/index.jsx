/* eslint-disable react/prop-types */
"use client"

import { useState } from "react"
import { Card, Button, Tag, Spin, Empty } from "antd"
import { useQuery } from "@tanstack/react-query"
import { BookOpen, Clock, Play, CreditCard, Users, Lock, Library } from "lucide-react"

import { useNavigate } from "react-router-dom"

import api from "../../../../api/http"

const MyLearning = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("saved")

  // Fetch bought courses (saved section)
  const {
    data: boughtCourses,
    isLoading: boughtLoading,
    error: boughtError,
  } = useQuery({
    queryKey: ["boughtCourses"],
    queryFn: async () => {
      const response = await api.get("/courses/bought", {
        headers: { Authorization: token },
      })
      return response.data
    },
    enabled: !!token,
  })

  // Fetch public flashcards (library section)
  const {
    data: publicFlashcards,
    isLoading: publicLoading,
    error: publicError,
  } = useQuery({
    queryKey: ["publicFlashcards"],
    queryFn: async () => {
      const response = await api.get("/flashcards/public", {
        headers: { Authorization: token },
      })
      return response.data
    },
    enabled: !!token,
  })

  // Fetch sold flashcards
  const {
    data: soldFlashcards,
    isLoading: soldLoading,
    error: soldError,
  } = useQuery({
    queryKey: ["soldFlashcards"],
    queryFn: async () => {
      const response = await api.get("/flashcards/sell", {
        headers: { Authorization: token },
      })
      return response.data
    },
    enabled: !!token,
  })

  // Fetch private flashcards
  const {
    data: privateFlashcards,
    isLoading: privateLoading,
    error: privateError,
  } = useQuery({
    queryKey: ["privateFlashcards"],
    queryFn: async () => {
      const response = await api.get("/flashcards/private", {
        headers: { Authorization: token },
      })
      return response.data
    },
    enabled: !!token,
  })

  const handleContinueLearning = (courseId) => {
    navigate(`/coursepayment/detail/${courseId}`)
  }

  const handleViewFlashcard = (flashcardId) => {
    navigate(`/flashCard/detail/${flashcardId}`)
  }

  const calculateTotalLessons = (mainSections) => {
    return mainSections?.reduce((total, section) => total + (section.subSections?.length || 0), 0) || 0
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const CourseCard = ({ course }) => {
    const totalLessons = calculateTotalLessons(course.mainSections)
    const estimatedDuration = `${Math.max(1, Math.floor(totalLessons * 0.5))}h`

    return (
      <Card
        className="course-card hover:shadow-lg transition-all duration-300 border border-gray-200"
        cover={
          <div className="relative">
            <img alt={course.name} src={course.bannerUrl || "/placeholder.svg"} className="w-full h-48 object-cover" />
            <div className="absolute top-3 right-3">
              <Tag color="green" className="font-medium">
                Purchased
              </Tag>
            </div>
            {course.orders?.[0]?.paymentStatus === "paid" && (
              <div className="absolute top-3 left-3">
                <Tag color="blue" className="font-medium">
                  Paid
                </Tag>
              </div>
            )}
          </div>
        }
        actions={[
          <Button
            key="continue"
            type="primary"
            icon={<Play className="w-4 h-4" />}
            onClick={() => handleContinueLearning(course.id)}
            className="bg-[#469B74] border-[#469B74] hover:bg-[#3d8a67]"
          >
            Continue Learning
          </Button>,
        ]}
      >
        <div className="p-2">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{course.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>

          {/* Price */}
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#469B74]">${course.price?.toLocaleString() || "0"}</span>
            </div>
          </div>

          {/* Course Info */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{totalLessons} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{estimatedDuration}</span>
            </div>
          </div>

          {/* Purchase Date */}
          <div className="text-xs text-gray-500">
            Purchased: {formatDate(course.orders?.[0]?.createdAt || course.createdAt)}
          </div>
        </div>
      </Card>
    )
  }

  const FlashcardCard = ({ flashcard, showPrice = false }) => {
    const getStateColor = (state) => {
      switch (state) {
        case "active":
          return "green"
        case "pending":
          return "orange"
        default:
          return "gray"
      }
    }

    const getModeIcon = (mode) => {
      switch (mode) {
        case "public":
          return <Users className="w-4 h-4" />
        case "sell":
          return <CreditCard className="w-4 h-4" />
        case "private":
          return <Lock className="w-4 h-4" />
        default:
          return <BookOpen className="w-4 h-4" />
      }
    }

    const getModeColor = (mode) => {
      switch (mode) {
        case "public":
          return "blue"
        case "sell":
          return "gold"
        case "private":
          return "purple"
        default:
          return "gray"
      }
    }

    return (
      <Card
        className="flashcard-card hover:shadow-lg transition-all duration-300 border border-gray-200"
        actions={[
          <Button
            key="view"
            type="primary"
            icon={<BookOpen className="w-4 h-4" />}
            onClick={() => handleViewFlashcard(flashcard.id)}
            className="bg-[#469B74] border-[#469B74] hover:bg-[#3d8a67]"
          >
            Study Now
          </Button>,
        ]}
      >
        <div className="p-2">
          {/* Header with tags */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-2">
              <Tag color={getModeColor(flashcard.mode)} icon={getModeIcon(flashcard.mode)} className="font-medium">
                {flashcard.mode.charAt(0).toUpperCase() + flashcard.mode.slice(1)}
              </Tag>
              <Tag color={getStateColor(flashcard.state)} className="font-medium">
                {flashcard.state.charAt(0).toUpperCase() + flashcard.state.slice(1)}
              </Tag>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{flashcard.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{flashcard.description}</p>

          {/* Price (for sell mode) */}
          {showPrice && flashcard.price && (
            <div className="mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#FCB80B]">${flashcard.price?.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Flashcard Info */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{flashcard.questions?.length || 0} cards</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{Math.max(1, Math.floor((flashcard.questions?.length || 0) * 0.1))}min</span>
            </div>
          </div>

          {/* Created Date */}
          <div className="text-xs text-gray-500">Created: {formatDate(flashcard.createdAt)}</div>
        </div>
      </Card>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "saved":
        if (boughtLoading) {
          return (
            <div className="flex justify-center items-center py-12">
              <Spin size="large" />
            </div>
          )
        }

        if (boughtError) {
          return (
            <div className="text-center py-12">
              <p className="text-red-600">Error loading purchased courses</p>
            </div>
          )
        }

        if (!boughtCourses || boughtCourses.length === 0) {
          return (
            <Empty description="No purchased courses yet" image={Empty.PRESENTED_IMAGE_SIMPLE} className="py-12">
              <Button type="primary" onClick={() => navigate("/courses")} className="bg-[#469B74] border-[#469B74]">
                Browse Courses
              </Button>
            </Empty>
          )
        }

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boughtCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )

      case "library":
        if (publicLoading) {
          return (
            <div className="flex justify-center items-center py-12">
              <Spin size="large" />
            </div>
          )
        }

        if (publicError) {
          return (
            <div className="text-center py-12">
              <p className="text-red-600">Error loading public flashcards</p>
            </div>
          )
        }

        if (!publicFlashcards || publicFlashcards.length === 0) {
          return (
            <Empty description="No public flashcards yet" image={Empty.PRESENTED_IMAGE_SIMPLE} className="py-12">
              <Button type="primary" onClick={() => navigate("/flashcards")} className="bg-[#469B74] border-[#469B74]">
                Create Flashcard
              </Button>
            </Empty>
          )
        }

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicFlashcards.map((flashcard) => (
              <FlashcardCard key={flashcard.id} flashcard={flashcard} />
            ))}
          </div>
        )

      case "sold":
        if (soldLoading) {
          return (
            <div className="flex justify-center items-center py-12">
              <Spin size="large" />
            </div>
          )
        }

        if (soldError) {
          return (
            <div className="text-center py-12">
              <p className="text-red-600">Error loading sold flashcards</p>
            </div>
          )
        }

        if (!soldFlashcards || soldFlashcards.length === 0) {
          return (
            <Empty description="No flashcards for sale yet" image={Empty.PRESENTED_IMAGE_SIMPLE} className="py-12">
              <Button type="primary" onClick={() => navigate("/flashcards")} className="bg-[#469B74] border-[#469B74]">
                Create Flashcard to Sell
              </Button>
            </Empty>
          )
        }

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {soldFlashcards.map((flashcard) => (
              <FlashcardCard key={flashcard.id} flashcard={flashcard} showPrice={true} />
            ))}
          </div>
        )

      case "private":
        if (privateLoading) {
          return (
            <div className="flex justify-center items-center py-12">
              <Spin size="large" />
            </div>
          )
        }

        if (privateError) {
          return (
            <div className="text-center py-12">
              <p className="text-red-600">Error loading private flashcards</p>
            </div>
          )
        }

        if (!privateFlashcards || privateFlashcards.length === 0) {
          return (
            <Empty description="No private flashcards yet" image={Empty.PRESENTED_IMAGE_SIMPLE} className="py-12">
              <Button type="primary" onClick={() => navigate("/flashcards")} className="bg-[#469B74] border-[#469B74]">
                Create Private Flashcard
              </Button>
            </Empty>
          )
        }

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {privateFlashcards.map((flashcard) => (
              <FlashcardCard key={flashcard.id} flashcard={flashcard} />
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="my-learning-section bg-white rounded-lg shadow-md p-6 mt-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">My Learning</h2>
        <p className="text-gray-600">Manage your courses and flashcards</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab("saved")}
          className={`pb-3 px-1 font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === "saved" ? "text-[#469B74] border-b-2 border-[#469B74]" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          Purchased Courses ({boughtCourses?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("library")}
          className={`pb-3 px-1 font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === "library" ? "text-[#469B74] border-b-2 border-[#469B74]" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Library className="w-4 h-4" />
          Public Library ({publicFlashcards?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("sold")}
          className={`pb-3 px-1 font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === "sold" ? "text-[#469B74] border-b-2 border-[#469B74]" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          For Sale ({soldFlashcards?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("private")}
          className={`pb-3 px-1 font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === "private" ? "text-[#469B74] border-b-2 border-[#469B74]" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Lock className="w-4 h-4" />
          Private ({privateFlashcards?.length || 0})
        </button>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  )
}

export default MyLearning
