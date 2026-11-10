import Link from "next/link";

import { BusinessRows } from "@/components/business-rows";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { businessNameList, capitalise, countWord } from "@/content/businesses";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our businesses",
  description: `${businessNameList()}: the ${countWord()} businesses of ${site.name}, each serving one stage in the life of a car in Singapore.`,
  path: "/businesses",
});

export default function BusinessesPage() {
  return (
    <>
      <PageHero eyebrow="The portfolio" title={["Our businesses."]}>
        <p className="lede lede--lg">
          {capitalise(countWord())} businesses, each serving one stage in the life of a car in
          Singapore.
        </p>
      </PageHero>

      <section className="section section--flush-top">
        <div className="container">
          <BusinessRows as="h2" showSites />
        </div>
      </section>

      <CtaBand
        surface="glass"
        eyebrow="General enquiries"
        title="Speak to the Group."
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
