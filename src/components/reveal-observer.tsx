"use client";

import { useEffect, useLayoutEffect } from "react";

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

const KEYFRAMES: Keyframe[] = [
  { opacity: 0, transform: "translateY(22px)" },
  { opacity: 1, transform: "none" },
];

/**
 * Fades sections up as they scroll into view.
 *
 * Any element with a `data-reveal` attribute is hidden by the stylesheet once
 * `data-js` is on <html> (set before first paint by the inline script in the
 * root layout). This component then plays a one-off animation on each element
 * as it enters the viewport. It uses the Web Animations API rather than
 * toggling a class or attribute, so it never alters markup that React owns.
 *
 * Without JavaScript, or with reduced motion, everything is simply visible.
 */
export function RevealObserver() {
  // React's development remount clears attributes it does not manage, so set
  // it again here. In production this is a no-op.
  useLayoutEffect(() => {
    window.__revealReady = true;
    document.documentElement.setAttribute("data-js", "");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!("IntersectionObserver" in window) || !("animate" in Element.prototype)) {
      root.removeAttribute("data-js");
      return;
    }
    // The stylesheet already shows everything under reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          entry.target.animate(KEYFRAMES, {
            duration: 850,
            // Elements that arrive together follow one another.
            delay: Math.min(order++, 5) * 70,
            easing: "cubic-bezier(0.2, 0.6, 0.2, 1)",
            fill: "both",
          });
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    const scan = () => {
      document.querySelectorAll("[data-reveal]").forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        observer.observe(element);
      });
    };

    // Pages arrive without a full reload, so watch for new content.
    let frame = 0;
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });

    scan();
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
