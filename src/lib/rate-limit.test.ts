import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createRateLimiter } from "./rate-limit";

describe("createRateLimiter", () => {
  it("allows up to the limit within the window, then refuses", () => {
    const limiter = createRateLimiter(60_000);
    assert.equal(limiter.allow("a", 2, 0), true);
    assert.equal(limiter.allow("a", 2, 1_000), true);
    assert.equal(limiter.allow("a", 2, 2_000), false);
  });

  it("counts each key on its own", () => {
    const limiter = createRateLimiter(60_000);
    assert.equal(limiter.allow("a", 1, 0), true);
    assert.equal(limiter.allow("b", 1, 0), true);
    assert.equal(limiter.allow("a", 1, 1), false);
  });

  it("lets events through again once the window has passed", () => {
    const limiter = createRateLimiter(60_000);
    assert.equal(limiter.allow("a", 1, 0), true);
    assert.equal(limiter.allow("a", 1, 59_999), false);
    assert.equal(limiter.allow("a", 1, 60_000), true);
  });

  it("does not count refused events against the sender", () => {
    const limiter = createRateLimiter(60_000);
    assert.equal(limiter.allow("a", 1, 0), true);
    for (let time = 1; time < 50; time++) assert.equal(limiter.allow("a", 1, time), false);
    assert.equal(limiter.allow("a", 1, 60_000), true);
  });

  it("forgets the quietest keys once it holds too many", () => {
    const limiter = createRateLimiter(60_000, 2);
    assert.equal(limiter.allow("a", 1, 0), true);
    assert.equal(limiter.allow("b", 1, 1), true);
    assert.equal(limiter.allow("c", 1, 2), true);
    // "a" was dropped to make room, so it starts again.
    assert.equal(limiter.allow("a", 1, 3), true);
  });
});
