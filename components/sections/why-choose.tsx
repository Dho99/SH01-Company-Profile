"use client";

import { useEffect, useState } from "react";
import {
    BadgeCheck,
    Clock,
    LifeBuoy,
    Smile,
    Users,
    type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const icons: Record<string, LucideIcon> = {
    quality: BadgeCheck,
    team: Users,
    delivery: Clock,
    satisfaction: Smile,
    support: LifeBuoy,
};

const gridContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const itemVariant = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

type Reason = {
    id: string;
    icon: string;
    title: string;
    description: string;
};

type Heading = { eyebrow: string; title: string };

export function WhyChoose() {
    const [reasons, setReasons] = useState<Reason[]>([]);
    const [heading, setHeading] = useState<Heading | null>(null);

    useEffect(() => {
        Promise.all([
            fetch("/api/cms/reasons").then((r) => r.json()),
            fetch("/api/cms/section-headings").then((r) => r.json()),
        ]).then(([items, headings]) => {
            setReasons(items);
            const h = headings.find((x: { key: string }) => x.key === "whyChoose");
            if (h) setHeading({ eyebrow: h.eyebrow, title: h.title });
        });
    }, []);

    if (reasons.length === 0) {
        return (
            <section className="bg-white py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="h-32 animate-pulse rounded-xl bg-slate-100" />
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white py-10 lg:py-12">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-6 lg:items-center lg:gap-8 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, x: -32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65, ease }}
                    className="lg:col-span-1"
                >
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                        {heading?.eyebrow ?? "Why Choose"}
                    </span>
                    <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                        {heading?.title ?? "LEXA?"}
                    </p>
                </motion.div>

                <motion.div
                    variants={gridContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-5"
                >
                    {reasons.map((r) => {
                        const Icon = icons[r.icon];
                        if (!Icon) return null;
                        return (
                            <motion.div
                                key={r.id}
                                variants={itemVariant}
                                className="flex flex-col gap-2"
                            >
                                <motion.span
                                    whileHover={{ scale: 1.15, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 360,
                                        damping: 18,
                                    }}
                                    className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand cursor-default"
                                >
                                    <Icon className="size-5" />
                                </motion.span>
                                <h3 className="text-sm font-semibold text-slate-900">
                                    {r.title}
                                </h3>
                                <p
                                    className="text-xs leading-relaxed text-muted-foreground"
                                    dangerouslySetInnerHTML={{ __html: r.description }}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
