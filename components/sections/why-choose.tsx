import { CmsIcon } from "@/components/cms-icon";
import { Reveal } from "@/components/reveal";
import { WhyChooseSkeleton } from "@/components/skeletons/why-choose-skeleton";

const ease = [0.22, 1, 0.36, 1] as const;

type Reason = {
    id: string;
    icon: string;
    title: string;
    description: string;
};

type Heading = { eyebrow: string; title: string };

export function WhyChoose({
    items,
    heading,
}: {
    items: Reason[];
    heading?: Heading;
}) {
    const reasons = items;

    if (reasons.length === 0) return <WhyChooseSkeleton />;

    return (
        <section className="bg-white py-10 lg:py-12">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-6 lg:items-center lg:gap-8 lg:px-8">
                <Reveal
                    initial={{ opacity: 0, x: -32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65, ease }}
                    className="lg:col-span-1"
                >
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                        {heading?.eyebrow ?? "Why Choose"}
                    </span>
                    <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                        {heading?.title ?? "LEXA?"}
                    </p>
                </Reveal>

                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-5">
                    {reasons.map((r, i) => (
                        <Reveal
                            key={r.id}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.1,
                                ease,
                            }}
                            className="flex flex-col gap-2"
                        >
                            <Reveal
                                as="span"
                                whileHover={{ scale: 1.15, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 360,
                                    damping: 18,
                                }}
                                className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand cursor-default"
                            >
                                <CmsIcon name={r.icon} size={20} />
                            </Reveal>
                            <h3 className="text-sm font-semibold text-slate-900">
                                {r.title}
                            </h3>
                            <p
                                className="text-xs leading-relaxed text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: r.description }}
                            />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
