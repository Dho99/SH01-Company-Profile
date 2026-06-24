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
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const listItem = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
};

export function About() {
  return (
    <section id="about" className="bg-white pt-10 pb-6 lg:pt-12 lg:pb-8">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
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

          <p className="mt-5 max-w-[470px] text-[15px] leading-7 text-slate-600">
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
                <span className="inline-flex shrink-0">
                  <CheckCircle2 className="size-4 text-brand" />
                </span>
                <span className="text-slate-700">{point}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.35, ease }}
          >
            <Button
              asChild
              variant="outline"
              className="mt-8 h-11 rounded-[8px] border-slate-200 bg-white px-5 text-sm font-semibold text-brand shadow-sm hover:bg-blue-50 hover:text-brand"
            >
              <Link href="#contact">
                Learn More About Us <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="relative"
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-[14px] bg-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70">
            <Image
              src="/About.png"
              alt="LEXA Software House office meeting room"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>

          {/* Floating commitment card */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 20,
              delay: 0.35,
            }}
            className="absolute -bottom-7 right-4 sm:right-8 lg:-right-4"
          >
            <div className="w-[270px] rounded-[14px] border border-slate-100 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.14)]">
              <div className="flex items-start gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-brand">
                  <Users className="size-6" />
                </span>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Our Commitment
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    Delivering high-quality software solutions with integrity,
                    collaboration, and dedication to exceed client expectations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}