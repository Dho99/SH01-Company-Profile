import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CmsIcon } from "@/components/cms-icon";
import { getServiceBySlug, getServices, getNavLinks } from "@/lib/cms/queries";
import { getServiceDetail } from "@/lib/data/service-details";

export async function generateStaticParams() {
    const services = await getServices();
    return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const svc = await getServiceBySlug(slug);
    if (!svc) return { title: "Service Not Found" };
    return { title: `${svc.title} — LEXA Services` };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [svc, navLinks, services] = await Promise.all([getServiceBySlug(slug), getNavLinks(), getServices()]);
    if (!svc) notFound();
    const detail = getServiceDetail(slug);

    return (
        <>
            <Navbar
                navLinks={navLinks}
                services={services.map((s) => ({ title: s.title, slug: s.slug }))}
            />
            <main className="bg-white">
                <section className="border-b bg-slate-50 py-10 lg:py-14">
                    <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                        <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand">
                            <ArrowLeft className="size-4" /> Back to Services
                        </Link>
                        <div className="mt-6 flex items-start gap-4">
                            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand">
                                <CmsIcon name={svc.icon} size={24} />
                            </span>
                            <div>
                                <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-900 sm:text-4xl">{svc.title}</h1>
                                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{detail.hero}</p>
                            </div>
                        </div>
                        {svc.imageUrl && <img src={svc.imageUrl} alt={svc.title} className="mt-8 w-full rounded-2xl object-cover" />}
                    </div>
                </section>

                <section className="py-10 lg:py-12">
                    <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Overview</h2>
                                <p className="mt-3 text-sm leading-7 text-slate-600">{detail.intro}</p>
                                <div className="prose prose-sm mt-4 max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: svc.description }} />
                                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                    {detail.features.map((f) => (
                                        <div key={f.title} className="rounded-xl border bg-white p-5">
                                            <h3 className="text-sm font-semibold text-slate-900">{f.title}</h3>
                                            <p className="mt-1 text-xs leading-6 text-slate-500">{f.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="rounded-2xl border bg-slate-50 p-6">
                                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Process</h3>
                                    <ol className="mt-4 space-y-4">
                                        {detail.process.map((p) => (
                                            <li key={p.step} className="flex gap-3">
                                                <span className="text-sm font-bold text-brand">{p.step}</span>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-900">{p.title}</p>
                                                    <p className="text-xs text-slate-500">{p.desc}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                                <div className="rounded-2xl border bg-white p-6">
                                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Tech Stack</h3>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {detail.tech.map((t) => (
                                            <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-[#061b49] p-6 text-white">
                                    <p className="text-sm font-semibold">{detail.cta}</p>
                                    <Link href="/#contact" className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">
                                        Get in Touch <ArrowRight className="size-4" />
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
