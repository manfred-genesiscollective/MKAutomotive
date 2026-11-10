import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { PortfolioWall } from "@/components/portfolio-wall";
import { SectionHeading } from "@/components/section-heading";
import { businesses } from "@/content/businesses";
import { site } from "@/content/site";
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

      <PageHero size="home" title={["Automotive", "specialists."]} ruled={false} emblem>
        <p className="lede">
          {site.name} is a Singapore holding company with specialist businesses across every
          aspect of automotive, each under its own brand.
        </p>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading layout="split" eyebrow="Our businesses" title="The portfolio.">
            <p>
              Rental, performance parts, recovery, export, service booking and software: each
              business a specialist in its field.
            </p>
          </SectionHeading>
          <div className={styles.wall}>
            <PortfolioWall />
          </div>
        </div>
      </section>

      <CtaBand
        surface="glass"
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
