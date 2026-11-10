"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import { contactNav, primaryNav, site } from "@/content/site";

import { Logo } from "./logo";
import styles from "./site-header.module.css";

export function HeaderWithPath() {
  return <HeaderView pathname={usePathname()} />;
}

const menuItems = [{ label: "Home", href: "/" }, ...primaryNav, contactNav];

export function HeaderView({ pathname }: { pathname: string | null }) {
  const menuRef = useRef<HTMLDialogElement>(null);
  const openMenu = () => menuRef.current?.showModal();
  const closeMenu = () => menuRef.current?.close();

  /** "page" for the page itself, "true" for the section it belongs to. */
  const current = (href: string) => {
    if (pathname === null) return undefined;
    if (pathname === href) return "page" as const;
    if (href !== "/" && pathname.startsWith(`${href}/`)) return "true" as const;
    return undefined;
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label={`${site.name}, home`}>
          <Logo />
        </Link>

        <nav className={styles.nav} aria-label="Main">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.link}
              aria-current={current(item.href)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={contactNav.href}
            className={styles.cta}
            aria-current={current(contactNav.href)}
          >
            {contactNav.label}
          </Link>
        </nav>

        <button
          type="button"
          className={styles.burger}
          aria-label="Open menu"
          aria-haspopup="dialog"
          onClick={openMenu}
        >
          <span />
          <span />
        </button>
      </div>

      <dialog ref={menuRef} className={styles.menu} aria-label="Menu">
        <div className={styles.menuBar}>
          <Link
            href="/"
            className={styles.brand}
            aria-label={`${site.name}, home`}
            onClick={closeMenu}
          >
            <Logo />
          </Link>
          <button
            type="button"
            className={`${styles.burger} ${styles.close}`}
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <span />
            <span />
          </button>
        </div>

        <nav className={styles.menuNav} aria-label="Menu">
          <ol>
            {menuItems.map((item, index) => (
              <li key={item.href} style={{ "--i": index } as React.CSSProperties}>
                <Link
                  href={item.href}
                  className={styles.menuLink}
                  aria-current={current(item.href)}
                  onClick={closeMenu}
                >
                  <span className={styles.menuIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.menuLabel}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ol>
          <p className={styles.menuFoot}>{site.tagline}</p>
        </nav>
      </dialog>
    </header>
  );
}
