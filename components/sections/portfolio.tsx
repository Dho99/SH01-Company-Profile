"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const badgeTint: Record<string, string> = {
  Corporate: "bg-blue-600",
  "E-Commerce": "bg-violet-600",
  Logistics: "bg-emerald-600",
  Education: "bg-amber-500",
};

const cardGradient: Record<string, string> = {
  Corporate: "from-slate-700 to-slate-900",
  "E-Commerce": "from-violet-700 to-indigo-900",
  Logistics: "from-emerald-700 to-teal-900",
  Education: "from-amber-600 to-orange-900",
};

const cardContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

export function Portfolio() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="portfolio" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
          className="relative flex flex-col items-center"
        >
          <SectionHeading eyebrow="Our Portfolio" title="Featured Projects" />
          <Link
            href="#portfolio"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:gap-2.5 lg:absolute lg:right-0 lg:top-2 lg:mt-0"
          >
            View All Projects <ArrowRight className="size-4" />
          </Link>
        </motion.div>

        <div className="relative mt-12">
          <CarouselButton dir="left" onClick={() => scroll("left")} />
          <CarouselButton dir="right" onClick={() => scroll("right")} />

          <motion.div
            ref={trackRef}
            variants={cardContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
          >
            {projects.map((p) => (
              <motion.article
                key={p.title}
                variants={cardItem}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group w-[85%] shrink-0 snap-start overflow-hidden rounded-xl border border-slate-100 shadow-sm hover:shadow-lg sm:w-[45%] lg:w-[calc(25%-18px)]"
              >
                <div
                  className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${cardGradient[p.category]}`}
                >
                  <div className="bg-network-grid absolute inset-0 opacity-20" />
                  <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="absolute inset-0"
                  />
                  <Badge
                    className={`absolute left-3 top-3 ${badgeTint[p.category]} text-white`}
                  >
                    {p.category}
                  </Badge>
                  <div className="absolute inset-x-4 bottom-4 space-y-1.5">
                    <motion.span
                      animate={{ opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0 }}
                      className="block h-2 w-2/3 rounded bg-white/30"
                    />
                    <motion.span
                      animate={{ opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
                      className="block h-2 w-1/2 rounded bg-white/20"
                    />
                    <motion.span
                      animate={{ opacity: [0.2, 0.35, 0.2] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
                      className="block h-2 w-3/5 rounded bg-white/20"
                    />
                  </div>
                </div>
                <div className="space-y-2 p-5">
                  <h3 className="font-semibold text-slate-900">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-brand transition-all group-hover:gap-2.5"
                  >
                    View Case Study <ArrowRight className="size-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
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
      whileTap={{ scale: 0.93 }}
      aria-label={dir === "left" ? "Previous projects" : "Next projects"}
      className={`absolute top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white text-slate-700 shadow-md transition-colors hover:bg-brand hover:text-white ${
        dir === "left" ? "-left-2 lg:-left-5" : "-right-2 lg:-right-5"
      }`}
    >
      <Icon className="size-5" />
    </motion.button>
  );
}
