"use client";

import { MessageCircle, X } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type Props = {
    open: boolean;
    onClick: () => void;
};

export function ChatbotButton({ open, onClick }: Props) {
    return (
        <motion.button
            type="button"
            aria-label={open ? "Tutup chat" : "Buka chat"}
            aria-expanded={open}
            aria-controls="lexa-chat-panel"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={cn(
                "fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#0A66C2] text-white shadow-xl transition-all duration-200 hover:bg-[#08529a]",
                open && "max-sm:pointer-events-none max-sm:opacity-0",
            )}
        >
            {open ? (
                <X className="h-6 w-6" />
            ) : (
                <MessageCircle className="h-6 w-6" />
            )}
        </motion.button>
    );
}
