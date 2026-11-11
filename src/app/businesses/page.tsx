import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { PortfolioWall } from "@/components/portfolio-wall";
import { businessNameList } from "@/content/businesses";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our businesses",
  description: `${businessNameList()}: the specialist businesses of ${site.name} in Singapore.`,
  path: "/businesses",
});

export default function BusinessesPage() {
  return (
    <>
      <PageHero eyebrow="The portfolio" title={["Our businesses."]}>
        <p className="lede lede--lg">
          Specialist businesses across every aspect of automotive, each under its own brand.
        </p>
      </PageHero>

      <section className="section section--flush-top">
        <div className="container">
          <PortfolioWall as="h2" />
        </div>
      </section>

      <CtaBand
        surface="glass"
        eyebrow="General enquiries"
        title="Speak to us."
        text="We will direct your enquiry to the business concerned."
      >
        <Link href="/contact" className="button button--large">
          Contact us
          <span className="button-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </CtaBand>
    </>
  );
}
