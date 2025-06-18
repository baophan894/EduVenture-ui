import ReactGA from "react-ga4";

// Initialize GA4
export const initGA4 = () => {
  ReactGA.initialize("G-XJ31C68KYK");
};

// Track page views with full URL and title
export const trackPageView = (location) => {
  const pagePath = location.pathname + location.search;
  ReactGA.send({
    hitType: "pageview",
    page: pagePath,
    title: document.title,
  });

  // Also send to gtag for enhanced measurement
  window.gtag("event", "page_view", {
    page_path: pagePath,
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track custom events (if needed in the future)
export const trackEvent = (action, category, label) => {
  try {
    ReactGA.event({
      action: action,
      category: category,
      label: label,
    });
    console.log("Event tracked:", { action, category, label });
  } catch (error) {
    console.error("Failed to track event:", error);
  }
};
