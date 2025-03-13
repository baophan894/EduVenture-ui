// Simplified mock data for tests

import { QUESTION_TYPES, TEST_TYPES } from "./test-types";

export const sampleListeningTest = {
  id: "toeic-listening-1",
  type: TEST_TYPES.LISTENING,
  title: "TOEIC Listening Practice Test",
  duration: 1 * 60, // 45 minutes in seconds
  instructions:
    "This is the Listening section of the TOEIC test. Listen to the audio and answer the questions.",
  questions: [
    {
      id: "L1-1",
      type: QUESTION_TYPES.SINGLE_CHOICE,
      audioUrl: "/TestSimulation/listening/zenlish-1.mp3",
      options: [
        { id: "A", text: "" },
        { id: "B", text: "" },
        { id: "C", text: "" },
        { id: "D", text: "" },
      ],
      correctAnswer: "B",
      imageUrl: "/TestSimulation/listening/zenlish-1-3.png",
    },
    {
      id: "L1-2",
      type: QUESTION_TYPES.SINGLE_CHOICE,

      title: "Purpose of a Call",
      text: "What is the purpose of the woman's call?",
      audioUrl: "/TestSimulation/listening/zenlish-2.mp3",
      options: [
        { id: "A", text: "" },
        { id: "B", text: "" },
        { id: "C", text: "" },
        { id: "D", text: "" },
      ],
      correctAnswer: "B",
      imageUrl: "/TestSimulation/listening/zenlish-2-2.png",
    },
    {
      id: "L1-3",
      title: "Understanding a Schedule",
      type: QUESTION_TYPES.SINGLE_CHOICE,

      text: "When does the course begin?",
      audioUrl: "/TestSimulation/listening/zenlish-3.mp3",
      options: [
        { id: "A", text: "" },
        { id: "B", text: "" },
        { id: "C", text: "" },
        { id: "D", text: "" },
      ],
      correctAnswer: "B",
      imageUrl: "/TestSimulation/listening/zenlish-3-2.png",
    },
    {
      id: "L1-4",
      title: "Identifying a Location",
      type: QUESTION_TYPES.SINGLE_CHOICE,

      text: "Which image shows the correct location of the campus?",
      audioUrl: "/TestSimulation/listening/zenlish-4.mp3",
      options: [
        { id: "A", text: "" },
        { id: "B", text: "" },
        { id: "C", text: "" },
        { id: "D", text: "" },
      ],
      correctAnswer: "B",
      imageUrl: "/TestSimulation/listening/zenlish-4-2.png",
    },
    {
      id: "L1-5",
      title: "Understanding a Price",
      type: QUESTION_TYPES.SINGLE_CHOICE,

      text: "How much is the registration fee?",
      audioUrl: "/TestSimulation/listening/zenlish-5.mp3",
      options: [
        { id: "A", text: "" },
        { id: "B", text: "" },
        { id: "C", text: "" },
        { id: "D", text: "" },
      ],
      correctAnswer: "B",
      imageUrl: "/TestSimulation/listening/zenlish-5-2.png",
    },
  ],
};

export const sampleReadingTest = {
  id: "toeic-reading-1",
  type: TEST_TYPES.READING,

  title: "TOEIC Reading Practice Test",
  duration: 1 * 60, // 75 minutes in seconds
  instructions:
    "This is the Reading section of the TOEIC test. Read each question carefully and choose the best answer.",
  questions: [
    {
      id: "R1-1",
      type: QUESTION_TYPES.SINGLE_CHOICE,
      title: "Reading Comprehension",
      text: "According to the email, what is the main purpose of the new office location?",
      options: [
        { id: "A", text: "To reduce costs" },
        { id: "B", text: "To improve the working environment" },
        { id: "C", text: "To be closer to clients" },
        { id: "D", text: "To accommodate new employees" },
      ],
      correctAnswer: "B",
      readingPassage: `To: All Staff
From: Human Resources
Subject: Office Relocation

We are pleased to announce that our company will be moving to a new office location next month. The new building offers more space and better facilities, which will improve our working environment.`,
    },
    {
      id: "R1-2",
      type: QUESTION_TYPES.SINGLE_CHOICE,
      title: "131.",
      imageUrl: "/TestSimulation/reading/reading-example.png",
      options: [
        { id: "A", text: "emplyment" },
        { id: "B", text: "construction" },
        { id: "C", text: "referral" },
        { id: "D", text: "security" },
      ],
      correctAnswer: "A",
      readingPassage: null,
    },
    {
      id: "R1-3",
      type: QUESTION_TYPES.SINGLE_CHOICE,
      title: "132.",
      imageUrl: "/TestSimulation/reading/reading-example.png",
      options: [
        { id: "A", text: "has been applying" },
        { id: "B", text: "applied" },
        { id: "C", text: "will be applied" },
        { id: "D", text: "had applied" },
      ],
      correctAnswer: "A",
      readingPassage: null,
    },
    {
      id: "R1-4",
      type: QUESTION_TYPES.SINGLE_CHOICE,
      title: "133.",
      imageUrl: "/TestSimulation/reading/reading-example.png",
      options: [
        { id: "A", text: "Then you can received the keys to your apartment" },
        { id: "B", text: "Tenants must pay on the first of every month" },
        { id: "C", text: "However, a copy of the lease will be provided" },
        { id: "D", text: "So introduce us to as many people as you want" },
      ],
      correctAnswer: "A",
      readingPassage: null,
    },
    {
      id: "R1-5",
      type: QUESTION_TYPES.SINGLE_CHOICE,
      title: "134.",
      imageUrl: "/TestSimulation/reading/reading-example.png",
      options: [
        { id: "A", text: "universal" },
        { id: "B", text: "optional" },
        { id: "C", text: "competitive" },
        { id: "D", text: "imperative" },
      ],
      correctAnswer: "C",
      readingPassage: null,
    },
  ],
};
