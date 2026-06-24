"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, UserRound } from "lucide-react";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const avatarTints = [
  "bg-blue-50 text-blue-600",
  "bg-violet-50 text-violet-600",
  "bg-emerald-50 text-emerald-600",
];

const cardContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardItem = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease } },
};

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.8;

    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-slate-50 py-12 lg:py-14">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease }}
          >
            <SectionHeading
              align="left"
              eyebrow="What Clients Say"
              title="Trusted By Great Companies"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="flex gap-2"
          >
            <ArrowBtn dir="left" onClick={() => scroll("left")} />
            <ArrowBtn dir="right" onClick={() => scroll("right")} />
          </motion.div>
        </div>

        <motion.div
          ref={trackRef}
          variants={cardContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-3"
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              variants={cardItem}
              whileHover={{
                y: -4,
                boxShadow: "0 18px 45px -16px rgba(15,23,42,0.22)",
              }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="flex w-[88%] shrink-0 snap-start flex-col rounded-[14px] border border-slate-100 bg-white p-6 shadow-sm sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <motion.div
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
              </motion.div>

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                {t.quote}
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-5">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`inline-flex size-12 shrink-0 items-center justify-center rounded-full ${
                    avatarTints[i % avatarTints.length]
                  } ring-2 ring-white shadow-md`}
                >
                  <UserRound className="size-6" />
                </motion.div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ArrowBtn({
  dir,
  onClick,
}: {
  dir: "left" | "right";
  onClick: () => void;
}) {
  const Icon = dir === "left" ? ChevronLeft : ChevronRight;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      aria-label={dir === "left" ? "Previous" : "Next"}
      className="inline-flex size-10 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-700 shadow-sm transition-colors hover:bg-brand hover:text-white"
    >
      <Icon className="size-5" />
    </motion.button>
  );
}