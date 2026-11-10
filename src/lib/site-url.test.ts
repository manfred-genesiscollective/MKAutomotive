import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import { getSiteUrl, isIndexable } from "./site-url";

const KEYS = ["NEXT_PUBLIC_SITE_URL", "VERCEL_PROJECT_PRODUCTION_URL"] as const;
const saved = Object.fromEntries(KEYS.map((key) => [key, process.env[key]]));

function withAddress(values: Partial<Record<(typeof KEYS)[number], string>>) {
  for (const key of KEYS) {
    if (values[key] === undefined) delete process.env[key];
    else process.env[key] = values[key];
  }
}

afterEach(() => {
  for (const key of KEYS) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
});

describe("getSiteUrl", () => {
  it("uses the address that was set, without a trailing slash", () => {
    withAddress({ NEXT_PUBLIC_SITE_URL: "https://www.example.sg/" });
    assert.equal(getSiteUrl(), "https://www.example.sg");
  });

  it("adds https:// when only a domain was given", () => {
    withAddress({ NEXT_PUBLIC_SITE_URL: "example.sg" });
    assert.equal(getSiteUrl(), "https://example.sg");
  });

  it("falls back to the domain Vercel reports", () => {
    withAddress({ VERCEL_PROJECT_PRODUCTION_URL: "example.vercel.app" });
    assert.equal(getSiteUrl(), "https://example.vercel.app");
  });

  it("falls back to localhost when nothing is set", () => {
    withAddress({});
    assert.equal(getSiteUrl(), "http://localhost:3000");
  });
});

describe("isIndexable", () => {
  it("keeps a site on a vercel.app address out of search engines", () => {
    withAddress({ VERCEL_PROJECT_PRODUCTION_URL: "example.vercel.app" });
    assert.equal(isIndexable(), false);
  });

  it("keeps a local copy out of search engines", () => {
    withAddress({});
    assert.equal(isIndexable(), false);
  });

  it("lets a site on its own domain be listed", () => {
    withAddress({ VERCEL_PROJECT_PRODUCTION_URL: "www.example.sg" });
    assert.equal(isIndexable(), true);
    withAddress({ NEXT_PUBLIC_SITE_URL: "https://example.sg" });
    assert.equal(isIndexable(), true);
  });

  it("is not fooled by a domain that merely contains vercel.app", () => {
    withAddress({ NEXT_PUBLIC_SITE_URL: "https://vercel.app.example.sg" });
    assert.equal(isIndexable(), true);
  });
});
