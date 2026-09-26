import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BlogInteractive } from "./blog-interactive";
import { BlogSkeleton } from "@/components/skeletons/blog-skeleton";

type BlogPost = {
    id: string;
    slug: string;
    badge: string;
    tag: string;
    publishedAt: Date | string;
    title: string;
    excerpt: string;
    imageUrl: string | null;
};

export function Blog({ posts }: { posts: BlogPost[] }) {
    if (posts.length === 0) return <BlogSkeleton />;

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
                        <Link href="/blog">
                            View All <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>

                <BlogInteractive posts={posts} />
            </div>
        </section>
    );
}
