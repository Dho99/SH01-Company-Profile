"use client";

import { useState } from "react";
import Image from "next/image";
import {
    X,
    Building2,
    BriefcaseBusiness,
    FolderKanban,
    PhoneCall,
    SendHorizontal,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { chatbotResponses } from "./chatbot-data";
import { ChatbotMessage } from "./chatbot-message";

type Props = {
    open: boolean;
    onClose: () => void;
};

export function ChatbotWindow({
    open,
    onClose,
}: Props) {
    const [chat, setChat] = useState(chatbotResponses.about);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                        scale: 0.95,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        y: 40,
                        scale: 0.95,
                    }}
                    transition={{
                        duration: 0.25,
                    }}
                    className="
                        fixed
                        bottom-28
                        right-6
                        z-[99]
                        flex
                        h-[500px]
                        w-[340px]
                        flex-col
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        shadow-2xl
                    "
                >
                    {/* Header */}
                    <div className="flex items-center justify-between bg-[#06122A] px-4 py-3 text-white">

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
                                <h3 className="font-semibold">
                                    LEXA Assistant
                                </h3>

                                <p className="flex items-center gap-2 text-xs text-white/70">
                                    <span className="h-2 w-2 rounded-full bg-green-400" />
                                    Online
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-md p-2 transition hover:bg-white/10"
                        >
                            <X className="h-5 w-5" />
                        </button>

                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto bg-slate-50 px-5 py-5">

                        <ChatbotMessage
                            title={chat.title}
                            message={chat.message}
                        />

                        {/* Quick Actions */}

                        <div className="space-y-3">

                            <button
                                onClick={() =>
                                    setChat(chatbotResponses.about)
                                }
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    px-3
                                    py-2.5
                                    text-left
                                    transition-all
                                    hover:border-[#0A66C2]
                                    hover:bg-blue-50
                                "
                            >
                                <Building2 className="h-5 w-5 text-[#0A66C2]" />

                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        Tentang LEXA
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Pelajari profil perusahaan
                                    </p>
                                </div>
                            </button>

                            <button
                                onClick={() =>
                                    setChat(chatbotResponses.services)
                                }
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    px-3
                                    py-2.5
                                    text-left
                                    transition-all
                                    hover:border-[#0A66C2]
                                    hover:bg-blue-50
                                "
                            >
                                <BriefcaseBusiness className="h-5 w-5 text-[#0A66C2]" />

                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        Layanan Kami
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Lihat seluruh layanan LEXA
                                    </p>
                                </div>
                            </button>

                            <button
                                onClick={() =>
                                    setChat(chatbotResponses.portfolio)
                                }
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    px-3
                                    py-2.5
                                    text-left
                                    transition-all
                                    hover:border-[#0A66C2]
                                    hover:bg-blue-50
                                "
                            >
                                <FolderKanban className="h-5 w-5 text-[#0A66C2]" />

                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        Portfolio
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Lihat project yang telah dikerjakan
                                    </p>
                                </div>
                            </button>

                            <button
                                onClick={() =>
                                    setChat(chatbotResponses.contact)
                                }
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    px-3
                                    py-2.5
                                    text-left
                                    transition-all
                                    hover:border-[#0A66C2]
                                    hover:bg-blue-50
                                "
                            >
                                <PhoneCall className="h-5 w-5 text-[#0A66C2]" />

                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        Hubungi Kami
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        WhatsApp, Email, dan informasi kontak
                                    </p>
                                </div>
                            </button>

                        </div>

                    </div>

                    {/* Footer */}

                    <div className="border-t border-slate-200 bg-white p-3">

                        <div className="flex items-center gap-2">

                            <input
                                type="text"
                                placeholder="Tulis pesan..."
                                className="
                                    flex-1
                                    rounded-lg
                                    border
                                    border-slate-300
                                    px-3
                                    py-2
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-[#0A66C2]
                                "
                            />

                            <button
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-[#0A66C2]
                                    text-white
                                    transition
                                    hover:bg-[#08529a]
                                "
                            >
                                <SendHorizontal className="h-5 w-5" />
                            </button>

                        </div>

                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}