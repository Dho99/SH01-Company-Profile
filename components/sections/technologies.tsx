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

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { CmsIcon } from "@/components/cms-icon";
import { Reveal } from "@/components/reveal";
import { TechnologiesSkeleton } from "@/components/skeletons/technologies-skeleton";

const ease = [0.22, 1, 0.36, 1] as const;

const brandIcons: Record<string, IconType> = {
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

type Technology = {
    id: string;
    icon: string;
    label: string;
    color: string;
};

type Heading = { eyebrow: string; title: string };

export function Technologies({
    items,
    heading,
}: {
    items: Technology[];
    heading?: Heading;
}) {
    const technologies = items;

    if (technologies.length === 0) return <TechnologiesSkeleton />;

    return (
        <section id="technologies" className="bg-slate-50 py-12 lg:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Reveal
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65, ease }}
                >
                    <SectionHeading
                        eyebrow={heading?.eyebrow ?? "Technologies We Use"}
                        title={heading?.title ?? "Built On a Modern Stack"}
                    />
                </Reveal>

                <Reveal
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: 0.1, ease }}
                    className="mt-12 rounded-2xl border bg-white p-8 shadow-sm sm:p-10"
                >
                    <ul className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
                        {technologies.map((tech, i) => {
                            const BrandIcon = brandIcons[tech.icon];
                            return (
                                <Reveal
                                    key={tech.id}
                                    as="li"
                                    initial={{ opacity: 0, scale: 0.6, y: 16 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: i * 0.05,
                                    }}
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
                                    <Reveal
                                        as="span"
                                        whileHover={{
                                            rotate: [0, -8, 8, -4, 0],
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {BrandIcon ? (
                                            <BrandIcon
                                                className="size-9 text-slate-400 transition-colors duration-300 group-hover:text-[var(--tw)]"
                                                style={
                                                    {
                                                        "--tw": tech.color,
                                                    } as React.CSSProperties
                                                }
                                            />
                                        ) : (
                                            <CmsIcon
                                                name={tech.icon}
                                                size={36}
                                                className="text-slate-400 transition-colors duration-300"
                                                style={{ "--tw": tech.color } as React.CSSProperties}
                                            />
                                        )}
                                    </Reveal>
                                    <span className="text-xs font-medium text-slate-600 transition-colors group-hover:text-slate-900">
                                        {tech.label}
                                    </span>
                                </Reveal>
                            );
                        })}
                    </ul>

                    <Reveal
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
                            <Link href="/technologies">
                                View All Technologies{" "}
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </Reveal>
                </Reveal>
            </div>
        </section>
    );
}
