import { NextResponse } from "next/server";

import { chatRequestSchema, chatResponseSchema } from "@/lib/chatbot/schemas";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const CHATBOT_API_URL = (
    process.env.CHATBOT_API_URL ??
    process.env.NEXT_PUBLIC_CHATBOT_URL ??
    "https://gianni-subvitalised-lauditorily.ngrok-free.dev"
).replace(/\/+$/, "");

const UPSTREAM_TIMEOUT_MS = 60_000;
const RATE_LIMIT_MAX = 20;

function jsonError(message: string, status: number, headers?: HeadersInit) {
    return NextResponse.json(
        { error: message },
        { status, headers: { "Cache-Control": "no-store", ...headers } },
    );
}

export async function POST(request: Request) {
    const ip = getClientIp(request);
    const limit = rateLimit(`chat:${ip}`, RATE_LIMIT_MAX);

    if (!limit.ok) {
        const retryAfter = Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000));

        return jsonError("Terlalu banyak pesan. Coba lagi sebentar.", 429, {
            "Retry-After": String(retryAfter),
        });
    }

    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return jsonError("Body permintaan tidak valid.", 400);
    }

    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
        return jsonError("Pesan tidak valid.", 400);
    }

    const { message, session_id, session_token } = parsed.data;

    try {
        const upstream = await fetch(`${CHATBOT_API_URL}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "1",
            },
            body: JSON.stringify({
                message,
                ...(session_id ? { session_id } : {}),
                ...(session_token ? { session_token } : {}),
            }),
            cache: "no-store",
            signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        });

        if (!upstream.ok) {
            console.error("[POST /api/chat] upstream status", upstream.status);

            if (upstream.status === 429) {
                return jsonError("Layanan chat sedang sibuk. Coba lagi sebentar.", 429);
            }

            return jsonError("Layanan chat sedang bermasalah. Coba lagi nanti.", 502);
        }

        const payload: unknown = await upstream.json();
        const result = chatResponseSchema.safeParse(payload);

        if (!result.success) {
            console.error("[POST /api/chat] invalid upstream response");
            return jsonError("Respons layanan chat tidak valid.", 502);
        }

        const references = [
            ...new Map(
                result.data.references.map((reference) => [
                    `${reference.source}\u0000${reference.title}`,
                    reference,
                ]),
            ).values(),
        ];

        return NextResponse.json(
            { ...result.data, references },
            { headers: { "Cache-Control": "no-store" } },
        );
    } catch (error) {
        const timedOut =
            error instanceof DOMException && error.name === "TimeoutError";

        console.error("[POST /api/chat]", error);

        return jsonError(
            timedOut
                ? "Layanan chat tidak merespons. Coba lagi."
                : "Gagal menghubungi layanan chat.",
            timedOut ? 504 : 502,
        );
    }
}
