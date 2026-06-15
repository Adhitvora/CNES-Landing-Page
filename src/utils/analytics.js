import { siteData } from "../data/siteData";

export function trackEvent(action, details = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: siteData.analytics.eventName,
    action,
    ...details,
  });
}

export function scrollToEnquiry(source = "unknown") {
  trackEvent("cta_click", { source });
  document.querySelector("#enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
