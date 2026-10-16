"use client";

import { useEffect, useState } from "react";

const TOTAL_STEPS = 100;
const STEP_DELAY = 18;
const EXIT_DELAY = 260;

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + 1, TOTAL_STEPS);

        if (next === TOTAL_STEPS) {
          window.clearInterval(progressTimer);
          window.setTimeout(() => setExiting(true), EXIT_DELAY);
          window.setTimeout(() => setComplete(true), EXIT_DELAY + 620);
        }

        return next;
      });
    }, STEP_DELAY);

    return () => window.clearInterval(progressTimer);
  }, []);

  if (complete) return null;

  return (
    <div
      className={`loading-screen${exiting ? " loading-screen--exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading Accretion Power ${progress}%`}
    >
      <span className="loading-progress" aria-hidden="true">
        {progress}
      </span>
      <span className="sr-only">Loading Accretion Power {progress}%</span>
    </div>
  );
}
