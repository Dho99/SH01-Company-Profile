"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, Rocket, UserCheck, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";

import { stats } from "@/lib/site";

const icons = {
  rocket: Rocket,
  clients: Users,
  team: UserCheck,
  calendar: CalendarDays,
} as const;

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
      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return count;
}

function StatItem({
  s,
  index,
}: {
  s: (typeof stats)[number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const num = parseInt(s.value);
  const suffix = s.value.replace(/\d+/, "");
  const count = useCounter(num, inView);
  const Icon = icons[s.icon];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-center gap-4 px-2"
    >
      <motion.span
        initial={{ scale: 0, rotate: -20 }}
        animate={inView ? { scale: 1, rotate: 0 } : {}}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: index * 0.1 + 0.15 }}
        className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/15 text-blue-400"
      >
        <Icon className="size-6" />
      </motion.span>
      <div>
        <dd className="text-2xl font-bold text-white tabular-nums">
          {inView ? count : 0}
          {suffix}
        </dd>
        <dt className="text-sm text-white/60">{s.label}</dt>
      </div>
    </motion.div>
  );
}

export function Stats() {
  return (
    <section className="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl bg-navy-deep px-6 py-8 shadow-xl ring-1 ring-white/10">
        <dl className="grid grid-cols-2 gap-y-8 divide-white/10 sm:grid-cols-4 sm:divide-x">
          {stats.map((s, i) => (
            <StatItem key={s.label} s={s} index={i} />
          ))}
        </dl>
      </div>
    </section>
  );
}
