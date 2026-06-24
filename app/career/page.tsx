import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, Sparkles } from "lucide-react";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function CareerPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.12),transparent_35%)]" />

          <div className="relative mx-auto max-w-[900px] px-4 text-center sm:px-6 lg:px-8">
            <div className="mx-auto mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-brand shadow-sm">
              <BriefcaseBusiness className="size-8" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">
              Career Opportunities
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Join Our Team Soon
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
              LEXA Software House is growing. Career opportunities,
              internship programs, and collaboration openings will be available
              soon.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="h-11 rounded-lg px-6">
                <Link href="/">
                  <ArrowLeft className="size-4" />
                  Back to Home
                </Link>
              </Button>

              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                <Sparkles className="size-4 text-brand" />
                Opportunities will be posted soon
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}