"use client";

import { useState, useEffect } from "react";

interface TypeWriterProps {
  children: string;
  speed?: number;
  delay?: number;
}

export default function TypeWriter({
  children,
  speed = 50,
  delay = 500,
}: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(children);
      setIsComplete(true);
      setHasStarted(true);
      return;
    }

    const timeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, prefersReducedMotion, children]);

  useEffect(() => {
    if (!hasStarted || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        const next = children.slice(0, prev.length + 1);
        if (next.length === children.length) {
          setIsComplete(true);
        }
        return next;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [hasStarted, speed, children, prefersReducedMotion]);

  return (
    <span aria-live="polite">
      {displayedText}
      {!isComplete && !prefersReducedMotion && (
        <span className="pixel-typewriter-cursor">{"\u258A"}</span>
      )}
    </span>
  );
}
