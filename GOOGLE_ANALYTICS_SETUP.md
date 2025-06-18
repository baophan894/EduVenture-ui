# Google Analytics Implementation Guide

## Overview

Google Analytics has been implemented in the EduVenture application using the measurement ID `G-XJ31C68KYK`. The implementation includes both automatic page tracking and custom event tracking for user interactions.

## Files Created/Modified

### 1. `src/services/analytics.js`

This is the main analytics service that provides tracking functions for various user interactions:

- **Page Views**: Automatic tracking of route changes
- **User Authentication**: Login attempts, success, and failures
- **Course Interactions**: Course views and purchases
- **Test Interactions**: Test starts and completions
- **Document & Flashcard Views**: Content engagement tracking
- **Search Interactions**: Search queries and results
- **Chatbot Interactions**: Message tracking

### 2. `src/hook/useAnalytics.js`

A custom React hook that:

- Initializes Google Analytics on app startup
- Automatically tracks page views on route changes
- Provides tracking functions to components

### 3. `src/App.jsx`

Updated to initialize Google Analytics using the `useAnalytics` hook.

### 4. `index.html`

Added Google Analytics gtag script for enhanced tracking capabilities.

## Usage Examples

### Basic Event Tracking

```javascript
import { trackEvent } from "../services/analytics";

// Track a custom event
trackEvent("category", "action", "label", value);
```

### User Authentication Tracking

```javascript
import { trackUserLogin, trackUserRegistration } from "../services/analytics";

// Track login attempts
trackUserLogin("email"); // or 'google'
trackUserLogin("email_success"); // successful login
trackUserLogin("email_failed"); // failed login

// Track registration
trackUserRegistration("email"); // or 'google'
```

### Course Interaction Tracking

```javascript
import { trackCourseView, trackCoursePurchase } from "../services/analytics";

// Track course views
trackCourseView("course_123", "English Grammar Basics");

// Track course purchases
trackCoursePurchase("course_123", "English Grammar Basics", 29.99);
```

### Test Interaction Tracking

```javascript
import { trackTestStart, trackTestComplete } from "../services/analytics";

// Track test starts
trackTestStart("test_456", "TOEFL Practice Test");

// Track test completions with scores
trackTestComplete("test_456", "TOEFL Practice Test", 85);
```

### Content Interaction Tracking

```javascript
import { trackDocumentView, trackFlashcardView } from "../services/analytics";

// Track document views
trackDocumentView("doc_789", "Grammar Rules PDF");

// Track flashcard views
trackFlashcardView("flashcard_101", "Vocabulary Set 1");
```

### Search Tracking

```javascript
import { trackSearch } from "../services/analytics";

// Track search queries
trackSearch("english grammar", 15); // search term and result count
```

### Chatbot Tracking

```javascript
import { trackChatbotMessage } from "../services/analytics";

// Track chatbot interactions
trackChatbotMessage("user_message");
trackChatbotMessage("bot_response");
```

## Available Tracking Functions

### Core Functions

- `initGA()` - Initialize Google Analytics
- `trackPageView(path)` - Track page views
- `trackEvent(category, action, label, value)` - Track custom events

### User Functions

- `trackUserLogin(method)` - Track login attempts
- `trackUserRegistration(method)` - Track registration

### Content Functions

- `trackCourseView(courseId, courseName)` - Track course views
- `trackCoursePurchase(courseId, courseName, price)` - Track purchases
- `trackDocumentView(documentId, documentName)` - Track document views
- `trackFlashcardView(flashcardId, flashcardName)` - Track flashcard views

### Test Functions

- `trackTestStart(testId, testName)` - Track test starts
- `trackTestComplete(testId, testName, score)` - Track test completions

### Engagement Functions

- `trackUserEngagement(engagementTimeMs)` - Track user engagement time
- `trackSearch(searchTerm, resultsCount)` - Track search interactions
- `trackChatbotMessage(messageType)` - Track chatbot interactions

## Google Analytics Dashboard

Once implemented, you can view the tracking data in your Google Analytics dashboard:

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property (G-XJ31C68KYK)
3. Navigate to **Reports** → **Engagement** → **Events** to see custom events
4. Navigate to **Reports** → **Engagement** → **Pages and screens** to see page views
5. Navigate to **Reports** → **Acquisition** → **Traffic acquisition** to see user sources

## Testing

To verify that Google Analytics is working:

1. Open your browser's Developer Tools
2. Go to the **Network** tab
3. Filter by "google-analytics" or "collect"
4. Navigate through your app and check that analytics requests are being sent
5. You can also use the Google Analytics Real-Time reports to see live data

## Privacy Considerations

- The implementation respects user privacy and only tracks anonymous usage data
- No personally identifiable information (PII) is sent to Google Analytics
- Consider implementing a cookie consent banner for GDPR compliance if serving EU users

## Troubleshooting

If tracking is not working:

1. Check that the measurement ID is correct (G-XJ31C68KYK)
2. Verify that the Google Analytics script is loading in the browser
3. Check the browser console for any JavaScript errors
4. Ensure that ad blockers are not blocking Google Analytics
5. Verify that the `react-ga4` package is properly installed

## Next Steps

Consider implementing additional tracking for:

- User engagement metrics (time on page, scroll depth)
- Conversion funnels (signup → course purchase → completion)
- A/B testing events
- Error tracking and performance monitoring
