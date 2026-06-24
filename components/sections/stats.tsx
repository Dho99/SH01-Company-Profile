"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, Rocket, UserCheck, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";

import { stats } from "@/lib/site";
import { cn } from "@/lib/utils";

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
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(eased * target));

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "flex items-center justify-start gap-3 border-white/10 px-4 py-5 sm:gap-4 sm:px-6 md:gap-5 md:px-8 lg:px-10",

        // Mobile layout: 2 columns x 2 rows
        index === 1 && "border-l",
        index === 2 && "border-t",
        index === 3 && "border-l border-t",

        // Desktop layout: 4 columns in one row
        index > 0 && "md:border-l",
        index >= 2 && "md:border-t-0"
      )}
    >
      <motion.span
        initial={{ scale: 0, rotate: -18 }}
        animate={inView ? { scale: 1, rotate: 0 } : {}}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 18,
          delay: index * 0.08 + 0.12,
        }}
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 ring-1 ring-blue-300/10 sm:size-12 md:size-14"
      >
        <Icon className="size-5 sm:size-6" strokeWidth={2.2} />
      </motion.span>

      <div className="min-w-0">
        <dd className="text-[24px] font-bold leading-none tracking-[-0.03em] text-white tabular-nums sm:text-[26px] md:text-[28px]">
          {inView ? count : 0}
          {suffix}
        </dd>

        <dt className="mt-1.5 text-[11px] leading-tight text-white/70 sm:text-xs md:mt-2 md:text-sm">
          {s.label}
        </dt>
      </div>
    </motion.div>
  );
}

export function Stats() {
  return (
    <section className="relative z-20 -mt-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[12px] bg-[#061b49] shadow-[0_24px_60px_rgba(2,8,23,0.32)] ring-1 ring-white/10">
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <StatItem key={s.label} s={s} index={i} />
          ))}
        </dl>
      </div>
    </section>
  );
}