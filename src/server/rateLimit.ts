/* =========================================================
   Rate Limiter – Next.js App Router Friendly
   ========================================================= */

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetTime: number;
}

export interface RateLimitOptions {
    windowMs: number;      // Time window in ms
    maxRequests: number;   // Max requests per window
    message?: string;
}

interface RequestRecord {
    count: number;
    resetTime: number;
}

/* =========================================================
   Core RateLimiter Class
   ========================================================= */
export class RateLimiter {
    private requests = new Map<string, RequestRecord>();

    constructor(private options: RateLimitOptions) { }

    check(key: string): RateLimitResult {
        const now = Date.now();
        const record = this.requests.get(key);

        // New window or expired
        if (!record || now > record.resetTime) {
            this.requests.set(key, {
                count: 1,
                resetTime: now + this.options.windowMs,
            });

            return {
                allowed: true,
                remaining: this.options.maxRequests - 1,
                resetTime: now + this.options.windowMs,
            };
        }

        // Limit exceeded
        if (record.count >= this.options.maxRequests) {
            return {
                allowed: false,
                remaining: 0,
                resetTime: record.resetTime,
            };
        }

        // Increment
        record.count++;

        return {
            allowed: true,
            remaining: this.options.maxRequests - record.count,
            resetTime: record.resetTime,
        };
    }

    cleanup() {
        const now = Date.now();
        for (const [key, record] of this.requests.entries()) {
            if (now > record.resetTime) {
                this.requests.delete(key);
            }
        }
    }
}

/* =========================================================
   Global Limiters
   ========================================================= */

// 🔐 Auth (login, register, reset password, etc.)
export const authRateLimiter = new RateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    message: "Too many authentication attempts. Please try again later.",
});

// 🌐 General API
export const apiRateLimiter = new RateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
    message: "Too many requests. Please try again later.",
});

/* =========================================================
   Cleanup Old Records (Prevent Memory Leak)
   ========================================================= */
setInterval(() => {
    authRateLimiter.cleanup();
    apiRateLimiter.cleanup();
}, 5 * 60 * 1000);

/* =========================================================
   withRateLimit – App Router Middleware Wrapper
   ========================================================= */
export function withRateLimit(
    handler: (req: Request) => Promise<Response>,
    options: {
        limiter: RateLimiter;
        keyGenerator?: (req: Request) => string;
    }
) {
    return async (req: Request): Promise<Response> => {
        const key =
            options.keyGenerator?.(req) ??
            req.headers.get("x-forwarded-for")?.split(",")[0] ??
            "anonymous";

        const result = options.limiter.check(key);

        if (!result.allowed) {
            const retryAfter = Math.ceil(
                (result.resetTime - Date.now()) / 1000
            );

            return new Response(
                JSON.stringify({
                    error: "Too many requests",
                    retryAfter,
                }),
                {
                    status: 429,
                    headers: {
                        "Content-Type": "application/json",
                        "Retry-After": retryAfter.toString(),
                    },
                }
            );
        }

        const response = await handler(req);

        response.headers.set(
            "X-RateLimit-Remaining",
            result.remaining.toString()
        );

        return response;
    };
}

/* =========================================================
   Ready-to-use Config Objects (Recommended)
   ========================================================= */

export const authRateLimitOptions = {
    limiter: authRateLimiter,
    keyGenerator: (req: Request) =>
        req.headers.get("x-forwarded-for")?.split(",")[0] ??
        "anonymous",
};

export const apiRateLimitOptions = {
    limiter: apiRateLimiter,
};
