import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../utils/ga4";

export const useGA4 = () => {
  const location = useLocation();

  useEffect(() => {
    const fullPath = location.pathname + location.search;
    trackPageView(fullPath);
    console.log("GA4 Page View Tracked:", fullPath); // Optional debug log
  }, [location]);
};
