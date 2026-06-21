"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Users } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { aboutPoints } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const listItem = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

export function About() {
  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Copy — slides from left */}
        <motion.div
          initial={{ opacity: 0, x: -56 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease }}
        >
          <SectionHeading
            align="left"
            eyebrow="Company Profile"
            title={
              <>
                About LEXA
                <br />
                Software House
              </>
            }
          />
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            LEXA Software House is a technology company that provides innovative
            digital solutions to help businesses grow and transform through
            technology.
          </p>

          <motion.ul
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-6 space-y-3"
          >
            {aboutPoints.map((point) => (
              <motion.li
                key={point}
                variants={listItem}
                className="flex items-center gap-3 text-sm"
              >
                <motion.span
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <CheckCircle2 className="size-5 shrink-0 text-brand" />
                </motion.span>
                <span className="text-slate-700">{point}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease }}
          >
            <Button asChild className="mt-8 rounded-lg">
              <Link href="#contact">
                Learn More About Us <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Visual — slides from right */}
        <motion.div
          initial={{ opacity: 0, x: 56 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease }}
          className="relative"
        >
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-navy-deep shadow-xl">
            <div className="bg-network-grid absolute inset-0 opacity-20" />
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute size-48 rounded-full bg-brand/20 blur-2xl"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute size-40 rounded-full border border-blue-400/10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute size-24 rounded-full border border-brand/20"
            />
            <div className="relative size-20 drop-shadow-lg">
                <Image
                  src="/logo.png"
                  alt="LEXA Software House"
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>
              <span className="absolute mt-28 text-lg font-bold tracking-tight text-white">
                LEXA
              </span>
          </div>

          {/* Floating commitment card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 180, damping: 20, delay: 0.4 }}
            className="absolute -bottom-6 right-4 sm:right-6"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-64 rounded-xl border bg-white p-4 shadow-lg"
            >
              <div className="flex items-start gap-3">
                <motion.span
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand"
                >
                  <Users className="size-5" />
                </motion.span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Our Commitment
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Delivering high-quality software solutions with integrity,
                    collaboration, and dedication to exceed client expectations.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
