import {
    chatResponseSchema,
    type ChatRequest,
    type ChatResponse,
} from "./schemas";

export class ChatApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ChatApiError";
        this.status = status;
    }
}

export async function sendChatMessage(
    input: ChatRequest,
): Promise<ChatResponse> {
    let response: Response;

    try {
        response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
        });
    } catch {
        throw new ChatApiError(
            "Tidak dapat terhubung ke layanan chat. Periksa koneksi Anda.",
            0,
        );
    }

    const payload: unknown = await response.json().catch(() => null);

    if (!response.ok) {
        const message =
            payload &&
            typeof payload === "object" &&
            "error" in payload &&
            typeof payload.error === "string"
                ? payload.error
                : "Gagal mengirim pesan. Silakan coba lagi.";

        throw new ChatApiError(message, response.status);
    }

    const parsed = chatResponseSchema.safeParse(payload);

    if (!parsed.success) {
        throw new ChatApiError("Respons chat tidak valid.", 502);
    }

    return parsed.data;
}
