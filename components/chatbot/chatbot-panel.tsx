"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
    BriefcaseBusiness,
    Building2,
    FolderKanban,
    PhoneCall,
    RotateCcw,
    X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { ChatbotInput } from "./chatbot-input";
import { ChatbotMessage } from "./chatbot-message";
import type { ChatMessage } from "@/lib/chatbot/types";

const QUICK_ACTIONS = [
    {
        label: "Tentang LEXA",
        description: "Kenali perusahaan kami",
        message: "Tentang LEXA Software House itu apa?",
        icon: Building2,
    },
    {
        label: "Layanan Kami",
        description: "Solusi yang tersedia",
        message: "Layanan apa saja yang tersedia di LEXA?",
        icon: BriefcaseBusiness,
    },
    {
        label: "Portfolio",
        description: "Project yang dikerjakan",
        message: "Project apa saja yang sudah dikerjakan LEXA?",
        icon: FolderKanban,
    },
    {
        label: "Hubungi Kami",
        description: "Kontak dan lokasi",
        message: "Bagaimana cara menghubungi LEXA?",
        icon: PhoneCall,
    },
];

type Props = {
    open: boolean;
    messages: ChatMessage[];
    pending: boolean;
    retryText: string | null;
    onSend: (message: string) => void;
    onRetry: () => void;
    onReset: () => void;
    onClose: () => void;
};

export function ChatbotPanel({
    open,
    messages,
    pending,
    retryText,
    onSend,
    onRetry,
    onReset,
    onClose,
}: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onClose, open]);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }, [messages, pending]);

    return (
        <AnimatePresence>
            {open && (
                <motion.section
                    id="lexa-chat-panel"
                    role="dialog"
                    aria-label="LEXA Assistant"
                    initial={{ opacity: 0, y: 32, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 24, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="fixed inset-0 z-[95] flex flex-col overflow-hidden bg-white sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[600px] sm:max-h-[calc(100dvh-8rem)] sm:w-[380px] sm:rounded-2xl sm:border sm:border-slate-200 sm:shadow-2xl"
                >
                    <header className="flex items-center justify-between gap-3 bg-[#06122A] px-4 py-3 text-white">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                                <Image
                                    src="/logo.png"
                                    alt="LEXA"
                                    width={26}
                                    height={26}
                                />
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold">
                                    LEXA Assistant
                                </h2>
                                <p className="flex items-center gap-2 text-xs text-white/70">
                                    <span className="h-2 w-2 rounded-full bg-green-400" />
                                    {pending ? "Mengetik..." : "Online"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={onReset}
                                disabled={messages.length === 0 || pending}
                                aria-label="Mulai chat baru"
                                title="Mulai chat baru"
                                className="rounded-md p-2 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <RotateCcw className="h-4 w-4" />
                            </button>

                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Tutup chat"
                                className="rounded-md p-2 transition hover:bg-white/10"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </header>

                    <div
                        ref={scrollRef}
                        aria-live="polite"
                        className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-4 py-5"
                    >
                        {messages.length === 0 ? (
                            <div className="space-y-4">
                                <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-slate-200 bg-white p-4 shadow-sm">
                                    <p className="text-sm leading-6 text-slate-700">
                                        Halo! Saya asisten LEXA Software
                                        House. Tanya apa saja soal layanan,
                                        portfolio, atau cara menghubungi kami.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    {QUICK_ACTIONS.map((action) => {
                                        const Icon = action.icon;

                                        return (
                                            <button
                                                key={action.label}
                                                type="button"
                                                onClick={() =>
                                                    onSend(action.message)
                                                }
                                                disabled={pending}
                                                className="rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-[#0A66C2] hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                <Icon className="mb-2 h-5 w-5 text-[#0A66C2]" />
                                                <span className="block text-xs font-semibold text-slate-900">
                                                    {action.label}
                                                </span>
                                                <span className="mt-0.5 block text-[11px] leading-4 text-slate-500">
                                                    {action.description}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            messages.map((message, index) => (
                                <ChatbotMessage
                                    key={message.id}
                                    message={message}
                                    showRetry={
                                        Boolean(retryText) &&
                                        !pending &&
                                        index === messages.length - 1
                                    }
                                    onRetry={onRetry}
                                />
                            ))
                        )}

                        {pending && (
                            <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm w-fit">
                                {[0, 150, 300].map((delay) => (
                                    <span
                                        key={delay}
                                        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                                        style={{
                                            animationDelay: `${delay}ms`,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <ChatbotInput
                        open={open}
                        disabled={pending}
                        onSend={onSend}
                    />
                </motion.section>
            )}
        </AnimatePresence>
    );
}
