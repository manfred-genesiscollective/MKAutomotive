import { FormSection } from "@/components/form-section";
import { NumberedRows } from "@/components/numbered-rows";
import { PageHero } from "@/components/page-hero";
import { businesses, countWord, statusLabel } from "@/content/businesses";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Investors",
  description: `${site.name} builds a separate business at each point in the life of a car in Singapore. Request the investor deck.`,
  path: "/investors",
});

export default function InvestorsPage() {
  const live = businesses.filter((business) => business.status === "live");
  const upcoming = businesses.filter((business) => business.status !== "live");
  const liveCount = countWord(live.length);

  return (
    <>
      <PageHero
        eyebrow="Investor relations"
        size="long"
        title={["One car,", `${countWord()} businesses.`]}
      >
        <p className="lede lede--lg">
          A car in Singapore creates a decade of needs: something to drive, upgrades, servicing,
          help when things go wrong and, at the end of its COE, a buyer overseas. {site.name}{" "}
          builds a business at each of those points.
        </p>
      </PageHero>

      <section className="section section--flush-top">
        <div className={`container ${styles.body}`} data-reveal>
          <p className="body">
            Each business stands on its own, with its own brand, its own website and its own
            customers. Together they cover the life of a car from the first rental to the final
            export.
          </p>
          <p className="body">
            {liveCount.charAt(0).toUpperCase() + liveCount.slice(1)} are operating today
            {upcoming.length > 0
              ? `, and ${upcoming.map((business) => business.name).join(" and ")} ${upcoming.length === 1 ? "is" : "are"} in development.`
              : "."}
          </p>
        </div>

        <div className={`container ${styles.portfolio}`}>
          <p className="eyebrow" data-reveal>
            The portfolio
          </p>
          <div className={styles.rows}>
            <NumberedRows
              as="h2"
              labels={businesses.map((business) => business.stage.number)}
              items={businesses.map((business) => ({
                title: business.name,
                text: business.model,
                note: `${business.stage.label} · ${statusLabel(business)}`,
              }))}
            />
          </div>
        </div>
      </section>

      <FormSection
        kind="investors"
        eyebrow="Request"
        title="Request our investor deck."
        lead={`Interested in learning more about ${site.name}?`}
        text="Complete the form and a member of our team will be in touch."
      >
        <p className={`meta ${styles.disclaimer}`}>
          This page is for information only. It is not an offer or an invitation to invest.
        </p>
      </FormSection>
    </>
  );
}
