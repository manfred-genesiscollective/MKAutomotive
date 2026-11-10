import { businesses } from "@/content/businesses";

import { ENQUIRY_FORMS, FIELD_NAMES, type EnquiryKind } from "./enquiry";
import type { EnquiryFormProps, FieldSettings } from "./enquiry-fields";

/**
 * What one enquiry form needs to draw itself, as plain values. Called by
 * the server components that place a form, so the form's own code never
 * has to import the site's content.
 */
export function enquiryFormProps(kind: EnquiryKind): EnquiryFormProps {
  const rules = ENQUIRY_FORMS[kind].fields;

  const fields: FieldSettings = {};
  for (const field of FIELD_NAMES) {
    const rule = rules[field];
    if (rule) fields[field] = { required: rule.required, max: rule.max };
  }

  return {
    kind,
    fields,
    topics: rules.topic?.options ? [...rules.topic.options] : undefined,
    // The contact form offers each business by name: /contact?topic=<slug> chooses it.
    preselect:
      kind === "contact"
        ? Object.fromEntries(businesses.map((business) => [business.slug, business.name]))
        : undefined,
  };
}
