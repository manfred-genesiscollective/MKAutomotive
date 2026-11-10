import { FormSection } from "@/components/form-section";
import { NumberedRows } from "@/components/numbered-rows";
import { PageHero } from "@/components/page-hero";
import { partnerTypes, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Partner with us",
  description: `Partnerships with the businesses of ${site.name} in Singapore: workshops, overseas dealers, vehicle owners and corporate fleets.`,
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero eyebrow="Partnerships" title={["Partner with us."]}>
        <p className="lede lede--lg">
          Partnerships across the portfolio: service providers, overseas trade, vehicle owners
          and corporate fleets.
        </p>
      </PageHero>

      <section className="section section--flush-top">
        <div className="container">
          <h2 className="eyebrow" data-reveal>
            Partnership areas
          </h2>
          <div className={styles.rows}>
            <NumberedRows items={partnerTypes} as="h3" />
          </div>
        </div>
      </section>

      <FormSection
        kind="partners"
        eyebrow="Enquire"
        title="Propose a partnership."
        text="Outline your organisation and the opportunity. The Group reviews every enquiry and replies by email."
      />
    </>
  );
}
