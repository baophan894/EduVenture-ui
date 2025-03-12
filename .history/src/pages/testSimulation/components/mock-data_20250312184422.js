import { TEST_TYPES, QUESTION_TYPES } from "./test-types"

export const sampleListeningTest = {
  id: "ielts-listening-1",
  type: TEST_TYPES.LISTENING,
  title: "IELTS Listening Test - Section 1",
  duration: 30 * 60, // 30 minutes in seconds
  audioUrl: "/sample-audio.mp3",
  questions: [
    {
      id: 1,
      type: QUESTION_TYPES.SINGLE_CHOICE,
      text: "What is the woman's name?",
      imageUrl: null,
      options: [
        { id: "A", text: "Sarah Johnson" },
        { id: "B", text: "Sarah Thompson" },
        { id: "C", text: "Sarah Jackson" },
        { id: "D", text: "Sarah Williams" },
      ],
      correctAnswer: "B",
    },
    {
      id: 2,
      type: QUESTION_TYPES.SINGLE_CHOICE,
      text: "What is the purpose of the woman's call?",
      imageUrl: null,
      options: [
        { id: "A", text: "To book a hotel room" },
        { id: "B", text: "To inquire about job opportunities" },
        { id: "C", text: "To make a restaurant reservation" },
        { id: "D", text: "To register for a course" },
      ],
      correctAnswer: "D",
    },
    {
      id: 3,
      type: QUESTION_TYPES.FILL_IN_BLANK,
      text: "The course begins on ________.",
      imageUrl: null,
      correctAnswer: "September 15",
    },
    {
      id: 4,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      text: "Which facilities will the student have access to? Select ALL that apply.",
      imageUrl: "/placeholder.svg?height=300&width=500",
      options: [
        { id: "A", text: "Library" },
        { id: "B", text: "Computer lab" },
        { id: "C", text: "Cafeteria" },
        { id: "D", text: "Gym" },
      ],
      correctAnswer: ["A", "B", "C"],
    },
    {
      id: 5,
      type: QUESTION_TYPES.FILL_IN_BLANK,
      text: "The registration fee is $________.",
      imageUrl: null,
      correctAnswer: "250",
    },
  ],
}

export const sampleReadingTest = {
  id: "ielts-reading-1",
  type: TEST_TYPES.READING,
  title: "IELTS Reading Test - Passage 1",
  duration: 20 * 60, // 20 minutes in seconds
  passage: `
    The polar bear (Ursus maritimus) is a hypercarnivorous bear whose native range lies largely within the Arctic Circle, encompassing the Arctic Ocean, its surrounding seas and surrounding land masses. It is the largest extant bear species, as well as the largest extant land carnivore. A boar (adult male) weighs around 350–700 kg (770–1,540 lb), while a sow (adult female) is about half that size. Although it is the sister species of the brown bear, it has evolved to occupy a narrower ecological niche, with many body characteristics adapted for cold temperatures, for moving across snow, ice and open water, and for hunting seals, which make up most of its diet. Although most polar bears are born on land, they spend most of their time on the sea ice. Their scientific name means "maritime bear" and derives from this fact. Polar bears hunt their preferred food of seals from the edge of sea ice, often living off fat reserves when no sea ice is present. Because of their dependence on the sea ice, polar bears are classified as marine mammals.
    
    Because of expected habitat loss caused by climate change, the polar bear is classified as a vulnerable species. For decades, large-scale hunting raised international concern for the future of the species, but populations rebounded after controls and quotas began to take effect. For thousands of years, the polar bear has been a key figure in the material, spiritual, and cultural life of circumpolar peoples, and polar bears remain important in their cultures. Historically, the polar bear has also been known as the "white bear".
  `,
  questions: [
    {
      id: 1,
      type: QUESTION_TYPES.SINGLE_CHOICE,
      text: "What is the scientific name of the polar bear?",
      imageUrl: null,
      options: [
        { id: "A", text: "Ursus arctos" },
        { id: "B", text: "Ursus maritimus" },
        { id: "C", text: "Ursus americanus" },
        { id: "D", text: "Ursus polaris" },
      ],
      correctAnswer: "B",
    },
    {
      id: 2,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      text: "Which of the following characteristics apply to polar bears? Select ALL that apply.",
      imageUrl: null,
      options: [
        { id: "A", text: "They are the largest land carnivore" },
        { id: "B", text: "They primarily eat vegetation" },
        { id: "C", text: "They are classified as marine mammals" },
        { id: "D", text: "They are smaller than brown bears" },
      ],
      correctAnswer: ["A", "C"],
    },
    {
      id: 3,
      type: QUESTION_TYPES.FILL_IN_BLANK,
      text: "Polar bears are classified as ________ species due to habitat loss from climate change.",
      imageUrl: null,
      correctAnswer: "vulnerable",
    },
    {
      id: 4,
      type: QUESTION_TYPES.SINGLE_CHOICE,
      text: "According to the passage, what do polar bears primarily hunt?",
      imageUrl: null,
      options: [
        { id: "A", text: "Fish" },
        { id: "B", text: "Seals" },
        { id: "C", text: "Arctic foxes" },
        { id: "D", text: "Penguins" },
      ],
      correctAnswer: "B",
    },
    {
      id: 5,
      type: QUESTION_TYPES.FILL_IN_BLANK,
      text: 'Historically, the polar bear has also been known as the "________ bear".',
      imageUrl: null,
      correctAnswer: "white",
    },
  ],
}

