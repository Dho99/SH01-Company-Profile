"use client";

import dynamic from "next/dynamic";

const ChatBot = dynamic(() => import("./chatbot").then((m) => m.ChatBot), {
    ssr: false,
});

export function ChatBotLazy() {
    return <ChatBot />;
}
