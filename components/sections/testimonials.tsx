import Image from "next/image";
import { Quote, UserRound } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Carousel } from "@/components/carousel";
import { Reveal } from "@/components/reveal";

const ease = [0.22, 1, 0.36, 1] as const;

const avatarTints = [
    "bg-blue-50 text-blue-600",
    "bg-violet-50 text-violet-600",
    "bg-emerald-50 text-emerald-600",
];

type Testimonial = {
    id: string;
    quote: string;
    name: string;
    role: string;
    avatarUrl: string | null;
};

type Heading = { eyebrow: string; title: string };

export function Testimonials({
    items,
    heading,
}: {
    items: Testimonial[];
    heading?: Heading;
}) {
    const testimonials = items;

    if (testimonials.length === 0) {
        return (
            <section className="bg-slate-50 py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="h-48 animate-pulse rounded-xl bg-white" />
                </div>
            </section>
        );
    }

    return (
        <section className="bg-slate-50 py-12 lg:py-14">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                <Carousel
                    variant="header"
                    headerClassName="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
                    trackClassName="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-3"
                    header={
                        <Reveal
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.65, ease }}
                        >
                            <SectionHeading
                                align="left"
                                eyebrow={heading?.eyebrow ?? "What Clients Say"}
                                title={heading?.title ?? "Trusted By Great Companies"}
                            />
                        </Reveal>
                    }
                >
                    {testimonials.map((t, i) => (
                        <Reveal
                            key={t.id}
                            as="figure"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 0.65,
                                delay: i * 0.12,
                                ease,
                            }}
                            whileHover={{
                                y: -4,
                                boxShadow:
                                    "0 18px 45px -16px rgba(15,23,42,0.22)",
                            }}
                            className="flex w-[88%] shrink-0 snap-start flex-col rounded-xl border bg-white p-6 shadow-sm sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                        >
                            <Reveal
                                initial={{ scale: 0, rotate: -20 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 18,
                                    delay: i * 0.1 + 0.2,
                                }}
                            >
                                <Quote className="size-7 text-brand/30" />
                            </Reveal>

                            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                                {t.quote}
                            </blockquote>

                            <figcaption className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-5">
                                <Reveal
                                    whileHover={{ scale: 1.08 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                    }}
                                    className={`relative inline-flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full ${t.avatarUrl ? "" : avatarTints[i % avatarTints.length]} ring-2 ring-white shadow-md`}
                                >
                                    {t.avatarUrl ? (
                                        <Image
                                            src={t.avatarUrl}
                                            alt={t.name}
                                            fill
                                            className="object-cover"
                                            sizes="48px"
                                        />
                                    ) : (
                                        <UserRound className="size-6" />
                                    )}
                                </Reveal>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        {t.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {t.role}
                                    </p>
                                </div>
                            </figcaption>
                        </Reveal>
                    ))}
                </Carousel>
            </div>
        </section>
    );
}
