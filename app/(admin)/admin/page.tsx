import Link from "next/link";

const cards = [
  { label: "Site Settings", href: "/admin/site-setting", color: "bg-blue-500" },
  { label: "Section Headings", href: "/admin/section-headings", color: "bg-indigo-500" },
  { label: "Stats", href: "/admin/stats", color: "bg-emerald-500" },
  { label: "About Points", href: "/admin/about-points", color: "bg-teal-500" },
  { label: "Services", href: "/admin/services", color: "bg-violet-500" },
  { label: "Projects", href: "/admin/projects", color: "bg-orange-500" },
  { label: "Technologies", href: "/admin/technologies", color: "bg-cyan-500" },
  { label: "Reasons", href: "/admin/reasons", color: "bg-rose-500" },
  { label: "Testimonials", href: "/admin/testimonials", color: "bg-pink-500" },
  { label: "Nav Links", href: "/admin/nav-links", color: "bg-slate-500" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Manage your landing page content.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <span
              className={`inline-block size-4 rounded ${card.color}`}
            />
            <h2 className="mt-3 font-semibold text-slate-900 group-hover:text-brand">
              {card.label}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
