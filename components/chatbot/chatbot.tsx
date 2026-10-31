"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ChatbotButton } from "./chatbot-button";
import { ChatbotPanel } from "./chatbot-panel";
import { ChatApiError, sendChatMessage } from "@/lib/chatbot/client";
import type { ChatMessage } from "@/lib/chatbot/types";

const STORAGE_KEY = "lexa-chat-session-v1";
const MAX_MESSAGES = 60;

type StoredSession = {
    sessionId: string;
    sessionToken: string;
    messages: ChatMessage[];
};

const EMPTY_SESSION: StoredSession = {
    sessionId: "",
    sessionToken: "",
    messages: [],
};

function createId() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function isChatMessage(value: unknown): value is ChatMessage {
    if (!value || typeof value !== "object") return false;

    const message = value as Partial<ChatMessage>;

    return (
        typeof message.id === "string" &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string"
    );
}

function loadSession(): StoredSession {
    if (typeof window === "undefined") return EMPTY_SESSION;

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return EMPTY_SESSION;

        const parsed = JSON.parse(raw) as Partial<StoredSession>;

        return {
            sessionId:
                typeof parsed.sessionId === "string" ? parsed.sessionId : "",
            sessionToken:
                typeof parsed.sessionToken === "string"
                    ? parsed.sessionToken
                    : "",
            messages: Array.isArray(parsed.messages)
                ? parsed.messages.filter(isChatMessage).slice(-MAX_MESSAGES)
                : [],
        };
    } catch {
        return EMPTY_SESSION;
    }
}

export function ChatBot() {
    const [initialSession] = useState(loadSession);
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>(
        initialSession.messages,
    );
    const [session, setSession] = useState({
        id: initialSession.sessionId,
        token: initialSession.sessionToken,
    });
    const [pending, setPending] = useState(false);
    const [retryText, setRetryText] = useState<string | null>(null);
    const inFlight = useRef(false);

    useEffect(() => {
        try {
            window.localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    sessionId: session.id,
                    sessionToken: session.token,
                    messages,
                }),
            );
        } catch {
            // Storage can be unavailable (private mode, quota); chat still works.
        }
    }, [messages, session]);

    const request = useCallback(
        async (text: string, appendUser: boolean) => {
            if (inFlight.current) return;

            inFlight.current = true;
            setPending(true);
            setRetryText(null);

            if (appendUser) {
                setMessages((prev) =>
                    [
                        ...prev,
                        { id: createId(), role: "user" as const, content: text },
                    ].slice(-MAX_MESSAGES),
                );
            }

            try {
                const data = await sendChatMessage({
                    message: text,
                    ...(session.id ? { session_id: session.id } : {}),
                    ...(session.token ? { session_token: session.token } : {}),
                });

                setSession({ id: data.session_id, token: data.session_token });
                setMessages((prev) =>
                    [
                        ...prev,
                        {
                            id: createId(),
                            role: "assistant" as const,
                            content: data.reply,
                            references: data.references,
                        },
                    ].slice(-MAX_MESSAGES),
                );
            } catch (error) {
                const content =
                    error instanceof ChatApiError
                        ? error.message
                        : "Terjadi kesalahan. Silakan coba lagi.";

                setMessages((prev) =>
                    [
                        ...prev,
                        {
                            id: createId(),
                            role: "assistant" as const,
                            content,
                            error: true,
                        },
                    ].slice(-MAX_MESSAGES),
                );
                setRetryText(text);
            } finally {
                inFlight.current = false;
                setPending(false);
            }
        },
        [session],
    );

    const send = useCallback(
        (text: string) => {
            if (pending) return;
            void request(text, true);
        },
        [pending, request],
    );

    const retry = useCallback(() => {
        if (!retryText || pending) return;
        void request(retryText, false);
    }, [pending, request, retryText]);

    const reset = useCallback(() => {
        setMessages([]);
        setSession({ id: "", token: "" });
        setRetryText(null);

        try {
            window.localStorage.removeItem(STORAGE_KEY);
        } catch {
            // Ignore storage failures on reset.
        }
    }, []);

    return (
        <>
            <ChatbotButton
                open={open}
                onClick={() => setOpen((prev) => !prev)}
            />

            <ChatbotPanel
                open={open}
                messages={messages}
                pending={pending}
                retryText={retryText}
                onSend={send}
                onRetry={retry}
                onReset={reset}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
