import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { businesses } from "./businesses";
import { careerInterests, contactTopics, partnershipOptions } from "./forms";
import { habits, partnerTypes, primaryNav, site } from "./site";

/*
 * The pages rely on these rules without checking them. A slip in a content
 * file should fail here, not show up as a broken page.
 */
describe("businesses", () => {
  it("has a unique slug and name for each business", () => {
    // Slugs are addresses; names are form choices and list keys.
    assert.equal(new Set(businesses.map((business) => business.slug)).size, businesses.length);
    assert.equal(new Set(businesses.map((business) => business.name)).size, businesses.length);
  });

  it("uses slugs that are safe in an address", () => {
    for (const business of businesses) assert.match(business.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  it("numbers the stages in order: 01, 02, 03 ...", () => {
    businesses.forEach((business, index) => {
      assert.equal(business.stage.number, String(index + 1).padStart(2, "0"), business.name);
    });
  });

  it("gives every open business a website, and no website to one in development", () => {
    for (const business of businesses) {
      if (business.status === "live") assert.match(business.url ?? "", /^https:\/\//, business.name);
      else assert.equal(business.url, undefined, business.name);
    }
  });

  it("shows each website's own domain", () => {
    for (const business of businesses) {
      if (business.url) assert.ok(new URL(business.url).hostname.endsWith(business.domain), business.name);
    }
  });

  it("puts the stages that follow the COE at the end of the list", () => {
    const first = businesses.findIndex((business) => business.stage.afterCoe);
    if (first === -1) return;
    for (const business of businesses.slice(first)) assert.equal(business.stage.afterCoe, true, business.name);
  });

  it("keeps the search description to one short sentence", () => {
    for (const business of businesses) {
      assert.ok(business.seo.length >= 50 && business.seo.length <= 155, `${business.name}: ${business.seo.length}`);
    }
  });

  it("fills in the wording every business page needs", () => {
    for (const business of businesses) {
      for (const text of [business.tagline, business.need, business.summary, business.intro, business.work, business.model, business.cta.heading, business.cta.text, business.cta.label]) {
        assert.ok(text.trim().length > 0, business.name);
      }
      assert.ok(business.description.length > 0, business.name);
      assert.ok(business.services.length > 0, business.name);
    }
  });

  it("leaves no placeholder contact details or straight apostrophes in the copy", () => {
    const copy = JSON.stringify({ businesses, habits, partnerTypes, site });
    assert.doesNotMatch(copy, /example\.com|0000 0000|lorem ipsum/i);
    assert.doesNotMatch(copy, /\w'\w/);
  });
});

describe("site", () => {
  it("keeps the home description short enough for search results", () => {
    assert.ok(site.description.length <= 160, String(site.description.length));
  });

  it("links to pages that exist", () => {
    const pages = ["/businesses", "/about", "/partners", "/careers", "/investors"];
    assert.deepEqual(primaryNav.map((item) => item.href), pages);
  });
});

describe("form choices", () => {
  it("offers every business in the contact and careers forms", () => {
    for (const business of businesses) {
      assert.ok(contactTopics.includes(business.name), business.name);
      assert.ok(careerInterests.includes(business.name), business.name);
    }
  });

  it("offers every partner type, with no duplicates in any list", () => {
    for (const type of partnerTypes) assert.ok(partnershipOptions.includes(type.title), type.title);
    for (const list of [contactTopics, partnershipOptions, careerInterests]) {
      assert.equal(new Set(list).size, list.length);
    }
  });
});
