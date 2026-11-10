"use client";

import { useEffect } from "react";

const HIDDEN: Keyframe = { opacity: 0, transform: "translateY(22px)" };
const SHOWN: Keyframe = { opacity: 1, transform: "none" };

/**
 * Fades sections up as they scroll into view.
 *
 * Any element with a `data-reveal` attribute takes part. Nothing is hidden
 * until this component is running, and then only what lies below the
 * screen: whatever a visitor can already see is left alone. So the page is
 * complete without JavaScript, and a slow connection never leaves visible
 * content blank.
 *
 * It uses the Web Animations API rather than a class or attribute, so it
 * never alters markup that React owns.
 */
export function RevealObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || !("animate" in Element.prototype)) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const seen = new WeakSet<Element>();
    /** Elements kept out of sight until they are scrolled to. */
    const held = new Map<Element, Animation>();

    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const hold = held.get(entry.target);
          if (!hold) continue;
          held.delete(entry.target);
          // Start the entrance before letting go, so there is no flash between the two.
          entry.target.animate([HIDDEN, SHOWN], {
            duration: 850,
            // Elements that arrive together follow one another.
            delay: Math.min(order++, 5) * 70,
            easing: "cubic-bezier(0.2, 0.6, 0.2, 1)",
            fill: "backwards",
          });
          hold.cancel();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    const scan = () => {
      const fold = window.innerHeight;
      document.querySelectorAll("[data-reveal]").forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        // On screen already, or not laid out (a page kept in the background): leave it visible.
        if (element.getBoundingClientRect().top < fold) return;
        held.set(element, element.animate([HIDDEN, HIDDEN], { duration: 1, fill: "forwards" }));
        observer.observe(element);
      });
    };

    const releaseAll = () => {
      observer.disconnect();
      for (const hold of held.values()) hold.cancel();
      held.clear();
    };

    // Pages arrive without a full reload, so watch for new content.
    let frame = 0;
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });

    // Reduced motion switched on part-way through a visit: show everything.
    const onMotionChange = () => {
      if (!reducedMotion.matches) return;
      mutations.disconnect();
      releaseAll();
    };

    scan();
    mutations.observe(document.body, { childList: true, subtree: true });
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      reducedMotion.removeEventListener("change", onMotionChange);
      releaseAll();
    };
  }, []);

  return null;
}
