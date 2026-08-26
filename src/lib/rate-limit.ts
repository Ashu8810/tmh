const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

export function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || record.expiresAt < now) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs });
    return true; // Allowed
  }

  if (record.count >= limit) {
    return false; // Blocked
  }

  record.count += 1;
  return true; // Allowed
}

// Cleanup function to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (record.expiresAt < now) {
      rateLimitMap.delete(key);
    }
  }
}, 60000); // Clean up every minute
