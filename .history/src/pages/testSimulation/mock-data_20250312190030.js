import { TEST_TYPES, LISTENING_PARTS, READING_PARTS, QUESTION_TYPES } from "./test-types"

export const sampleListeningTest = {
  id: "toeic-listening-1",
  type: TEST_TYPES.LISTENING,
  title: "TOEIC Listening Practice Test",
  duration: 45 * 60, // 45 minutes in seconds
  instructions:
    "This is the Listening section of the TOEIC test. It consists of four parts with different types of questions. You will hear each recording only once and answer questions based on what you hear.",
  parts: [
    {
      id: 1,
      partNumber: LISTENING_PARTS.PHOTOGRAPHS,
      title: "Part 1: Photographs",
      instructions:
        "Look at the photograph and listen to the four statements. Choose the statement that best describes the photograph.",
      questions: [
        {
          id: "L1-1",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: "Look at the photograph marked number 1 in your test book.",
          imageUrl: "/placeholder.svg?height=300&width=400&text=Office+Meeting",
          audioUrl: "/sample-audio-L1-1.mp3",
          options: [
            { id: "A", text: "The people are sitting at a table." },
            { id: "B", text: "The people are standing near a window." },
            { id: "C", text: "The people are looking at a computer." },
            { id: "D", text: "The people are leaving the room." },
          ],
          correctAnswer: "C",
        },
        {
          id: "L1-2",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: "Look at the photograph marked number 2 in your test book.",
          imageUrl: "/placeholder.svg?height=300&width=400&text=Construction+Site",
          audioUrl: "/sample-audio-L1-2.mp3",
          options: [
            { id: "A", text: "The workers are operating machinery." },
            { id: "B", text: "The workers are having lunch." },
            { id: "C", text: "The workers are reading blueprints." },
            { id: "D", text: "The workers are wearing safety equipment." },
          ],
          correctAnswer: "D",
        },
        {
          id: "L1-3",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: "Look at the photograph marked number 3 in your test book.",
          imageUrl: "/placeholder.svg?height=300&width=400&text=Airport+Terminal",
          audioUrl: "/sample-audio-L1-3.mp3",
          options: [
            { id: "A", text: "People are boarding an airplane." },
            { id: "B", text: "People are waiting in a line." },
            { id: "C", text: "People are checking in at the counter." },
            { id: "D", text: "People are collecting their luggage." },
          ],
          correctAnswer: "B",
        },
      ],
    },
    {
      id: 2,
      partNumber: LISTENING_PARTS.QUESTION_RESPONSE,
      title: "Part 2: Question-Response",
      instructions:
        "Listen to the question and the three responses. Choose the response that best answers the question.",
      questions: [
        {
          id: "L2-1",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: "Question 4",
          audioUrl: "/sample-audio-L2-1.mp3",
          options: [
            { id: "A", text: "At 3 o'clock." },
            { id: "B", text: "About two hours ago." },
            { id: "C", text: "Yes, I'll meet you there." },
          ],
          correctAnswer: "A",
        },
        {
          id: "L2-2",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: "Question 5",
          audioUrl: "/sample-audio-L2-2.mp3",
          options: [
            { id: "A", text: "I prefer the blue one." },
            { id: "B", text: "It's on the second floor." },
            { id: "C", text: "No, I haven't seen it." },
          ],
          correctAnswer: "C",
        },
        {
          id: "L2-3",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: "Question 6",
          audioUrl: "/sample-audio-L2-3.mp3",
          options: [
            { id: "A", text: "I'll take the train." },
            { id: "B", text: "Yes, it arrived on time." },
            { id: "C", text: "No, I don't have the schedule." },
          ],
          correctAnswer: "A",
        },
      ],
    },
    {
      id: 3,
      partNumber: LISTENING_PARTS.CONVERSATIONS,
      title: "Part 3: Conversations",
      instructions: "Listen to the conversation and the three questions. Choose the best answer to each question.",
      questions: [
        {
          id: "L3-1",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: "Question 7: What are the speakers discussing?",
          audioUrl: "/sample-audio-L3-1.mp3",
          options: [
            { id: "A", text: "A new product launch" },
            { id: "B", text: "A marketing strategy" },
            { id: "C", text: "A budget proposal" },
            { id: "D", text: "A client meeting" },
          ],
          correctAnswer: "B",
        },
        {
          id: "L3-2",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: "Question 8: What does the woman suggest?",
          audioUrl: "/sample-audio-L3-1.mp3", // Same audio as previous question (conversation)
          options: [
            { id: "A", text: "Hiring more staff" },
            { id: "B", text: "Increasing the budget" },
            { id: "C", text: "Using social media" },
            { id: "D", text: "Postponing the campaign" },
          ],
          correctAnswer: "C",
        },
        {
          id: "L3-3",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: "Question 9: What will the speakers do next?",
          audioUrl: "/sample-audio-L3-1.mp3", // Same audio as previous questions (conversation)
          options: [
            { id: "A", text: "Meet with the CEO" },
            { id: "B", text: "Prepare a presentation" },
            { id: "C", text: "Contact a client" },
            { id: "D", text: "Review the budget" },
          ],
          correctAnswer: "B",
        },
      ],
    },
    {
      id: 4,
      partNumber: LISTENING_PARTS.TALKS,
      title: "Part 4: Talks",
      instructions: "Listen to the talk and the three questions. Choose the best answer to each question.",
      questions: [
        {
          id: "L4-1",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: "Question 10: What is the announcement about?",
          audioUrl: "/sample-audio-L4-1.mp3",
          options: [
            { id: "A", text: "A delayed flight" },
            { id: "B", text: "A gate change" },
            { id: "C", text: "A security procedure" },
            { id: "D", text: "A boarding announcement" },
          ],
          correctAnswer: "B",
        },
        {
          id: "L4-2",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: "Question 11: What are passengers asked to do?",
          audioUrl: "/sample-audio-L4-1.mp3", // Same audio as previous question (talk)
          options: [
            { id: "A", text: "Show their boarding passes" },
            { id: "B", text: "Proceed to a different gate" },
            { id: "C", text: "Wait for further instructions" },
            { id: "D", text: "Check with airline staff" },
          ],
          correctAnswer: "B",
        },
        {
          id: "L4-3",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: "Question 12: When will boarding begin?",
          audioUrl: "/sample-audio-L4-1.mp3", // Same audio as previous questions (talk)
          options: [
            { id: "A", text: "In 10 minutes" },
            { id: "B", text: "In 20 minutes" },
            { id: "C", text: "In 30 minutes" },
            { id: "D", text: "Immediately" },
          ],
          correctAnswer: "C",
        },
      ],
    },
  ],
  // Flatten all questions for easier access
  get questions() {
    return this.parts.flatMap((part) => part.questions)
  },
}

export const sampleReadingTest = {
  id: "toeic-reading-1",
  type: TEST_TYPES.READING,
  title: "TOEIC Reading Practice Test",
  duration: 75 * 60, // 75 minutes in seconds
  instructions:
    "This is the Reading section of the TOEIC test. It consists of three parts with different types of questions. Read each question carefully and choose the best answer.",
  parts: [
    {
      id: 5,
      partNumber: READING_PARTS.INCOMPLETE_SENTENCES,
      title: "Part 5: Incomplete Sentences",
      instructions: "Choose the word or phrase that best completes the sentence.",
      questions: [
        {
          id: "R5-1",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: "The marketing department has ________ a new strategy to increase sales in the upcoming quarter.",
          options: [
            { id: "A", text: "developed" },
            { id: "B", text: "developing" },
            { id: "C", text: "development" },
            { id: "D", text: "develop" },
          ],
          correctAnswer: "A",
        },
        {
          id: "R5-2",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: "All employees must submit their expense reports ________ the end of each month.",
          options: [
            { id: "A", text: "until" },
            { id: "B", text: "by" },
            { id: "C", text: "for" },
            { id: "D", text: "since" },
          ],
          correctAnswer: "B",
        },
        {
          id: "R5-3",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: "The conference room is ________ for the client meeting tomorrow morning.",
          options: [
            { id: "A", text: "reserve" },
            { id: "B", text: "reserving" },
            { id: "C", text: "reserved" },
            { id: "D", text: "reservation" },
          ],
          correctAnswer: "C",
        },
      ],
    },
    {
      id: 6,
      partNumber: READING_PARTS.TEXT_COMPLETION,
      title: "Part 6: Text Completion",
      instructions: "Read the text and choose the best word or phrase for each blank.",
      questions: [
        {
          id: "R6-1",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: `To: All Staff
From: Human Resources
Subject: Office Relocation

We are pleased to announce that our company will be moving to a new office location next month. The new building offers more space and better facilities, (13) ________ will improve our working environment.`,
          options: [
            { id: "A", text: "which" },
            { id: "B", text: "it" },
            { id: "C", text: "what" },
            { id: "D", text: "that" },
          ],
          correctAnswer: "A",
        },
        {
          id: "R6-2",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: `The relocation is scheduled for the weekend of May 15-16, and we expect to be fully operational in the new location (14) ________ Monday, May 17.`,
          options: [
            { id: "A", text: "until" },
            { id: "B", text: "by" },
            { id: "C", text: "from" },
            { id: "D", text: "during" },
          ],
          correctAnswer: "B",
        },
        {
          id: "R6-3",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: `(15) ________ the move, please ensure that all personal belongings are packed and labeled by Friday, May 14.`,
          options: [
            { id: "A", text: "In order to" },
            { id: "B", text: "In case of" },
            { id: "C", text: "In spite of" },
            { id: "D", text: "In preparation for" },
          ],
          correctAnswer: "D",
        },
      ],
    },
    {
      id: 7,
      partNumber: READING_PARTS.READING_COMPREHENSION,
      title: "Part 7: Reading Comprehension",
      instructions: "Read the passage and answer the questions that follow.",
      questions: [
        {
          id: "R7-1",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: `Email
From: John Smith <j.smith@globaltech.com>
To: Sarah Johnson <s.johnson@globaltech.com>
Subject: Quarterly Sales Report
Date: March 15, 2023

Dear Sarah,

I've attached the quarterly sales report for your review. Our team has exceeded the sales targets by 15% this quarter, primarily due to the successful launch of our new product line. The Eastern region performed particularly well, with a 20% increase compared to the same period last year.

However, we've noticed a slight decline in the Western region. I suggest we schedule a meeting with the regional manager to discuss strategies for improvement.

Please let me know your thoughts on the report and when you would be available for a meeting.

Best regards,
John

Question 16: What is the main purpose of this email?`,
          options: [
            { id: "A", text: "To request a meeting" },
            { id: "B", text: "To share sales results" },
            { id: "C", text: "To introduce a new product" },
            { id: "D", text: "To discuss regional issues" },
          ],
          correctAnswer: "B",
        },
        {
          id: "R7-2",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: "Question 17: According to the email, which region showed the best performance?",
          options: [
            { id: "A", text: "Northern" },
            { id: "B", text: "Southern" },
            { id: "C", text: "Eastern" },
            { id: "D", text: "Western" },
          ],
          correctAnswer: "C",
        },
        {
          id: "R7-3",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: "Question 18: What does John suggest doing about the Western region?",
          options: [
            { id: "A", text: "Launching new products" },
            { id: "B", text: "Increasing the sales target" },
            { id: "C", text: "Meeting with the regional manager" },
            { id: "D", text: "Comparing with last year's data" },
          ],
          correctAnswer: "C",
        },
      ],
    },
  ],
  // Flatten all questions for easier access
  get questions() {
    return this.parts.flatMap((part) => part.questions)
  },
}

