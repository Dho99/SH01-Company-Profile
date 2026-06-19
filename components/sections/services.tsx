import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  Code2,
  Cog,
  Palette,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/site";

const config: Record<string, { icon: LucideIcon; tint: string }> = {
  code: { icon: Code2, tint: "bg-blue-50 text-blue-600" },
  mobile: { icon: Smartphone, tint: "bg-indigo-50 text-indigo-600" },
  system: { icon: Cog, tint: "bg-emerald-50 text-emerald-600" },
  design: { icon: Palette, tint: "bg-amber-50 text-amber-600" },
  consulting: { icon: Cloud, tint: "bg-sky-50 text-sky-600" },
  support: { icon: ShieldCheck, tint: "bg-violet-50 text-violet-600" },
};

export function Services() {
  return (
    <section id="services" className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our Services" title="Solutions We Provide" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const { icon: Icon, tint } = config[s.icon];
            return (
              <Card
                key={s.title}
                className="group gap-4 border-slate-100 py-6 transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg"
              >
                <CardHeader>
                  <span
                    className={`mb-2 inline-flex size-12 items-center justify-center rounded-xl ${tint}`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <CardTitle className="text-lg">{s.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {s.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors group-hover:gap-2.5"
                  >
                    Learn More <ArrowRight className="size-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
