import {
  BadgeCheck,
  Clock,
  LifeBuoy,
  Smile,
  Users,
  type LucideIcon,
} from "lucide-react";

import { reasons } from "@/lib/site";

const icons: Record<string, LucideIcon> = {
  quality: BadgeCheck,
  team: Users,
  delivery: Clock,
  satisfaction: Smile,
  support: LifeBuoy,
};

export function WhyChoose() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-6 lg:items-center lg:gap-8 lg:px-8">
        <div className="lg:col-span-1">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Why Choose
          </span>
          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            LEXA?
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-5">
          {reasons.map((r) => {
            const Icon = icons[r.icon];
            return (
              <div key={r.title} className="flex flex-col gap-2">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-sm font-semibold text-slate-900">
                  {r.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {r.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
