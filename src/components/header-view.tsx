"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { contactNav, primaryNav, site } from "@/content/site";

import { Logo } from "./logo";
import styles from "./site-header.module.css";

export function HeaderWithPath() {
  return <HeaderView pathname={usePathname()} />;
}

const menuItems = [{ label: "Home", href: "/" }, ...primaryNav, contactNav];

const MENU_ID = "site-menu";

/** The group's name, set beside the monogram. The link around it is labelled. */
function Wordmark() {
  return (
    <span className={styles.wordmark}>
      <span className={styles.wordmarkName}>MK Automotive</span>{" "}
      <span className={styles.wordmarkGroup}>Group</span>
    </span>
  );
}

/*
 * Lets the menu buttons work before the page's scripts have run, and with
 * scripts off, in browsers that support command buttons. The click handlers
 * below cover every other browser. The attribute names are newer than
 * React's type definitions, hence the cast.
 */
const commands = (command: "show-modal" | "close") =>
  ({ commandfor: MENU_ID, command }) as object;

export function HeaderView({ pathname }: { pathname: string | null }) {
  const menuRef = useRef<HTMLDialogElement>(null);
  // The command attributes may already have done the work: only act if not.
  const openMenu = () => {
    const menu = menuRef.current;
    if (menu && !menu.open) menu.showModal();
  };
  const closeMenu = () => menuRef.current?.close();

  // A change of page closes the menu, however it came about: a link in the
  // menu, or the browser's Back and Forward buttons.
  useEffect(() => {
    menuRef.current?.close();
  }, [pathname]);

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
          <Wordmark />
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
          {...commands("show-modal")}
        >
          <span />
          <span />
        </button>
      </div>

      <dialog ref={menuRef} id={MENU_ID} className={`forged ${styles.menu}`} aria-label="Menu">
        <div className={styles.menuBar}>
          <Link
            href="/"
            className={styles.brand}
            aria-label={`${site.name}, home`}
            onClick={closeMenu}
          >
            <Logo />
            <Wordmark />
          </Link>
          <button
            type="button"
            className={`${styles.burger} ${styles.close}`}
            aria-label="Close menu"
            onClick={closeMenu}
            {...commands("close")}
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
