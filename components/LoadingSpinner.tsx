"use client";

import { useState, useEffect } from "react";

export default function LoadingSpinner() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1000);
    const unmountTimer = setTimeout(() => setVisible(false), 1300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`pixel-loading-overlay${fading ? " fade-out" : ""}`} aria-hidden="true">
      <div className="pixel-loading-coin" />
      <p className="pixel-loading-text">
        LOADING<span className="pixel-loading-dots">
          <span className="pixel-loading-dot">.</span>
          <span className="pixel-loading-dot">.</span>
          <span className="pixel-loading-dot">.</span>
        </span>
      </p>
    </div>
  );
}
