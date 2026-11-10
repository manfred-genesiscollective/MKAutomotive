import { FormSection } from "@/components/form-section";
import { NumberedRows } from "@/components/numbered-rows";
import { PageHero } from "@/components/page-hero";
import { partnerTypes, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Partner with us",
  description: `Partner with the businesses of ${site.name} in Singapore: workshops, overseas dealers, car owners and fleets.`,
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero eyebrow="Partnerships" title={["Partner with us."]}>
        <p className="lede lede--lg">
          Each of our businesses has its own kind of partner. Find yours below, or tell us what
          you have in mind and we will point you to the right person.
        </p>
      </PageHero>

      <section className="section section--flush-top">
        <div className="container">
          <h2 className="eyebrow" data-reveal>
            Who we work with
          </h2>
          <div className={styles.rows}>
            <NumberedRows items={partnerTypes} as="h3" />
          </div>
        </div>
      </section>

      <FormSection
        kind="partners"
        eyebrow="Enquire"
        title="Interested in working with us?"
        text="Tell us who you are and how you would like to work together. We will review your enquiry and reply by email."
      />
    </>
  );
}
