"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Users } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";

const ease = [0.22, 1, 0.36, 1] as const;

const listContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const listItem = {
    hidden: { opacity: 0, x: -16 },
    show: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
};

type SiteSetting = {
    aboutEyebrow: string;
    aboutHeading: string;
    aboutDescription: string;
    aboutCommitmentTitle: string;
    aboutCommitmentText: string;
    aboutCtaLabel: string;
    aboutCtaHref: string;
};

type AboutPoint = {
    id: string;
    text: string;
};

export function About() {
    const [site, setSite] = useState<SiteSetting | null>(null);
    const [aboutPoints, setAboutPoints] = useState<AboutPoint[]>([]);

    useEffect(() => {
        Promise.all([
            fetch("/api/cms/site-setting").then((r) => r.json()),
            fetch("/api/cms/about-points").then((r) => r.json()),
        ]).then(([siteData, points]) => {
            setSite(siteData);
            setAboutPoints(points);
        });
    }, []);

    if (!site) {
        return (
            <section className="bg-white py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />
                </div>
            </section>
        );
    }

    return (
        <section id="about" className="bg-white py-16 lg:py-20">
            <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, x: -48 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease }}
                >
                    <SectionHeading
                        align="left"
                        eyebrow={site.aboutEyebrow}
                        title={site.aboutHeading}
                    />

                    <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                        {site.aboutDescription}
                    </p>

                    <motion.ul
                        variants={listContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        className="mt-6 space-y-3"
                    >
                        {aboutPoints.map((point) => (
                            <motion.li
                                key={point.id}
                                variants={listItem}
                                className="flex items-center gap-3 text-sm"
                            >
                                <span className="inline-flex shrink-0">
                                    <CheckCircle2 className="size-5 text-brand" />
                                </span>
                                <span className="text-slate-700">
                                    {point.text}
                                </span>
                            </motion.li>
                        ))}
                    </motion.ul>

                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.35, ease }}
                    >
                        <Button asChild className="mt-8 rounded-lg">
                            <Link href={site.aboutCtaHref}>
                                {site.aboutCtaLabel}{" "}
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 48 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease }}
                    className="relative"
                >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 shadow-xl">
                        <Image
                            src="/About.png"
                            alt="LEXA Software House"
                            fill
                            className="object-cover object-center"
                            sizes="(min-width: 1024px) 560px, 100vw"
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 28, scale: 0.94 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            type: "spring",
                            stiffness: 180,
                            damping: 20,
                            delay: 0.35,
                        }}
                        className="absolute -bottom-6 right-4 w-64 rounded-xl border bg-white p-4 shadow-lg sm:right-6"
                    >
                        <div className="flex items-start gap-3">
                            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                                <Users className="size-5" />
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">
                                    {site.aboutCommitmentTitle}
                                </p>
                                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                    {site.aboutCommitmentText}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
