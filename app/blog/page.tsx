import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { slugify } from "@/lib/slug";
import { getBlogPosts, getNavLinks, getServices } from "@/lib/cms/queries";

function formatDate(d: Date | string) {
    const date = new Date(d);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function BlogPage() {
    const [posts, navLinks, services] = await Promise.all([getBlogPosts(), getNavLinks(), getServices()]);

    return (
        <>
            <Navbar
                navLinks={navLinks}
                services={services.map((s) => ({ title: s.title, slug: s.slug }))}
            />
            <main className="bg-white">
                <section className="border-b bg-white py-12 lg:py-16">
                    <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-600 shadow-sm">
                            <span className="size-2 rounded-full bg-amber-500" />
                            Latest News
                        </div>
                        <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">News & Information</h1>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Updates, launches, and insights from LEXA Software House.</p>
                    </div>
                </section>
                <section className="py-10 lg:py-12">
                    <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                        {posts.length === 0 ? (
                            <p className="py-20 text-center text-sm text-slate-500">No posts yet.</p>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {posts.map((p) => (
                                    <article key={p.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                                        <div className="relative aspect-[16/10] bg-slate-100">
                                            <Image src={p.imageUrl ?? "/Hero.webp"} alt={p.title} fill className="object-cover" sizes="400px" />
                                        </div>
                                        <div className="p-5">
                                            <div className="flex flex-wrap gap-2">
                                                <span className="rounded-full bg-red-600 px-3 py-1 text-[11px] font-bold uppercase text-white">{p.badge}</span>
                                                <span className="rounded-full bg-amber-500 px-3 py-1 text-[11px] font-bold text-white">{formatDate(p.publishedAt)}</span>
                                            </div>
                                            <p className="mt-3 inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{p.tag}</p>
                                            <h3 className="mt-3 line-clamp-2 text-base font-bold leading-snug text-slate-900">{p.title}</h3>
                                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{p.excerpt}</p>
                                            <Link href={`/blog/${p.slug || slugify(p.title)}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5">
                                                Read More <ArrowRight className="size-4" />
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                        <div className="mt-8">
                            <Link href="/#blog" className="text-sm font-medium text-slate-500 hover:text-brand">← Back to home</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
