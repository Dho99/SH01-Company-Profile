"use client";

import Image from "next/image";
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

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#06142f] text-white">
      {/* Hero background image */}
      <Image
        src="/Hero.png"
        alt="Digital city background"
        fill
        priority
        className="absolute inset-0 -z-20 object-cover object-center"
        sizes="100vw"
      />

      {/* Dark overlay agar teks tetap terbaca */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,7,18,0.92)_0%,rgba(3,7,18,0.78)_36%,rgba(3,7,18,0.34)_68%,rgba(3,7,18,0.18)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,20,47,0.12)_0%,rgba(6,20,47,0.04)_55%,rgba(6,20,47,0.82)_100%)]" />

      <div className="relative mx-auto flex min-h-[560px] max-w-[1180px] items-center px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={textContainer}
          initial="hidden"
          animate="show"
          className="max-w-[560px]"
        >
          <motion.p
            variants={textItem}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200"
          >
            Leading, Excellence &amp; Automation
          </motion.p>

          <motion.h1
            variants={textItem}
            className="mt-5 text-[42px] font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-[64px]"
          >
            Building Digital Solutions For A{" "}
            <span className="text-blue-400">Better Future</span>
          </motion.h1>

          <motion.p
            variants={textItem}
            className="mt-6 max-w-[500px] text-sm leading-7 text-slate-200/90 sm:text-base"
          >
            LEXA Software House delivers innovative, reliable, and scalable
            software solutions that empower businesses and create meaningful
            impact.
          </motion.p>

          <motion.div
            variants={textItem}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                className="h-12 w-full rounded-[8px] bg-brand px-6 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.35)] hover:bg-brand/90 sm:w-auto"
              >
                <Link href="#services">
                  Our Services <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-[8px] border-white/30 bg-transparent px-6 text-sm font-semibold text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <Link href="#portfolio">
                  View Our Portfolio <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}