"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarLinks = [
    { label: "Dashboard", href: "/admin" },
    { label: "Site Settings", href: "/admin/site-setting" },
    { label: "Section Headings", href: "/admin/section-headings" },
    { label: "Stats", href: "/admin/stats" },
    { label: "About Points", href: "/admin/about-points" },
    { label: "Services", href: "/admin/services" },
    { label: "Projects", href: "/admin/projects" },
    { label: "Technologies", href: "/admin/technologies" },
    { label: "Reasons", href: "/admin/reasons" },
    { label: "Testimonials", href: "/admin/testimonials" },
    { label: "Nav Links", href: "/admin/nav-links" },
];

export function SidebarNav() {
    const pathname = usePathname();

    function isActive(href: string) {
        if (href === "/admin") return pathname === "/admin";
        return pathname === href || pathname.startsWith(href + "/");
    }

    return (
        <ul className="space-y-1">
            {sidebarLinks.map((link) => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={cn(
                            "block rounded-md px-3 py-2 text-sm transition-colors",
                            isActive(link.href)
                                ? "bg-brand/10 font-medium text-brand"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                        )}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
