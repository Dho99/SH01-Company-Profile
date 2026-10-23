import Image from "next/image";
import { Quote, UserRound } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeading } from "@/components/section-heading";
import { getTestimonials, getSectionHeadings, getNavLinks, getServices } from "@/lib/cms/queries";

const avatarTints = ["bg-blue-50 text-blue-600", "bg-violet-50 text-violet-600", "bg-emerald-50 text-emerald-600"];

export default async function TestimonialsPage() {
    const [testimonials, headings, navLinks, services] = await Promise.all([getTestimonials(), getSectionHeadings(), getNavLinks(), getServices()]);
    const heading = headings.find((h) => h.key === "testimonials");

    return (
        <>
            <Navbar
                navLinks={navLinks}
                services={services.map((s) => ({ title: s.title, slug: s.slug }))}
            />
            <main className="bg-slate-50">
                <section className="border-b bg-white py-12 lg:py-16">
                    <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                        <SectionHeading eyebrow={heading?.eyebrow ?? "What Clients Say"} title={heading?.title ?? "Trusted By Great Companies"} />
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">All client stories and feedback in one place.</p>
                    </div>
                </section>
                <section className="py-10 lg:py-12">
                    <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                        {testimonials.length === 0 ? (
                            <p className="py-20 text-center text-sm text-slate-500">No testimonials yet.</p>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {testimonials.map((t, i) => (
                                    <figure key={t.id} className="flex flex-col rounded-xl border bg-white p-6 shadow-sm">
                                        <Quote className="size-7 text-brand/30" />
                                        <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">{t.quote}</blockquote>
                                        <figcaption className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-5">
                                            <span className={`relative inline-flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full ${t.avatarUrl ? "" : avatarTints[i % avatarTints.length]} ring-2 ring-white shadow-md`}>
                                                {t.avatarUrl ? <Image src={t.avatarUrl} alt={t.name} fill className="object-cover" sizes="48px" /> : <UserRound className="size-6" />}
                                            </span>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                                                <p className="text-xs text-slate-500">{t.role}</p>
                                            </div>
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
