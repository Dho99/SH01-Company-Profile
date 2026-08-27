"use client";

import { useEffect, useRef } from "react";
import "trix";
import "trix/dist/trix.css";

declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            "trix-editor": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & { input?: string },
                HTMLElement
            >;
        }
    }
}

type TrixEditorElement = HTMLElement & {
    editor?: { loadHTML: (html: string) => void };
};

interface Props {
    id: string;
    value: string;
    onChange: (html: string) => void;
}

export function TrixEditor({ id, value, onChange }: Props) {
    const editorRef = useRef<TrixEditorElement>(null);

    useEffect(() => {
        const el = editorRef.current;
        if (el?.editor && value) el.editor.loadHTML(value);
        // only run on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handler = () => {
            const input = document.getElementById(
                id,
            ) as HTMLInputElement | null;
            if (input) onChange(input.value);
        };
        document.addEventListener("trix-change", handler);
        return () => document.removeEventListener("trix-change", handler);
    }, [id, onChange]);

    return (
        <div className="overflow-hidden rounded-md border border-input">
            <input type="hidden" id={id} defaultValue={value} />
            <trix-editor input={id} ref={editorRef} />
        </div>
    );
}
