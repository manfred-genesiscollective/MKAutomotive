import { Suspense } from "react";

import { HeaderView, HeaderWithPath } from "./header-view";

/**
 * The sticky header. The current page is read on the client, so it sits in a
 * Suspense boundary: pages whose address is not known at build time fall back
 * to the same header without a highlighted link.
 */
export function SiteHeader() {
  return (
    <Suspense fallback={<HeaderView pathname={null} />}>
      <HeaderWithPath />
    </Suspense>
  );
}
