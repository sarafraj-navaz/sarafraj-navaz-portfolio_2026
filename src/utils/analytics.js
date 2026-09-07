/**
 * ============================================================
 *  GOOGLE ANALYTICS 4 UTILITY
 * ------------------------------------------------------------
 *  1. Create a GA4 property at https://analytics.google.com
 *  2. Copy your Measurement ID (looks like "G-XXXXXXXXXX")
 *  3. Paste it into the GA_MEASUREMENT_ID constant below
 *  4. That's it — page views and all tracked events will start
 *     flowing into your GA4 dashboard within a few minutes.
 * ============================================================
 */

export const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID || "G-XXXXXXXXXX"; // <-- OR PASTE YOUR MEASUREMENT ID HERE DIRECTLY

let initialized = false;

/** Injects the gtag.js script and initializes GA4. Call once, on app start. */
export function initAnalytics() {
  if (initialized) return;
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    console.info(
      "[Analytics] GA_MEASUREMENT_ID is not set yet — analytics is disabled. " +
        "Add your Measurement ID in src/utils/analytics.js to enable tracking."
    );
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, { send_page_view: true });

  initialized = true;
}

/** Generic event tracker. Safe no-op if analytics isn't configured. */
export function trackEvent(action, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", action, params);
}

/** Convenience trackers for the specific interactions this portfolio cares about. */
export const analytics = {
  pageView: (path) => trackEvent("page_view", { page_path: path }),
  projectClick: (projectName, destination) =>
    trackEvent("project_click", { project_name: projectName, destination }),
  resumeDownload: () => trackEvent("resume_download", { category: "engagement" }),
  hireMeClick: () => trackEvent("hire_me_click", { category: "cta" }),
  contactSubmit: () => trackEvent("contact_form_submit", { category: "engagement" }),
  socialClick: (network) => trackEvent("social_click", { network }),
};
