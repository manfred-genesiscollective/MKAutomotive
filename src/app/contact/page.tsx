import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/page-hero";
import { IN_DEVELOPMENT, businesses } from "@/content/businesses";
import { site } from "@/content/site";
import { enquiryFormProps } from "@/lib/enquiry-form-props";
import { pageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${site.name} about a partnership, supplying one of its businesses, investment or a job, or go straight to one of the businesses.`,
  path: "/contact",
});

export default function ContactPage() {
  const { email, phone, whatsapp, address } = site.contact;
  const hasDetails = Boolean(email || phone || whatsapp || address.length > 0);

  return (
    <>
      <PageHero eyebrow="Contact" title={["Contact us."]} />

      <section className="section surface-glass">
        <div className={`container ${styles.grid}`}>
          <div className={styles.aside} data-reveal>
            <p className={styles.lead}>
              Write to the Group about partnerships, supply, investment and careers. Customer
              enquiries are answered fastest by each business directly.
            </p>

            <div className={styles.block}>
              <h2 className="eyebrow">Contact a business directly</h2>
              <ul className={styles.direct}>
                {businesses.map((business) => (
                  <li key={business.slug}>
                    <span>{business.need}</span>
                    {business.url ? (
                      <a
                        href={business.url}
                        className="text-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {business.domain} <span aria-hidden="true">↗</span>
                        <span className="visually-hidden"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className={styles.soon}>{IN_DEVELOPMENT}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {hasDetails ? (
              <div className={styles.block}>
                <h2 className="eyebrow">Reach us directly</h2>
                <ul className={styles.details}>
                  {email ? (
                    <li>
                      <a href={`mailto:${email}`} className="text-link">
                        {email}
                      </a>
                    </li>
                  ) : null}
                  {phone ? (
                    <li>
                      <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="text-link">
                        {phone}
                      </a>
                    </li>
                  ) : null}
                  {whatsapp ? (
                    <li>
                      <a
                        href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                        className="text-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp <span aria-hidden="true">↗</span>
                        <span className="visually-hidden"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ) : null}
                  {address.length > 0 ? (
                    <li>
                      <address className={styles.address}>
                        {address.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </address>
                    </li>
                  ) : null}
                </ul>
              </div>
            ) : null}
          </div>

          <div data-reveal>
            <EnquiryForm {...enquiryFormProps("contact")} />
          </div>
        </div>
      </section>
    </>
  );
}
