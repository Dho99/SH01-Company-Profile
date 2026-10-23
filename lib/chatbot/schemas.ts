import { z } from "zod";

export const chatRequestSchema = z.object({
    message: z.string().trim().min(1, "Pesan tidak boleh kosong").max(2000),
    session_id: z.string().min(1).max(128).optional(),
    session_token: z.string().min(1).max(256).optional(),
});

export const chatReferenceSchema = z.object({
    source: z.string(),
    title: z.string(),
});

export const chatResponseSchema = z.object({
    reply: z.string(),
    session_id: z.string(),
    session_token: z.string(),
    references: z.array(chatReferenceSchema).default([]),
});

export type ChatRequest = z.input<typeof chatRequestSchema>;
export type ChatReference = z.infer<typeof chatReferenceSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
