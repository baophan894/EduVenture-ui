// Simplified mock data for tests

import { QUESTION_TYPES } from "./test-types";

export const sampleListeningTest = {
  id: "toeic-listening-1",
  title: "TOEIC Listening Practice Test",
  duration: 45 * 60, // 45 minutes in seconds
  instructions:
    "This is the Listening section of the TOEIC test. Listen to the audio and answer the questions.",
  questions: [
    {
      id: "L1-1",
      text: "What is the woman's name?",
      audioUrl: "/sample-audio-L1-1.mp3",
      options: [
        { id: "A", text: "Sarah Johnson" },
        { id: "B", text: "Sarah Thompson" },
        { id: "C", text: "Sarah Jackson" },
        { id: "D", text: "Sarah Williams" },
      ],
      correctAnswer: "B",
    },
    {
      id: "L1-2",
      text: "What is the purpose of the woman's call?",
      audioUrl: "/sample-audio-L1-2.mp3",
      options: [
        { id: "A", text: "To book a hotel room" },
        { id: "B", text: "To inquire about job opportunities" },
        { id: "C", text: "To make a restaurant reservation" },
        { id: "D", text: "To register for a course" },
      ],
      correctAnswer: "D",
    },
    {
      id: "L1-3",
      text: "When does the course begin?",
      audioUrl: "/sample-audio-L1-3.mp3",
      options: [
        { id: "A", text: "September 10" },
        { id: "B", text: "September 15" },
        { id: "C", text: "September 20" },
        { id: "D", text: "September 25" },
      ],
      correctAnswer: "B",
    },
    {
      id: "L1-4",
      text: "Which image shows the correct location of the campus?",
      audioUrl: "/sample-audio-L1-4.mp3",
      imageUrl: "/placeholder.svg?height=300&width=500",
      options: [
        { id: "A", text: "North entrance" },
        { id: "B", text: "South entrance" },
        { id: "C", text: "East entrance" },
        { id: "D", text: "West entrance" },
      ],
      correctAnswer: "C",
    },
    {
      id: "L1-5",
      text: "How much is the registration fee?",
      audioUrl: "/sample-audio-L1-5.mp3",
      options: [
        { id: "A", text: "$200" },
        { id: "B", text: "$250" },
        { id: "C", text: "$300" },
        { id: "D", text: "$350" },
      ],
      correctAnswer: "B",
    },
  ],
};

export const sampleReadingTest = {
  id: "toeic-reading-1",
  title: "TOEIC Reading Practice Test",
  duration: 75 * 60, // 75 minutes in seconds
  instructions:
    "This is the Reading section of the TOEIC test. Read each question carefully and choose the best answer.",
  questions: [
    {
      id: "R1-1",
      type: QUESTION_TYPES.SINGLE_CHOICE,
      title: "Sentence Completion",
      text: "The company has ________ the report.",
      options: [
        { id: "A", text: "completed" },
        { id: "B", text: "completing" },
        { id: "C", text: "completion" },
        { id: "D", text: "complete" },
      ],
      correctAnswer: "A",
      readingPassage: null,
    },
    {
      id: "R1-2",
      type: QUESTION_TYPES.SINGLE_CHOICE,
      title: "Multiple Question",
      text: "The department manager will ________ the meeting next week.",
      options: [
        { id: "A", text: "attend" },
        { id: "B", text: "attending" },
        { id: "C", text: "attendance" },
        { id: "D", text: "attendee" },
      ],
      correctAnswer: "A",
      readingPassage: null,
    },
    {
      id: "R1-3",
      type: QUESTION_TYPES.SINGLE_CHOICE,
      title: "Multiple Question",
      text: "Please be advised that the annual budget review meeting has been ________ from Friday to Monday.",
      options: [
        { id: "A", text: "rescheduled" },
        { id: "B", text: "postponed" },
        { id: "C", text: "canceled" },
        { id: "D", text: "changed" },
      ],
      correctAnswer: "A",
      readingPassage: null,
    },
    {
      id: "R1-4",
      type: QUESTION_TYPES.SINGLE_CHOICE,
      title: "Multiple Question",
      text: "The ideal candidate should have ________ experience in digital marketing.",
      options: [
        { id: "A", text: "extensive" },
        { id: "B", text: "extending" },
        { id: "C", text: "extended" },
        { id: "D", text: "extend" },
      ],
      correctAnswer: "A",
      readingPassage: null,
    },
    {
      id: "R1-5",
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
  ],
};
