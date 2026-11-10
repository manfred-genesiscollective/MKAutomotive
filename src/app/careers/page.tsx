import { FormSection } from "@/components/form-section";
import { NumberedRows } from "@/components/numbered-rows";
import { PageHero } from "@/components/page-hero";
import { businesses, countWord } from "@/content/businesses";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Careers",
  description: `Work at ${site.name}: on the road, in the workshop, at the port or behind the screen, across ${countWord()} automotive businesses in Singapore.`,
  path: "/careers",
});

export default function CareersPage() {
  const count = countWord();

  return (
    <>
      <PageHero eyebrow="Careers" title={["Build a career", "around cars."]}>
        <p className="lede lede--lg">
          {count.charAt(0).toUpperCase() + count.slice(1)} businesses means many kinds of work: on
          the road, in the workshop, at the port and behind the screen. Tell us which one suits
          you.
        </p>
      </PageHero>

      <section className="section section--flush-top">
        <div className="container">
          <p className="eyebrow" data-reveal>
            Where you could work
          </p>
          <div className={styles.rows}>
            <NumberedRows
              as="h2"
              labels={businesses.map((business) => business.stage.number)}
              items={businesses.map((business) => ({
                title: business.name,
                text: business.work,
                note: business.status === "coming-soon" ? "In development" : undefined,
              }))}
            />
          </div>
        </div>
      </section>

      <FormSection
        kind="careers"
        eyebrow="Apply"
        title="Send an open application."
        text="We do not list every opening. Tell us what you do and which business interests you, and we will get in touch when there is a fit."
      />
    </>
  );
}
