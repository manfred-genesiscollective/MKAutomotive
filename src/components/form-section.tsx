import type { ReactNode } from "react";

import type { EnquiryKind } from "@/lib/enquiry";

import { Dotted } from "./dotted";
import { EnquiryForm } from "./enquiry-form";
import styles from "./form-section.module.css";

type Props = {
  kind: EnquiryKind;
  eyebrow: string;
  title: string;
  /** Optional bold line under the heading. */
  lead?: string;
  text: string;
  /** Extra content under the text, such as a note or direct links. */
  children?: ReactNode;
};

/** The pearl band that holds an enquiry form, with its introduction beside it. */
export function FormSection({ kind, eyebrow, title, lead, text, children }: Props) {
  return (
    <section className="section surface-pearl">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy} data-reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2 h2--sm">
            <Dotted>{title}</Dotted>
          </h2>
          {lead ? <p className="body--strong">{lead}</p> : null}
          <p className="body measure">{text}</p>
          {children}
        </div>
        <div data-reveal>
          <EnquiryForm kind={kind} />
        </div>
      </div>
    </section>
  );
}
