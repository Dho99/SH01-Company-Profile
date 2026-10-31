import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { CmsIcon } from "@/components/cms-icon";
import { Reveal } from "@/components/reveal";
import { ServicesSkeleton } from "@/components/skeletons/services-skeleton";
import { slugify } from "@/lib/slug";

const ease = [0.22, 1, 0.36, 1] as const;

const tints = [
    "bg-blue-50 text-blue-600",
    "bg-indigo-50 text-indigo-600",
    "bg-emerald-50 text-emerald-600",
    "bg-amber-50 text-amber-600",
    "bg-sky-50 text-sky-600",
    "bg-violet-50 text-violet-600",
] as const;

type Service = {
    id: string;
    slug: string;
    icon: string;
    title: string;
    description: string;
    imageUrl: string | null;
};

type Heading = { eyebrow: string; title: string };

export function Services({
    items,
    heading,
}: {
    items: Service[];
    heading?: Heading;
}) {
    const services = items;
    const display = services.slice(0, 6);
    const hasMore = services.length > 6;

    if (services.length === 0) return <ServicesSkeleton />;

    return (
        <section id="services" className="bg-slate-50 py-12 lg:py-14">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                <Reveal
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65, ease }}
                >
                    <SectionHeading
                        eyebrow={heading?.eyebrow ?? "Our Services"}
                        title={heading?.title ?? "Solutions We Provide"}
                    />
                </Reveal>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {display.map((s, index) => {
                        const tint = tints[index % tints.length];
                        return (
                            <Reveal
                                key={s.id}
                                initial={{ opacity: 0, y: 36 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.09,
                                    ease,
                                }}
                                whileHover={{
                                    y: -6,
                                    transition: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    },
                                }}
                            >
                                <Card className={`group h-full border-slate-100 shadow-sm transition-all hover:border-brand/30 hover:shadow-xl ${s.imageUrl ? "overflow-hidden pt-0 pb-6" : "py-6"}`}>
                                    {s.imageUrl && (
                                        <div className="relative aspect-[2/1] w-full shrink-0">
                                            <Image
                                                src={s.imageUrl}
                                                alt={s.title}
                                                fill
                                                className="object-cover"
                                                sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 86vw"
                                            />
                                        </div>
                                    )}
                                    <CardHeader className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <Reveal
                                                as="span"
                                                whileHover={{
                                                    scale: 1.12,
                                                    rotate: 6,
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 15,
                                                }}
                                                className={`inline-flex size-12 shrink-0 items-center justify-center rounded-xl ${tint}`}
                                            >
                                                <CmsIcon name={s.icon} size={24} />
                                            </Reveal>

                                            <CardTitle className="text-lg leading-snug text-slate-900">
                                                {s.title}
                                            </CardTitle>
                                        </div>

                                        <CardDescription className="text-sm leading-relaxed text-slate-500">
                                            <span dangerouslySetInnerHTML={{ __html: s.description }} />
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <Link
                                            href={`/services/${s.slug || slugify(s.title)}`}
                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all group-hover:gap-2.5"
                                        >
                                            Learn More{" "}
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </CardContent>
                                </Card>
                            </Reveal>
                        );
                    })}
                </div>
                {hasMore && (
                    <div className="mt-8 flex justify-center">
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-1.5 rounded-lg border bg-white px-5 py-2.5 text-sm font-semibold text-brand shadow-sm hover:bg-blue-50"
                        >
                            View All Services <ArrowRight className="size-4" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
