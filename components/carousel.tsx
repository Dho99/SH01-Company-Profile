"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselProps = {
    children: React.ReactNode;
    trackClassName?: string;
    wrapperClassName?: string;
    variant?: "floating" | "header";
    header?: React.ReactNode;
    headerClassName?: string;
    arrowsClassName?: string;
};

export function Carousel({
    children,
    trackClassName,
    wrapperClassName,
    variant = "floating",
    header,
    headerClassName,
    arrowsClassName,
}: CarouselProps) {
    const trackRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        const el = trackRef.current;
        if (!el) return;
        const amount = el.clientWidth * 0.8;
        el.scrollBy({
            left: dir === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    const floating = variant === "floating";

    const arrows = (
        <div className={arrowsClassName}>
            <ArrowBtn
                dir="left"
                onClick={() => scroll("left")}
                floating={floating}
            />
            <ArrowBtn
                dir="right"
                onClick={() => scroll("right")}
                floating={floating}
            />
        </div>
    );

    const track = (
        <div ref={trackRef} className={trackClassName}>
            {children}
        </div>
    );

    if (variant === "header") {
        return (
            <>
                <div className={headerClassName}>
                    {header}
                    {arrows}
                </div>
                {track}
            </>
        );
    }

    return (
        <div className={wrapperClassName ?? "relative mt-12"}>
            {arrows}
            {track}
        </div>
    );
}

function ArrowBtn({
    dir,
    onClick,
    floating,
}: {
    dir: "left" | "right";
    onClick: () => void;
    floating: boolean;
}) {
    const Icon = dir === "left" ? ChevronLeft : ChevronRight;
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={dir === "left" ? "Previous" : "Next"}
            className={`inline-flex size-10 items-center justify-center rounded-full border bg-white text-slate-700 shadow-md transition-colors hover:bg-brand hover:text-white ${
                floating
                    ? `absolute top-1/2 z-10 -translate-y-1/2 ${
                          dir === "left"
                              ? "-left-2 lg:-left-5"
                              : "-right-2 lg:-right-5"
                      }`
                    : ""
            }`}
        >
            <Icon className="size-5" />
        </button>
    );
}
