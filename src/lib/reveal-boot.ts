/**
 * Inline script for the document head. It runs before first paint and marks
 * the page as scripted, which lets the stylesheet hide sections until they
 * scroll into view (see RevealObserver). If the app's JavaScript never
 * arrives, the mark is removed again so nothing stays hidden.
 */
export const revealBootScript = `(function(){var d=document.documentElement;d.setAttribute("data-js","");setTimeout(function(){if(!window.__revealReady)d.removeAttribute("data-js")},4000)})()`;
