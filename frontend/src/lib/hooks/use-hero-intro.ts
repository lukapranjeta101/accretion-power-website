"use client";

import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

const MOBILE_QUERY = "(max-width: 599px)";

/**
 * Hero entrance (masked word-by-word headline reveal) + restrained scroll
 * parallax. Everything is located via selectors scoped to `heroRef` rather
 * than threading new refs through the component tree, so the only markup
 * change this requires is attaching `heroRef` to the `.hero` section.
 *
 * The hero is fully visible by default (plain HTML/CSS) and only ever gets
 * hidden by the `.from()` calls below, which run exclusively inside the
 * try block after SplitText has successfully split the headline — so a
 * thrown error, a missing element, or JS failing entirely all leave the
 * hero in its natural, readable state.
 */
export function useHeroIntro(heroRef: RefObject<HTMLElement | null>) {
  useGSAP(
    (_context, contextSafe) => {
      const root = heroRef.current;
      if (!root || !contextSafe) return;

      const isMobile = window.matchMedia(MOBILE_QUERY).matches;
      let cancelled = false;

      const eyebrow = root.querySelector<HTMLElement>(".hero-headline .eyebrow");
      const headline = root.querySelector<HTMLElement>("#hero-heading");
      const supportCopy = root.querySelector<HTMLElement>(".hero-cta p");
      const ctaButton = root.querySelector<HTMLElement>(".hero-cta .button");

      if (eyebrow && headline && supportCopy && ctaButton) {
        const runEntrance = contextSafe(() => {
          try {
            SplitText.create(headline, {
              type: "lines, words",
              mask: "lines",
              linesClass: "hero-line",
              autoSplit: true,
              onSplit(self) {
                const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
                tl.from(eyebrow, { opacity: 0, y: isMobile ? 24 : 36, duration: 0.8 })
                  .from(
                    self.words,
                    {
                      yPercent: isMobile ? 110 : 140,
                      rotate: isMobile ? 2 : 4,
                      opacity: 0,
                      duration: 1.2,
                      stagger: 0.12,
                    },
                    0.25
                  )
                  .from(supportCopy, { opacity: 0, y: 44, duration: 0.9 }, "-=0.65")
                  .from(ctaButton, { opacity: 0, y: 28, duration: 0.7 }, "-=0.55");
                return tl;
              },
            });
          } catch {
            // Setup failed after font-ready; the hero stays in its natural visible state.
          }
        });

        // Wait for fonts so the first split measures real text, not a fallback face.
        document.fonts.ready.then(() => {
          if (!cancelled) runEntrance();
        });
      }

      // Scroll parallax: independent of the entrance above, on separate
      // targets (.hero-bottom / .hero-media) so neither competes with the
      // entrance's per-word transforms on the same element.
      const scrollGroup = root.querySelector<HTMLElement>(".hero-bottom");
      const media = root.querySelector<HTMLElement>(".hero-media");
      if (scrollGroup || media) {
        const headlineDistance = isMobile ? 24 : 50;
        const mediaDistance = isMobile ? 10 : 22;
        const parallax = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
        });
        if (scrollGroup) parallax.to(scrollGroup, { y: -headlineDistance, ease: "none" }, 0);
        if (media) parallax.to(media, { y: -mediaDistance, ease: "none" }, 0);
      }

      return () => {
        cancelled = true;
      };
    },
    { scope: heroRef }
  );
}
