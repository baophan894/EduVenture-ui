import { useState } from "react";
import {
  FaBook,
  FaCamera,
  FaComment,
  FaEdit,
  FaFileAlt,
  FaMicrophone,
  FaUsers,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import InstructorTab from "./components/instructor-tab";
import ModulesTab from "./components/modules-tab";
import OverviewTab from "./components/overview-tab";
import ReviewsTab from "./components/reviews-tab";
import Sidebar from "./components/sidebar";
import TabNavigation from "./components/tab-navigation";
import TestBanner from "./components/test-banner";
import TestSimulationScreen from "../testSimulation/test-simulation-screen";
import { TEST_TYPES } from "../testSimulation/test-types";

const TestDetailPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isTesting, setIsTesting] = useState(false);

  return !isTesting ? (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Test Banner */}
      <TestBanner
        test={testId == 1 ? readingTest : listeningTest}
        setIsTesting={setIsTesting}
      />

      {/* Tabs Navigation */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2">
            {activeTab === "overview" && (
              <OverviewTab test={testId == 1 ? readingTest : listeningTest} />
            )}
            {activeTab === "modules" && (
              <ModulesTab test={testId == 1 ? readingTest : listeningTest} />
            )}
            {activeTab === "instructor" && (
              <InstructorTab test={testId == 1 ? readingTest : listeningTest} />
            )}
            {activeTab === "reviews" && (
              <ReviewsTab test={testId == 1 ? readingTest : listeningTest} />
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="md:col-span-1">
            <Sidebar
              test={testId == 1 ? readingTest : listeningTest}
              setIsTesting={setIsTesting}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <TestSimulationScreen
      type={testId == 1 ? TEST_TYPES.READING : TEST_TYPES.LISTENING}
    />
  );
};

export default TestDetailPage;

// Mock TOEIC test data
const listeningTest = {
  id: "toeic-listening-1",
  title: "TOEIC Listening Practice Test 1",
  description:
    "Complete TOEIC Listening test simulation with authentic exam format. This test includes four parts: Photographs, Question-Response, Conversations, and Talks, simulating real TOEIC listening conditions.",
  coverImg: "/Test (402 x 256 px)/2.png",
  type: "TOEIC",
  views: 1245,
  ratings: 4.8,
  reviewCount: 156,
  duration: 45, // TOEIC Listening is about 45 minutes
  difficulty: "Intermediate",
  lastUpdated: "October 15, 2023",
  instructor: {
    name: "David Anderson",
    title: "TOEIC Trainer & Language Expert",
    experience: "10+ years",
    certifications: ["TESOL", "TOEIC Certified Trainer"],
    description:
      "David Anderson is a certified TOEIC trainer with over 10 years of experience in language assessment and test preparation. He has helped numerous students improve their TOEIC scores for career advancement and international job opportunities.",
  },
  modules: [
    {
      name: "Part 1: Photographs",
      icon: <FaCamera />,
      duration: 5,
      questions: 6,
      description:
        "Listen to a short description of a photograph and choose the best answer.",
    },
    {
      name: "Part 2: Question-Response",
      icon: <FaComment />,
      duration: 10,
      questions: 25,
      description:
        "Listen to a question and three possible responses. Choose the most appropriate response.",
    },
    {
      name: "Part 3: Conversations",
      icon: <FaUsers />,
      duration: 15,
      questions: 39,
      description:
        "Listen to short conversations between two or more people and answer comprehension questions.",
    },
    {
      name: "Part 4: Talks",
      icon: <FaMicrophone />,
      duration: 15,
      questions: 30,
      description:
        "Listen to short monologues such as announcements or lectures and answer comprehension questions.",
    },
  ],
  features: [
    "Authentic TOEIC format and timing",
    "Detailed answer explanations",
    "Practice with real TOEIC-style questions",
    "Performance analysis with score estimation",
    "Audio with native English accents",
  ],
  requirements: [
    "Intermediate English level (B1+)",
    "Headphones for better audio clarity",
    "Quiet environment",
    "45 minutes of uninterrupted practice time",
  ],
  targetScores: [600, 700, 800, 900],
  relatedTests: [
    { id: "toeic-listening-2", title: "TOEIC Listening Practice Test 2" },
    { id: "toeic-reading-1", title: "TOEIC Reading Practice Test 1" },
    { id: "toeic-full-test", title: "TOEIC Full Practice Test" },
  ],
  sampleReviews: [
    {
      name: "Emily Nguyen",
      rating: 5,
      date: "October 2, 2023",
      comment:
        "This test was an excellent TOEIC listening practice. The questions were just like the real exam, and the explanations were clear and helpful!",
    },
    {
      name: "Hiroshi Tanaka",
      rating: 5,
      date: "September 15, 2023",
      comment:
        "A great way to prepare for the TOEIC. The conversations and talks sections were particularly well-designed, and I appreciated the performance analysis feature.",
    },
    {
      name: "Carlos Ramirez",
      rating: 4,
      date: "August 28, 2023",
      comment:
        "The practice test helped me improve my listening skills. However, I wish there were more practice sets included. Still, very useful overall!",
    },
  ],
};

const readingTest = {
  id: "toeic-reading-1",
  title: "TOEIC Reading Practice Test 1",
  description:
    "Complete TOEIC Reading test simulation with authentic exam format. This test includes three parts: Incomplete Sentences, Text Completion, and Reading Comprehension, simulating real TOEIC reading conditions.",
  coverImg: "/Test (402 x 256 px)/2.png",
  type: "TOEIC",
  views: 1320,
  ratings: 4.7,
  reviewCount: 142,
  duration: 75, // TOEIC Reading is about 75 minutes
  difficulty: "Intermediate",
  lastUpdated: "November 10, 2023",
  instructor: {
    name: "Sophia Carter",
    title: "TOEIC Instructor & English Coach",
    experience: "8+ years",
    certifications: ["TESOL", "Cambridge CELTA"],
    description:
      "Sophia Carter is an experienced TOEIC instructor with over 8 years of teaching English as a second language. She specializes in helping students improve their reading comprehension and vocabulary for TOEIC success.",
  },
  modules: [
    {
      name: "Part 5: Incomplete Sentences",
      icon: <FaEdit />,
      duration: 20,
      questions: 30,
      description:
        "Choose the best word or phrase to complete the sentence based on grammar and vocabulary.",
    },
    {
      name: "Part 6: Text Completion",
      icon: <FaFileAlt />,
      duration: 15,
      questions: 16,
      description:
        "Fill in the blanks in short passages using correct words or phrases.",
    },
    {
      name: "Part 7: Reading Comprehension",
      icon: <FaBook />,
      duration: 40,
      questions: 54,
      description:
        "Read various passages such as emails, articles, and advertisements, and answer comprehension questions.",
    },
  ],
  features: [
    "Real TOEIC-style reading passages",
    "Timed practice with exam-like format",
    "Detailed answer explanations",
    "Performance tracking and score estimation",
    "Focus on grammar, vocabulary, and comprehension",
  ],
  requirements: [
    "Intermediate English level (B1+)",
    "A quiet environment for focused reading",
    "75 minutes of uninterrupted practice time",
  ],
  targetScores: [600, 700, 800, 900],
  relatedTests: [
    { id: "toeic-reading-2", title: "TOEIC Reading Practice Test 2" },
    { id: "toeic-listening-1", title: "TOEIC Listening Practice Test 1" },
    { id: "toeic-full-test", title: "TOEIC Full Practice Test" },
  ],
  sampleReviews: [
    {
      name: "Anna Lee",
      rating: 5,
      date: "November 5, 2023",
      comment:
        "This TOEIC Reading test was really helpful. The questions were challenging and well-structured, just like the real exam!",
    },
    {
      name: "Mark Johnson",
      rating: 4,
      date: "October 22, 2023",
      comment:
        "Great practice for the TOEIC. The explanations were detailed, but I wish there were more questions in the text completion section.",
    },
    {
      name: "Chen Wei",
      rating: 5,
      date: "September 30, 2023",
      comment:
        "I liked the variety of reading passages. It really improved my comprehension speed. Highly recommended!",
    },
  ],
};
