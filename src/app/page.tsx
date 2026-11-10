import Link from "next/link";

import { BusinessRows } from "@/components/business-rows";
import { CtaBand } from "@/components/cta-band";
import { LifecycleRail } from "@/components/lifecycle-rail";
import { NumberedRows } from "@/components/numbered-rows";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StatRow } from "@/components/stat-row";
import { businesses, countWord, groupFacts } from "@/content/businesses";
import { habits, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/site-url";

import styles from "./page.module.css";

export const metadata = pageMetadata({ description: site.description, path: "/" });

export default function HomePage() {
  const siteUrl = getSiteUrl();
  const organisation = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: siteUrl,
    description: site.description,
    address: { "@type": "PostalAddress", addressCountry: "SG" },
    subOrganization: businesses.map((business) => ({
      "@type": "Organization",
      name: business.name,
      description: business.tagline,
      ...(business.url ? { url: business.url } : {}),
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

      <PageHero size="home" title={["The whole life", "of a car."]} ruled={false}>
        <p className="lede">
          {site.name} is the Singapore holding company behind {countWord()} automotive
          businesses. Between them they look after how a car is rented, upgraded, serviced,
          recovered and, when its time here is done, exported.
        </p>
      </PageHero>

      <section className={`surface-glass ${styles.rail}`}>
        <div className="container fade-in" style={{ "--delay": "0.7s" } as React.CSSProperties}>
          <LifecycleRail scale />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading layout="split" title="One group, every stage of ownership.">
            <p>
              A car registered in Singapore comes with a ten-year Certificate of Entitlement.
              Over those years it is driven, upgraded, serviced and sometimes rescued, and when
              the certificate runs out many are shipped overseas. Each MK business looks after
              one of those moments under its own name.
            </p>
          </SectionHeading>
          <div className={styles.rows}>
            <BusinessRows showSites />
          </div>
        </div>
      </section>

      <section className="section surface-glass" id="habits">
        <div className="container">
          <StatRow items={groupFacts} />
          <div className={styles.habits}>
            <SectionHeading
              eyebrow="How we work"
              title="Different businesses, the same four habits."
            />
            <div className={styles.habitRows}>
              <NumberedRows items={habits} />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Work with us"
        title="Talk to the group."
        text="Partnerships, supply, investment or a role in one of our businesses: tell us what you have in mind and we'll point you to the right person."
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
