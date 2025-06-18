import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, trackPageView, trackEvent } from "../services/analytics";

export const useAnalytics = () => {
  const location = useLocation();

  // Initialize GA on first load
  useEffect(() => {
    initGA();
  }, []);

  // Track page views on route changes
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  // Return tracking functions for use in components
  return {
    trackEvent,
    trackPageView: (path) => trackPageView(path || location.pathname),
  };
};

export default useAnalytics;
