import Link from "next/link";

import { BusinessRows } from "@/components/business-rows";
import { CtaBand } from "@/components/cta-band";
import { NumberedRows } from "@/components/numbered-rows";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StatRow } from "@/components/stat-row";
import { businesses, capitalise, countWord, groupFacts } from "@/content/businesses";
import { habits, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/site-url";

import styles from "./page.module.css";

export const metadata = pageMetadata({
  description: site.description,
  path: "/",
  ownImage: true,
});

export default function HomePage() {
  const siteUrl = getSiteUrl();
  const organisation = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: siteUrl,
    description: site.description,
    address: { "@type": "PostalAddress", addressCountry: "SG" },
    // Only businesses that are open, each with its own website.
    subOrganization: businesses
      .filter((business) => business.url)
      .map((business) => ({
        "@type": "Organization",
        name: business.name,
        description: business.tagline,
        url: business.url,
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organisation).replace(/</g, "\\u003c"),
        }}
      />

      <PageHero size="home" title={["The whole life", "of a car."]} ruled={false} emblem>
        <p className="lede">
          {site.name} is a Singapore holding company with {countWord()} businesses across the
          vehicle lifecycle: rental, performance parts and fitting, workshop booking, roadside
          recovery and vehicle export.
        </p>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading layout="split" title={`${capitalise(countWord())} businesses, one lifecycle.`}>
            <p>
              Every car registered in Singapore carries a ten-year Certificate of Entitlement
              (COE). Over that period it is driven, upgraded, serviced and recovered; when the COE
              ends, it is often exported. Each MK business serves one of those stages under its
              own brand.
            </p>
          </SectionHeading>
          <div className={styles.rows}>
            <BusinessRows showSites />
          </div>
        </div>
      </section>

      <section className="section surface-glass">
        <div className="container">
          <StatRow items={groupFacts} />
          {/* The About page links here: the habits, not the figures above them. */}
          <div className={styles.habits} id="habits">
            <SectionHeading
              eyebrow="How we operate"
              title={`${capitalise(countWord(habits.length))} principles, applied across the portfolio.`}
            />
            <div className={styles.habitRows}>
              <NumberedRows items={habits} />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Partnerships and investment"
        title="Work with the Group."
        text="Enquiries about partnerships, supply, investment and careers are reviewed by the Group and directed to the business concerned."
      >
        <Link href="/contact" className="button button--large">
          Contact us
          <span className="button-arrow" aria-hidden="true">
            →
          </span>
        </Link>
        <Link href="/partners" className="button button--ghost button--large">
          Partner with us
        </Link>
      </CtaBand>
    </>
  );
}
