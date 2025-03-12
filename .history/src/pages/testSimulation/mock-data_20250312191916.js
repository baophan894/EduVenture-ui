import {
  TEST_TYPES,
  LISTENING_PARTS,
  READING_PARTS,
  QUESTION_TYPES,
} from "./test-types";

// Helper function to create a range of questions
const createQuestionRange = (startId, count, createQuestion) => {
  return Array.from({ length: count }, (_, i) =>
    createQuestion(startId + i, i + 1)
  );
};

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
      questions: createQuestionRange(1, 6, (id, num) => ({
        id: `L1-${id}`,
        type: QUESTION_TYPES.SINGLE_CHOICE,
        text: `Look at the photograph marked number ${num} in your test book.`,
        imageUrl: `/placeholder.svg?height=300&width=400&text=Photograph+${num}`,
        audioUrl: `/sample-audio-L1-${num}.mp3`,
        options: [
          { id: "A", text: `Option A for photograph ${num}` },
          { id: "B", text: `Option B for photograph ${num}` },
          { id: "C", text: `Option C for photograph ${num}` },
          { id: "D", text: `Option D for photograph ${num}` },
        ],
        correctAnswer: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
      })),
    },
    {
      id: 2,
      partNumber: LISTENING_PARTS.QUESTION_RESPONSE,
      title: "Part 2: Question-Response",
      instructions:
        "Listen to the question and the three responses. Choose the response that best answers the question.",
      questions: createQuestionRange(7, 25, (id, num) => ({
        id: `L2-${id}`,
        type: QUESTION_TYPES.SINGLE_CHOICE,
        text: `Question ${num + 6}`,
        audioUrl: `/sample-audio-L2-${num}.mp3`,
        options: [
          { id: "A", text: `Response A for question ${num + 6}` },
          { id: "B", text: `Response B for question ${num + 6}` },
          { id: "C", text: `Response C for question ${num + 6}` },
        ],
        correctAnswer: ["A", "B", "C"][Math.floor(Math.random() * 3)],
      })),
    },
    {
      id: 3,
      partNumber: LISTENING_PARTS.CONVERSATIONS,
      title: "Part 3: Conversations",
      instructions:
        "Listen to the conversation and the three questions. Choose the best answer to each question.",
      // 13 dialogues with 3 questions each = 39 questions
      questions: Array.from({ length: 13 }, (_, dialogueIndex) => {
        const baseId = 32 + dialogueIndex * 3;
        const audioUrl = `/sample-audio-L3-${dialogueIndex + 1}.mp3`;

        return Array.from({ length: 3 }, (_, questionIndex) => {
          const questionId = baseId + questionIndex;
          return {
            id: `L3-${questionId}`,
            type: QUESTION_TYPES.SINGLE_CHOICE,
            text: `Question ${questionId}: ${
              [
                "Who is speaking?",
                "What are they discussing?",
                "What will they do next?",
              ][questionIndex]
            }`,
            audioUrl: audioUrl, // Same audio for all 3 questions in a dialogue
            options: [
              { id: "A", text: `Option A for question ${questionId}` },
              { id: "B", text: `Option B for question ${questionId}` },
              { id: "C", text: `Option C for question ${questionId}` },
              { id: "D", text: `Option D for question ${questionId}` },
            ],
            correctAnswer: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
            dialogueGroup: dialogueIndex + 1, // To identify questions from the same dialogue
          };
        });
      }).flat(),
    },
    {
      id: 4,
      partNumber: LISTENING_PARTS.TALKS,
      title: "Part 4: Short Talks",
      instructions:
        "Listen to the talk and the three questions. Choose the best answer to each question.",
      // 10 talks with 3 questions each = 30 questions
      questions: Array.from({ length: 10 }, (_, talkIndex) => {
        const baseId = 71 + talkIndex * 3;
        const audioUrl = `/sample-audio-L4-${talkIndex + 1}.mp3`;

        return Array.from({ length: 3 }, (_, questionIndex) => {
          const questionId = baseId + questionIndex;
          return {
            id: `L4-${questionId}`,
            type: QUESTION_TYPES.SINGLE_CHOICE,
            text: `Question ${questionId}: ${
              [
                "What is the talk about?",
                "What is mentioned in the talk?",
                "What can be inferred from the talk?",
              ][questionIndex]
            }`,
            audioUrl: audioUrl, // Same audio for all 3 questions in a talk
            options: [
              { id: "A", text: `Option A for question ${questionId}` },
              { id: "B", text: `Option B for question ${questionId}` },
              { id: "C", text: `Option C for question ${questionId}` },
              { id: "D", text: `Option D for question ${questionId}` },
            ],
            correctAnswer: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
            talkGroup: talkIndex + 1, // To identify questions from the same talk
          };
        });
      }).flat(),
    },
  ],
  // Flatten all questions for easier access
  get questions() {
    return this.parts.flatMap((part) => part.questions);
  },
};

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
      instructions:
        "Choose the word or phrase that best completes the sentence.",
      questions: createQuestionRange(101, 30, (id, num) => ({
        id: `R5-${id}`,
        type: QUESTION_TYPES.SINGLE_CHOICE,
        text: `The ${
          ["company", "department", "manager", "employee", "client"][num % 5]
        } has ________ the ${
          ["report", "proposal", "project", "meeting", "presentation"][num % 5]
        }.`,
        options: [
          {
            id: "A",
            text: [
              "completed",
              "approved",
              "scheduled",
              "reviewed",
              "postponed",
            ][num % 5],
          },
          {
            id: "B",
            text: [
              "completing",
              "approving",
              "scheduling",
              "reviewing",
              "postponing",
            ][num % 5],
          },
          {
            id: "C",
            text: [
              "completion",
              "approval",
              "schedule",
              "review",
              "postponement",
            ][num % 5],
          },
          {
            id: "D",
            text: ["complete", "approve", "schedule", "review", "postpone"][
              num % 5
            ],
          },
        ],
        correctAnswer: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
      })),
    },
    {
      id: 6,
      partNumber: READING_PARTS.TEXT_COMPLETION,
      title: "Part 6: Text Completion",
      instructions:
        "Read the text and choose the best word or phrase for each blank.",
      questions: createQuestionRange(131, 16, (id, num) => {
        const textIndex = Math.floor((num - 1) / 4);
        const blankIndex = (num - 1) % 4;

        const texts = [
          "To: All Staff\nFrom: Human Resources\nSubject: Office Relocation\n\nWe are pleased to announce that our company will be moving to a new office location next month. The new building offers more space and better facilities, (___) will improve our working environment.",
          "Dear Valued Customer,\n\nThank you for your recent purchase. We hope you are satisfied with your product. If you have any questions or concerns, please do not hesitate to contact our customer service department (___) business hours.",
          "Attention: Department Managers\n\nPlease be advised that the annual budget review meeting has been (___) from Friday, June 10 to Monday, June 13 due to scheduling conflicts.",
          "Job Posting: Marketing Specialist\n\nWe are seeking a qualified Marketing Specialist to join our team. The ideal candidate should have (___) experience in digital marketing and social media management.",
        ];

        return {
          id: `R6-${id}`,
          type: QUESTION_TYPES.SINGLE_CHOICE,
          text: `${texts[textIndex].replace(
            "(___)",
            `(${id})`
          )}\n\nQuestion ${id}: Choose the best word or phrase for blank (${id}).`,
          options: [
            {
              id: "A",
              text: ["which", "during", "rescheduled", "extensive"][blankIndex],
            },
            {
              id: "B",
              text: ["it", "while", "postponed", "extending"][blankIndex],
            },
            {
              id: "C",
              text: ["what", "for", "canceled", "extended"][blankIndex],
            },
            { id: "D", text: ["that", "at", "changed", "extend"][blankIndex] },
          ],
          correctAnswer: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
          textGroup: textIndex + 1, // To identify questions from the same text
        };
      }),
    },
    {
      id: 7,
      partNumber: READING_PARTS.SINGLE_PASSAGES,
      title: "Part 7A: Single Passages",
      instructions: "Read the passage and answer the questions that follow.",
      // 10 passages with 2-4 questions each = 29 questions
      questions: Array.from({ length: 10 }, (_, passageIndex) => {
        const questionsPerPassage = [3, 3, 3, 3, 3, 3, 2, 3, 3, 3][
          passageIndex
        ]; // Total: 29
        const baseId = 147 + passageIndex * 3;

        const passages = [
          "Email\nFrom: John Smith <j.smith@globaltech.com>\nTo: Sarah Johnson <s.johnson@globaltech.com>\nSubject: Quarterly Sales Report\nDate: March 15, 2023\n\nDear Sarah,\n\nI've attached the quarterly sales report for your review. Our team has exceeded the sales targets by 15% this quarter, primarily due to the successful launch of our new product line. The Eastern region performed particularly well, with a 20% increase compared to the same period last year.\n\nHowever, we've noticed a slight decline in the Western region. I suggest we schedule a meeting with the regional manager to discuss strategies for improvement.\n\nPlease let me know your thoughts on the report and when you would be available for a meeting.\n\nBest regards,\nJohn",
          "MEMO\nTo: All Employees\nFrom: Office Management\nRe: Parking Garage Maintenance\nDate: April 5, 2023\n\nPlease be advised that the company parking garage will be undergoing maintenance from April 10-14. During this time, levels B1 and B2 will be closed. Employees who normally park on these levels are encouraged to use public transportation or carpool if possible.\n\nAlternatively, we have arranged for temporary parking at the Wilson Street Garage, located two blocks north of our building. Please show your company ID to the attendant for free access.\n\nWe apologize for any inconvenience this may cause and appreciate your cooperation.",
          "JOB POSTING\nPosition: Senior Software Developer\nDepartment: IT\nLocation: Boston, MA (Hybrid)\n\nResponsibilities:\n- Design and develop high-quality software solutions\n- Collaborate with cross-functional teams\n- Mentor junior developers\n- Participate in code reviews and testing\n\nRequirements:\n- Bachelor's degree in Computer Science or related field\n- 5+ years of experience in software development\n- Proficiency in Java, Python, and SQL\n- Experience with Agile development methodologies\n\nTo apply, please submit your resume to careers@company.com by April 30, 2023.",
        ];

        return Array.from(
          { length: questionsPerPassage },
          (_, questionIndex) => {
            const questionId = baseId + questionIndex;
            return {
              id: `R7A-${questionId}`,
              type: QUESTION_TYPES.SINGLE_CHOICE,
              text: `${passages[passageIndex % 3]}\n\nQuestion ${questionId}: ${
                [
                  "What is the main purpose of this document?",
                  "What information is provided in the document?",
                  "What action is required based on the document?",
                  "What can be inferred from the document?",
                ][questionIndex % 4]
              }`,
              options: [
                { id: "A", text: `Option A for question ${questionId}` },
                { id: "B", text: `Option B for question ${questionId}` },
                { id: "C", text: `Option C for question ${questionId}` },
                { id: "D", text: `Option D for question ${questionId}` },
              ],
              correctAnswer: ["A", "B", "C", "D"][
                Math.floor(Math.random() * 4)
              ],
              passageGroup: `single-${passageIndex + 1}`, // To identify questions from the same passage
            };
          }
        );
      }).flat(),
    },
    {
      id: 8,
      partNumber: READING_PARTS.GROUPED_PASSAGES,
      title: "Part 7B: Grouped Passages",
      instructions: "Read the passages and answer the questions that follow.",
      // 5 groups of passages with 5 questions each = 25 questions
      questions: Array.from({ length: 5 }, (_, groupIndex) => {
        const baseId = 176 + groupIndex * 5;

        const groupedPassages = [
          "PASSAGE 1:\nCompany A Annual Report (Excerpt)\nFiscal Year 2022\n\nCompany A experienced significant growth in the 2022 fiscal year, with revenue increasing by 18% compared to the previous year. This growth was primarily driven by our expansion into international markets, particularly in Asia and Europe. Our new product line, launched in Q2, exceeded sales expectations by 25%.\n\nPASSAGE 2:\nIndustry Analysis Report (Excerpt)\nTech Sector Overview 2022\n\nThe technology sector saw an average growth rate of 12% in 2022, with companies focusing on international expansion showing the strongest performance. Companies with diversified product offerings generally outperformed those with specialized products. Market analysts predict continued growth in 2023, though at a more moderate pace of 8-10%.",
          "PASSAGE 1:\nEmail from HR Director\nTo: Department Managers\nSubject: New Training Program\nDate: May 10, 2023\n\nI'm pleased to announce the launch of our new leadership development program starting next month. This program is designed for mid-level managers and will consist of monthly workshops and one-on-one coaching sessions. Please nominate team members who would benefit from this opportunity by May 20.\n\nPASSAGE 2:\nEmail from CEO\nTo: All Staff\nSubject: Company Growth Initiatives\nDate: May 12, 2023\n\nAs we enter the second half of the fiscal year, I want to share our strategic priorities. Employee development remains a key focus, and we've increased the training budget by 30%. The new leadership program is just one example of our commitment to building a strong internal talent pipeline. I encourage everyone to take advantage of the professional development opportunities available.",
        ];

        return Array.from({ length: 5 }, (_, questionIndex) => {
          const questionId = baseId + questionIndex;
          return {
            id: `R7B-${questionId}`,
            type: QUESTION_TYPES.SINGLE_CHOICE,
            text: `${
              groupedPassages[groupIndex % 2]
            }\n\nQuestion ${questionId}: ${
              [
                "According to both passages, what is emphasized?",
                "How do the passages differ in their perspective?",
                "What can be inferred from the first passage?",
                "What is suggested in the second passage?",
                "Based on both passages, what is likely to happen?",
              ][questionIndex]
            }`,
            options: [
              { id: "A", text: `Option A for question ${questionId}` },
              { id: "B", text: `Option B for question ${questionId}` },
              { id: "C", text: `Option C for question ${questionId}` },
              { id: "D", text: `Option D for question ${questionId}` },
            ],
            correctAnswer: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
            passageGroup: `grouped-${groupIndex + 1}`, // To identify questions from the same group of passages
          };
        });
      }).flat(),
    },
  ],
  // Flatten all questions for easier access
  get questions() {
    return this.parts.flatMap((part) => part.questions);
  },
};
