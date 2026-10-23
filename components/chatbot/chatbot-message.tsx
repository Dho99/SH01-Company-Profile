"use client";

import Image from "next/image";
import { AlertCircle, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { ChatMessage } from "@/lib/chatbot/types";

type Props = {
    message: ChatMessage;
    showRetry: boolean;
    onRetry: () => void;
};

const markdownComponents = {
    p: ({ children }: { children?: React.ReactNode }) => (
        <p className="mb-2 leading-6 last:mb-0">{children}</p>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
        <ul className="mb-2 list-disc space-y-1 pl-4 last:mb-0">
            {children}
        </ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
        <ol className="mb-2 list-decimal space-y-1 pl-4 last:mb-0">
            {children}
        </ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
        <li className="leading-6">{children}</li>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
        <strong className="font-semibold text-slate-900">{children}</strong>
    ),
    a: ({ children, href }: { children?: React.ReactNode; href?: string }) => (
        <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="break-words text-[#0A66C2] underline underline-offset-2"
        >
            {children}
        </a>
    ),
    h1: ({ children }: { children?: React.ReactNode }) => (
        <h3 className="mb-1 text-sm font-semibold text-slate-900">
            {children}
        </h3>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
        <h3 className="mb-1 text-sm font-semibold text-slate-900">
            {children}
        </h3>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
        <h4 className="mb-1 text-sm font-semibold text-slate-900">
            {children}
        </h4>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
        <code className="rounded bg-slate-100 px-1 py-0.5 text-[0.85em] text-slate-800">
            {children}
        </code>
    ),
    pre: ({ children }: { children?: React.ReactNode }) => (
        <pre className="mb-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs leading-5 text-slate-100">
            {children}
        </pre>
    ),
    hr: () => <hr className="my-3 border-slate-200" />,
    table: ({ children }: { children?: React.ReactNode }) => (
        <div className="mb-2 overflow-x-auto">
            <table className="w-full border-collapse text-xs">{children}</table>
        </div>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
        <th className="border border-slate-200 bg-slate-100 px-2 py-1 text-left font-semibold">
            {children}
        </th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => (
        <td className="border border-slate-200 px-2 py-1">{children}</td>
    ),
};

export function ChatbotMessage({ message, showRetry, onRetry }: Props) {
    if (message.role === "user") {
        return (
            <div className="flex justify-end">
                <div className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-br-md bg-[#0A66C2] px-4 py-2.5 text-sm leading-6 text-white">
                    {message.content}
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-start gap-2.5">
            <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white">
                <Image src="/logo.png" alt="" width={16} height={16} />
            </div>

            <div
                className={
                    message.error
                        ? "max-w-[85%] rounded-2xl rounded-bl-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                        : "max-w-[85%] rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
                }
            >
                {message.error ? (
                    <div className="space-y-2">
                        <p className="flex items-start gap-2 leading-6">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                            {message.content}
                        </p>

                        {showRetry && (
                            <button
                                type="button"
                                onClick={onRetry}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 bg-white px-2.5 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100"
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Coba lagi
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="break-words">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={markdownComponents}
                        >
                            {message.content}
                        </ReactMarkdown>
                    </div>
                )}

                {message.references && message.references.length > 0 && (
                    <details className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs">
                        <summary className="cursor-pointer font-medium text-slate-600">
                            Sumber ({message.references.length})
                        </summary>

                        <ul className="mt-2 space-y-1.5">
                            {message.references.map((reference) => (
                                <li
                                    key={`${reference.source}-${reference.title}`}
                                    className="text-slate-500"
                                >
                                    <span className="font-medium text-slate-700">
                                        {reference.title}
                                    </span>
                                    <span className="block break-all text-[11px] text-slate-400">
                                        {reference.source}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </details>
                )}
            </div>
        </div>
    );
}
