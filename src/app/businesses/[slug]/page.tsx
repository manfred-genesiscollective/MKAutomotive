import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BusinessLogo } from "@/components/business-logo";
import { CtaBand } from "@/components/cta-band";
import { Dotted } from "@/components/dotted";
import { NumberedRows } from "@/components/numbered-rows";
import { PromiseCards } from "@/components/promise-cards";
import { SectionHeading } from "@/components/section-heading";
import { SpecSheet } from "@/components/spec-sheet";
import {
  IN_DEVELOPMENT,
  businesses,
  getBusiness,
  getNeighbours,
  type Business,
} from "@/content/businesses";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export function generateStaticParams() {
  return businesses.map((business) => ({ slug: business.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/businesses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) return { title: "Page not found" };
  return pageMetadata({
    title: `${business.name}: ${business.category.toLowerCase()}`,
    description: business.seo,
    path: `/businesses/${business.slug}`,
    ownImage: true,
  });
}

/** The main action: the business's own site, or the contact form until it has one. */
function PrimaryAction({ business }: { business: Business }) {
  if (business.url) {
    return (
      <a
        href={business.url}
        className="button button--large"
        target="_blank"
        rel="noopener noreferrer"
      >
        {business.cta.label}
        <span className="button-arrow" aria-hidden="true">
          ↗
        </span>
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    );
  }
  // No website to send people to: the contact form, with this business chosen.
  return (
    <Link href={`/contact?topic=${business.slug}`} className="button button--large">
      {business.status === "live" ? `Ask us about ${business.name}` : business.cta.label}
      <span className="button-arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

function NeighbourLink({ business, direction }: { business: Business; direction: "previous" | "next" }) {
  return (
    <Link
      href={`/businesses/${business.slug}`}
      className={`${styles.neighbour} ${direction === "next" ? styles.next : ""}`}
      prefetch
    >
      <span className="meta">
        {direction === "previous" ? "Previous stage" : "Next stage"} · {business.stage.number}{" "}
        {business.stage.label}
      </span>
      <span className={styles.neighbourName}>
        {direction === "previous" ? (
          <span className={styles.neighbourArrow} aria-hidden="true">
            ←
          </span>
        ) : null}
        <BusinessLogo slug={business.slug} alt={business.name} size="neighbour" />
        {direction === "next" ? (
          <span className={styles.neighbourArrow} aria-hidden="true">
            →
          </span>
        ) : null}
      </span>
    </Link>
  );
}

/*
 * Every business is prerendered in full at build time (see
 * generateStaticParams), so the whole page is in the HTML that is served:
 * it reads without JavaScript and by crawlers that do not run scripts.
 *
 * `instant = false` is what allows that. Without it the address would have
 * to be read inside a Suspense boundary, which sends the page as an empty
 * shell that a script fills in. The cost is small: a link to one of these
 * pages waits for the page instead of showing a placeholder first, and
 * every such link prefetches it.
 */
export const instant = false;

export default async function BusinessPage({ params }: PageProps<"/businesses/[slug]">) {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) notFound();

  const { previous, next } = getNeighbours(business.slug);
  const live = business.status === "live";

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroMain}>
            <p
              className={`eyebrow fade-in ${styles.eyebrow}`}
              style={{ "--delay": "0.04s" } as React.CSSProperties}
            >
              {business.stage.number} · {business.stage.label}
            </p>
            <h1 className={`fade-in ${styles.title}`} style={{ "--delay": "0.1s" } as React.CSSProperties}>
              <BusinessLogo slug={business.slug} alt={business.name} size="hero" priority />
            </h1>
            <p className={`fade-in ${styles.tagline}`}>
              <Dotted>{business.tagline}</Dotted>
            </p>

            <div className={`fade-in ${styles.heroBody}`} style={{ "--delay": "0.6s" } as React.CSSProperties}>
              <p className={styles.intro}>{business.intro}</p>
              {business.description.map((paragraph) => (
                <p key={paragraph} className="body measure">
                  {paragraph}
                </p>
              ))}
              <div className={`button-row ${styles.actions}`}>
                <PrimaryAction business={business} />
                <Link href="/businesses" className="button button--ghost button--large">
                  All businesses
                </Link>
              </div>
            </div>
          </div>

          <aside
            className={`fade-in ${styles.sheet}`}
            style={{ "--delay": "0.7s" } as React.CSSProperties}
            aria-label={`${business.name} at a glance`}
          >
            <SpecSheet
              title="At a glance"
              status={live ? undefined : IN_DEVELOPMENT}
              rows={[
                ...business.facts,
                {
                  label: "Stage",
                  value: `${business.stage.number} · ${business.stage.label}`,
                },
                {
                  label: "Website",
                  value: business.url
                    ? business.domain
                    : `${business.domain}, ${live ? "opening soon" : IN_DEVELOPMENT.toLowerCase()}`,
                  href: business.url,
                },
                { label: "Group", value: site.name },
              ]}
            />
          </aside>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <h2 className="eyebrow" data-reveal>
            {business.servicesHeading}
          </h2>
          <div className={styles.services}>
            <NumberedRows items={business.services} as="h3" />
          </div>
        </div>
      </section>

      {business.promises.length > 0 ? (
        <section className="section surface-glass">
          <div className="container">
            <SectionHeading size="small" title={`${business.promisesHeading}.`} />
            <div className={styles.promises}>
              <PromiseCards items={business.promises} />
            </div>
            <p className={`meta ${styles.source}`}>
              As published at {business.domain}.
            </p>
          </div>
        </section>
      ) : null}

      <CtaBand
        surface={business.promises.length > 0 ? "carbon" : "glass"}
        eyebrow="Next step"
        title={business.cta.heading}
        text={business.cta.text}
      >
        <PrimaryAction business={business} />
      </CtaBand>

      <nav className={styles.neighbours} aria-label="Neighbouring businesses">
        <div className={`container ${styles.neighbourGrid}`}>
          {previous ? <NeighbourLink business={previous} direction="previous" /> : null}
          {next ? <NeighbourLink business={next} direction="next" /> : null}
        </div>
      </nav>
    </>
  );
}
