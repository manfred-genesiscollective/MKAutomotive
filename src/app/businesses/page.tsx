import Link from "next/link";

import { BusinessRows } from "@/components/business-rows";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { businessNameList, countWord } from "@/content/businesses";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our businesses",
  description: `${businessNameList()}: the ${countWord()} businesses of ${site.name}, each at one stage in the life of a car in Singapore.`,
  path: "/businesses",
});

export default function BusinessesPage() {
  return (
    <>
      <PageHero eyebrow={`${countWord()} businesses`} title={["Our businesses."]}>
        <p className="lede lede--lg">
          Each MK business looks after one stage in the life of a car in Singapore. Start with
          the one you need.
        </p>
      </PageHero>

      <section className="section section--flush-top">
        <div className="container">
          <BusinessRows as="h2" showSites />
        </div>
      </section>

      <CtaBand
        surface="glass"
        eyebrow="Not sure where to start"
        title="Tell us what you need."
        text="Describe what you are trying to do and we will point you to the right business."
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
