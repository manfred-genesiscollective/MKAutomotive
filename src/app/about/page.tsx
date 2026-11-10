import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { LabelRows } from "@/components/label-rows";
import { LifecycleRail } from "@/components/lifecycle-rail";
import { PageHero } from "@/components/page-hero";
import { businesses, businessNameList, countWord } from "@/content/businesses";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "About the group",
  description: `${site.name} is a Singapore holding company that owns and builds businesses for every stage in the life of a car: ${businessNameList()}.`,
  path: "/about",
});

export default function AboutPage() {
  const first = businesses[0];
  const last = businesses[businesses.length - 1];

  return (
    <>
      <PageHero eyebrow="The group" title={["About the group."]}>
        <p className="lede lede--lg">
          {site.name} is a Singapore holding company. We own and build businesses that look
          after cars at every stage of their life here.
        </p>
      </PageHero>

      <section className="section surface-satin">
        <div className={`container ${styles.statement}`} data-reveal>
          <p>
            A car in Singapore is rented, upgraded, serviced, sometimes rescued and, when its ten
            years are up, often shipped overseas. Those moments are usually handled by companies
            that never meet.
          </p>
          <p>
            We are building one group that handles each of them<span className="dot">.</span>
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
                      A holding company with {countWord()} businesses, each with its own name, its
                      own website and its own customers.
                    </p>
                    <p className="body">
                      {businessNameList()} sit at different points in a car&rsquo;s life:{" "}
                      {first.name} at the start, {last.name} at the end and the others in between.
                      The group exists so that each one is run to the same standard.
                    </p>
                  </>
                ),
              },
              {
                label: "How we work",
                content: (
                  <>
                    <p className="lead">
                      Every business in the group shares four habits: the price comes first, we
                      come to you, we do the work ourselves, and we show proof before we make
                      promises.
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
        text="Partnerships, supply, investment or a role in one of our businesses: tell us what you have in mind and we'll point you to the right person."
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
