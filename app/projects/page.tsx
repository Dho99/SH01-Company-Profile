import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { slugify } from "@/lib/slug";
import { getProjects, getSectionHeadings, getNavLinks, getServices } from "@/lib/cms/queries";

const badgeTint: Record<string, string> = {
    Corporate: "bg-blue-600",
    "E-Commerce": "bg-violet-600",
    Logistics: "bg-emerald-600",
    Education: "bg-amber-500",
};

export default async function ProjectsPage() {
    const [projects, headings, navLinks, services] = await Promise.all([getProjects(), getSectionHeadings(), getNavLinks(), getServices()]);
    const heading = headings.find((h) => h.key === "portfolio");

    return (
        <>
            <Navbar
                navLinks={navLinks}
                services={services.map((s) => ({ title: s.title, slug: s.slug }))}
            />
            <main className="bg-white">
                <section className="border-b bg-white py-12 lg:py-16">
                    <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                        <SectionHeading eyebrow={heading?.eyebrow ?? "Our Portfolio"} title={heading?.title ?? "Featured Projects"} />
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">Complete project list with categories and case studies.</p>
                    </div>
                </section>
                <section className="py-10 lg:py-12">
                    <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                        {projects.length === 0 ? (
                            <p className="py-20 text-center text-sm text-slate-500">No projects yet.</p>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {projects.map((p) => (
                                    <article key={p.id} className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-lg">
                                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                                            <Image src={p.imageUrl ?? "/Company.webp"} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="300px" />
                                            <Badge className={`absolute left-3 top-3 ${badgeTint[p.category] ?? "bg-blue-600"} px-2.5 py-1 text-[11px] text-white`}>{p.category}</Badge>
                                        </div>
                                        <div className="space-y-2 p-5">
                                            <h3 className="font-semibold text-slate-900">{p.title}</h3>
                                            <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: p.description }} />
                                            <Link href={`/projects/${p.slug || slugify(p.title)}`} className="inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-brand group-hover:gap-2.5">
                                                View Case Study <ArrowRight className="size-4" />
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                        <div className="mt-8">
                            <Link href="/#portfolio" className="text-sm font-medium text-slate-500 hover:text-brand">
                                ← Back to home
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
