import Link from "next/link";
import { ArrowRight, CheckCircle2, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo";
import { SectionHeading } from "@/components/section-heading";
import { aboutPoints } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Copy */}
        <div>
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

          <ul className="mt-6 space-y-3">
            {aboutPoints.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="size-5 shrink-0 text-brand" />
                <span className="text-slate-700">{point}</span>
              </li>
            ))}
          </ul>

          <Button asChild className="mt-8 rounded-lg">
            <Link href="#contact">
              Learn More About Us <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-navy-deep shadow-xl">
            <div className="bg-network-grid absolute inset-0 opacity-20" />
            <LogoMark className="relative size-20 drop-shadow-lg" />
            <span className="absolute mt-28 text-lg font-bold tracking-tight text-white">
              LEXA
            </span>
          </div>

          {/* Floating commitment card */}
          <div className="absolute -bottom-6 right-4 w-64 rounded-xl border bg-white p-4 shadow-lg sm:right-6">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <Users className="size-5" />
              </span>
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
          </div>
        </div>
      </div>
    </section>
  );
}
