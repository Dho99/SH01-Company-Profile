type Bucket = {
    count: number;
    resetAt: number;
};

const WINDOW_MS = 60_000;
const DEFAULT_MAX = Number(process.env.KNOWLEDGE_BASE_RATE_MAX ?? 30);

const store = new Map<string, Bucket>();

let sweepTimer: ReturnType<typeof setInterval> | null = null;

function sweep() {
    const now = Date.now();
    for (const [key, bucket] of store) {
        if (bucket.resetAt <= now) {
            store.delete(key);
        }
    }
}

function ensureSweeper() {
    if (sweepTimer === null) {
        sweepTimer = setInterval(sweep, 5 * 60_000);
        sweepTimer.unref?.();
    }
}

export type RateLimitResult = {
    ok: boolean;
    remaining: number;
    resetAt: number;
};

export function rateLimit(
    ip: string,
    max: number = DEFAULT_MAX,
    windowMs: number = WINDOW_MS,
): RateLimitResult {
    ensureSweeper();
    const now = Date.now();
    const bucket = store.get(ip);

    if (!bucket || bucket.resetAt <= now) {
        store.set(ip, { count: 1, resetAt: now + windowMs });
        return { ok: true, remaining: max - 1, resetAt: now + windowMs };
    }

    bucket.count += 1;
    if (bucket.count > max) {
        return { ok: false, remaining: 0, resetAt: bucket.resetAt };
    }

    return { ok: true, remaining: max - bucket.count, resetAt: bucket.resetAt };
}

export function getClientIp(request: Request): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
        const first = forwarded.split(",")[0]?.trim();
        if (first) return first;
    }
    const realIp = request.headers.get("x-real-ip");
    if (realIp) return realIp;
    return "unknown";
}
