import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../utils/ga4";

export const useGA4 = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view whenever location changes
    trackPageView(location);
  }, [location]); // Re-run effect when location changes
};
