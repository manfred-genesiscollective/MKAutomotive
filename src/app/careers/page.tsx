import { FormSection } from "@/components/form-section";
import { NumberedRows } from "@/components/numbered-rows";
import { PageHero } from "@/components/page-hero";
import { IN_DEVELOPMENT, businesses, countWord } from "@/content/businesses";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Careers",
  description: `Work at ${site.name}: on the road, in the workshop, in the yard or behind the screen, across ${countWord()} automotive businesses in Singapore.`,
  path: "/careers",
});

export default function CareersPage() {
  const count = countWord();

  return (
    <>
      <PageHero eyebrow="Careers" title={["Build a career", "around cars."]}>
        <p className="lede lede--lg">
          {count.charAt(0).toUpperCase() + count.slice(1)} businesses means many kinds of work: on
          the road, in the workshop, in the yard and behind the screen. Tell us which one suits
          you.
        </p>
      </PageHero>

      <section className="section section--flush-top">
        <div className="container">
          <h2 className="eyebrow" data-reveal>
            Where you could work
          </h2>
          <div className={styles.rows}>
            <NumberedRows
              as="h3"
              labels={businesses.map((business) => business.stage.number)}
              items={businesses.map((business) => ({
                title: business.name,
                logo: business.slug,
                text: business.work,
                note: business.status === "live" ? undefined : IN_DEVELOPMENT,
              }))}
            />
          </div>
        </div>
      </section>

      <FormSection
        kind="careers"
        eyebrow="Apply"
        title="Send an open application."
        text="We do not advertise openings on this site. Tell us what you do and which business interests you, and we will reply if there is a role."
      />
    </>
  );
}
