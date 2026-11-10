import { cacheLife } from "next/cache";
import Link from "next/link";

import { businesses } from "@/content/businesses";
import { contactNav, primaryNav, site } from "@/content/site";

import { Dotted } from "./dotted";
import { Logo } from "./logo";
import styles from "./site-footer.module.css";

/** Cached so the pages stay static; refreshed daily so the year stays right. */
async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const groupLinks = [...primaryNav.filter((item) => item.href !== "/businesses"), contactNav];

export async function SiteFooter() {
  const year = await getCurrentYear();
  const { email, phone } = site.contact;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" aria-label={`${site.name}, home`} className={styles.logo}>
              <Logo size="large" />
            </Link>
            <p className={`forged-text ${styles.tagline}`}>
              <Dotted>{site.tagline}</Dotted>
            </p>
            {email || phone || site.social.length > 0 ? (
              <ul className={styles.contact}>
                {email ? (
                  <li>
                    <a href={`mailto:${email}`}>{email}</a>
                  </li>
                ) : null}
                {phone ? (
                  <li>
                    <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>
                  </li>
                ) : null}
                {site.social.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className={styles.columns}>
            <nav className={styles.column} aria-label="Group">
              <p className="eyebrow">Group</p>
              <ul>
                {groupLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className={styles.column} aria-label="Businesses">
              <p className="eyebrow">Businesses</p>
              <ul>
                {businesses.map((business) => (
                  <li key={business.slug}>
                    <Link href={`/businesses/${business.slug}`} prefetch>
                      <span className={styles.index}>{business.stage.number}</span>
                      {business.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className={styles.bottomLinks}>
            <span>{site.country}</span>
            <Link href="/privacy">Privacy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
