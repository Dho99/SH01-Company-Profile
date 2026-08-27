import Link from "next/link";
import {
  Settings,
  Type,
  BarChart3,
  CircleDot,
  BriefcaseBusiness,
  FolderKanban,
  Cpu,
  ShieldCheck,
  MessageSquareQuote,
  Navigation,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    label: "Site Settings",
    description: "Manage logo, hero, footer and contact information.",
    href: "/admin/site-setting",
    color: "bg-blue-500",
    icon: Settings,
  },
  {
    label: "Section Headings",
    description: "Edit headings and subtitles for every section.",
    href: "/admin/section-headings",
    color: "bg-indigo-500",
    icon: Type,
  },
  {
    label: "Stats",
    description: "Manage company statistics shown on homepage.",
    href: "/admin/stats",
    color: "bg-emerald-500",
    icon: BarChart3,
  },
  {
    label: "About Points",
    description: "Update company values and about highlights.",
    href: "/admin/about-points",
    color: "bg-teal-500",
    icon: CircleDot,
  },
  {
    label: "Services",
    description: "Manage software development services.",
    href: "/admin/services",
    color: "bg-violet-500",
    icon: BriefcaseBusiness,
  },
  {
    label: "Projects",
    description: "Maintain company portfolio and case studies.",
    href: "/admin/projects",
    color: "bg-orange-500",
    icon: FolderKanban,
  },
  {
    label: "Technologies",
    description: "Manage technology stacks displayed publicly.",
    href: "/admin/technologies",
    color: "bg-cyan-500",
    icon: Cpu,
  },
  {
    label: "Reasons",
    description: "Edit 'Why Choose LEXA' section.",
    href: "/admin/reasons",
    color: "bg-rose-500",
    icon: ShieldCheck,
  },
  {
    label: "Testimonials",
    description: "Manage testimonials from clients.",
    href: "/admin/testimonials",
    color: "bg-pink-500",
    icon: MessageSquareQuote,
  },
  {
    label: "Nav Links",
    description: "Configure header and footer navigation.",
    href: "/admin/nav-links",
    color: "bg-slate-500",
    icon: Navigation,
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your landing page content from one place.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color} text-white shadow-md`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-900 transition-colors group-hover:text-brand">
                {card.label}
              </h2>

              <p className="mt-2 min-h-[44px] text-sm leading-6 text-slate-500">
                {card.description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t pt-4">
                <span className="text-sm font-medium text-brand">
                  Open Module
                </span>

                <ArrowRight className="h-5 w-5 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-brand" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}