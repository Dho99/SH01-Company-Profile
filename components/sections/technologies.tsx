import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
  SiDocker,
  SiFlutter,
  SiGit,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiReact,
  SiVuedotjs,
} from "react-icons/si";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { technologies } from "@/lib/site";

const icons: Record<string, IconType> = {
  laravel: SiLaravel,
  react: SiReact,
  nextjs: SiNextdotjs,
  vue: SiVuedotjs,
  flutter: SiFlutter,
  node: SiNodedotjs,
  php: SiPhp,
  python: SiPython,
  mysql: SiMysql,
  aws: FaAws,
  docker: SiDocker,
  git: SiGit,
};

export function Technologies() {
  return (
    <section id="technologies" className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Technologies We Use"
          title="Built On a Modern Stack"
        />

        <div className="mt-12 rounded-2xl border bg-white p-8 shadow-sm sm:p-10">
          <ul className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
            {technologies.map((tech) => {
              const Icon = icons[tech.icon];
              return (
                <li
                  key={tech.label}
                  className="group flex flex-col items-center gap-2"
                >
                  <Icon
                    className="size-9 text-slate-400 transition-colors group-hover:text-[var(--tw)]"
                    style={{ "--tw": tech.color } as React.CSSProperties}
                  />
                  <span className="text-xs font-medium text-slate-600">
                    {tech.label}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex justify-center">
            <Button asChild variant="outline" className="rounded-lg">
              <Link href="#contact">
                View All Technologies <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
