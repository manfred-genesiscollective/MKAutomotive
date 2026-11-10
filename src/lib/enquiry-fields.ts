/**
 * The parts of the enquiry forms that the browser needs: field names, the
 * shape of a form's state, and the name of the hidden field.
 *
 * This file imports nothing, on purpose. The form runs in the browser, and
 * anything it imports is downloaded by every visitor. The rules themselves,
 * with the lists of choices, stay on the server in enquiry.ts and are handed
 * to the form as plain values (see enquiry-form-props.ts).
 */

export const ENQUIRY_KINDS = [
  "contact",
  "partners",
  "investors",
  "careers",
] as const;

export type EnquiryKind = (typeof ENQUIRY_KINDS)[number];

export const FIELD_NAMES = [
  "name",
  "email",
  "company",
  "phone",
  "topic",
  "link",
  "message",
] as const;

export type FieldName = (typeof FIELD_NAMES)[number];

export type FieldErrors = Partial<Record<FieldName, string>>;
export type FieldValues = Partial<Record<FieldName, string>>;

/** What the form shows after a submission. Returned by the server action. */
export type EnquiryState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors: FieldErrors;
      values: FieldValues;
    };

/**
 * Hidden field that people never see or fill in. Automated form-fillers
 * usually do, which lets the server drop their submissions quietly.
 */
export const HONEYPOT_FIELD = "referral_code";

/** What the browser is told about each field a form has. */
export type FieldSettings = Partial<Record<FieldName, { required: boolean; max: number }>>;

/** Everything one form needs, worked out on the server. */
export type EnquiryFormProps = {
  kind: EnquiryKind;
  fields: FieldSettings;
  /** The choices for the form's topic field, if it has one. */
  topics?: string[];
  /** Topic to choose for a link such as /contact?topic=<key>. */
  preselect?: Record<string, string>;
};
