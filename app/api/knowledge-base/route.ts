import { NextRequest, NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { buildKnowledgeBaseMarkdown } from "@/lib/knowledge-base";

export async function GET(request: NextRequest) {
    const ip = getClientIp(request);
    const limit = rateLimit(ip);

    if (!limit.ok) {
        const retryAfter = Math.max(
            1,
            Math.ceil((limit.resetAt - Date.now()) / 1000),
        );
        return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            {
                status: 429,
                headers: {
                    "Retry-After": String(retryAfter),
                    "X-RateLimit-Remaining": "0",
                },
            },
        );
    }

    const markdown = await buildKnowledgeBaseMarkdown();

    return new Response(markdown, {
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
            "X-RateLimit-Remaining": String(limit.remaining),
            "X-RateLimit-Reset": String(limit.resetAt),
        },
    });
}
