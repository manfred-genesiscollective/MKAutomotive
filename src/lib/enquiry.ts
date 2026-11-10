/**
 * Enquiry forms: validation, the email that is sent, and delivery.
 *
 * Everything here is plain functions with no framework imports, so it can be
 * tested on its own (see enquiry.test.ts). The server action in
 * src/app/actions.ts is the only caller.
 */

import {
  careerInterests,
  contactTopics,
  partnershipOptions,
} from "../content/forms";

import {
  ENQUIRY_KINDS,
  FIELD_NAMES,
  type EnquiryKind,
  type FieldErrors,
  type FieldName,
  type FieldValues,
} from "./enquiry-fields";

export {
  ENQUIRY_KINDS,
  FIELD_NAMES,
  HONEYPOT_FIELD,
  type EnquiryKind,
  type EnquiryState,
  type FieldErrors,
  type FieldName,
  type FieldValues,
} from "./enquiry-fields";

type FieldRule = {
  /** Label used in the email that is sent. */
  label: string;
  required: boolean;
  max: number;
  type?: "email" | "url" | "multiline";
  /** When set, the value must be one of these. */
  options?: readonly string[];
  /** Message shown when a required field is empty. */
  missing: string;
};

type FormRules = Partial<Record<FieldName, FieldRule>>;

const name: FieldRule = {
  label: "Name",
  required: true,
  max: 120,
  missing: "Enter your name.",
};

const email: FieldRule = {
  label: "Email",
  required: true,
  max: 200,
  type: "email",
  missing: "Enter your email address.",
};

export const ENQUIRY_FORMS: Record<
  EnquiryKind,
  { title: string; fields: FormRules }
> = {
  contact: {
    title: "Contact enquiry",
    fields: {
      name,
      email,
      company: {
        label: "Company",
        required: false,
        max: 160,
        missing: "Enter your company name.",
      },
      topic: {
        label: "About",
        required: true,
        max: 80,
        options: contactTopics,
        missing: "Choose what this is about.",
      },
      message: {
        label: "Message",
        required: true,
        max: 4000,
        type: "multiline",
        missing: "Tell us how we can help.",
      },
    },
  },
  partners: {
    title: "Partnership enquiry",
    fields: {
      name,
      email,
      // Optional: private car owners are invited to use this form too.
      company: {
        label: "Company",
        required: false,
        max: 160,
        missing: "Enter your company name.",
      },
      topic: {
        label: "Partnership type",
        required: true,
        max: 80,
        options: partnershipOptions,
        missing: "Choose a partnership type.",
      },
      message: {
        label: "Message",
        required: true,
        max: 4000,
        type: "multiline",
        missing: "Tell us how you would like to work together.",
      },
    },
  },
  investors: {
    title: "Investor enquiry",
    fields: {
      name,
      email,
      company: {
        label: "Firm",
        required: false,
        max: 160,
        missing: "Enter your fund or firm name.",
      },
    },
  },
  careers: {
    title: "Careers application",
    fields: {
      name,
      email,
      phone: {
        label: "Phone",
        required: false,
        max: 40,
        missing: "Enter your phone number.",
      },
      topic: {
        label: "Business of interest",
        required: true,
        max: 80,
        options: careerInterests,
        missing: "Choose a business.",
      },
      link: {
        label: "CV or LinkedIn",
        required: false,
        max: 300,
        type: "url",
        missing: "Add a link to your CV or LinkedIn profile.",
      },
      message: {
        label: "Message",
        required: true,
        max: 4000,
        type: "multiline",
        missing: "Tell us what you do and what you are looking for.",
      },
    },
  },
};

export type Enquiry = { kind: EnquiryKind } & Partial<Record<FieldName, string>>;

export type ParseResult =
  | { ok: true; enquiry: Enquiry }
  | { ok: false; fieldErrors: FieldErrors; values: FieldValues };

export function isEnquiryKind(value: unknown): value is EnquiryKind {
  return (
    typeof value === "string" &&
    (ENQUIRY_KINDS as readonly string[]).includes(value)
  );
}

/*
 * Characters that are never shown but can change how text reads: control
 * characters, and invisible formatting such as the marks that reverse the
 * direction of the text after them. The two joiners that some scripts and
 * emoji need (U+200C, U+200D) are kept. Tab and newline are dealt with per
 * field below.
 */
const INVISIBLE = /(?![\t\n\u200C\u200D])[\p{Cc}\p{Cf}]/gu;

/*
 * A deliberately plain check: one @, no spaces or brackets, a local part
 * without stray dots, and a domain of dot-separated labels. It is not a full
 * RFC parser; the address is only ever used as the reply-to of an email.
 */
const EMAIL_PATTERN =
  /^[^\s@<>()[\],;:"\\.]+(?:\.[^\s@<>()[\],;:"\\.]+)*@[\p{L}\p{N}](?:[\p{L}\p{N}-]*[\p{L}\p{N}])?(?:\.[\p{L}\p{N}](?:[\p{L}\p{N}-]*[\p{L}\p{N}])?)+$/u;

function cleanLine(value: string): string {
  return value.normalize("NFC").replace(/\s+/g, " ").replace(INVISIBLE, "").trim();
}

function cleanText(value: string): string {
  return value
    .normalize("NFC")
    .replace(/\r\n?/g, "\n")
    .replace(INVISIBLE, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Reads and validates one submitted form. Accepts anything with a `get`
 * method, so it works with FormData in the browser and on the server.
 */
export function parseEnquiry(
  kind: EnquiryKind,
  data: { get(name: string): unknown },
): ParseResult {
  const rules = ENQUIRY_FORMS[kind].fields;
  const fieldErrors: FieldErrors = {};
  const values: FieldValues = {};

  for (const field of FIELD_NAMES) {
    const rule = rules[field];
    if (!rule) continue;

    const raw = data.get(field);
    const text = typeof raw === "string" ? raw : "";
    const value = rule.type === "multiline" ? cleanText(text) : cleanLine(text);
    /* Echo back what was typed so the form is not wiped on an error. */
    values[field] = value.slice(0, rule.max);

    if (!value) {
      if (rule.required) fieldErrors[field] = rule.missing;
      continue;
    }
    if (value.length > rule.max) {
      fieldErrors[field] = `Keep this under ${rule.max.toLocaleString("en-SG")} characters.`;
      continue;
    }
    if (rule.type === "email" && !EMAIL_PATTERN.test(value)) {
      fieldErrors[field] = "Enter a valid email address.";
      continue;
    }
    if (rule.type === "url" && !isHttpUrl(value)) {
      fieldErrors[field] = "Enter the full address, including https:// at the start.";
      continue;
    }
    if (rule.options && !rule.options.includes(value)) {
      fieldErrors[field] = rule.missing;
      continue;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors, values };
  }

  const enquiry: Enquiry = { kind };
  for (const field of FIELD_NAMES) {
    const value = values[field];
    if (rules[field] && value) enquiry[field] = value;
  }
  return { ok: true, enquiry };
}

/** The plain-text email sent to the group for one enquiry. */
export function formatEnquiryEmail(
  enquiry: Enquiry,
  context: { siteName: string; siteUrl: string; receivedAt: Date },
): { subject: string; text: string } {
  const form = ENQUIRY_FORMS[enquiry.kind];
  const lines: string[] = [
    `New enquiry from the ${context.siteName} website`,
    "",
    `Form: ${form.title}`,
  ];

  let message = "";
  for (const field of FIELD_NAMES) {
    const rule = form.fields[field];
    const value = enquiry[field];
    if (!rule || !value) continue;
    if (field === "message") {
      message = value;
      continue;
    }
    lines.push(`${rule.label}: ${value}`);
  }

  if (message) lines.push("", "Message:", message);

  lines.push(
    "",
    "--",
    `Sent from ${context.siteUrl} on ${context.receivedAt.toISOString()}`,
    "Reply to this email to answer the sender directly.",
  );

  const topic = enquiry.topic ? ` (${enquiry.topic})` : "";
  return {
    subject: `${form.title}${topic} from ${enquiry.name ?? "the website"}`,
    text: lines.join("\n"),
  };
}

export type EnquiryDeliveryConfig = {
  /** Resend API key. */
  apiKey: string;
  /** Verified sender, for example "MK Automotive Group <website@example.sg>". */
  from: string;
  /** One or more recipients. */
  to: string[];
};

/** Reads delivery settings from the environment. Null when not set up. */
export function readDeliveryConfig(
  env: Record<string, string | undefined>,
): EnquiryDeliveryConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const from = env.ENQUIRY_FROM_EMAIL?.trim();
  const to = (env.ENQUIRY_TO_EMAIL ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  if (!apiKey || !from || to.length === 0) return null;
  return { apiKey, from, to };
}

export type DeliveryResult =
  | { ok: true }
  | {
      ok: false;
      reason: "rejected" | "unreachable";
      /** For the server log. Never shown to the visitor. */
      detail: string;
      /** The HTTP status of a rejected request. */
      status?: number;
    };

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Sends one enquiry by email through Resend. Never throws. */
export async function deliverEnquiry(
  email: { subject: string; text: string; replyTo?: string },
  config: EnquiryDeliveryConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<DeliveryResult> {
  try {
    const response = await fetchImpl(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: config.to,
        subject: email.subject,
        text: email.text,
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      // The provider explains a refusal in the body: keep the start of it for the log.
      const body = (await response.text().catch(() => "")).replace(/\s+/g, " ").trim();
      return {
        ok: false,
        reason: "rejected",
        status: response.status,
        detail: `Resend responded with HTTP ${response.status}${body ? `: ${body.slice(0, 300)}` : ""}`,
      };
    }
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      reason: "unreachable",
      detail: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
