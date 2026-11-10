import { FormSection } from "@/components/form-section";
import { NumberedRows } from "@/components/numbered-rows";
import { PageHero } from "@/components/page-hero";
import { IN_DEVELOPMENT, businesses } from "@/content/businesses";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Investors",
  description: `${site.name} owns specialist automotive businesses in Singapore, from rental and parts to recovery, export and software.`,
  path: "/investors",
});

export default function InvestorsPage() {
  const upcoming = businesses.filter((business) => business.status !== "live");

  return (
    <>
      <PageHero eyebrow="Investors" title={["Specialists,", "under one group."]}>
        <p className="lede lede--lg">
          {site.name} owns specialist businesses across the automotive sector in Singapore,
          from rental, performance parts and recovery to export, service booking and software.
        </p>
      </PageHero>

      <section className="section section--flush-top">
        <div className={`container ${styles.body}`} data-reveal>
          <p className="body">
            Each business operates independently under its own brand, at a different point
            between a first rental and a final export.
            {upcoming.length > 0
              ? ` ${upcoming.map((business) => business.name).join(" and ")} ${upcoming.length === 1 ? "is" : "are"} in development.`
              : null}
          </p>
        </div>

        <div className={`container ${styles.portfolio}`}>
          <h2 className="eyebrow" data-reveal>
            The portfolio
          </h2>
          <div className={styles.rows}>
            <NumberedRows
              as="h3"
              items={businesses.map((business) => ({
                title: business.name,
                logo: business.slug,
                text: business.model,
                note:
                  business.status === "live"
                    ? business.category
                    : `${business.category} · ${IN_DEVELOPMENT}`,
              }))}
            />
          </div>
        </div>
      </section>

      <FormSection
        kind="investors"
        eyebrow="Enquire"
        title="Investor enquiries."
        text="Introduce yourself and your organisation, and we will reply by email."
      >
        <p className={`meta ${styles.disclaimer}`}>
          This page is for information only. It is not an offer or an invitation to invest.
        </p>
      </FormSection>
    </>
  );
}
