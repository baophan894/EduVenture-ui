import ReactGA from "react-ga4";

// Initialize GA4 with your Measurement ID
export const initGA4 = () => {
  ReactGA.initialize("G-XJ31C68KYK");
};

// Track page views
export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// Track custom events (if needed in the future)
export const trackEvent = (action, category, label) => {
  ReactGA.event({
    action: action,
    category: category,
    label: label,
  });
};
