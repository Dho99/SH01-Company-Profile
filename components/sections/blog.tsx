"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BlogPost = {
    id: string;
    badge: string;
    tag: string;
    publishedAt: string;
    title: string;
    excerpt: string;
    imageUrl: string | null;
};

function formatDate(iso: string) {
    const d = new Date(iso);
    return {
        day: d.toLocaleDateString("en-US", { day: "2-digit" }),
        month: d
            .toLocaleDateString("en-US", { month: "short" })
            .toUpperCase(),
        date: d.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }),
    };
}

export function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [active, setActive] = useState<BlogPost | null>(null);

    useEffect(() => {
        fetch("/api/cms/blog-posts")
            .then((r) => r.json())
            .then((data: BlogPost[]) => {
                setPosts(data);
                setActive(data[0] ?? null);
            });
    }, []);

    if (posts.length === 0) {
        return (
            <section id="blog" className="bg-white pt-10 pb-6 lg:pt-12 lg:pb-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />
                </div>
            </section>
        );
    }

    const featured = active ?? posts[0];
    const { day, month, date: dateStr } = formatDate(featured.publishedAt);
    const featuredImage = featured.imageUrl ?? "/Hero.png";

    return (
        <section id="blog" className="bg-white pt-10 pb-6 lg:pt-12 lg:pb-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-600 shadow-sm">
                            <span className="size-2 rounded-full bg-amber-500" />
                            Latest News
                        </div>

                        <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                            News &amp; Information
                        </h2>
                    </div>

                    <Button
                        asChild
                        variant="outline"
                        className="h-10 rounded-lg border-amber-200 bg-white px-4 text-sm font-semibold text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                    >
                        <Link href="/#blog">
                            View All <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-start">
                    {/* Featured post */}
                    <motion.article
                        key={featured.id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.32 }}
                        className="group relative min-h-[360px] overflow-hidden rounded-[20px] bg-slate-900 shadow-[0_20px_55px_rgba(15,23,42,0.16)] lg:h-[360px]"
                    >
                        <Image
                            src={featuredImage}
                            alt={featured.title}
                            fill
                            priority
                            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            sizes="(min-width: 1024px) 560px, 100vw"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/48 to-slate-950/10" />

                        <div className="relative z-10 flex min-h-[360px] flex-col justify-end p-5 sm:p-6 lg:h-[360px]">
                            <div className="mb-4 flex flex-wrap gap-2.5">
                                <span className="rounded-full bg-red-600 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">
                                    {featured.badge}
                                </span>
                                <span className="rounded-full bg-amber-500 px-3.5 py-1.5 text-[11px] font-bold text-white">
                                    {dateStr}
                                </span>
                            </div>

                            <p className="mb-3 inline-flex w-fit rounded-md bg-black/35 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur">
                                {featured.tag}
                            </p>

                            <h3 className="max-w-2xl text-2xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-3xl">
                                {featured.title}
                            </h3>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/82">
                                {featured.excerpt}
                            </p>

                            <Link
                                href="/#blog"
                                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition-all hover:gap-3"
                            >
                                Read More <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </motion.article>

                    {/* Post list */}
                    <div className="lg:h-[360px]">
                        <h3 className="mb-3 text-xl font-bold tracking-[-0.03em] text-slate-800">
                            Latest at LEXA
                        </h3>

                        <div className="grid gap-2.5 lg:h-[320px] lg:grid-rows-4">
                            {posts.map((post) => {
                                const isActive = active?.id === post.id;
                                const { day: d, month: m } = formatDate(
                                    post.publishedAt,
                                );

                                return (
                                    <button
                                        key={post.id}
                                        type="button"
                                        onClick={() => setActive(post)}
                                        className={cn(
                                            "group flex w-full items-center gap-3 rounded-[14px] border bg-white p-3 text-left shadow-sm transition-all duration-200",
                                            "lg:h-full",
                                            isActive
                                                ? "border-brand/40 shadow-[0_12px_32px_rgba(37,99,235,0.12)] ring-2 ring-blue-50"
                                                : "border-slate-200 hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-md",
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "flex size-12 shrink-0 flex-col items-center justify-center rounded-xl border text-center transition-colors",
                                                isActive
                                                    ? "border-blue-200 bg-blue-50 text-brand"
                                                    : "border-amber-100 bg-amber-50 text-amber-600",
                                            )}
                                        >
                                            <span className="text-lg font-bold leading-none">
                                                {d}
                                            </span>
                                            <span className="mt-0.5 text-[10px] font-bold">
                                                {m}
                                            </span>
                                        </div>

                                        <div className="min-w-0">
                                            <h4
                                                className={cn(
                                                    "line-clamp-2 text-[14px] font-bold leading-snug tracking-[-0.02em] transition-colors",
                                                    isActive
                                                        ? "text-brand"
                                                        : "text-slate-900 group-hover:text-brand",
                                                )}
                                            >
                                                {post.title}
                                            </h4>

                                            <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-slate-500 sm:line-clamp-2 lg:line-clamp-1">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
