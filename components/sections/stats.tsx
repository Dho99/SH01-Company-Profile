"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, Rocket, UserCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useInView } from "framer-motion";

const icons: Record<string, LucideIcon> = {
    rocket: Rocket,
    clients: Users,
    team: UserCheck,
    calendar: CalendarDays,
};

type Stat = { id: string; icon: string; value: string; label: string };

function useCounter(target: number, active: boolean) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!active) return;

        const duration = 1400;
        const start = performance.now();
        let raf: number;

        function step(now: number) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);

            setCount(Math.round(eased * target));

            if (p < 1) {
                raf = requestAnimationFrame(step);
            }
        }

        raf = requestAnimationFrame(step);

        return () => cancelAnimationFrame(raf);
    }, [active, target]);

    return count;
}

function StatItem({ s, index }: { s: Stat; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const num = parseInt(s.value);
    const suffix = s.value.replace(/\d+/, "");
    const count = useCounter(num, inView);
    const Icon = icons[s.icon];
    if (!Icon) return null;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center justify-start gap-5 px-6 py-6 sm:px-8 lg:px-10"
        >
            <motion.span
                initial={{ scale: 0, rotate: -18 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 18,
                    delay: index * 0.1 + 0.12,
                }}
                className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 ring-1 ring-blue-300/10"
            >
                <Icon className="size-6" strokeWidth={2.2} />
            </motion.span>

            <div className="min-w-0">
                <dd className="text-[28px] font-bold leading-none tracking-[-0.03em] text-white tabular-nums">
                    {inView ? count : 0}
                    {suffix}
                </dd>
                <dt className="mt-2 text-sm leading-none text-white/70">
                    {s.label}
                </dt>
            </div>
        </motion.div>
    );
}

export function Stats() {
    const [stats, setStats] = useState<Stat[]>([]);

    useEffect(() => {
        fetch("/api/cms/stat")
            .then((r) => r.json())
            .then(setStats);
    }, []);

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
                    {stats.map((s, i) => (
                        <StatItem key={s.id} s={s} index={i} />
                    ))}
                </dl>
            </div>
        </section>
    );
}
