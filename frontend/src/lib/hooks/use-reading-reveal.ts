"use client";

import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Word opacity follows native scroll progress, including reverse scrolling. */
export function useReadingReveal(ref: RefObject<HTMLParagraphElement | null>) {
  useGSAP((_context, contextSafe) => {
    const element = ref.current;
    if (!element || !contextSafe) return;
    let cancelled = false;
    const setup = contextSafe(() => {
      const split = SplitText.create(element, { type: "words", wordsClass: "reading-word" });
      gsap.set(split.words, { opacity: .18 });
      gsap.to(split.words, {
        opacity: 1,
        duration: 1,
        stagger: 1,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 45%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      ScrollTrigger.refresh();
    });
    document.fonts.ready.then(() => { if (!cancelled) setup(); });
    return () => { cancelled = true; };
  }, { scope: ref });
}
