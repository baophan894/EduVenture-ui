import { FaHeadphones, FaBookOpen, FaPen, FaMicrophone } from "react-icons/fa";

// Mock IELTS test data
export const ieltsTestData = {
  id: "ielts-academic-1",
  title: "IELTS Academic Test Simulation",
  description:
    "Complete IELTS Academic test simulation with all four modules: Listening, Reading, Writing, and Speaking. This simulation follows the exact format and timing of the official IELTS Academic test.",
  bannerUrl: "/placeholder.svg",
  views: 1245,
  ratings: 4.8,
  reviewCount: 156,
  duration: 170, // in minutes
  testLevel: "IELTS 6.5-7.0",
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
  sampleReviews: [
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
  ],
};
