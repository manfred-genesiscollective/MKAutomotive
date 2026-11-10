/**
 * A small brake on repeated submissions: at most `limit` events per key
 * within a sliding window.
 *
 * The counts live in memory. On a host that runs several copies of the
 * server, each copy keeps its own, so this slows a flood down without
 * stopping it outright. Put a firewall rule in front of it as well (see the
 * README).
 */
export type RateLimiter = {
  /** Records one event for `key` and says whether it is within the limit. */
  allow(key: string, limit: number, now?: number): boolean;
};

export function createRateLimiter(windowMs: number, maxKeys = 5000): RateLimiter {
  const events = new Map<string, number[]>();

  return {
    allow(key, limit, now = Date.now()) {
      const recent = (events.get(key) ?? []).filter((time) => now - time < windowMs);
      const allowed = recent.length < limit;
      if (allowed) recent.push(now);

      // Re-insert so the map stays ordered by most recent use.
      events.delete(key);
      if (recent.length > 0) events.set(key, recent);

      // Forget the keys that have been quiet longest once there are too many.
      while (events.size > maxKeys) {
        const oldest = events.keys().next().value;
        if (oldest === undefined) break;
        events.delete(oldest);
      }
      return allowed;
    },
  };
}
