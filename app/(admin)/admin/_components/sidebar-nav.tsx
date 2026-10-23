"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
    LayoutDashboard,
    Settings,
    Heading,
    BarChart3,
    CircleHelp,
    BriefcaseBusiness,
    FolderKanban,
    Cpu,
    Lightbulb,
    MessageSquareQuote,
    Link2,
    Newspaper,
    ShieldCheck,
} from "lucide-react";

const groups = [
    {
        label: "General",
        links: [
            {
                label: "Dashboard",
                href: "/admin",
                icon: LayoutDashboard,
            },
            {
                label: "Site Settings",
                href: "/admin/site-setting",
                icon: Settings,
            },
            {
                label: "Section Headings",
                href: "/admin/section-headings",
                icon: Heading,
            },
        ],
    },
    {
        label: "Content",
        links: [
            {
                label: "Stats",
                href: "/admin/stats",
                icon: BarChart3,
            },
            {
                label: "About Points",
                href: "/admin/about-points",
                icon: CircleHelp,
            },
            {
                label: "Services",
                href: "/admin/services",
                icon: BriefcaseBusiness,
            },
            {
                label: "Projects",
                href: "/admin/projects",
                icon: FolderKanban,
            },
            {
                label: "Technologies",
                href: "/admin/technologies",
                icon: Cpu,
            },
            {
                label: "Reasons",
                href: "/admin/reasons",
                icon: Lightbulb,
            },
            {
                label: "Testimonials",
                href: "/admin/testimonials",
                icon: MessageSquareQuote,
            },
        ],
    },
    {
        label: "Navigation",
        links: [
            {
                label: "Nav Links",
                href: "/admin/nav-links",
                icon: Link2,
            },
        ],
    },
    {
        label: "Blog",
        links: [
            {
                label: "Blog Posts",
                href: "/admin/blog-posts",
                icon: Newspaper,
            },
        ],
    },
    {
        label: "Admin",
        links: [{ label: "Users", href: "/admin/users", icon: ShieldCheck }],
    },
];

export function SidebarNav() {
    const pathname = usePathname();

    function isActive(href: string) {
        if (href === "/admin") return pathname === "/admin";
        return pathname === href || pathname.startsWith(href + "/");
    }

    return (
        <ul className="space-y-1">
            {groups.map((group, gi) => (
                <li key={group.label}>
                    <p
                        className={cn(
                            "mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30",
                            gi !== 0 && "mt-6",
                        )}
                    >
                        {group.label}
                    </p>

                    <ul className="space-y-1">
                        {group.links.map((link) => {
                            const Icon = link.icon;
                            const active = isActive(link.href);

                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "group flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-all duration-200",

                                            active
                                                ? "border-brand/40 bg-brand/15 font-medium text-white shadow-[0_0_18px_rgba(37,99,235,.18)]"
                                                : "border-transparent text-white/60 hover:translate-x-1 hover:border-white/10 hover:bg-white/5 hover:text-white",
                                        )}
                                    >
                                        <span>{link.label}</span>

                                        <Icon
                                            className={cn(
                                                "h-4 w-4 transition-all duration-200",

                                                active
                                                    ? "text-brand"
                                                    : "text-white/35 group-hover:text-brand group-hover:translate-x-0.5",
                                            )}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </li>
            ))}
        </ul>
    );
}