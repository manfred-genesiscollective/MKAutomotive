import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";

// The framework already tells search engines not to index a 404.
export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <PageHero eyebrow="Error 404" title={["Wrong turn."]}>
      <div className="stack" style={{ "--stack-gap": "32px" } as React.CSSProperties}>
        <p className="lede">
          The page you are looking for is not here. It may have moved, or the address may have
          been mistyped.
        </p>
        <div className="button-row">
          <Link href="/" className="button button--large">
            Back to the home page
          </Link>
          <Link href="/businesses" className="button button--ghost button--large">
            Our businesses
          </Link>
        </div>
      </div>
    </PageHero>
  );
}
