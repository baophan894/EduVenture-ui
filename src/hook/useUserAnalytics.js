import { useEffect, useRef } from "react";
import { useUserInfo } from "./user/useUserInfo";
import {
  trackActiveUser,
  trackNewUser,
  trackReturningUser,
  trackSessionStart,
  trackSessionEnd,
} from "../services/analytics";

export const useUserAnalytics = () => {
  const user = useUserInfo();
  const sessionStartTime = useRef(Date.now());
  const lastActivityTime = useRef(Date.now());
  const isFirstVisit = useRef(true);

  // Check if user is new (first visit or new registration)
  const checkNewUser = () => {
    const lastVisit = localStorage.getItem("lastVisit");
    const userId = user?.id || "anonymous";

    if (!lastVisit) {
      // First time visitor
      trackNewUser(userId, "first_visit");
      localStorage.setItem("lastVisit", Date.now().toString());
      return true;
    }

    return false;
  };

  // Check if user is returning
  const checkReturningUser = () => {
    const lastVisit = localStorage.getItem("lastVisit");
    const userId = user?.id || "anonymous";

    if (lastVisit) {
      const daysSinceLastVisit = Math.floor(
        (Date.now() - parseInt(lastVisit)) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceLastVisit > 0) {
        trackReturningUser(userId, daysSinceLastVisit);
      }
    }
  };

  // Track active user when they perform actions
  const trackUserActivity = (action = "page_view") => {
    if (user?.id) {
      trackActiveUser(user.id, "registered");
      lastActivityTime.current = Date.now();
    }
  };

  // Track session start
  const startSession = () => {
    const userId = user?.id || "anonymous";
    trackSessionStart(userId, 0);
    sessionStartTime.current = Date.now();
  };

  // Track session end
  const endSession = () => {
    const userId = user?.id || "anonymous";
    const sessionDuration = Math.floor(
      (Date.now() - sessionStartTime.current) / 1000
    );
    trackSessionEnd(userId, sessionDuration);
  };

  // Initialize user analytics
  useEffect(() => {
    if (user) {
      // Check if this is a new user
      const isNew = checkNewUser();

      // Check if this is a returning user
      checkReturningUser();

      // Start session
      startSession();

      // Track initial activity
      trackUserActivity("session_start");

      // Update last visit time
      localStorage.setItem("lastVisit", Date.now().toString());
    }
  }, [user]);

  // Track session end when user leaves
  useEffect(() => {
    const handleBeforeUnload = () => {
      endSession();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        endSession();
      } else {
        startSession();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      endSession();
    };
  }, [user]);

  return {
    trackUserActivity,
    startSession,
    endSession,
    isFirstVisit: isFirstVisit.current,
  };
};

export default useUserAnalytics;
