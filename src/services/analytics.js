import ReactGA from "react-ga4";

// Initialize Google Analytics with your measurement ID
const MEASUREMENT_ID = "G-XJ31C68KYK";

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

// Track page views
export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// Track custom events
export const trackEvent = (category, action, label = null, value = null) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

// Track user engagement
export const trackUserEngagement = (engagementTimeMs) => {
  ReactGA.event({
    category: "engagement",
    action: "user_engagement",
    value: engagementTimeMs,
  });
};

// Track course interactions
export const trackCourseView = (courseId, courseName) => {
  trackEvent("course", "view", courseName, courseId);
};

export const trackCoursePurchase = (courseId, courseName, price) => {
  trackEvent("course", "purchase", courseName, price);
};

// Track test interactions
export const trackTestStart = (testId, testName) => {
  trackEvent("test", "start", testName, testId);
};

export const trackTestComplete = (testId, testName, score) => {
  trackEvent("test", "complete", testName, score);
};

// Track document interactions
export const trackDocumentView = (documentId, documentName) => {
  trackEvent("document", "view", documentName, documentId);
};

// Track flashcard interactions
export const trackFlashcardView = (flashcardId, flashcardName) => {
  trackEvent("flashcard", "view", flashcardName, flashcardId);
};

// Track user registration and login
export const trackUserRegistration = (method = "email") => {
  trackEvent("user", "registration", method);
};

export const trackUserLogin = (method = "email") => {
  trackEvent("user", "login", method);
};

// Track search interactions
export const trackSearch = (searchTerm, resultsCount) => {
  trackEvent("search", "search", searchTerm, resultsCount);
};

// Track chatbot interactions
export const trackChatbotMessage = (messageType) => {
  trackEvent("chatbot", "message", messageType);
};

export default {
  initGA,
  trackPageView,
  trackEvent,
  trackUserEngagement,
  trackCourseView,
  trackCoursePurchase,
  trackTestStart,
  trackTestComplete,
  trackDocumentView,
  trackFlashcardView,
  trackUserRegistration,
  trackUserLogin,
  trackSearch,
  trackChatbotMessage,
};
