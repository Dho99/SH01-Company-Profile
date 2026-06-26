"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const groups = [
    {
        label: "General",
        links: [
            { label: "Dashboard", href: "/admin" },
            { label: "Site Settings", href: "/admin/site-setting" },
            { label: "Section Headings", href: "/admin/section-headings" },
        ],
    },
    {
        label: "Content",
        links: [
            { label: "Stats", href: "/admin/stats" },
            { label: "About Points", href: "/admin/about-points" },
            { label: "Services", href: "/admin/services" },
            { label: "Projects", href: "/admin/projects" },
            { label: "Technologies", href: "/admin/technologies" },
            { label: "Reasons", href: "/admin/reasons" },
            { label: "Testimonials", href: "/admin/testimonials" },
        ],
    },
    {
        label: "Navigation",
        links: [{ label: "Nav Links", href: "/admin/nav-links" }],
    },
    {
        label: "Blog",
        links: [{ label: "Blog Posts", href: "/admin/blog-posts" }],
    },
];

export function SidebarNav() {
    const pathname = usePathname();

    function isActive(href: string) {
        if (href === "/admin") return pathname === "/admin";
        return pathname === href || pathname.startsWith(href + "/");
    }

    return (
        <ul className="space-y-0.5">
            {groups.map((group, gi) => (
                <li key={group.label}>
                    <p
                        className={cn(
                            "px-3 text-[10px] font-semibold uppercase tracking-widest text-white/30",
                            gi === 0 ? "mb-1" : "mb-1 mt-5",
                        )}
                    >
                        {group.label}
                    </p>
                    <ul className="space-y-0.5">
                        {group.links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "block rounded-r-md py-2 text-sm transition-colors",
                                        isActive(link.href)
                                            ? "border-l-2 border-brand bg-white/8 pl-[10px] font-medium text-white"
                                            : "pl-3 text-white/55 hover:bg-white/6 hover:text-white",
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}
