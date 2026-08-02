"use client";

import { MessageCircle, X } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
    open: boolean;
    onClick: () => void;
};

export function ChatbotButton({
    open,
    onClick,
}: Props) {
    return (
        <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="
                fixed
                bottom-6
                right-6
                z-[100]
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-[#0A66C2]
                text-white
                shadow-xl
                transition-colors
                hover:bg-[#08529a]
            "
        >
            {open ? (
                <X className="h-6 w-6" />
            ) : (
                <MessageCircle className="h-6 w-6" />
            )}
        </motion.button>
    );
}