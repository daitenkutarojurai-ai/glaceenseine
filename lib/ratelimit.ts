// Lightweight per-IP token bucket. In-memory — fine for a small site on a
// single Vercel function instance. Resets on cold start (which actually helps
// limit memory growth). For multi-region or higher traffic, replace with Upstash.

type Bucket = { hits: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  // On Vercel the real client IP is appended last by the edge proxy — read
  // the last entry so a spoofed X-Forwarded-For header can't bypass limits.
  if (xff) return xff.split(",").at(-1)!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "anon";
}

/**
 * Returns true when the request is allowed, false when it should be rejected
 * with a 429. `windowMs` is the rolling window, `max` the cap inside it.
 */
export function rateLimit(
  key: string,
  { windowMs = 60_000, max = 5 }: { windowMs?: number; max?: number } = {},
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    buckets.set(key, { hits: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  if (b.hits >= max) {
    return { ok: false, retryAfter: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.hits++;
  return { ok: true, retryAfter: 0 };
}

// Best-effort GC: if the map grows beyond ~5k entries, drop expired buckets.
// Cheap to call, costs nothing when the map is small.
export function gcBuckets() {
  if (buckets.size < 5000) return;
  const now = Date.now();
  for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
}
