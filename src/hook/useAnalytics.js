import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  initGA,
  trackPageView,
  trackEvent,
  trackActiveUser,
} from "../services/analytics";
import { useUserInfo } from "./user/useUserInfo";

export const useAnalytics = () => {
  const location = useLocation();
  const user = useUserInfo();

  // Initialize GA on first load
  useEffect(() => {
    initGA();
  }, []);

  // Track page views on route changes
  useEffect(() => {
    trackPageView(location.pathname + location.search);

    // Track active user when they navigate to pages
    if (user?.id) {
      trackActiveUser(user.id, "registered");
    }
  }, [location, user]);

  // Return tracking functions for use in components
  return {
    trackEvent,
    trackPageView: (path) => trackPageView(path || location.pathname),
    trackActiveUser: (userId, userType) => trackActiveUser(userId, userType),
  };
};

export default useAnalytics;
