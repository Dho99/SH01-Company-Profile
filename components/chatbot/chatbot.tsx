"use client";

import { useState } from "react";
import { ChatbotButton } from "./chatbot-button";
import { ChatbotWindow } from "./chatbot-window";

export function ChatBot() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <ChatbotButton
                open={open}
                onClick={() => setOpen((prev) => !prev)}
            />

            <ChatbotWindow
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}