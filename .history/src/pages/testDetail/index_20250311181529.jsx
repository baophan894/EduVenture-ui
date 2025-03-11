"use client";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaStar,
  FaEye,
  FaClock,
  FaChartBar,
  FaBookOpen,
  FaHeadphones,
  FaPen,
  FaMicrophone,
  FaCheck,
  FaRegClock,
  FaUserGraduate,
  FaRegCalendarAlt,
} from "react-icons/fa";

// Mock IELTS test data
const ieltsTestData = {
  id: "ielts-academic-1",
  title: "IELTS Academic Test Simulation",
  description:
    "Complete IELTS Academic test simulation with all four modules: Listening, Reading, Writing, and Speaking. This simulation follows the exact format and timing of the official IELTS Academic test.",
  bannerUrl: "/placeholder.svg",
  views: 1245,
  ratings: 4.8,
  reviewCount: 156,
  duration: 170, // in minutes
  difficulty: "Intermediate to Advanced",
  lastUpdated: "October 15, 2023",
  instructor: {
    name: "Dr. Sarah Johnson",
    title: "IELTS Examiner & Language Specialist",
    experience: "15+ years",
    certifications: ["CELTA", "DELTA", "PhD in Applied Linguistics"],
  },
  modules: [
    {
      name: "Listening",
      icon: <FaHeadphones />,
      duration: 30,
      questions: 40,
      description:
        "Four recorded conversations and monologues with increasing difficulty. Tests your ability to understand main ideas, specific factual information, opinions, attitudes, and purpose.",
    },
    {
      name: "Reading",
      icon: <FaBookOpen />,
      duration: 60,
      questions: 40,
      description:
        "Three long texts from academic sources. Tests your ability to understand main ideas, details, implied meanings, opinions, and writer's purpose.",
    },
    {
      name: "Writing",
      icon: <FaPen />,
      duration: 60,
      tasks: 2,
      description:
        "Task 1: Describe visual information (graph/chart/diagram) in 150+ words. Task 2: Write an essay responding to an argument in 250+ words.",
    },
    {
      name: "Speaking",
      icon: <FaMicrophone />,
      duration: 11,
      parts: 3,
      description:
        "Face-to-face interview with three parts: introduction, individual long turn, and two-way discussion. Tests your ability to communicate opinions and information.",
    },
  ],
  features: [
    "Authentic test format and timing",
    "Detailed scoring with band calculation",
    "Comprehensive answer explanations",
    "Performance analysis by section",
    "Speaking module with AI assessment",
    "Writing feedback from IELTS experts",
  ],
  requirements: [
    "Intermediate English level (B1+)",
    "Headphones for listening section",
    "Microphone for speaking section",
    "Quiet environment",
    "2-3 hours of uninterrupted time",
  ],
  targetBands: [5.5, 6.0, 6.5, 7.0, 7.5],
  relatedTests: [
    { id: "ielts-general-1", title: "IELTS General Training Test" },
    { id: "ielts-academic-2", title: "IELTS Academic Test 2" },
    { id: "ielts-speaking-practice", title: "IELTS Speaking Practice" },
  ],
};

const TestDetailPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // In a real app, you would fetch the test data based on testId
  const test = ieltsTestData;

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Header with back button */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-[#469B74] transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to Tests
          </button>
        </div>
      </div>

      {/* Test Banner */}
      <div className="bg-[#469B74] text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Left side - Image */}
            <div className="w-full md:w-1/3 rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gray-200 h-64 w-full"></div>
            </div>

            {/* Right side - Test info */}
            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold mb-4">{test.title}</h1>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span>{test.ratings}</span>
                  <span className="text-gray-200 ml-1">
                    ({test.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <FaEye className="mr-1" />
                  <span>{test.views} views</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-1" />
                  <span>{test.duration} minutes</span>
                </div>
              </div>

              <p className="text-lg mb-6">{test.description}</p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white bg-opacity-20 rounded-full px-4 py-1 text-sm flex items-center">
                  <FaChartBar className="mr-2" /> {test.difficulty}
                </div>
                <div className="bg-white bg-opacity-20 rounded-full px-4 py-1 text-sm flex items-center">
                  <FaRegCalendarAlt className="mr-2" /> Updated{" "}
                  {test.lastUpdated}
                </div>
                <div className="bg-white bg-opacity-20 rounded-full px-4 py-1 text-sm flex items-center">
                  <FaUserGraduate className="mr-2" /> By {test.instructor.name}
                </div>
              </div>

              <button className="bg-white text-[#469B74] font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
                Start Test Simulation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            <button
              className={`py-4 px-6 font-medium border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-[#469B74] text-[#469B74]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`py-4 px-6 font-medium border-b-2 transition-colors ${
                activeTab === "modules"
                  ? "border-[#469B74] text-[#469B74]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("modules")}
            >
              Test Modules
            </button>
            <button
              className={`py-4 px-6 font-medium border-b-2 transition-colors ${
                activeTab === "instructor"
                  ? "border-[#469B74] text-[#469B74]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("instructor")}
            >
              Instructor
            </button>
            <button
              className={`py-4 px-6 font-medium border-b-2 transition-colors ${
                activeTab === "reviews"
                  ? "border-[#469B74] text-[#469B74]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Test Overview</h2>

                {/* Test Format */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Test Format</h3>
                  <p className="mb-6">
                    This IELTS Academic test simulation follows the exact format
                    of the official IELTS Academic test, with four modules:
                    Listening, Reading, Writing, and Speaking. The total test
                    time is approximately 2 hours and 45 minutes.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {test.modules.map((module, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 hover:border-[#469B74] transition-colors"
                      >
                        <div className="flex items-center mb-3">
                          <div className="text-[#469B74] text-xl mr-3">
                            {module.icon}
                          </div>
                          <h4 className="font-semibold">{module.name}</h4>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <FaRegClock className="mr-1" /> {module.duration}{" "}
                          minutes
                          {module.questions && (
                            <span className="ml-3">
                              {module.questions} questions
                            </span>
                          )}
                          {module.tasks && (
                            <span className="ml-3">{module.tasks} tasks</span>
                          )}
                          {module.parts && (
                            <span className="ml-3">{module.parts} parts</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {module.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Test Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {test.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="text-[#469B74] mt-1 mr-3">
                          <FaCheck />
                        </div>
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                  <ul className="space-y-2">
                    {test.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <div className="text-[#469B74] mt-1 mr-3">•</div>
                        <p>{req}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "modules" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Test Modules</h2>

                {/* Detailed modules */}
                {test.modules.map((module, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 mb-6"
                  >
                    <div className="flex items-center mb-4">
                      <div className="text-[#469B74] text-2xl mr-3">
                        {module.icon}
                      </div>
                      <h3 className="text-xl font-semibold">
                        {module.name} Module
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="bg-gray-100 rounded-full px-4 py-1 text-sm flex items-center">
                        <FaRegClock className="mr-2" /> {module.duration}{" "}
                        minutes
                      </div>
                      {module.questions && (
                        <div className="bg-gray-100 rounded-full px-4 py-1 text-sm">
                          {module.questions} questions
                        </div>
                      )}
                      {module.tasks && (
                        <div className="bg-gray-100 rounded-full px-4 py-1 text-sm">
                          {module.tasks} tasks
                        </div>
                      )}
                      {module.parts && (
                        <div className="bg-gray-100 rounded-full px-4 py-1 text-sm">
                          {module.parts} parts
                        </div>
                      )}
                    </div>

                    <p className="mb-4">{module.description}</p>

                    {/* Module-specific content */}
                    {module.name === "Listening" && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h4 className="font-semibold mb-2">
                          Section Breakdown:
                        </h4>
                        <ul className="space-y-2">
                          <li>
                            • Section 1: A conversation between two people in an
                            everyday social context
                          </li>
                          <li>
                            • Section 2: A monologue in an everyday social
                            context
                          </li>
                          <li>
                            • Section 3: A conversation between up to four
                            people in an educational context
                          </li>
                          <li>
                            • Section 4: A monologue on an academic subject
                          </li>
                        </ul>
                      </div>
                    )}

                    {module.name === "Reading" && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h4 className="font-semibold mb-2">Question Types:</h4>
                        <ul className="space-y-2">
                          <li>• Multiple choice</li>
                          <li>
                            • Identifying information (True/False/Not Given)
                          </li>
                          <li>
                            • Identifying writer's views/claims (Yes/No/Not
                            Given)
                          </li>
                          <li>
                            • Matching information/headings/features/sentence
                            endings
                          </li>
                          <li>
                            • Sentence completion, summary completion, note
                            completion, table completion, flow-chart completion,
                            diagram label completion
                          </li>
                          <li>• Short-answer questions</li>
                        </ul>
                      </div>
                    )}

                    {module.name === "Writing" && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h4 className="font-semibold mb-2">Task Details:</h4>
                        <div className="space-y-4">
                          <div>
                            <p className="font-medium">Task 1 (20 minutes)</p>
                            <p>
                              You will be presented with a graph, table, chart
                              or diagram and asked to describe, summarize or
                              explain the information in your own words. You may
                              be asked to describe and explain data, describe
                              the stages of a process, how something works or
                              describe an object or event.
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Task 2 (40 minutes)</p>
                            <p>
                              You will be asked to write an essay in response to
                              a point of view, argument or problem. The issues
                              raised are of general interest to, suitable for
                              and easily understood by test takers entering
                              undergraduate or postgraduate studies or seeking
                              professional registration.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {module.name === "Speaking" && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h4 className="font-semibold mb-2">Part Details:</h4>
                        <div className="space-y-4">
                          <div>
                            <p className="font-medium">
                              Part 1: Introduction and Interview (4-5 minutes)
                            </p>
                            <p>
                              The examiner introduces themselves and asks you to
                              introduce yourself and confirm your identity. The
                              examiner asks you general questions on familiar
                              topics, such as home, family, work, studies and
                              interests.
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">
                              Part 2: Individual Long Turn (3-4 minutes)
                            </p>
                            <p>
                              The examiner gives you a task card which asks you
                              to talk about a particular topic and includes
                              points you can cover in your talk. You are given 1
                              minute to prepare and make notes. You then talk
                              for 1-2 minutes on the topic. The examiner may ask
                              one or two questions on the same topic.
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">
                              Part 3: Two-way Discussion (4-5 minutes)
                            </p>
                            <p>
                              The examiner asks further questions which are
                              connected to the topic of Part 2. These questions
                              give you an opportunity to discuss more abstract
                              issues and ideas.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "instructor" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  About the Instructor
                </h2>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-32 h-32 bg-gray-200 rounded-full flex-shrink-0"></div>

                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {test.instructor.name}
                      </h3>
                      <p className="text-[#469B74] mb-4">
                        {test.instructor.title}
                      </p>

                      <p className="mb-4">
                        Dr. Sarah Johnson is a certified IELTS examiner with
                        over 15 years of experience in language assessment and
                        teaching. She has helped thousands of students achieve
                        their target IELTS scores for academic, immigration, and
                        professional purposes.
                      </p>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Experience:</h4>
                        <p>
                          {test.instructor.experience} of IELTS examination and
                          training
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Certifications:</h4>
                        <div className="flex flex-wrap gap-2">
                          {test.instructor.certifications.map((cert, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 rounded-full px-3 py-1 text-sm"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-[#469B74] mb-2">
                        {test.ratings}
                      </div>
                      <div className="flex text-yellow-400 mb-2">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar className="text-yellow-200" />
                      </div>
                      <p className="text-gray-600">
                        {test.reviewCount} reviews
                      </p>
                    </div>

                    <div className="flex-1">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="w-16 text-sm">5 stars</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                            <div
                              className="h-2 bg-[#469B74] rounded-full"
                              style={{ width: "70%" }}
                            ></div>
                          </div>
                          <span className="w-8 text-sm text-gray-600">70%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-16 text-sm">4 stars</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                            <div
                              className="h-2 bg-[#469B74] rounded-full"
                              style={{ width: "20%" }}
                            ></div>
                          </div>
                          <span className="w-8 text-sm text-gray-600">20%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-16 text-sm">3 stars</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                            <div
                              className="h-2 bg-[#469B74] rounded-full"
                              style={{ width: "7%" }}
                            ></div>
                          </div>
                          <span className="w-8 text-sm text-gray-600">7%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-16 text-sm">2 stars</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                            <div
                              className="h-2 bg-[#469B74] rounded-full"
                              style={{ width: "2%" }}
                            ></div>
                          </div>
                          <span className="w-8 text-sm text-gray-600">2%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-16 text-sm">1 star</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                            <div
                              className="h-2 bg-[#469B74] rounded-full"
                              style={{ width: "1%" }}
                            ></div>
                          </div>
                          <span className="w-8 text-sm text-gray-600">1%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[
                    {
                      name: "Michael Chen",
                      rating: 5,
                      date: "October 2, 2023",
                      comment:
                        "This test simulation was incredibly helpful for my IELTS preparation. The format and difficulty level matched the real test perfectly. I especially appreciated the detailed feedback on my writing and speaking sections. Highly recommended!",
                    },
                    {
                      name: "Priya Sharma",
                      rating: 5,
                      date: "September 15, 2023",
                      comment:
                        "The best IELTS practice test I've found online. The listening section was particularly well-designed with authentic accents and realistic scenarios. The automated scoring was accurate and the explanations for each answer were very helpful.",
                    },
                    {
                      name: "Ahmed Hassan",
                      rating: 4,
                      date: "August 28, 2023",
                      comment:
                        "Very good simulation that helped me identify my weak areas. The reading passages were challenging and similar to the actual test. I would have given 5 stars, but I found a few minor technical issues with the speaking section recording.",
                    },
                  ].map((review, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md p-6"
                    >
                      <div className="flex justify-between mb-3">
                        <h4 className="font-semibold">{review.name}</h4>
                        <span className="text-gray-500 text-sm">
                          {review.date}
                        </span>
                      </div>

                      <div className="flex text-yellow-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < review.rating ? "" : "text-yellow-200"
                            }
                          />
                        ))}
                      </div>

                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="md:col-span-1">
            {/* Start Test Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-4">Ready to Start?</h3>
              <p className="mb-6">
                Take this complete IELTS Academic test simulation to assess your
                current level and identify areas for improvement.
              </p>

              <button className="w-full bg-[#469B74] text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-[#5bbd8b] transition-colors mb-4">
                Start Test Simulation
              </button>

              <button className="w-full border border-[#469B74] text-[#469B74] font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors">
                Save for Later
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-3">Target IELTS Bands:</h4>
                <div className="flex flex-wrap gap-2">
                  {test.targetBands.map((band, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 rounded-full px-3 py-1 text-sm"
                    >
                      Band {band}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Tests */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Related Tests</h3>
              <div className="space-y-4">
                {test.relatedTests.map((relTest, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                  >
                    <a
                      href={`/test/detail/${relTest.id}`}
                      className="hover:text-[#469B74] transition-colors"
                    >
                      {relTest.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetailPage;
