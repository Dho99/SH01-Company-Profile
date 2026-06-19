import { CalendarDays, Rocket, UserCheck, Users } from "lucide-react";

import { stats } from "@/lib/site";

const icons = {
  rocket: Rocket,
  clients: Users,
  team: UserCheck,
  calendar: CalendarDays,
} as const;

export function Stats() {
  return (
    <section className="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl bg-navy-deep px-6 py-8 shadow-xl ring-1 ring-white/10">
        <dl className="grid grid-cols-2 gap-y-8 divide-white/10 sm:grid-cols-4 sm:divide-x">
          {stats.map((s) => {
            const Icon = icons[s.icon];
            return (
              <div
                key={s.label}
                className="flex items-center justify-center gap-4 px-2"
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/15 text-blue-400">
                  <Icon className="size-6" />
                </span>
                <div>
                  <dd className="text-2xl font-bold text-white">{s.value}</dd>
                  <dt className="text-sm text-white/60">{s.label}</dt>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
