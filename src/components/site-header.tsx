import { HeaderWithPath } from "./header-view";

/**
 * The sticky header. It reads the current page to mark the section the
 * visitor is in. There is deliberately no Suspense boundary around it: with
 * one, the server sent a stand-in header first and the real one afterwards,
 * so pages carried two headers and marked no section without JavaScript.
 * Every page's address is known when the site is built, so none is needed.
 */
export function SiteHeader() {
  return <HeaderWithPath />;
}
