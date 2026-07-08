const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

// ponytail: in-memory, por instancia — no comparte estado entre lambdas frías,
// pero con Fluid Compute reutilizando instancias frena el abuso básico. Si el
// spam persiste, mover a Vercel Firewall (rate limit a nivel edge) o Upstash Redis.
export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(key, timestamps);

  // Evita que el Map crezca sin límite en una instancia de larga vida.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return false;
}
