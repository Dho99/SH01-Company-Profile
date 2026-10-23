import type { ChatReference } from "./schemas";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
    id: string;
    role: ChatRole;
    content: string;
    references?: ChatReference[];
    error?: boolean;
};
