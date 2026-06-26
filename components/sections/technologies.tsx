"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
    SiDocker,
    SiFlutter,
    SiGit,
    SiLaravel,
    SiMysql,
    SiNextdotjs,
    SiNodedotjs,
    SiPhp,
    SiPython,
    SiReact,
    SiVuedotjs,
} from "react-icons/si";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";

const ease = [0.22, 1, 0.36, 1] as const;

const icons: Record<string, IconType> = {
    laravel: SiLaravel,
    react: SiReact,
    nextjs: SiNextdotjs,
    vue: SiVuedotjs,
    flutter: SiFlutter,
    node: SiNodedotjs,
    php: SiPhp,
    python: SiPython,
    mysql: SiMysql,
    aws: FaAws,
    docker: SiDocker,
    git: SiGit,
};

const gridContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
};

const iconItem = {
    hidden: { opacity: 0, scale: 0.6, y: 16 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 260, damping: 20 },
    },
};

type Technology = {
    id: string;
    icon: string;
    label: string;
    color: string;
};

type Heading = { eyebrow: string; title: string };

export function Technologies() {
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [heading, setHeading] = useState<Heading | null>(null);

    useEffect(() => {
        Promise.all([
            fetch("/api/cms/technologies").then((r) => r.json()),
            fetch("/api/cms/section-headings").then((r) => r.json()),
        ]).then(([items, headings]) => {
            setTechnologies(items);
            const h = headings.find((x: { key: string }) => x.key === "technologies");
            if (h) setHeading({ eyebrow: h.eyebrow, title: h.title });
        });
    }, []);

    if (technologies.length === 0) {
        return (
            <section id="technologies" className="bg-slate-50 py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="h-48 animate-pulse rounded-2xl bg-white" />
                </div>
            </section>
        );
    }

    return (
        <section id="technologies" className="bg-slate-50 py-12 lg:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65, ease }}
                >
                    <SectionHeading
                        eyebrow={heading?.eyebrow ?? "Technologies We Use"}
                        title={heading?.title ?? "Built On a Modern Stack"}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: 0.1, ease }}
                    className="mt-12 rounded-2xl border bg-white p-8 shadow-sm sm:p-10"
                >
                    <motion.ul
                        variants={gridContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-40px" }}
                        className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-6"
                    >
                        {technologies.map((tech) => {
                            const Icon = icons[tech.icon];
                            if (!Icon) return null;
                            return (
                                <motion.li
                                    key={tech.id}
                                    variants={iconItem}
                                    whileHover={{
                                        scale: 1.2,
                                        y: -4,
                                        transition: {
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 15,
                                        },
                                    }}
                                    className="group flex flex-col items-center gap-2 cursor-default"
                                >
                                    <motion.div
                                        whileHover={{
                                            rotate: [0, -8, 8, -4, 0],
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <Icon
                                            className="size-9 text-slate-400 transition-colors duration-300 group-hover:text-[var(--tw)]"
                                            style={
                                                {
                                                    "--tw": tech.color,
                                                } as React.CSSProperties
                                            }
                                        />
                                    </motion.div>
                                    <span className="text-xs font-medium text-slate-600 transition-colors group-hover:text-slate-900">
                                        {tech.label}
                                    </span>
                                </motion.li>
                            );
                        })}
                    </motion.ul>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-8 flex justify-center"
                    >
                        <Button
                            asChild
                            variant="outline"
                            className="rounded-lg"
                        >
                            <Link href="/#contact">
                                View All Technologies{" "}
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
