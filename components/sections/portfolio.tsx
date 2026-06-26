"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";

const ease = [0.22, 1, 0.36, 1] as const;

const badgeTint: Record<string, string> = {
    Corporate: "bg-blue-600",
    "E-Commerce": "bg-violet-600",
    Logistics: "bg-emerald-600",
    Education: "bg-amber-500",
};

const projectImages: Record<string, string> = {
    "Company Profile Website": "/Company.png",
    "E-Commerce Mobile App": "/E-Commerce.png",
    "Inventory Management System": "/Inventory.png",
    "Learning Management System": "/Learning.png",
};

const fallbackImages: Record<string, string> = {
    Corporate: "/Company.png",
    "E-Commerce": "/E-Commerce.png",
    Logistics: "/Inventory.png",
    Education: "/Learning.png",
};

const cardContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const cardItem = {
    hidden: { opacity: 0, y: 34 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

type Project = {
    id: string;
    category: string;
    title: string;
    description: string;
    imageUrl: string | null;
};

type Heading = { eyebrow: string; title: string };

export function Portfolio() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [heading, setHeading] = useState<Heading | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        Promise.all([
            fetch("/api/cms/projects").then((r) => r.json()),
            fetch("/api/cms/section-headings").then((r) => r.json()),
        ]).then(([items, headings]) => {
            setProjects(items);
            const h = headings.find((x: { key: string }) => x.key === "portfolio");
            if (h) setHeading({ eyebrow: h.eyebrow, title: h.title });
        });
    }, []);

    const scroll = (dir: "left" | "right") => {
        const el = trackRef.current;
        if (!el) return;
        const amount = el.clientWidth * 0.8;
        el.scrollBy({
            left: dir === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    if (projects.length === 0) {
        return (
            <section id="portfolio" className="bg-white py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="h-64 animate-pulse rounded-xl bg-slate-100" />
                </div>
            </section>
        );
    }

    return (
        <section id="portfolio" className="bg-white py-12 lg:py-14">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease }}
                    className="relative flex flex-col items-center"
                >
                    <SectionHeading
                        eyebrow={heading?.eyebrow ?? "Our Portfolio"}
                        title={heading?.title ?? "Featured Projects"}
                    />

                    <Link
                        href="/#portfolio"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all hover:gap-2.5 lg:absolute lg:right-0 lg:top-2 lg:mt-0"
                    >
                        View All Projects <ArrowRight className="size-4" />
                    </Link>
                </motion.div>

                <div className="relative mt-12">
                    <CarouselButton dir="left" onClick={() => scroll("left")} />
                    <CarouselButton
                        dir="right"
                        onClick={() => scroll("right")}
                    />

                    <motion.div
                        ref={trackRef}
                        variants={cardContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-3"
                    >
                        {projects.map((p) => {
                            const imageSrc =
                                p.imageUrl ||
                                projectImages[p.title] ||
                                fallbackImages[p.category] ||
                                "/Company.png";
                            return (
                                <motion.article
                                    key={p.id}
                                    variants={cardItem}
                                    whileHover={{ y: -5 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 280,
                                        damping: 22,
                                    }}
                                    className="group w-[85%] shrink-0 snap-start overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-lg sm:w-[45%] lg:w-[calc(25%-18px)]"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                                        <Image
                                            src={imageSrc}
                                            alt={p.title}
                                            fill
                                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                            sizes="(min-width: 1024px) 280px, (min-width: 640px) 46vw, 86vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />
                                        <Badge
                                            className={`absolute left-3 top-3 ${badgeTint[p.category] || "bg-blue-600"} px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm`}
                                        >
                                            {p.category}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2 p-5">
                                        <h3 className="font-semibold text-slate-900">
                                            {p.title}
                                        </h3>
                                        <p
                                            className="text-sm text-muted-foreground"
                                            dangerouslySetInnerHTML={{ __html: p.description }}
                                        />
                                        <Link
                                            href="/#contact"
                                            className="inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-brand transition-all group-hover:gap-2.5"
                                        >
                                            View Case Study{" "}
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function CarouselButton({
    dir,
    onClick,
}: {
    dir: "left" | "right";
    onClick: () => void;
}) {
    const Icon = dir === "left" ? ChevronLeft : ChevronRight;
    return (
        <motion.button
            type="button"
            onClick={onClick}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            aria-label={dir === "left" ? "Previous projects" : "Next projects"}
            className={`absolute top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white text-slate-700 shadow-md transition-colors hover:bg-brand hover:text-white ${
                dir === "left" ? "-left-2 lg:-left-5" : "-right-2 lg:-right-5"
            }`}
        >
            <Icon className="size-5" />
        </motion.button>
    );
}
