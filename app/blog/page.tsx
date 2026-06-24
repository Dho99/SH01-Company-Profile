"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ScrollToTop } from "@/components/scroll-to-top";
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

export default function BlogPage() {
  const [activeNews, setActiveNews] = useState(newsItems[0]);

  return (
    <>
      <Navbar />

      <main className="bg-white">
        <section className="relative overflow-hidden py-16 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.08),transparent_34%)]" />

          <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-600 shadow-sm">
                  <span className="size-2 rounded-full bg-amber-500" />
                  Latest News
                </div>

                <h1 className="text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl">
                  News & Information
                </h1>
              </div>

              <Button
                asChild
                variant="outline"
                className="h-11 rounded-lg border-amber-200 bg-white px-5 font-semibold text-amber-600 hover:bg-amber-50 hover:text-amber-700"
              >
                <Link href="/blog">
                  View All <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-start">
              {/* Featured News */}
              <motion.article
                key={activeNews.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="group relative min-h-[420px] overflow-hidden rounded-[24px] bg-slate-900 shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
              >
                <Image
                  src={activeNews.image}
                  alt={activeNews.title}
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 560px, 100vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/45 to-slate-950/10" />

                <div className="relative z-10 flex min-h-[420px] flex-col justify-end p-6 sm:p-8">
                  <div className="mb-5 flex flex-wrap gap-3">
                    <span className="rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
                      {activeNews.badge}
                    </span>

                    <span className="rounded-full bg-amber-500 px-4 py-2 text-xs font-bold text-white">
                      {activeNews.date}
                    </span>
                  </div>

                  <p className="mb-3 inline-flex w-fit rounded-md bg-black/35 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                    {activeNews.tag}
                  </p>

                  <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                    {activeNews.title}
                  </h2>

                  <p className="mt-4 max-w-2xl text-base leading-8 text-white/82">
                    {activeNews.excerpt}
                  </p>

                  <Link
                    href="/blog"
                    className="mt-6 inline-flex items-center gap-2 text-base font-bold text-white transition-all hover:gap-3"
                  >
                    Read More <ArrowRight className="size-5" />
                  </Link>
                </div>
              </motion.article>

              {/* News List */}
              <div>
                <h2 className="mb-5 text-2xl font-bold tracking-[-0.03em] text-slate-800">
                  Latest at LEXA
                </h2>

                <div className="space-y-4">
                  {newsItems.map((item) => {
                    const isActive = activeNews.id === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveNews(item)}
                        className={cn(
                          "group flex w-full items-center gap-5 rounded-[18px] border bg-white p-5 text-left shadow-sm transition-all duration-200",
                          isActive
                            ? "border-brand/40 shadow-[0_18px_45px_rgba(37,99,235,0.14)] ring-2 ring-blue-50"
                            : "border-slate-200 hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-md"
                        )}
                      >
                        <div
                          className={cn(
                            "flex size-16 shrink-0 flex-col items-center justify-center rounded-xl border text-center transition-colors",
                            isActive
                              ? "border-blue-200 bg-blue-50 text-brand"
                              : "border-amber-100 bg-amber-50 text-amber-600"
                          )}
                        >
                          <span className="text-2xl font-bold leading-none">
                            {item.day}
                          </span>
                          <span className="mt-1 text-xs font-bold">
                            {item.month}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <h3
                            className={cn(
                              "text-lg font-bold leading-snug tracking-[-0.02em] transition-colors",
                              isActive
                                ? "text-brand"
                                : "text-slate-900 group-hover:text-brand"
                            )}
                          >
                            {item.title}
                          </h3>

                          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
                            {item.excerpt}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Button asChild variant="ghost" className="rounded-lg">
                <Link href="/">
                  <ArrowLeft className="size-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}