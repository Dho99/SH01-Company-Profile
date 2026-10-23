import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { CmsIcon } from "@/components/cms-icon";
import { slugify } from "@/lib/slug";
import { getServices, getSectionHeadings, getNavLinks } from "@/lib/cms/queries";

const tints = [
    "bg-blue-50 text-blue-600",
    "bg-indigo-50 text-indigo-600",
    "bg-emerald-50 text-emerald-600",
    "bg-amber-50 text-amber-600",
    "bg-sky-50 text-sky-600",
    "bg-violet-50 text-violet-600",
] as const;

export default async function ServicesPage() {
    const [services, headings, navLinks] = await Promise.all([getServices(), getSectionHeadings(), getNavLinks()]);
    const heading = headings.find((h) => h.key === "services");

    return (
        <>
            <Navbar
                navLinks={navLinks}
                services={services.map((s) => ({ title: s.title, slug: s.slug }))}
            />
            <main className="bg-slate-50">
                <section className="border-b bg-white py-12 lg:py-16">
                    <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                        <SectionHeading eyebrow={heading?.eyebrow ?? "Our Services"} title={heading?.title ?? "Solutions We Provide"} />
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">Explore all services — from web to mobile, system, design, consulting and support. Click any card to see details, features and process.</p>
                    </div>
                </section>
                <section className="py-10 lg:py-12">
                    <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                        {services.length === 0 ? (
                            <p className="py-20 text-center text-sm text-slate-500">No services yet.</p>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {services.map((s, index) => {
                                    const tint = tints[index % tints.length];
                                    return (
                                        <Card key={s.id} className={`group h-full border-slate-100 shadow-sm hover:border-brand/30 hover:shadow-xl ${s.imageUrl ? "overflow-hidden pt-0 pb-6" : "py-6"}`}>
                                            {s.imageUrl && (
                                                <div className="relative aspect-[2/1] w-full shrink-0">
                                                    <Image src={s.imageUrl} alt={s.title} fill className="object-cover" sizes="(min-width: 1024px) 380px, 46vw" />
                                                </div>
                                            )}
                                            <CardHeader className="space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <span className={`inline-flex size-12 shrink-0 items-center justify-center rounded-xl ${tint}`}>
                                                        <CmsIcon name={s.icon} size={24} />
                                                    </span>
                                                    <CardTitle className="text-lg leading-snug text-slate-900">{s.title}</CardTitle>
                                                </div>
                                                <CardDescription className="text-sm leading-relaxed text-slate-500">
                                                    <span dangerouslySetInnerHTML={{ __html: s.description }} />
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <Link href={`/services/${s.slug || slugify(s.title)}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand group-hover:gap-2.5">
                                                    Learn More <ArrowRight className="size-4" />
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                        <div className="mt-8">
                            <Link href="/#services" className="text-sm font-medium text-slate-500 hover:text-brand">← Back to home</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
