"use server";

import { headers } from "next/headers";

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
import { createRateLimiter } from "@/lib/rate-limit";
import { getSiteUrl } from "@/lib/site-url";

const SEND_FAILED =
  "We could not send your message just now. Please try again in a few minutes.";
const TOO_MANY =
  "Too many messages have been sent from your connection. Please try again in a few minutes.";

/*
 * A brake on automated submissions: each enquiry that would be emailed is
 * counted, per sender and overall, over ten minutes. ENQUIRY_RATE_LIMIT
 * changes the per-sender figure (the overall cap is twelve times that).
 */
const WINDOW_MS = 10 * 60 * 1000;
const limiter = createRateLimiter(WINDOW_MS);

function limits(): { perSender: number; overall: number } {
  const configured = Number.parseInt(process.env.ENQUIRY_RATE_LIMIT ?? "", 10);
  const perSender = Number.isFinite(configured) && configured > 0 ? configured : 5;
  return { perSender, overall: perSender * 12 };
}

/** The visitor's address as reported by the host, used only to count submissions. */
async function senderKey(): Promise<string> {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || requestHeaders.get("x-real-ip")?.trim() || "unknown";
}

/** Handles every enquiry form on the site. */
export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // A server action can be called with anything, not only by the forms.
  if (!(formData instanceof FormData)) {
    return { status: "error", message: SEND_FAILED, fieldErrors: {}, values: {} };
  }

  const kind = formData.get("form");
  if (!isEnquiryKind(kind)) {
    return { status: "error", message: SEND_FAILED, fieldErrors: {}, values: {} };
  }

  // A filled honeypot means an automated submission. Report success so the
  // sender learns nothing, and send nothing.
  const trap = formData.get(HONEYPOT_FIELD);
  if (typeof trap === "string" && trap.trim() !== "") {
    console.warn("[enquiry] Dropped a submission that filled the hidden field.");
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

  const { perSender, overall } = limits();
  const sender = await senderKey();
  if (!limiter.allow(`sender:${sender}`, perSender) || !limiter.allow("all", overall)) {
    console.warn("[enquiry] Refused a submission: over the rate limit.");
    return { status: "error", message: TOO_MANY, fieldErrors: {}, values: enquiry };
  }

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
    // 422 is the provider refusing the request as written. The one part of
    // it that comes from the visitor is their address, used as the reply-to.
    if (result.status === 422) {
      return {
        status: "error",
        message: "Please check the highlighted fields and try again.",
        fieldErrors: { email: "This address was not accepted. Check it and try again." },
        values: enquiry,
      };
    }
    return { status: "error", message: SEND_FAILED, fieldErrors: {}, values: enquiry };
  }

  return { status: "success" };
}
