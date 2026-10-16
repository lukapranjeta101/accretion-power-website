"use client";

import { useEffect, useState } from "react";

/**
 * True once the page has scrolled past `threshold` pixels. Used to toggle the
 * compact/translucent navigation state. Listener is passive and rAF-throttled;
 * setState only triggers a re-render when the boolean actually flips.
 */
export function useScrolled(threshold = 50): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const evaluate = () => {
      setScrolled(window.scrollY > threshold);
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, [threshold]);

  return scrolled;
}
