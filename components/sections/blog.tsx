"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const newsItems = [
  {
    id: 1,
    badge: "Latest News",
    tag: "Special Information",
    date: "May 18, 2026",
    day: "18",
    month: "MAY",
    title: "LEXA Software House Launches Project-Based Internship Program",
    excerpt:
      "This internship program is designed to provide hands-on experience in building professional digital solutions with the LEXA team.",
    image: "/Hero.png",
  },
  {
    id: 2,
    badge: "Technology",
    tag: "Digital Innovation",
    date: "May 12, 2026",
    day: "12",
    month: "MAY",
    title: "LEXA Develops Company Profile Website to Strengthen Digital Presence",
    excerpt:
      "A company profile website plays an important role in building digital identity and increasing trust from potential clients.",
    image: "/About.png",
  },
  {
    id: 3,
    badge: "Project",
    tag: "Web Development",
    date: "May 07, 2026",
    day: "07",
    month: "MAY",
    title: "LEXA Developer Team Starts Building Portfolio Management System",
    excerpt:
      "The portfolio management system is developed to showcase projects, case studies, and service documentation more professionally.",
    image: "/Company.png",
  },
  {
    id: 4,
    badge: "Career",
    tag: "Internship",
    date: "Jan 05, 2026",
    day: "05",
    month: "JAN",
    title: "Internship Opportunities at LEXA for Technology Students",
    excerpt:
      "Students can gain real project experience through teamwork, mentoring, collaboration, and portfolio development.",
    image: "/E-Commerce.png",
  },
];

export function Blog() {
  const [activeNews, setActiveNews] = useState(newsItems[0]);

  return (
    <section id="blog" className="bg-white pt-10 pb-6 lg:pt-12 lg:pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-600 shadow-sm">
              <span className="size-2 rounded-full bg-amber-500" />
              Latest News
            </div>

            <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              News & Information
            </h2>
          </div>

          <Button
            asChild
            variant="outline"
            className="h-10 rounded-lg border-amber-200 bg-white px-4 text-sm font-semibold text-amber-600 hover:bg-amber-50 hover:text-amber-700"
          >
            <Link href="#blog">
              View All <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          {/* Featured News */}
          <motion.article
            key={activeNews.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32 }}
            className="group relative min-h-[360px] overflow-hidden rounded-[20px] bg-slate-900 shadow-[0_20px_55px_rgba(15,23,42,0.16)] lg:h-[360px]"
          >
            <Image
              src={activeNews.image}
              alt={activeNews.title}
              fill
              priority
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 1024px) 560px, 100vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/48 to-slate-950/10" />

            <div className="relative z-10 flex min-h-[360px] flex-col justify-end p-5 sm:p-6 lg:h-[360px]">
              <div className="mb-4 flex flex-wrap gap-2.5">
                <span className="rounded-full bg-red-600 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">
                  {activeNews.badge}
                </span>

                <span className="rounded-full bg-amber-500 px-3.5 py-1.5 text-[11px] font-bold text-white">
                  {activeNews.date}
                </span>
              </div>

              <p className="mb-3 inline-flex w-fit rounded-md bg-black/35 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur">
                {activeNews.tag}
              </p>

              <h3 className="max-w-2xl text-2xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-3xl">
                {activeNews.title}
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/82">
                {activeNews.excerpt}
              </p>

              <Link
                href="#blog"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition-all hover:gap-3"
              >
                Read More <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.article>

          {/* News List */}
          <div className="lg:h-[360px]">
            <h3 className="mb-3 text-xl font-bold tracking-[-0.03em] text-slate-800">
              Latest at LEXA
            </h3>

            <div className="grid gap-2.5 lg:h-[320px] lg:grid-rows-4">
              {newsItems.map((item) => {
                const isActive = activeNews.id === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveNews(item)}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-[14px] border bg-white p-3 text-left shadow-sm transition-all duration-200",
                      "lg:h-full",
                      isActive
                        ? "border-brand/40 shadow-[0_12px_32px_rgba(37,99,235,0.12)] ring-2 ring-blue-50"
                        : "border-slate-200 hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-md"
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-12 shrink-0 flex-col items-center justify-center rounded-xl border text-center transition-colors",
                        isActive
                          ? "border-blue-200 bg-blue-50 text-brand"
                          : "border-amber-100 bg-amber-50 text-amber-600"
                      )}
                    >
                      <span className="text-lg font-bold leading-none">
                        {item.day}
                      </span>
                      <span className="mt-0.5 text-[10px] font-bold">
                        {item.month}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <h4
                        className={cn(
                          "line-clamp-2 text-[14px] font-bold leading-snug tracking-[-0.02em] transition-colors",
                          isActive
                            ? "text-brand"
                            : "text-slate-900 group-hover:text-brand"
                        )}
                      >
                        {item.title}
                      </h4>

                      <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-slate-500 sm:line-clamp-2 lg:line-clamp-1">
                        {item.excerpt}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}