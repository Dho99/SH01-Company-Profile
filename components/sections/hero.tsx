"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

const textContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};

const textItem = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      {/* Animated ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-0 size-96 rounded-full bg-brand/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute right-0 top-1/3 size-[28rem] rounded-full bg-blue-500/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-0 left-1/2 size-[22rem] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl"
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-24 lg:px-8">
        {/* Copy */}
        <motion.div
          variants={textContainer}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.p
            variants={textItem}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300"
          >
            Leading, Excellence &amp; Automation
          </motion.p>

          <motion.h1
            variants={textItem}
            className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Building Digital Solutions For{" "}
            <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              A Better Future
            </span>
          </motion.h1>

          <motion.p
            variants={textItem}
            className="mt-6 max-w-md text-base leading-relaxed text-white/70"
          >
            LEXA Software House delivers innovative, reliable, and scalable
            software solutions that empower businesses and create meaningful
            impact.
          </motion.p>

          <motion.div
            variants={textItem}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg" className="rounded-lg w-full sm:w-auto">
                <Link href="#services">
                  Our Services <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-lg border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white w-full sm:w-auto"
              >
                <Link href="#portfolio">
                  View Our Portfolio <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Skyline visual */}
        <motion.div
          initial={{ opacity: 0, x: 56 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          <Skyline />
        </motion.div>
      </div>
    </section>
  );
}

const BLINK_WINDOWS = [0, 3, 6, 9, 15, 18, 21, 27, 30, 33];

function Skyline() {
  const buildings = [
    { h: 55, w: 8 },
    { h: 75, w: 10 },
    { h: 45, w: 7 },
    { h: 90, w: 11 },
    { h: 65, w: 9 },
    { h: 100, w: 12 },
    { h: 50, w: 8 },
    { h: 80, w: 10 },
    { h: 60, w: 9 },
    { h: 95, w: 11 },
    { h: 40, w: 7 },
    { h: 70, w: 10 },
  ];

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-blue-950/40 via-navy-deep to-black/60 shadow-2xl">
      <div className="bg-network-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-x-0 top-1/4 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

      {/* Scanning line */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      />

      {/* Buildings */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-2 px-6">
        {buildings.map((b, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.65, delay: 0.5 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: `${b.h}%`, width: `${b.w}%`, transformOrigin: "bottom" }}
            className="relative rounded-t-sm bg-gradient-to-t from-blue-950 to-blue-900/70"
          >
            <div className="absolute inset-1.5 grid grid-cols-2 content-start gap-1">
              {Array.from({ length: 8 }).map((_, j) => {
                const idx = i * 8 + j;
                const lit = (i + j) % 3 === 0;
                const blinks = BLINK_WINDOWS.includes(idx % 36);
                return (
                  <motion.span
                    key={j}
                    initial={{ opacity: 0 }}
                    animate={
                      blinks && lit
                        ? { opacity: [0, 1, 0.6, 1, 0.8, 1] }
                        : { opacity: lit ? 1 : 0.15 }
                    }
                    transition={{
                      delay: 1.1 + i * 0.07 + j * 0.045,
                      duration: blinks ? 3 : 0.4,
                      repeat: blinks ? Infinity : 0,
                      repeatType: "loop",
                      repeatDelay: (i * 2 + j) % 5,
                    }}
                    className="aspect-square rounded-[1px]"
                    style={{
                      background: lit
                        ? "rgba(147,197,253,0.9)"
                        : "rgba(96,165,250,0.15)",
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reflection */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}
