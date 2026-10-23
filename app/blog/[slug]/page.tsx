import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getBlogPostBySlug, getBlogPosts, getNavLinks, getServices } from "@/lib/cms/queries";

function formatDate(d: Date | string) {
    const date = new Date(d);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) return { title: "Post Not Found" };
    return { title: `${post.title} — Blog` };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [post, navLinks, services] = await Promise.all([getBlogPostBySlug(slug), getNavLinks(), getServices()]);
    if (!post) notFound();

    return (
        <>
            <Navbar
                navLinks={navLinks}
                services={services.map((s) => ({ title: s.title, slug: s.slug }))}
            />
            <main className="bg-white">
                <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                    <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand">
                        <ArrowLeft className="size-4" /> Back to Blog
                    </Link>
                    <div className="mt-6 flex flex-wrap gap-2">
                        <span className="rounded-full bg-red-600 px-3 py-1 text-[11px] font-bold uppercase text-white">{post.badge}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{post.tag}</span>
                        <span className="rounded-full bg-amber-500 px-3 py-1 text-[11px] font-bold text-white">{formatDate(post.publishedAt)}</span>
                    </div>
                    <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-900 sm:text-4xl">{post.title}</h1>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
                    {post.imageUrl && (
                        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
                            <Image src={post.imageUrl} alt={post.title} fill className="object-cover" sizes="800px" />
                        </div>
                    )}
                    {post.content ? (
                        <div className="prose prose-sm sm:prose mt-8 max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: post.content }} />
                    ) : (
                        <p className="mt-8 text-sm leading-7 text-slate-600">
                            Full article content will appear here once edited in the CMS. Use the excerpt above as preview.
                        </p>
                    )}
                </article>
            </main>
            <Footer />
        </>
    );
}
