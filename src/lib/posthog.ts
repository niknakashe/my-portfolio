import posthog from "posthog-js";

export const initPostHog = () => {
  if (typeof window !== "undefined") {
    posthog.init("phc_oQSNI1izLTzL1um9ToYBf2IbmZndnrxjAwuqTcbOiti", {
      api_host: "https://eu.i.posthog.com",
      loaded: (posthog) => {
        if (import.meta.env.DEV) console.log("PostHog loaded");
      },
      capture_pageview: false, // We'll handle this manually with React Router
      capture_pageleave: true,
      autocapture: true,
      disable_session_recording: false,
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: "[data-private]",
      },
    });
  }
};

export default posthog;
