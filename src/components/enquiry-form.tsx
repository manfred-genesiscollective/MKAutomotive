"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef, useState } from "react";

import { submitEnquiry } from "@/app/actions";
import { businesses } from "@/content/businesses";
import {
  careerInterests,
  contactTopics,
  partnershipOptions,
} from "@/content/forms";
import {
  ENQUIRY_FORMS,
  HONEYPOT_FIELD,
  type EnquiryKind,
  type EnquiryState,
  type FieldName,
} from "@/lib/enquiry";

import styles from "./enquiry-form.module.css";

type FormCopy = {
  submit: string;
  successTitle: string;
  successText: string;
  /** Labels and placeholders that differ from the defaults below. */
  company?: { label: string; placeholder: string };
  topic?: { label: string; options: string[]; control: "chips" | "select" };
  message?: { placeholder: string };
};

const COPY: Record<EnquiryKind, FormCopy> = {
  contact: {
    submit: "Send message",
    successTitle: "Message sent",
    successText: "Thank you for getting in touch. We will reply by email.",
    company: { label: "Company", placeholder: "Company name (optional)" },
    topic: { label: "What is this about?", options: contactTopics, control: "chips" },
    message: { placeholder: "Tell us how we can help" },
  },
  partners: {
    submit: "Submit enquiry",
    successTitle: "Enquiry received",
    successText: "Thank you. We will review your enquiry and reply by email.",
    company: { label: "Company", placeholder: "Company name" },
    topic: { label: "Partnership type", options: partnershipOptions, control: "select" },
    message: { placeholder: "How would you like to work together?" },
  },
  investors: {
    submit: "Request deck",
    successTitle: "Request received",
    successText: "Thank you. A member of our team will be in touch.",
    company: { label: "Firm", placeholder: "Fund or firm name" },
  },
  careers: {
    submit: "Send application",
    successTitle: "Application received",
    successText: "Thank you. We will get in touch when there is a fit.",
    topic: { label: "Which business interests you?", options: careerInterests, control: "chips" },
    message: { placeholder: "What you do, and what you are looking for" },
  },
};

const initialState: EnquiryState = { status: "idle" };

/**
 * One enquiry form. `kind` decides which fields are shown; the same rules in
 * src/lib/enquiry.ts are applied again on the server.
 */
export function EnquiryForm({ kind }: { kind: EnquiryKind }) {
  // Changing the key gives a fresh, empty form after a successful send.
  const [round, setRound] = useState(0);
  return <Form key={round} kind={kind} onStartAgain={() => setRound((value) => value + 1)} />;
}

function Form({ kind, onStartAgain }: { kind: EnquiryKind; onStartAgain: () => void }) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const copy = COPY[kind];
  const rules = ENQUIRY_FORMS[kind].fields;
  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : {};

  // A link such as /contact?topic=the-car-lounge preselects that business.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("topic");
    const match = businesses.find((business) => business.slug === slug);
    if (!match) return;
    formRef.current
      ?.querySelectorAll<HTMLInputElement>('input[name="topic"]')
      .forEach((input) => {
        if (input.value === match.name) input.checked = true;
      });
  }, []);

  // Move focus to the result so it is announced and visible.
  useEffect(() => {
    if (state.status === "success") {
      doneRef.current?.focus();
    } else if (state.status === "error") {
      const firstInvalid = formRef.current?.querySelector<HTMLElement>(
        '[aria-invalid="true"]',
      );
      firstInvalid?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={doneRef} tabIndex={-1} className={styles.done} role="status">
        <p className="eyebrow">{copy.successTitle}</p>
        <p className={styles.doneText}>{copy.successText}</p>
        <button type="button" className={styles.again} onClick={onStartAgain}>
          Send another
        </button>
      </div>
    );
  }

  const fieldId = (field: FieldName) => `${id}-${field}`;
  const errorId = (field: FieldName) => `${id}-${field}-error`;
  const describe = (field: FieldName) =>
    errors[field] ? { "aria-invalid": true, "aria-describedby": errorId(field) } : {};
  const renderError = (field: FieldName) =>
    errors[field] ? (
      <p id={errorId(field)} className={styles.error}>
        {errors[field]}
      </p>
    ) : null;

  return (
    <form ref={formRef} action={formAction} className={styles.form}>
      <input type="hidden" name="form" value={kind} />
      {/* Honeypot: hidden from people, tempting to bots. See HONEYPOT_FIELD. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor={`${id}-trap`}>Leave this field empty</label>
        <input
          id={`${id}-trap`}
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className={styles.pair}>
        <div className={styles.field}>
          <label htmlFor={fieldId("name")} className={styles.label}>
            Name
          </label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            className={styles.input}
            placeholder="Your full name"
            autoComplete="name"
            required
            maxLength={rules.name?.max}
            defaultValue={values.name ?? ""}
            {...describe("name")}
          />
          {renderError("name")}
        </div>

        <div className={styles.field}>
          <label htmlFor={fieldId("email")} className={styles.label}>
            Email
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            className={styles.input}
            placeholder="you@company.com"
            autoComplete="email"
            required
            maxLength={rules.email?.max}
            defaultValue={values.email ?? ""}
            {...describe("email")}
          />
          {renderError("email")}
        </div>
      </div>

      {rules.company && copy.company ? (
        <div className={styles.field}>
          <label htmlFor={fieldId("company")} className={styles.label}>
            {copy.company.label}
          </label>
          <input
            id={fieldId("company")}
            name="company"
            type="text"
            className={styles.input}
            placeholder={copy.company.placeholder}
            autoComplete="organization"
            required={rules.company.required}
            maxLength={rules.company.max}
            defaultValue={values.company ?? ""}
            {...describe("company")}
          />
          {renderError("company")}
        </div>
      ) : null}

      {rules.phone ? (
        <div className={styles.field}>
          <label htmlFor={fieldId("phone")} className={styles.label}>
            Phone
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            className={styles.input}
            placeholder="Optional"
            autoComplete="tel"
            required={rules.phone.required}
            maxLength={rules.phone.max}
            defaultValue={values.phone ?? ""}
            {...describe("phone")}
          />
          {renderError("phone")}
        </div>
      ) : null}

      {rules.topic && copy.topic?.control === "chips" ? (
        <fieldset
          className={styles.fieldset}
          {...(errors.topic ? { "aria-describedby": errorId("topic") } : {})}
        >
          <legend className={styles.label}>{copy.topic.label}</legend>
          <div className={styles.chips}>
            {copy.topic.options.map((option, index) => (
              <label key={option} className={styles.chip}>
                <input
                  type="radio"
                  name="topic"
                  value={option}
                  required={rules.topic?.required}
                  defaultChecked={values.topic === option}
                  {...(errors.topic && index === 0 ? { "aria-invalid": true } : {})}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {renderError("topic")}
        </fieldset>
      ) : null}

      {rules.topic && copy.topic?.control === "select" ? (
        <div className={styles.field}>
          <label htmlFor={fieldId("topic")} className={styles.label}>
            {copy.topic.label}
          </label>
          <select
            id={fieldId("topic")}
            name="topic"
            className={styles.input}
            required={rules.topic.required}
            defaultValue={values.topic ?? ""}
            {...describe("topic")}
          >
            <option value="" disabled>
              Choose one
            </option>
            {copy.topic.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {renderError("topic")}
        </div>
      ) : null}

      {rules.link ? (
        <div className={styles.field}>
          <label htmlFor={fieldId("link")} className={styles.label}>
            CV or LinkedIn link
          </label>
          <input
            id={fieldId("link")}
            name="link"
            type="url"
            className={styles.input}
            placeholder="https:// (optional)"
            autoComplete="url"
            required={rules.link.required}
            maxLength={rules.link.max}
            defaultValue={values.link ?? ""}
            {...describe("link")}
          />
          {renderError("link")}
        </div>
      ) : null}

      {rules.message && copy.message ? (
        <div className={styles.field}>
          <label htmlFor={fieldId("message")} className={styles.label}>
            Message
          </label>
          <textarea
            id={fieldId("message")}
            name="message"
            rows={4}
            className={styles.input}
            placeholder={copy.message.placeholder}
            required={rules.message.required}
            maxLength={rules.message.max}
            defaultValue={values.message ?? ""}
            {...describe("message")}
          />
          {renderError("message")}
        </div>
      ) : null}

      <div className={styles.actions}>
        <button type="submit" className="button" disabled={pending}>
          {pending ? "Sending" : copy.submit}
          <span className="button-arrow" aria-hidden="true">
            →
          </span>
        </button>
        <p className={styles.note}>
          We use these details only to reply to you. See our{" "}
          <Link href="/privacy">privacy notice</Link>.
        </p>
      </div>

      <p className={styles.status} role="alert">
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}
