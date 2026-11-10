import { FormSection } from "@/components/form-section";
import { NumberedRows } from "@/components/numbered-rows";
import { PageHero } from "@/components/page-hero";
import { partnerTypes, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Partner with us",
  description: `${site.name} works with workshops, parts brands, overseas dealers, car owners, fleets and founders across the life of a car in Singapore.`,
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero eyebrow="Partnerships" title={["Partner with us."]}>
        <div className={styles.intro}>
          <p className="lede lede--lg">
            {site.name} works with workshops, brands, dealers, fleets and car owners across the
            life of a car.
          </p>
          <p className="body">
            Each of our businesses has its own kind of partner. Find yours below, or tell us what
            you have in mind and we will point you to the right person.
          </p>
        </div>
      </PageHero>

      <section className="section section--flush-top">
        <div className="container">
          <p className="eyebrow" data-reveal>
            Who we work with
          </p>
          <div className={styles.rows}>
            <NumberedRows items={partnerTypes} as="h2" />
          </div>
        </div>
      </section>

      <FormSection
        kind="partners"
        eyebrow="Enquire"
        title="Interested in working with us?"
        text="Tell us about your organisation and how you would like to work together. We will review your enquiry and reply by email."
      />
    </>
  );
}
