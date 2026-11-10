import { FormSection } from "@/components/form-section";
import { NumberedRows } from "@/components/numbered-rows";
import { PageHero } from "@/components/page-hero";
import { IN_DEVELOPMENT, businesses, countWord } from "@/content/businesses";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Investors",
  description: `${site.name} has a separate business at each point in the life of a car in Singapore.`,
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
          Driving in Singapore runs on a ten-year clock. In that time people need a car to rent,
          upgrades, servicing, help when things go wrong and, when the Certificate of Entitlement
          (COE) ends, a buyer overseas. {site.name} has a business at each of those points.
        </p>
      </PageHero>

      <section className="section section--flush-top">
        <div className={`container ${styles.body}`} data-reveal>
          <p className="body">
            Each business stands on its own, under its own brand, at a different point between a
            first rental and a final export.
          </p>
          {upcoming.length > 0 ? (
            <p className="body">
              {upcoming.map((business) => business.name).join(" and ")}{" "}
              {upcoming.length === 1 ? "is" : "are"} in development.
            </p>
          ) : null}
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
        text="Tell us who you are and we will reply by email."
      >
        <p className={`meta ${styles.disclaimer}`}>
          This page is for information only. It is not an offer or an invitation to invest.
        </p>
      </FormSection>
    </>
  );
}
