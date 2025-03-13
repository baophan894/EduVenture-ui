import { useState } from "react";
import { FaCamera, FaComment, FaMicrophone, FaUsers } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import InstructorTab from "./components/instructor-tab";
import ModulesTab from "./components/modules-tab";
import OverviewTab from "./components/overview-tab";
import ReviewsTab from "./components/reviews-tab";
import Sidebar from "./components/sidebar";
import TabNavigation from "./components/tab-navigation";
import TestBanner from "./components/test-banner";
import TestSimulationScreen from "../testSimulation/test-simulation-screen";

const TestDetailPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isTesting, setIsTesting] = useState(false);
  return !isTesting ? (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Test Banner */}
      <TestBanner test={test} />
  
      {/* Tabs Navigation */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
  
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2">
            {activeTab === "overview" && <OverviewTab test={test} />}
            {activeTab === "modules" && <ModulesTab test={test} />}
            {activeTab === "instructor" && <InstructorTab test={test} />}
            {activeTab === "reviews" && <ReviewsTab test={test} />}
          </div>
  
          {/* Right Column - Sidebar */}
          <div className="md:col-span-1">
            <Sidebar test={test} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <TestSimulationScreen />
  );
  

export default TestDetailPage;

// Mock TOEIC test data
const test = {
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
