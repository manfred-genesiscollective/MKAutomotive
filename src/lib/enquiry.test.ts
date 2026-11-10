import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { contactTopics, partnershipOptions } from "../content/forms";
import {
  deliverEnquiry,
  formatEnquiryEmail,
  isEnquiryKind,
  parseEnquiry,
  readDeliveryConfig,
} from "./enquiry";

function form(fields: Record<string, string>) {
  return { get: (name: string) => fields[name] };
}

const validContact = {
  name: "Jane Tan",
  email: "jane@example.com",
  company: "Example Pte Ltd",
  topic: contactTopics[0],
  message: "We would like to talk about fleet rentals.",
};

describe("parseEnquiry", () => {
  it("accepts a complete contact enquiry", () => {
    const result = parseEnquiry("contact", form(validContact));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.deepEqual(result.enquiry, { kind: "contact", ...validContact });
  });

  it("leaves optional fields out when they are empty", () => {
    const result = parseEnquiry("contact", form({ ...validContact, company: "  " }));
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal("company" in result.enquiry, false);
  });

  it("reports every missing required field", () => {
    const result = parseEnquiry("contact", form({}));
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.deepEqual(Object.keys(result.fieldErrors).sort(), [
      "email",
      "message",
      "name",
      "topic",
    ]);
  });

  it("rejects a malformed email address and echoes back what was typed", () => {
    const result = parseEnquiry("contact", form({ ...validContact, email: "jane@" }));
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.equal(result.fieldErrors.email, "Enter a valid email address.");
    assert.equal(result.values.email, "jane@");
    assert.equal(result.values.name, "Jane Tan");
  });

  it("only accepts topics that the form offers", () => {
    const result = parseEnquiry("contact", form({ ...validContact, topic: "Free money" }));
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.ok(result.fieldErrors.topic);
  });

  it("rejects values over the length limit", () => {
    const result = parseEnquiry(
      "contact",
      form({ ...validContact, message: "x".repeat(4001) }),
    );
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.match(result.fieldErrors.message ?? "", /under 4,000 characters/);
    assert.equal(result.values.message?.length, 4000);
  });

  it("strips line breaks and control characters from single-line fields", () => {
    const result = parseEnquiry(
      "contact",
      form({ ...validContact, name: "Jane\r\nBcc: someone@example.com\u0000" }),
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.enquiry.name, "Jane Bcc: someone@example.com");
  });

  it("removes invisible characters that could disguise a name or a subject line", () => {
    const result = parseEnquiry(
      "contact",
      form({ ...validContact, name: "Jane\u202Eevil\u200B\u2066 Tan", message: "Hello\u202E there\u0007" }),
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.enquiry.name, "Janeevil Tan");
    assert.equal(result.enquiry.message, "Hello there");
  });

  it("accepts ordinary email addresses and rejects malformed ones", () => {
    const check = (address: string) =>
      parseEnquiry("contact", form({ ...validContact, email: address })).ok;
    for (const good of ["jane@example.com", "jane.tan+mk@mail.example.com.sg", "j_t@ex-ample.sg"]) {
      assert.equal(check(good), true, good);
    }
    for (const bad of ["a@b.c,", "x@y..z", "<a@b.co>", ".a@b.co", "a.@b.co", "a@-b.co", "a@b", "a b@c.co"]) {
      assert.equal(check(bad), false, bad);
    }
  });

  it("keeps paragraphs in the message but tidies them", () => {
    const result = parseEnquiry(
      "contact",
      form({ ...validContact, message: "  First line.\r\n\r\n\r\n\r\nSecond line.  " }),
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.enquiry.message, "First line.\n\nSecond line.");
  });

  it("ignores fields that a form does not have", () => {
    const result = parseEnquiry(
      "investors",
      form({
        name: "Sam Lee",
        email: "sam@fund.example",
        company: "Example Capital",
        message: "should be ignored",
        topic: "should be ignored",
      }),
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.deepEqual(result.enquiry, {
      kind: "investors",
      name: "Sam Lee",
      email: "sam@fund.example",
      company: "Example Capital",
    });
  });

  it("accepts a partners enquiry without a company, as a private car owner would send", () => {
    const result = parseEnquiry(
      "partners",
      form({
        name: "Sam Lee",
        email: "sam@example.com",
        topic: partnershipOptions[0],
        message: "Hello",
      }),
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal("company" in result.enquiry, false);
  });

  it("still requires a partnership type and a message on the partners form", () => {
    const result = parseEnquiry("partners", form({ name: "Sam Lee", email: "sam@example.com" }));
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.deepEqual(Object.keys(result.fieldErrors).sort(), ["message", "topic"]);
  });

  it("only accepts http and https links on the careers form", () => {
    const base = {
      name: "Sam Lee",
      email: "sam@example.com",
      topic: "Not sure yet",
      message: "I have ten years in fleet operations.",
    };
    const bad = parseEnquiry("careers", form({ ...base, link: "javascript:alert(1)" }));
    assert.equal(bad.ok, false);
    const good = parseEnquiry(
      "careers",
      form({ ...base, link: "https://www.linkedin.com/in/example" }),
    );
    assert.equal(good.ok, true);
  });

  it("treats non-string values, such as uploaded files, as empty", () => {
    const result = parseEnquiry("investors", {
      get: (field: string) => (field === "name" ? { size: 10 } : "x@example.com"),
    });
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.ok(result.fieldErrors.name);
  });
});

describe("isEnquiryKind", () => {
  it("recognises the four forms and nothing else", () => {
    assert.equal(isEnquiryKind("contact"), true);
    assert.equal(isEnquiryKind("careers"), true);
    assert.equal(isEnquiryKind("admin"), false);
    assert.equal(isEnquiryKind(null), false);
  });
});

describe("formatEnquiryEmail", () => {
  const context = {
    siteName: "MK Automotive Group",
    siteUrl: "https://example.sg",
    receivedAt: new Date("2026-11-10T04:00:00.000Z"),
  };

  it("puts the form, topic and sender in the subject", () => {
    const email = formatEnquiryEmail({ kind: "contact", ...validContact }, context);
    assert.equal(
      email.subject,
      `Contact enquiry (${contactTopics[0]}) from Jane Tan`,
    );
  });

  it("lists the fields with the labels of that form", () => {
    const email = formatEnquiryEmail(
      { kind: "investors", name: "Sam Lee", email: "sam@fund.example", company: "Example Capital" },
      context,
    );
    assert.match(email.text, /^Form: Investor enquiry$/m);
    assert.match(email.text, /^Firm: Example Capital$/m);
    assert.match(email.text, /^Email: sam@fund\.example$/m);
    assert.doesNotMatch(email.text, /Message:/);
    assert.match(email.text, /Sent from https:\/\/example\.sg on 2026-11-10T04:00:00\.000Z/);
  });

  it("puts the message last, on its own lines", () => {
    const email = formatEnquiryEmail({ kind: "contact", ...validContact }, context);
    assert.match(email.text, /\n\nMessage:\nWe would like to talk about fleet rentals\.\n/);
  });
});

describe("readDeliveryConfig", () => {
  it("returns null until every setting is present", () => {
    assert.equal(readDeliveryConfig({}), null);
    assert.equal(
      readDeliveryConfig({ RESEND_API_KEY: "key", ENQUIRY_FROM_EMAIL: "a@example.sg" }),
      null,
    );
    assert.equal(
      readDeliveryConfig({
        RESEND_API_KEY: "key",
        ENQUIRY_FROM_EMAIL: "a@example.sg",
        ENQUIRY_TO_EMAIL: " , ",
      }),
      null,
    );
  });

  it("splits several recipients", () => {
    assert.deepEqual(
      readDeliveryConfig({
        RESEND_API_KEY: " key ",
        ENQUIRY_FROM_EMAIL: "MK <web@example.sg>",
        ENQUIRY_TO_EMAIL: "one@example.sg, two@example.sg",
      }),
      {
        apiKey: "key",
        from: "MK <web@example.sg>",
        to: ["one@example.sg", "two@example.sg"],
      },
    );
  });
});

describe("deliverEnquiry", () => {
  const config = { apiKey: "key_123", from: "MK <web@example.sg>", to: ["hello@example.sg"] };
  const email = { subject: "Subject", text: "Body", replyTo: "jane@example.com" };

  it("posts the email to Resend with the sender as reply-to", async () => {
    const calls: { url: string; init: RequestInit }[] = [];
    const fakeFetch = (async (url: string | URL | Request, init?: RequestInit) => {
      calls.push({ url: String(url), init: init ?? {} });
      return new Response(JSON.stringify({ id: "1" }), { status: 200 });
    }) as typeof fetch;

    const result = await deliverEnquiry(email, config, fakeFetch);

    assert.deepEqual(result, { ok: true });
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://api.resend.com/emails");
    assert.equal(calls[0].init.method, "POST");
    const headers = calls[0].init.headers as Record<string, string>;
    assert.equal(headers.Authorization, "Bearer key_123");
    assert.deepEqual(JSON.parse(String(calls[0].init.body)), {
      from: "MK <web@example.sg>",
      to: ["hello@example.sg"],
      subject: "Subject",
      text: "Body",
      reply_to: "jane@example.com",
    });
  });

  it("reports a rejected request without throwing, with the provider's reason for the log", async () => {
    const fakeFetch = (async () =>
      new Response('{"message":"Invalid `reply_to` field."}', { status: 422 })) as typeof fetch;
    const result = await deliverEnquiry(email, config, fakeFetch);
    assert.deepEqual(result, {
      ok: false,
      reason: "rejected",
      status: 422,
      detail: 'Resend responded with HTTP 422: {"message":"Invalid `reply_to` field."}',
    });
  });

  it("reports a network failure without throwing", async () => {
    const fakeFetch = (async () => {
      throw new Error("socket hang up");
    }) as typeof fetch;
    const result = await deliverEnquiry(email, config, fakeFetch);
    assert.deepEqual(result, { ok: false, reason: "unreachable", detail: "socket hang up" });
  });
});
