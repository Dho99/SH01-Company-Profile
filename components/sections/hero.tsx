"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

const textContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const textItem = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

type SiteSetting = {
  heroEyebrow: string;
  heroHeading: string;
  heroHighlight: string;
  heroDescription: string;
  heroPrimaryLabel: string;
  heroPrimaryHref: string;
  heroSecondaryLabel: string;
  heroSecondaryHref: string;
};

export function Hero() {
  const [site, setSite] = useState<SiteSetting | null>(null);

  useEffect(() => {
    fetch("/api/cms/site-setting")
      .then((r) => r.json())
      .then(setSite);
  }, []);

  if (!site) {
    return (
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <div className="mx-auto flex min-h-[560px] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="h-32 w-64 animate-pulse rounded-lg bg-white/10" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 size-96 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 size-[28rem] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-24 lg:px-8">
        <motion.div
          variants={textContainer}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.p variants={textItem} className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">
            {site.heroEyebrow}
          </motion.p>
          <motion.h1 variants={textItem} className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            {site.heroHeading}
            <span className="text-blue-400">{site.heroHighlight}</span>
          </motion.h1>
          <motion.p variants={textItem} className="mt-6 max-w-md text-base leading-relaxed text-white/70">
            {site.heroDescription}
          </motion.p>
          <motion.div variants={textItem} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button asChild size="lg" className="rounded-lg">
                <Link href={site.heroPrimaryHref}>
                  {site.heroPrimaryLabel} <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button asChild size="lg" variant="outline" className="rounded-lg border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link href={site.heroSecondaryHref}>
                  {site.heroSecondaryLabel} <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <Skyline />
      </div>
    </section>
  );
}

function Skyline() {
  const buildings = [
    { h: 55, w: 8 }, { h: 75, w: 10 }, { h: 45, w: 7 }, { h: 90, w: 11 },
    { h: 65, w: 9 }, { h: 100, w: 12 }, { h: 50, w: 8 }, { h: 80, w: 10 },
    { h: 60, w: 9 }, { h: 95, w: 11 }, { h: 40, w: 7 }, { h: 70, w: 10 },
  ];

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-blue-950/40 via-navy-deep to-black/60 shadow-2xl">
      <div className="bg-network-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-x-0 top-1/4 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-2 px-6">
        {buildings.map((b, i) => (
          <div
            key={i}
            style={{ height: `${b.h}%`, width: `${b.w}%` }}
            className="relative rounded-t-sm bg-gradient-to-t from-blue-950 to-blue-900/70"
          >
            <div className="absolute inset-1.5 grid grid-cols-2 content-start gap-1">
              {Array.from({ length: 8 }).map((_, j) => (
                <span
                  key={j}
                  className="aspect-square rounded-[1px]"
                  style={{
                    background:
                      (i + j) % 3 === 0
                        ? "rgba(147,197,253,0.9)"
                        : "rgba(96,165,250,0.15)",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}
