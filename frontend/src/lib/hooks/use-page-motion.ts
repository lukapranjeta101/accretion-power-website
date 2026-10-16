"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { motionConfig as motion } from "@/lib/motion-config";

if (typeof window !== "undefined") gsap.registerPlugin(SplitText);

/** Reversible viewport entrances. Native scrolling and readable no-JS defaults. */
export function usePageMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const desktop = matchMedia("(min-width: 900px) and (pointer: fine)");
    let dispose = () => {};

    const setup = () => {
      dispose();
      if (!("IntersectionObserver" in window)) return;
      let cancelled = false;
      const splits: SplitText[] = [];
      const items = new Map<Element, { animation: Animation; shown: boolean }>();
      const observer = new IntersectionObserver(entries => {
        let lineOrder = 0;
        entries.forEach(entry => {
          const item = items.get(entry.target);
          if (!item) return;
          // A translateY entrance must not reverse when it moves across the top
          // edge: reversing moves it back into view and creates a feedback loop.
          // Keep content revealed above the reading area; only reset below it.
          const aboveReadingArea = entry.boundingClientRect.top < (entry.rootBounds?.top ?? 73);
          const shown = aboveReadingArea || (entry.isIntersecting && (item.shown ? entry.intersectionRatio > .02 : entry.intersectionRatio >= .15));
          if (shown === item.shown) return;
          item.shown = shown;
          // Stagger lines entering together; later lines still wait for scrolling.
          if (shown && entry.target.classList.contains("reveal-line")) {
            item.animation.effect?.updateTiming({ delay: lineOrder++ * motion.reveal.stagger });
          }
          // Reverse the same animation from its current position, even mid-sweep.
          item.animation.updatePlaybackRate(shown ? 1 : -1);
          item.animation.play();
        });
      }, { threshold: [0, .02, .15], rootMargin: "-73px 0px -12% 0px" });

      const observeReveal = (element: HTMLElement) => {
        if (!element.animate) return;
        const highlight = element.hasAttribute("data-highlight");
        const animation = element.animate(highlight ? [
          { backgroundSize: "0% 100%" },
          { backgroundSize: "100% 100%" },
        ] : [
          { opacity: 0, transform: `translateY(${desktop.matches ? motion.reveal.distance : motion.reveal.mobileDistance}px)` },
          { opacity: 1, transform: "translateY(0)" },
        ], {
          duration: highlight ? 1200 : desktop.matches ? motion.reveal.duration : motion.reveal.mobileDuration,
          delay: highlight ? 350 : Math.min(motion.reveal.stagger * 3, (Number(element.dataset.revealDelay) || 0) * 2 || (Number(element.dataset.revealOrder) || 0) * motion.reveal.stagger),
          easing: motion.reveal.easing,
          fill: "both",
        });
        animation.pause();
        animation.currentTime = 0;
        items.set(element, { animation, shown: false });
        observer.observe(element);
      };
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-highlight]").forEach(observeReveal);

      // Measure actual wrapped lines after fonts load, and rebuild on width changes.
      document.fonts.ready.then(() => {
        if (cancelled) return;
        document.querySelectorAll<HTMLElement>("[data-reveal-lines]").forEach(element => {
          let previousLines: Element[] = [];
          splits.push(SplitText.create(element, {
            type: "lines",
            linesClass: "reveal-line",
            autoSplit: true,
            onSplit(split) {
              previousLines.forEach(line => {
                observer.unobserve(line);
                items.get(line)?.animation.cancel();
                items.delete(line);
              });
              previousLines = split.lines;
              split.lines.forEach(line => observeReveal(line as HTMLElement));
            },
          }));
        });
      });

      // Keyboard navigation should never leave a focused control faded out.
      const onFocus = (event: FocusEvent) => {
        if (!(event.target instanceof Node)) return;
        items.forEach((item, element) => {
          if (!element.contains(event.target as Node)) return;
          item.shown = true;
          item.animation.updatePlaybackRate(1);
          item.animation.finish();
        });
      };
      document.addEventListener("focusin", onFocus);
      dispose = () => {
        cancelled = true;
        observer.disconnect();
        document.removeEventListener("focusin", onFocus);
        items.forEach(({ animation }) => animation.cancel());
        splits.forEach(split => split.revert());
      };
    };
    setup();
    desktop.addEventListener("change", setup);
    return () => { dispose(); desktop.removeEventListener("change", setup); };
  }, [pathname]);
}
