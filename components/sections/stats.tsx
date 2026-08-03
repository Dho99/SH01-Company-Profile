import { CmsIcon } from "@/components/cms-icon";
import { StatValue } from "./stat-value";

type Stat = { id: string; icon: string; value: string; label: string };

export function Stats({ items }: { items: Stat[] }) {
    const stats = items;

    if (stats.length === 0) {
        return (
            <section className="relative z-20 -mt-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[12px] bg-[#061b49] shadow-[0_24px_60px_rgba(2,8,23,0.32)] ring-1 ring-white/10">
                    <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 md:grid-cols-4 md:divide-x md:divide-y-0">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="flex items-center gap-5 px-6 py-6 sm:px-8 lg:px-10"
                            >
                                <div className="size-14 animate-pulse rounded-full bg-white/10" />
                                <div className="space-y-2">
                                    <div className="h-7 w-16 animate-pulse rounded bg-white/10" />
                                    <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative z-20 -mt-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[12px] bg-[#061b49] shadow-[0_24px_60px_rgba(2,8,23,0.32)] ring-1 ring-white/10">
                <dl className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 md:grid-cols-4 md:divide-x md:divide-y-0">
                    {stats.map((s, i) => {
                        const num = parseInt(s.value);
                        const suffix = s.value.replace(/\d+/, "");
                        return (
                            <div
                                key={s.id}
                                className="flex items-center justify-start gap-5 px-6 py-6 sm:px-8 lg:px-10"
                            >
                                <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 ring-1 ring-blue-300/10">
                                    <CmsIcon name={s.icon} size={24} strokeWidth={2.2} />
                                </span>

                                <div className="min-w-0">
                                    <StatValue
                                        target={num}
                                        suffix={suffix}
                                        index={i}
                                    />
                                    <dt className="mt-2 text-sm leading-none text-white/70">
                                        {s.label}
                                    </dt>
                                </div>
                            </div>
                        );
                    })}
                </dl>
            </div>
        </section>
    );
}
