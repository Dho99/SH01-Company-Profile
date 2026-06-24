"use client";

import {
  BadgeCheck,
  Clock,
  LifeBuoy,
  Smile,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

import { reasons } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const icons: Record<string, LucideIcon> = {
  quality: BadgeCheck,
  team: Users,
  delivery: Clock,
  satisfaction: Smile,
  support: LifeBuoy,
};

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function WhyChoose() {
  return (
    <section className="bg-white py-10 lg:py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-6 lg:items-center lg:gap-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
          className="lg:col-span-1"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Why Choose
          </span>
          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            LEXA?
          </p>
        </motion.div>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-5"
        >
          {reasons.map((r) => {
            const Icon = icons[r.icon];
            return (
              <motion.div
                key={r.title}
                variants={itemVariant}
                className="flex flex-col gap-2"
              >
                <motion.span
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 360, damping: 18 }}
                  className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand cursor-default"
                >
                  <Icon className="size-5" />
                </motion.span>
                <h3 className="text-sm font-semibold text-slate-900">
                  {r.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {r.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
