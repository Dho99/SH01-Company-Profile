import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 size-96 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 size-[28rem] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-24 lg:px-8">
        {/* Copy */}
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">
            Leading, Excellence &amp; Automation
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Building Digital Solutions For{" "}
            <span className="text-blue-400">A Better Future</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
            LEXA Software House delivers innovative, reliable, and scalable
            software solutions that empower businesses and create meaningful
            impact.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-lg">
              <Link href="#services">
                Our Services <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-lg border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="#portfolio">
                View Our Portfolio <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Skyline visual */}
        <Skyline />
      </div>
    </section>
  );
}

/** CSS/SVG night-skyline stand-in for the hero photo. */
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

      {/* Buildings */}
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

      {/* Reflection */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}
