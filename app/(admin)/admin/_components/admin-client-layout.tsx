"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Home,
  Menu,
} from "lucide-react";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { SidebarContent } from "./sidebar-content";

const sidebarScrollbarClass =
  "scrollbar-thin [scrollbar-color:rgba(255,255,255,0.22)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/35";

const breadcrumbMap: Record<string, string> = {
  admin: "Dashboard",
  "site-setting": "Site Settings",
  "section-headings": "Section Headings",
  stats: "Stats",
  "about-points": "About Points",
  services: "Services",
  projects: "Projects",
  technologies: "Technologies",
  reasons: "Reasons",
  testimonials: "Testimonials",
  "nav-links": "Nav Links",
  "blog-posts": "Blog Posts",
};

export function AdminClientLayout({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string;
}) {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const breadcrumbs = useMemo(() => {
    const segments = pathname
      .split("/")
      .filter(Boolean);

    return segments.map((segment, index) => ({
      href: "/" + segments.slice(0, index + 1).join("/"),
      label:
        breadcrumbMap[segment] ??
        segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
    }));
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-60 shrink-0 overflow-hidden bg-[#06122a] lg:flex lg:flex-col">
        <div
          className={`h-full overflow-y-auto overflow-x-hidden pr-1 ${sidebarScrollbarClass}`}
        >
          <SidebarContent email={email} />
        </div>
      </aside>

      {/* Main */}
      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="z-30 flex h-14 shrink-0 items-center justify-between border-b bg-white px-4 lg:hidden">
    {/* Logo */}
    <div className="flex items-center gap-2">
        <img
            src="/footerLEXA.png"
            alt="LEXA"
            className="h-7 w-auto"
        />

        <span className="text-sm font-bold tracking-wide text-slate-800">
            <span className="text-brand">CMS</span>
        </span>
    </div>

    {/* Hamburger */}
    <button
        onClick={() => setOpen(true)}
        className="rounded p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        aria-label="Open navigation"
    >
        <Menu className="size-5" />
    </button>
</header>

        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 sm:px-5 lg:px-6 lg:py-7">
          <div className="container mx-auto">

            {/* Breadcrumb */}
            <div className="mb-6 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
              <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <Home className="size-4 text-brand" />

                {breadcrumbs.map((item, index) => (
                  <div
                    key={item.href}
                    className="flex items-center gap-2"
                  >
                    <ChevronRight className="size-4 text-slate-400" />

                    {index === breadcrumbs.length - 1 ? (
                      <span className="font-semibold text-slate-900">
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="transition hover:text-brand"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="h-screen w-60 overflow-hidden border-0 bg-[#06122a] p-0"
        >
          <SheetTitle className="sr-only">
            Navigation
          </SheetTitle>

          <div
            className={`h-full overflow-y-auto overflow-x-hidden pr-1 ${sidebarScrollbarClass}`}
          >
            <SidebarContent email={email} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}