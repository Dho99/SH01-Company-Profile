"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/site";

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
        <div className="relative flex flex-col items-center">
          <SectionHeading eyebrow="Our Portfolio" title="Featured Projects" />
          <Link
            href="#portfolio"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:gap-2.5 lg:absolute lg:right-0 lg:top-2 lg:mt-0"
          >
            View All Projects <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="relative mt-12">
          <CarouselButton dir="left" onClick={() => scroll("left")} />
          <CarouselButton dir="right" onClick={() => scroll("right")} />

          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
          >
            {projects.map((p) => (
              <article
                key={p.title}
                className="group w-[85%] shrink-0 snap-start overflow-hidden rounded-xl border border-slate-100 shadow-sm transition-shadow hover:shadow-lg sm:w-[45%] lg:w-[calc(25%-18px)]"
              >
                <div
                  className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${cardGradient[p.category]}`}
                >
                  <div className="bg-network-grid absolute inset-0 opacity-20" />
                  <Badge
                    className={`absolute left-3 top-3 ${badgeTint[p.category]} text-white`}
                  >
                    {p.category}
                  </Badge>
                  <div className="absolute inset-x-4 bottom-4 space-y-1.5">
                    <span className="block h-2 w-2/3 rounded bg-white/30" />
                    <span className="block h-2 w-1/2 rounded bg-white/20" />
                    <span className="block h-2 w-3/5 rounded bg-white/20" />
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
              </article>
            ))}
          </div>
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
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "left" ? "Previous projects" : "Next projects"}
      className={`absolute top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white text-slate-700 shadow-md transition-colors hover:bg-brand hover:text-white ${
        dir === "left" ? "-left-2 lg:-left-5" : "-right-2 lg:-right-5"
      }`}
    >
      <Icon className="size-5" />
    </button>
  );
}
