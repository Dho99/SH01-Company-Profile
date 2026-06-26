"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type NavLink = {
    id: string;
    label: string;
    href: string;
    hasDropdown: boolean;
    group: string;
};

const serviceDropdownItems = [
    { label: "Web Development", href: "/#services" },
    { label: "Mobile Development", href: "/#services" },
    { label: "System Development", href: "/#services" },
    { label: "UI/UX Design", href: "/#services" },
    { label: "IT Consulting", href: "/#services" },
    { label: "Maintenance & Support", href: "/#services" },
];

function normalizeHref(href: string) {
    if (href.startsWith("#")) return `/${href}`;
    return href;
}

export function Navbar() {
    const pathname = usePathname();
    const [navLinks, setNavLinks] = useState<NavLink[]>([]);
    const [open, setOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [activeHref, setActiveHref] = useState("/");
    const visibleSections = useRef(new Set<string>());

    useEffect(() => {
        fetch("/api/cms/nav-links")
            .then((r) => r.json())
            .then((data: NavLink[]) => {
                setNavLinks(data.filter((l) => l.group === "HEADER"));
            });
    }, []);

    useEffect(() => {
        const updateActiveHref = () => {
            const hash = window.location.hash;

            if (pathname === "/") {
                setActiveHref(hash ? `/${hash}` : "/");
            } else {
                setActiveHref(pathname);
            }
        };

        updateActiveHref();

        window.addEventListener("hashchange", updateActiveHref);

        return () => {
            window.removeEventListener("hashchange", updateActiveHref);
        };
    }, [pathname]);

    useEffect(() => {
        if (pathname !== "/") return;

        const sectionIds = [
            "about", "services", "portfolio",
            "technologies", "blog", "career", "contact",
        ];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        visibleSections.current.add(entry.target.id);
                    } else {
                        visibleSections.current.delete(entry.target.id);
                    }
                });

                if (visibleSections.current.size === 0) {
                    setActiveHref("/");
                    return;
                }

                const active = sectionIds.find((id) => visibleSections.current.has(id));
                if (active) setActiveHref(`/#${active}`);
            },
            { rootMargin: "-78px 0px -50% 0px", threshold: 0 },
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [pathname]);

    const isActive = (href: string) => {
        const normalizedHref = normalizeHref(href);

        if (normalizedHref === "/") {
            return pathname === "/" && activeHref === "/";
        }

        if (normalizedHref.startsWith("/#")) {
            return pathname === "/" && activeHref === normalizedHref;
        }

        return pathname === normalizedHref;
    };

    return (
        <motion.header
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease }}
            className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white shadow-[0_1px_18px_rgba(15,23,42,0.04)]"
        >
            <div className="mx-auto flex h-[78px] max-w-[1220px] items-center justify-between px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, delay: 0.12, ease }}
                    className="flex shrink-0 items-center"
                >
                    <Logo />
                </motion.div>

                <nav className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((link, i) => {
                        const hasDropdown =
                            "hasDropdown" in link && link.hasDropdown;
                        const active = isActive(link.href);

                        return (
                            <motion.div
                                key={link.label}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.08 + i * 0.04,
                                    ease,
                                }}
                                className="group relative"
                            >
                                <Link
                                    href={link.href}
                                    onClick={() =>
                                        setActiveHref(normalizeHref(link.href))
                                    }
                                    className={cn(
                                        "relative inline-flex h-[78px] items-center gap-1 text-[14px] font-medium tracking-[-0.01em] transition-colors",
                                        active
                                            ? "text-slate-950"
                                            : "text-slate-700 hover:text-brand",
                                    )}
                                >
                                    {link.label}

                                    {hasDropdown && (
                                        <ChevronDown className="size-3.5 stroke-[2.3] transition-transform duration-300 group-hover:rotate-180" />
                                    )}

                                    {active && (
                                        <span className="absolute bottom-0 left-1/2 h-[2px] w-7 -translate-x-1/2 rounded-full bg-brand" />
                                    )}
                                </Link>

                                {hasDropdown && (
                                    <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 translate-y-3 rounded-xl border border-slate-100 bg-white p-2 opacity-0 shadow-[0_18px_50px_rgba(15,23,42,0.12)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                        <div className="absolute -top-2 left-1/2 size-4 -translate-x-1/2 rotate-45 border-l border-t border-slate-100 bg-white" />

                                        <div className="relative space-y-1">
                                            {serviceDropdownItems.map(
                                                (item) => (
                                                    <Link
                                                        key={item.label}
                                                        href={item.href}
                                                        onClick={() =>
                                                            setActiveHref(
                                                                item.href,
                                                            )
                                                        }
                                                        className="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-brand"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </nav>

                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.35, ease }}
                    className="hidden shrink-0 lg:block"
                >
                    <Button
                        asChild
                        className="h-11 rounded-[8px] bg-brand px-7 text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.22)] transition-all hover:bg-brand/90 hover:shadow-[0_10px_24px_rgba(37,99,235,0.28)]"
                    >
                        <Link
                            href="/#contact"
                            onClick={() => setActiveHref("/#contact")}
                        >
                            Get in Touch
                        </Link>
                    </Button>
                </motion.div>

                <motion.button
                    type="button"
                    aria-label="Toggle menu"
                    onClick={() => setOpen((v) => !v)}
                    whileTap={{ scale: 0.92 }}
                    className="inline-flex size-10 items-center justify-center rounded-md text-slate-800 transition hover:bg-slate-100 lg:hidden"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {open ? (
                            <motion.span
                                key="x"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="size-5" />
                            </motion.span>
                        ) : (
                            <motion.span
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu className="size-5" />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease }}
                        className="overflow-hidden border-t border-slate-100 bg-white lg:hidden"
                    >
                        <nav className="mx-auto flex max-w-[1180px] flex-col gap-1 px-4 py-4 sm:px-6">
                            {navLinks.map((link, i) => {
                                const hasDropdown =
                                    "hasDropdown" in link && link.hasDropdown;
                                const active = isActive(link.href);

                                if (hasDropdown) {
                                    return (
                                        <div key={link.label}>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setMobileServicesOpen(
                                                        (v) => !v,
                                                    )
                                                }
                                                className={cn(
                                                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-slate-50 hover:text-brand",
                                                    active
                                                        ? "bg-blue-50 text-brand"
                                                        : "text-slate-700",
                                                )}
                                            >
                                                <span>{link.label}</span>
                                                <ChevronDown
                                                    className={cn(
                                                        "size-4 transition-transform",
                                                        mobileServicesOpen &&
                                                            "rotate-180",
                                                    )}
                                                />
                                            </button>

                                            <AnimatePresence>
                                                {mobileServicesOpen && (
                                                    <motion.div
                                                        initial={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            height: "auto",
                                                            opacity: 1,
                                                        }}
                                                        exit={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.22,
                                                            ease,
                                                        }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="ml-3 mt-1 space-y-1 border-l border-slate-100 pl-3">
                                                            {serviceDropdownItems.map(
                                                                (item) => (
                                                                    <Link
                                                                        key={
                                                                            item.label
                                                                        }
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        onClick={() => {
                                                                            setActiveHref(
                                                                                item.href,
                                                                            );
                                                                            setOpen(
                                                                                false,
                                                                            );
                                                                        }}
                                                                        className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-brand"
                                                                    >
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </Link>
                                                                ),
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                }

                                return (
                                    <motion.div
                                        key={link.label}
                                        initial={{ opacity: 0, x: -14 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: i * 0.04,
                                            duration: 0.25,
                                            ease,
                                        }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => {
                                                setActiveHref(
                                                    normalizeHref(link.href),
                                                );
                                                setOpen(false);
                                            }}
                                            className={cn(
                                                "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition",
                                                active
                                                    ? "bg-blue-50 text-brand"
                                                    : "text-slate-700 hover:bg-slate-50 hover:text-brand",
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                );
                            })}

                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: navLinks.length * 0.04 + 0.05,
                                    duration: 0.25,
                                    ease,
                                }}
                            >
                                <Button
                                    asChild
                                    className="mt-3 h-10 w-full rounded-lg bg-brand"
                                >
                                    <Link
                                        href="/#contact"
                                        onClick={() => {
                                            setActiveHref("/#contact");
                                            setOpen(false);
                                        }}
                                    >
                                        Get in Touch
                                    </Link>
                                </Button>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
