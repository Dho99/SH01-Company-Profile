"use client";

import { useEffect, useState } from "react";
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

    useEffect(() => {
        fetch("/api/cms/nav-links")
            .then((r) => r.json())
            .then((data: NavLink[]) =>
                setNavLinks(data.filter((l) => l.group === "HEADER")),
            );
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
        return () => window.removeEventListener("hashchange", updateActiveHref);
    }, [pathname]);

    const isActive = (href: string) => {
        const normalizedHref = normalizeHref(href);
        if (normalizedHref === "/")
            return pathname === "/" && activeHref === "/";
        if (normalizedHref.startsWith("/#"))
            return pathname === "/" && activeHref === normalizedHref;
        return pathname === normalizedHref;
    };

    return (
        <motion.header
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease }}
            className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75"
        >
            <div className="mx-auto flex h-16 items-center justify-between max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, delay: 0.12, ease }}
                >
                    <Logo />
                </motion.div>

                <nav className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((link, i) => {
                        const hasDropdown = link.hasDropdown;
                        const active = isActive(link.href);

                        return (
                            <motion.div
                                key={link.id || link.label}
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
                                        "group relative inline-flex items-center gap-1 py-5 text-sm font-medium transition-colors hover:text-brand",
                                        active
                                            ? "text-brand"
                                            : "text-slate-600",
                                    )}
                                >
                                    {link.label}
                                    {hasDropdown && (
                                        <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180" />
                                    )}
                                    {active && (
                                        <span className="absolute inset-x-0 bottom-0 mx-auto h-0.5 w-6 rounded-full bg-brand" />
                                    )}
                                </Link>

                                {hasDropdown && (
                                    <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 translate-y-3 rounded-xl border border-slate-100 bg-white p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                        <div className="absolute -top-2 left-1/2 size-4 -translate-x-1/2 rotate-45 border-l border-t border-slate-100 bg-white" />
                                        <div className="relative space-y-1">
                                            {navLinks.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    href={item.href}
                                                    className="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-brand"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
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
                    <Button asChild className="rounded-lg px-5">
                        <Link href="/#contact">Get in Touch</Link>
                    </Button>
                </motion.div>

                <motion.button
                    type="button"
                    aria-label="Toggle menu"
                    onClick={() => setOpen((v) => !v)}
                    whileTap={{ scale: 0.92 }}
                    className="inline-flex size-10 items-center justify-center rounded-md text-slate-700 lg:hidden"
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
                        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
                            {navLinks.map((link) => {
                                const hasDropdown = link.hasDropdown;
                                const active = isActive(link.href);

                                if (hasDropdown) {
                                    return (
                                        <div key={link.id || link.label}>
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
                                                            {navLinks.map(
                                                                (item) => (
                                                                    <Link
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        onClick={() => {
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
                                    <Link
                                        key={link.id || link.label}
                                        href={link.href}
                                        onClick={() => {
                                            setActiveHref(
                                                normalizeHref(link.href),
                                            );
                                            setOpen(false);
                                        }}
                                        className={cn(
                                            "rounded-lg px-3 py-2.5 text-sm font-medium transition",
                                            active
                                                ? "bg-blue-50 text-brand"
                                                : "text-slate-700 hover:bg-slate-50 hover:text-brand",
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                            <Button asChild className="mt-2 rounded-lg">
                                <Link
                                    href="/#contact"
                                    onClick={() => setOpen(false)}
                                >
                                    Get in Touch
                                </Link>
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
