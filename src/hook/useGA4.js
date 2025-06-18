import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../utils/ga4";

export const useGA4 = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when location changes
    trackPageView(location.pathname + location.search);
  }, [location]);
};
