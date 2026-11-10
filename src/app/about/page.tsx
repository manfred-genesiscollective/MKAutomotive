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
  title: "About the group",
  description: `${site.name} is a Singapore holding company with ${countWord()} automotive businesses: ${businessNameList()}.`,
  path: "/about",
});

export default function AboutPage() {
  const first = businesses[0];
  const last = businesses[businesses.length - 1];
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
      <PageHero eyebrow="The group" title={["About the group."]}>
        <p className="lede lede--lg">
          {site.name} is a Singapore holding company for {countWord()} automotive businesses.
        </p>
      </PageHero>

      <section className="section surface-glass">
        <div className={`container ${styles.statement}`} data-reveal>
          <p>
            A car in Singapore is rented, upgraded, serviced, sometimes rescued and, when its ten
            years are up, often shipped overseas.
          </p>
          <p>
            We are building one group that looks after each of those moments
            <span className="dot">.</span>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <LabelRows
            rows={[
              {
                label: "What we are",
                content: (
                  <>
                    <p className="lead">
                      A holding company with {countWord()} businesses, each run under its own name.
                      {upcoming.length > 0
                        ? ` ${upcoming.map((business) => business.name).join(" and ")} ${upcoming.length === 1 ? "is" : "are"} still in development.`
                        : null}
                    </p>
                    <p className="body">
                      {businessNameList()} sit at different points in a car&rsquo;s life:{" "}
                      {first.name} at the start, {last.name} at the end and the others in between.
                    </p>
                  </>
                ),
              },
              {
                label: "How we work",
                content: (
                  <>
                    <p className="lead">
                      {habitCount.charAt(0).toUpperCase() + habitCount.slice(1)} habits run through
                      the businesses we operate today: {habitSentence}.
                    </p>
                    <p className="body">
                      <Link href="/#habits" className="text-link">
                        See what each habit means in practice
                      </Link>
                    </p>
                  </>
                ),
              },
              {
                label: "Our mission",
                content: (
                  <p className="statement">
                    To make every stage of a car&rsquo;s life in Singapore simple, fairly priced
                    and well looked after.
                  </p>
                ),
              },
              {
                label: "Our vision",
                content: (
                  <p className="statement">
                    A group of automotive businesses that people recommend at every stage, from
                    the first drive to the final export.
                  </p>
                ),
              },
            ]}
          />

          <div className={styles.businesses}>
            <p className="eyebrow" data-reveal>
              The businesses
            </p>
            <div className={styles.rail} data-reveal>
              <LifecycleRail />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Work with us"
        title="Talk to the group."
        text="Tell us what you have in mind and we will pass it to the right business."
      >
        <Link href="/contact" className="button button--large">
          Contact us
          <span className="button-arrow" aria-hidden="true">
            →
          </span>
        </Link>
        <Link href="/businesses" className="button button--ghost button--large">
          See our businesses
        </Link>
      </CtaBand>
    </>
  );
}
