"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
}

export function ImageUpload({
    value,
    onChange,
    label = "Upload image",
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const body = new FormData();
            body.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body });
            const json = (await res.json()) as { url?: string; error?: string };
            if (!res.ok || !json.url) {
                throw new Error(json.error ?? "Upload failed");
            }
            onChange(json.url);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    }

    function handleRemove() {
        onChange("");
        if (inputRef.current) inputRef.current.value = "";
    }

    return (
        <div className="space-y-2">
            {value ? (
                <div className="relative">
                    <div className="relative h-36 w-56 overflow-hidden rounded-lg border border-slate-200">
                        <Image
                            src={value}
                            alt="Uploaded image"
                            fill
                            className="object-cover"
                            sizes="224px"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600"
                    >
                        <X className="size-3.5" />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="flex w-xl h-72 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 text-sm text-slate-500 transition-colors hover:border-brand hover:text-brand disabled:opacity-60"
                >
                    {uploading ? (
                        <>
                            <Loader2 className="size-6 animate-spin" />
                            <span>Uploading…</span>
                        </>
                    ) : (
                        <>
                            <Upload className="size-6" />
                            <span>{label}</span>
                        </>
                    )}
                </button>
            )}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
}
