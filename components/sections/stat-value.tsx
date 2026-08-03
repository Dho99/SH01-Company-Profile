"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

import { Reveal } from "@/components/reveal";

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

export function StatValue({
    target,
    suffix,
    index,
}: {
    target: number;
    suffix: string;
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const count = useCounter(target, inView);

    return (
        <Reveal
            ref={ref}
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <dd className="text-[28px] font-bold leading-none tracking-[-0.03em] text-white tabular-nums">
                {inView ? count : 0}
                {suffix}
            </dd>
        </Reveal>
    );
}
