import { FormSection } from "@/components/form-section";
import { NumberedRows } from "@/components/numbered-rows";
import { PageHero } from "@/components/page-hero";
import { IN_DEVELOPMENT, businesses, countWord } from "@/content/businesses";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Careers",
  description: `Careers at ${site.name}: roles on the road, in the workshop, in the yard and in operations, across ${countWord()} automotive businesses in Singapore.`,
  path: "/careers",
});

export default function CareersPage() {
  const count = countWord();

  return (
    <>
      <PageHero eyebrow="Careers" title={["Build a career", "around cars."]}>
        <p className="lede lede--lg">
          Roles across {count} businesses: on the road, in the workshop, in the yard and in
          operations.
        </p>
      </PageHero>

      <section className="section section--flush-top">
        <div className="container">
          <h2 className="eyebrow" data-reveal>
            The businesses
          </h2>
          <div className={styles.rows}>
            <NumberedRows
              as="h3"
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
        text="Openings are not advertised on this site. Send an open application and we will contact you if a suitable role arises."
      />
    </>
  );
}
