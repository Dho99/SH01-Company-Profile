"use client";

import { useEffect, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

const MAX_LENGTH = 2000;

type Props = {
    open: boolean;
    disabled: boolean;
    onSend: (message: string) => void;
};

export function ChatbotInput({ open, disabled, onSend }: Props) {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (open) textareaRef.current?.focus();
    }, [open]);

    const resize = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    };

    const submit = () => {
        const text = value.trim();
        if (!text || disabled) return;

        onSend(text);
        setValue("");

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    return (
        <div className="border-t border-slate-200 bg-white px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="flex items-end gap-2">
                <textarea
                    ref={textareaRef}
                    value={value}
                    rows={1}
                    maxLength={MAX_LENGTH}
                    disabled={disabled}
                    placeholder="Tulis pesan..."
                    aria-label="Tulis pesan"
                    onChange={(event) => {
                        setValue(event.target.value);
                        resize();
                    }}
                    onKeyDown={(event) => {
                        if (
                            event.key === "Enter" &&
                            !event.shiftKey &&
                            !event.nativeEvent.isComposing
                        ) {
                            event.preventDefault();
                            submit();
                        }
                    }}
                    className="max-h-[120px] flex-1 resize-none rounded-xl border border-slate-300 px-3 py-2.5 text-sm leading-5 text-slate-900 outline-none transition focus:border-[#0A66C2] disabled:cursor-not-allowed disabled:bg-slate-50"
                />

                <button
                    type="button"
                    onClick={submit}
                    disabled={disabled || value.trim().length === 0}
                    aria-label="Kirim pesan"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0A66C2] text-white transition hover:bg-[#08529a] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <SendHorizontal className="h-5 w-5" />
                </button>
            </div>

            <div
                className={cn(
                    "mt-1.5 flex justify-between text-[11px] text-slate-400",
                    value.length < MAX_LENGTH - 200 && "invisible",
                )}
            >
                <span>Enter untuk kirim, Shift+Enter baris baru</span>
                <span>
                    {value.length}/{MAX_LENGTH}
                </span>
            </div>
        </div>
    );
}
