import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Privacy",
  description: `What ${site.name} collects through this website and what we do with it.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  const { email } = site.contact;

  return (
    <>
      <PageHero eyebrow="Privacy notice" title={["Privacy."]}>
        <p className="lede lede--lg">
          This notice explains what {site.name} collects through this website and what we do with
          it.
        </p>
      </PageHero>

      <section className="section section--flush-top">
        <div className={`container ${styles.prose}`}>
          <section>
            <h2 className="h3">What we collect</h2>
            <p>
              When you send an enquiry through a form on this site, we receive the details you
              enter: your name, your email address and, depending on the form, your company, your
              phone number, a link to your CV and your message. We do not ask for more than we need
              to reply.
            </p>
          </section>

          <section>
            <h2 className="h3">How we use it</h2>
            <p>
              We use these details to respond to your enquiry and to pass it to the right person in
              our team or in one of our businesses. We do not sell them and we do not use them for
              advertising.
            </p>
          </section>

          <section>
            <h2 className="h3">Who handles it</h2>
            <p>
              Enquiries reach us by email through an email delivery provider, which processes them
              on our behalf.
            </p>
          </section>

          <section>
            <h2 className="h3">How long we keep it</h2>
            <p>
              We keep an enquiry for as long as we need it to deal with your request and to keep a
              record of our dealings with you. Open job applications and requests to hear about a
              business that is still in development are kept until they are dealt with or you
              withdraw them.
            </p>
          </section>

          <section>
            <h2 className="h3">Cookies and tracking</h2>
            <p>This website does not use advertising or analytics cookies.</p>
          </section>

          <section>
            <h2 className="h3">Our businesses&rsquo; websites</h2>
            <p>
              Our businesses&rsquo; websites are run separately. When you follow a link to one of
              them, that site&rsquo;s own terms and privacy practices apply, not this notice.
            </p>
          </section>

          <section>
            <h2 className="h3">Your choices</h2>
            <p>
              You can ask what personal data we hold about you, ask us to correct it, or withdraw
              your consent to our using it. These rights are set out in Singapore&rsquo;s Personal
              Data Protection Act.
            </p>
          </section>

          <section>
            <h2 className="h3">Contact</h2>
            <p>
              To ask about this notice or your data,{" "}
              {email ? (
                <>
                  email{" "}
                  <a href={`mailto:${email}`} className="text-link">
                    {email}
                  </a>{" "}
                  or{" "}
                </>
              ) : null}
              <Link href="/contact" className="text-link">
                use the contact form
              </Link>
              .
            </p>
          </section>

          <p className="meta">Last updated November 2026</p>
        </div>
      </section>
    </>
  );
}
