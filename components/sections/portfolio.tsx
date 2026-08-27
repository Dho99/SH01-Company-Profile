import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { Carousel } from "@/components/carousel";
import { Reveal } from "@/components/reveal";

const ease = [0.22, 1, 0.36, 1] as const;

const badgeTint: Record<string, string> = {
    Corporate: "bg-blue-600",
    "E-Commerce": "bg-violet-600",
    Logistics: "bg-emerald-600",
    Education: "bg-amber-500",
};

const projectImages: Record<string, string> = {
    "Company Profile Website": "/Company.webp",
    "E-Commerce Mobile App": "/E-Commerce.webp",
    "Inventory Management System": "/Inventory.webp",
    "Learning Management System": "/Learning.webp",
};

const fallbackImages: Record<string, string> = {
    Corporate: "/Company.webp",
    "E-Commerce": "/E-Commerce.webp",
    Logistics: "/Inventory.webp",
    Education: "/Learning.webp",
};

type Project = {
    id: string;
    category: string;
    title: string;
    description: string;
    imageUrl: string | null;
};

type Heading = { eyebrow: string; title: string };

export function Portfolio({
    items,
    heading,
}: {
    items: Project[];
    heading?: Heading;
}) {
    const projects = items;

    if (projects.length === 0) {
        return (
            <section id="portfolio" className="bg-white py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="h-64 animate-pulse rounded-xl bg-slate-100" />
                </div>
            </section>
        );
    }

    return (
        <section id="portfolio" className="bg-white py-12 lg:py-14">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                <Reveal
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease }}
                    className="relative flex flex-col items-center"
                >
                    <SectionHeading
                        eyebrow={heading?.eyebrow ?? "Our Portfolio"}
                        title={heading?.title ?? "Featured Projects"}
                    />

                    <Link
                        href="/#portfolio"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all hover:gap-2.5 lg:absolute lg:right-0 lg:top-2 lg:mt-0"
                    >
                        View All Projects <ArrowRight className="size-4" />
                    </Link>
                </Reveal>

                <Carousel trackClassName="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-3">
                    {projects.map((p, i) => {
                        const imageSrc =
                            p.imageUrl ||
                            projectImages[p.title] ||
                            fallbackImages[p.category] ||
                            "/Company.webp";
                        return (
                            <Reveal
                                key={p.id}
                                as="article"
                                initial={{ opacity: 0, y: 34 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.1,
                                    ease,
                                }}
                                whileHover={{ y: -5 }}
                                className="group w-[85%] shrink-0 snap-start overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-lg sm:w-[45%] lg:w-[calc(25%-18px)]"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                                    <Image
                                        src={imageSrc}
                                        alt={p.title}
                                        fill
                                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                        sizes="(min-width: 1024px) 280px, (min-width: 640px) 46vw, 86vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />
                                    <Badge
                                        className={`absolute left-3 top-3 ${badgeTint[p.category] || "bg-blue-600"} px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm`}
                                    >
                                        {p.category}
                                    </Badge>
                                </div>

                                <div className="space-y-2 p-5">
                                    <h3 className="font-semibold text-slate-900">
                                        {p.title}
                                    </h3>
                                    <p
                                        className="text-sm text-muted-foreground"
                                        dangerouslySetInnerHTML={{ __html: p.description }}
                                    />
                                    <Link
                                        href="/#contact"
                                        className="inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-brand transition-all group-hover:gap-2.5"
                                    >
                                        View Case Study{" "}
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </div>
                            </Reveal>
                        );
                    })}
                </Carousel>
            </div>
        </section>
    );
}
