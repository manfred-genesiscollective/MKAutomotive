"use server";

import { site } from "@/content/site";
import {
  HONEYPOT_FIELD,
  deliverEnquiry,
  formatEnquiryEmail,
  isEnquiryKind,
  parseEnquiry,
  readDeliveryConfig,
  type EnquiryState,
} from "@/lib/enquiry";
import { getSiteUrl } from "@/lib/site-url";

const SEND_FAILED =
  "We could not send your message just now. Please try again in a few minutes.";

/** Handles every enquiry form on the site. */
export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const kind = formData.get("form");
  if (!isEnquiryKind(kind)) {
    return { status: "error", message: SEND_FAILED, fieldErrors: {}, values: {} };
  }

  // A filled honeypot means an automated submission. Report success so the
  // sender learns nothing, and send nothing.
  const trap = formData.get(HONEYPOT_FIELD);
  if (typeof trap === "string" && trap.trim() !== "") {
    return { status: "success" };
  }

  const parsed = parseEnquiry(kind, formData);
  if (!parsed.ok) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: parsed.fieldErrors,
      values: parsed.values,
    };
  }

  const { enquiry } = parsed;
  const email = formatEnquiryEmail(enquiry, {
    siteName: site.name,
    siteUrl: getSiteUrl(),
    receivedAt: new Date(),
  });

  const config = readDeliveryConfig(process.env);
  if (!config) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without email set up: show what would be sent.
      console.info(
        `[enquiry] Email delivery is not configured, so nothing was sent.\n\nSubject: ${email.subject}\n\n${email.text}\n`,
      );
      return { status: "success" };
    }
    console.error(
      "[enquiry] An enquiry could not be delivered: set RESEND_API_KEY, ENQUIRY_FROM_EMAIL and ENQUIRY_TO_EMAIL.",
    );
    return { status: "error", message: SEND_FAILED, fieldErrors: {}, values: enquiry };
  }

  const result = await deliverEnquiry(
    { ...email, replyTo: enquiry.email },
    config,
  );
  if (!result.ok) {
    console.error(`[enquiry] Delivery failed (${result.reason}): ${result.detail}`);
    return { status: "error", message: SEND_FAILED, fieldErrors: {}, values: enquiry };
  }

  return { status: "success" };
}
