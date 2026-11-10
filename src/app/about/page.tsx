import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { LabelRows } from "@/components/label-rows";
import { LifecycleRail } from "@/components/lifecycle-rail";
import { PageHero } from "@/components/page-hero";
import { businesses, businessNameList, countWord } from "@/content/businesses";
import { habits, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "About the Group",
  description: `${site.name} is a Singapore holding company with ${countWord()} automotive businesses, each under its own brand: ${businessNameList()}.`,
  path: "/about",
});

export default function AboutPage() {
  const upcoming = businesses.filter((business) => business.status !== "live");
  // "the price comes first, we come to you, ... and proof before promises"
  const habitList = habits.map(
    (habit) => habit.title.charAt(0).toLowerCase() + habit.title.slice(1).replace(/\.$/, ""),
  );
  const habitSentence =
    habitList.length > 1
      ? `${habitList.slice(0, -1).join(", ")} and ${habitList[habitList.length - 1]}`
      : habitList.join("");
  const habitCount = countWord(habits.length);

  return (
    <>
      <PageHero eyebrow="The Group" title={["About the Group."]}>
        <p className="lede lede--lg">
          A Singapore holding company with {countWord()} automotive businesses, each operating
          under its own brand.
        </p>
      </PageHero>

      <section className="section surface-glass">
        <div className={`container ${styles.statement}`} data-reveal>
          <p>
            Every car in Singapore passes through the same stages: rental, upgrade, servicing,
            recovery and, after ten years, export.
          </p>
          <p>
            The Group is building a business at each of them
            <span className="dot">.</span>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <LabelRows
            rows={[
              {
                label: "Structure",
                content: (
                  <>
                    <p className="lead">
                      A holding company with {countWord()} businesses, each under its own brand.
                      {upcoming.length > 0
                        ? ` ${upcoming.map((business) => business.name).join(" and ")} ${upcoming.length === 1 ? "is" : "are"} in development.`
                        : null}
                    </p>
                    <p className="body">
                      {businessNameList()} serve successive stages of a car&rsquo;s life, from the
                      first drive to the final export.
                    </p>
                  </>
                ),
              },
              {
                label: "Operating principles",
                content: (
                  <p className="lead">
                    {habitCount.charAt(0).toUpperCase() + habitCount.slice(1)} principles apply
                    across the businesses in operation: {habitSentence}.
                  </p>
                ),
              },
              {
                label: "Mission",
                content: (
                  <p className="statement">
                    To make every stage of a car&rsquo;s life in Singapore simple, transparent and
                    fairly priced.
                  </p>
                ),
              },
              {
                label: "Vision",
                content: (
                  <p className="statement">
                    To be the group drivers and partners rely on at every stage, from the
                    first drive to the final export.
                  </p>
                ),
              },
            ]}
          />

          <div className={styles.businesses}>
            <h2 className="eyebrow" data-reveal>
              The portfolio
            </h2>
            <div className={styles.rail} data-reveal>
              <LifecycleRail />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Partnerships and investment"
        title="Work with the Group."
        text="Enquiries are reviewed by the Group and directed to the business concerned."
      >
        <Link href="/contact" className="button button--large">
          Contact us
          <span className="button-arrow" aria-hidden="true">
            →
          </span>
        </Link>
        <Link href="/businesses" className="button button--ghost button--large">
          View the portfolio
        </Link>
      </CtaBand>
    </>
  );
}
