"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    Cloud,
    Code2,
    Cog,
    Palette,
    ShieldCheck,
    Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";

const ease = [0.22, 1, 0.36, 1] as const;

const config: Record<string, { icon: LucideIcon; tint: string }> = {
    code: { icon: Code2, tint: "bg-blue-50 text-blue-600" },
    mobile: { icon: Smartphone, tint: "bg-indigo-50 text-indigo-600" },
    system: { icon: Cog, tint: "bg-emerald-50 text-emerald-600" },
    design: { icon: Palette, tint: "bg-amber-50 text-amber-600" },
    consulting: { icon: Cloud, tint: "bg-sky-50 text-sky-600" },
    support: { icon: ShieldCheck, tint: "bg-violet-50 text-violet-600" },
};

const gridContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
};

const cardVariant = {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

type Service = {
    id: string;
    icon: string;
    title: string;
    description: string;
    imageUrl: string | null;
};

type Heading = { eyebrow: string; title: string };

export function Services() {
    const [services, setServices] = useState<Service[]>([]);
    const [heading, setHeading] = useState<Heading | null>(null);

    useEffect(() => {
        Promise.all([
            fetch("/api/cms/services").then((r) => r.json()),
            fetch("/api/cms/section-headings").then((r) => r.json()),
        ]).then(([items, headings]) => {
            setServices(items);
            const h = headings.find((x: { key: string }) => x.key === "services");
            if (h) setHeading({ eyebrow: h.eyebrow, title: h.title });
        });
    }, []);

    if (services.length === 0) {
        return (
            <section id="services" className="bg-slate-50 py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-48 animate-pulse rounded-xl bg-white"
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="services" className="bg-slate-50 py-12 lg:py-14">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65, ease }}
                >
                    <SectionHeading
                        eyebrow={heading?.eyebrow ?? "Our Services"}
                        title={heading?.title ?? "Solutions We Provide"}
                    />
                </motion.div>

                <motion.div
                    variants={gridContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {services.map((s) => {
                        const entry = config[s.icon];
                        if (!entry) return null;
                        const { icon: Icon, tint } = entry;
                        return (
                            <motion.div
                                key={s.id}
                                variants={cardVariant}
                                whileHover={{
                                    y: -6,
                                    transition: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    },
                                }}
                            >
                                <Card className={`group h-full border-slate-100 shadow-sm transition-all hover:border-brand/30 hover:shadow-xl ${s.imageUrl ? "overflow-hidden pt-0 pb-6" : "py-6"}`}>
                                    {s.imageUrl && (
                                        <div className="relative aspect-[2/1] w-full shrink-0">
                                            <Image
                                                src={s.imageUrl}
                                                alt={s.title}
                                                fill
                                                className="object-cover"
                                                sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 86vw"
                                            />
                                        </div>
                                    )}
                                    <CardHeader className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <motion.span
                                                whileHover={{
                                                    scale: 1.12,
                                                    rotate: 6,
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 15,
                                                }}
                                                className={`inline-flex size-12 shrink-0 items-center justify-center rounded-xl ${tint}`}
                                            >
                                                <Icon className="size-6" />
                                            </motion.span>

                                            <CardTitle className="text-lg leading-snug text-slate-900">
                                                {s.title}
                                            </CardTitle>
                                        </div>

                                        <CardDescription className="text-sm leading-relaxed text-slate-500">
                                            <span dangerouslySetInnerHTML={{ __html: s.description }} />
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <Link
                                            href="/#contact"
                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all group-hover:gap-2.5"
                                        >
                                            Learn More{" "}
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
