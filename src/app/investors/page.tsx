import { FormSection } from "@/components/form-section";
import { NumberedRows } from "@/components/numbered-rows";
import { PageHero } from "@/components/page-hero";
import { IN_DEVELOPMENT, businesses, countWord } from "@/content/businesses";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Investors",
  description: `${site.name} operates a business at each stage of a car’s life in Singapore, from rental to export.`,
  path: "/investors",
});

export default function InvestorsPage() {
  const upcoming = businesses.filter((business) => business.status !== "live");

  return (
    <>
      <PageHero
        eyebrow="Investors"
        size="long"
        title={["One car,", `${countWord()} businesses.`]}
      >
        <p className="lede lede--lg">
          Every car in Singapore runs on a ten-year Certificate of Entitlement (COE). Over that
          period it creates demand for rental, upgrades, servicing and recovery; at the end, for
          export. {site.name} operates a business at each stage.
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
              labels={businesses.map((business) => business.stage.number)}
              items={businesses.map((business) => ({
                title: business.name,
                logo: business.slug,
                text: business.model,
                note:
                  business.status === "live"
                    ? business.stage.label
                    : `${business.stage.label} · ${IN_DEVELOPMENT}`,
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
