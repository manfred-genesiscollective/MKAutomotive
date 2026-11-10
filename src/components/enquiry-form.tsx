"use client";

import Link from "next/link";
import {
  Component,
  useActionState,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { submitEnquiry } from "@/app/actions";
// Only from enquiry-fields: what this file imports, every visitor downloads.
import {
  FIELD_NAMES,
  HONEYPOT_FIELD,
  type EnquiryFormProps,
  type EnquiryKind,
  type EnquiryState,
  type FieldName,
  type FieldSettings,
  type FieldValues,
} from "@/lib/enquiry-fields";

import styles from "./enquiry-form.module.css";

type FormCopy = {
  submit: string;
  successTitle: string;
  successText: string;
  /** Labels and placeholders that differ from the defaults below. */
  company?: { label: string; placeholder: string };
  topic?: { label: string; control: "chips" | "select" };
  message?: { placeholder: string };
};

const COPY: Record<EnquiryKind, FormCopy> = {
  contact: {
    submit: "Send message",
    successTitle: "Message sent",
    successText: "Thank you. The Group will reply by email.",
    company: { label: "Company", placeholder: "Company name" },
    topic: { label: "Subject", control: "chips" },
    message: { placeholder: "Your enquiry" },
  },
  partners: {
    submit: "Submit enquiry",
    successTitle: "Enquiry received",
    successText: "Thank you. The Group will review your enquiry and reply by email.",
    company: { label: "Company", placeholder: "Company name" },
    topic: { label: "Partnership type", control: "select" },
    message: { placeholder: "The opportunity you have in mind" },
  },
  investors: {
    submit: "Send enquiry",
    successTitle: "Enquiry received",
    successText: "Thank you. The Group will reply by email.",
    company: { label: "Firm", placeholder: "Fund or firm name" },
  },
  careers: {
    submit: "Send application",
    successTitle: "Application received",
    successText: "Thank you. We will be in touch if a suitable role arises.",
    topic: { label: "Business of interest", control: "chips" },
    message: { placeholder: "Your experience and the role you are looking for" },
  },
};

const initialState: EnquiryState = { status: "idle" };

const UNREACHABLE =
  "We could not reach the server, so your message was not sent. Check your connection and try again.";

/**
 * Catches a request that fails outright: no connection, or a server error.
 * React reports that as an error while drawing the form, which would
 * otherwise replace the whole page with an error screen and lose what the
 * visitor typed.
 */
class RequestBoundary extends Component<
  { onFailure: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFailure();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * One enquiry form. `kind` decides the wording; `fields`, `topics` and
 * `preselect` come from enquiryFormProps() on the server, where the same
 * rules are applied again to whatever is sent.
 */
export function EnquiryForm({ kind, fields, topics = [], preselect }: EnquiryFormProps) {
  // Changing the key gives a fresh form: empty after a successful send, or
  // refilled with what was typed after a request that failed.
  const [round, setRound] = useState(0);
  const [startWith, setStartWith] = useState<EnquiryState>(initialState);
  const lastSent = useRef<FieldValues>({});

  const startAgain = useCallback(() => {
    setStartWith(initialState);
    setRound((value) => value + 1);
  }, []);

  const recover = useCallback(() => {
    setStartWith({
      status: "error",
      message: UNREACHABLE,
      fieldErrors: {},
      values: lastSent.current,
    });
    setRound((value) => value + 1);
  }, []);

  const remember = useCallback((values: FieldValues) => {
    lastSent.current = values;
  }, []);

  return (
    <RequestBoundary key={round} onFailure={recover}>
      <Form
        kind={kind}
        rules={fields}
        topics={topics}
        preselect={preselect}
        startWith={startWith}
        onSend={remember}
        onStartAgain={startAgain}
      />
    </RequestBoundary>
  );
}

function Form({
  kind,
  rules,
  topics,
  preselect,
  startWith,
  onSend,
  onStartAgain,
}: {
  kind: EnquiryKind;
  rules: FieldSettings;
  topics: string[];
  preselect?: Record<string, string>;
  startWith: EnquiryState;
  onSend: (values: FieldValues) => void;
  onStartAgain: () => void;
}) {
  const [state, formAction, pending] = useActionState(submitEnquiry, startWith);
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  const copy = COPY[kind];
  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : {};

  // A link such as /contact?topic=the-car-lounge preselects that business.
  // Only when nothing is chosen yet: this runs again each time the page is
  // shown, and must not undo the visitor's own choice.
  useEffect(() => {
    const radios = Array.from(
      formRef.current?.querySelectorAll<HTMLInputElement>('input[name="topic"]') ?? [],
    );
    if (radios.some((input) => input.checked)) return;
    const key = new URLSearchParams(window.location.search).get("topic");
    const wanted = key && preselect ? preselect[key] : undefined;
    if (!wanted) return;
    for (const input of radios) {
      if (input.value === wanted) input.checked = true;
    }
  }, [preselect]);

  // Move focus to the result so it is announced and visible.
  useEffect(() => {
    if (state.status === "success") {
      doneRef.current?.focus();
    } else if (state.status === "error") {
      const firstInvalid = formRef.current?.querySelector<HTMLElement>(
        '[aria-invalid="true"]',
      );
      (firstInvalid ?? statusRef.current)?.focus();
    }
  }, [state]);

  // Pages stay in memory after the visitor moves on. If they come back to a
  // form that was sent, show a fresh one, not the old "sent" message.
  const sent = state.status === "success";
  const startingAgain = useRef(false);
  useLayoutEffect(() => {
    if (!sent) return;
    return () => {
      // "Send another" has already asked for a fresh form.
      if (!startingAgain.current) onStartAgain();
    };
  }, [sent, onStartAgain]);

  if (state.status === "success") {
    return (
      <div ref={doneRef} tabIndex={-1} className={styles.done} role="status">
        <p className="eyebrow">{copy.successTitle}</p>
        <p className={styles.doneText}>{copy.successText}</p>
        <button
          type="button"
          className={styles.again}
          onClick={() => {
            startingAgain.current = true;
            onStartAgain();
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  const fieldId = (field: FieldName) => `${id}-${field}`;
  /** Optional fields say so in their label, where it stays visible while typing. */
  const labelFor = (label: string, field: FieldName) =>
    rules[field] && !rules[field].required ? `${label} (optional)` : label;
  const errorId = (field: FieldName) => `${id}-${field}-error`;
  // Stated either way: a required field that is still empty would otherwise
  // be announced as invalid before anything has been sent.
  const describe = (field: FieldName) =>
    errors[field]
      ? { "aria-invalid": true, "aria-describedby": errorId(field) }
      : { "aria-invalid": false };
  const renderError = (field: FieldName) =>
    errors[field] ? (
      <p id={errorId(field)} className={styles.error}>
        {errors[field]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      action={formAction}
      className={styles.form}
      // Keep a copy of what is being sent, in case the request never arrives.
      onSubmit={(event) => {
        const data = new FormData(event.currentTarget);
        const values: FieldValues = {};
        for (const field of FIELD_NAMES) {
          const value = data.get(field);
          if (typeof value === "string" && value) values[field] = value;
        }
        onSend(values);
      }}
    >
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
            placeholder="Your email address"
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
            {labelFor(copy.company.label, "company")}
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
            {labelFor("Phone", "phone")}
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            className={styles.input}
            placeholder="Your phone number"
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
            {topics.map((option, index) => (
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
            {topics.map((option) => (
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
            {labelFor("CV or LinkedIn link", "link")}
          </label>
          <input
            id={fieldId("link")}
            name="link"
            type="url"
            className={styles.input}
            placeholder="https://"
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
          Your details are used only to answer your enquiry and to refer it to the business
          concerned. See the <Link href="/privacy">privacy notice</Link>.
        </p>
      </div>

      <p ref={statusRef} tabIndex={-1} className={styles.status} role="alert">
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}
