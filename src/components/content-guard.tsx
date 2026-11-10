"use client";

import { useEffect } from "react";

/** Pictures: images, drawn logos and the business logos. */
const PICTURE = "img, svg, picture";

/**
 * At the group's request, pictures on the site cannot be saved from the
 * right-click menu or dragged off the page. The rest of the protection is in
 * globals.css (see "Protection"). It deters copying; it cannot prevent it.
 *
 * Only pictures are covered: right-clicking text or a link still opens the
 * usual menu, so "Open in new tab" keeps working.
 */
export function ContentGuard() {
  useEffect(() => {
    const block = (event: Event) => {
      if (event.target instanceof Element && event.target.closest(PICTURE)) {
        event.preventDefault();
      }
    };
    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
    };
  }, []);

  return null;
}
