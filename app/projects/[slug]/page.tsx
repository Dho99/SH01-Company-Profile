import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { getProjectBySlug, getProjects, getNavLinks, getServices } from "@/lib/cms/queries";
import { getProjectDetail } from "@/lib/data/project-details";

export async function generateStaticParams() {
    const projects = await getProjects();
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const p = await getProjectBySlug(slug);
    if (!p) return { title: "Project Not Found" };
    return { title: `${p.title} — Projects` };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [project, navLinks, services] = await Promise.all([getProjectBySlug(slug), getNavLinks(), getServices()]);
    if (!project) notFound();
    const detail = getProjectDetail(slug, project.title);

    return (
        <>
            <Navbar
                navLinks={navLinks}
                services={services.map((s) => ({ title: s.title, slug: s.slug }))}
            />
            <main className="bg-white">
                <section className="border-b bg-slate-50 py-10 lg:py-14">
                    <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                        <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand">
                            <ArrowLeft className="size-4" /> Back to Projects
                        </Link>
                        <div className="mt-6">
                            <Badge className="bg-blue-600 text-white">{project.category}</Badge>
                            <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-900 sm:text-4xl">{project.title}</h1>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{detail.challenge}</p>
                        </div>
                        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
                            <Image src={project.imageUrl ?? "/Company.webp"} alt={project.title} fill className="object-cover" sizes="100vw" />
                        </div>
                    </div>
                </section>
                <section className="py-10 lg:py-12">
                    <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Solution</h2>
                                <p className="mt-3 text-sm leading-7 text-slate-600">{detail.solution}</p>
                                <div className="prose prose-sm mt-4 max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: project.description }} />
                                <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-slate-900">Highlights</h3>
                                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                                    {detail.highlights.map((h) => (
                                        <li key={h} className="rounded-lg border bg-white px-3 py-2 text-sm text-slate-700">
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <div className="rounded-2xl border bg-white p-6">
                                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Stack</h3>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {detail.stack.map((s) => (
                                            <span key={s} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-[#061b49] p-6 text-white">
                                    <p className="text-sm font-semibold">{detail.outcome}</p>
                                    <Link href="/#contact" className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">
                                        Discuss a Similar Project <ArrowRight className="size-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
