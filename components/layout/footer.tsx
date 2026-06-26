"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
} from "react-icons/fa";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CurrentYear } from "@/components/current-year";

const socialIcons: Record<
    string,
    React.ComponentType<{ className?: string }>
> = {
    linkedin: FaLinkedinIn,
    instagram: FaInstagram,
    facebook: FaFacebookF,
    youtube: FaYoutube,
};

type SiteSetting = {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    instagram: string;
    facebook: string;
    youtube: string;
    footerTagline: string;
    footerNewsletterTitle: string;
    footerNewsletterText: string;
};

type NavLink = {
    id: string;
    label: string;
    href: string;
    group: string;
};

const addresses = [
    {
        label: "Malaysia Office",
        address:
            "Jalan Melawis 3 No. 8, Taman Melawis, Bukit Beruang, 75450 Melaka, Malaysia",
    },
    {
        label: "Indonesia Office",
        address:
            "Jl. Cijoho, Leuwisari, Kabupaten Tasikmalaya 46464, Jawa Barat, Indonesia",
    },
];

export function Footer() {
    const [site, setSite] = useState<SiteSetting | null>(null);
    const [navLinks, setNavLinks] = useState<NavLink[]>([]);

    useEffect(() => {
        Promise.all([
            fetch("/api/cms/site-setting").then((r) => r.json()),
            fetch("/api/cms/nav-links").then((r) => r.json()),
        ]).then(([siteData, links]) => {
            setSite(siteData);
            setNavLinks(links);
        });
    }, []);

    if (!site) {
        return (
            <footer className="bg-navy-deep text-navy-foreground">
                <div className="mx-auto max-w-7xl px-4 py-16">
                    <div className="h-48 animate-pulse rounded-xl bg-white/10" />
                </div>
            </footer>
        );
    }

    const footerNavLinks = navLinks.filter((l) => l.group === "FOOTER_NAV");
    const footerServiceLinks = navLinks.filter(
        (l) => l.group === "FOOTER_SERVICE",
    );

    return (
        <footer id="contact" className="bg-navy-deep text-navy-foreground">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.85fr_1.1fr_1.75fr_1.35fr]">
                    {/* Brand */}
                    <div>
                        <Logo variant="light" />

                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                            {site.footerTagline}
                        </p>

                        <div className="mt-5 flex items-center gap-3">
                            {(
                                [
                                    "linkedin",
                                    "instagram",
                                    "facebook",
                                    "youtube",
                                ] as const
                            ).map((key) => {
                                const Icon = socialIcons[key];
                                return (
                                    <a
                                        key={key}
                                        href={site[key]}
                                        aria-label={key}
                                        className="inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-brand hover:text-white"
                                    >
                                        <Icon className="size-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <FooterColumn
                            title="Navigation"
                            links={footerNavLinks}
                        />
                    </div>

                    {/* Services */}
                    <div>
                        <FooterColumn
                            title="Services"
                            links={footerServiceLinks}
                        />
                    </div>

                    {/* Office Address */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                            Office Address
                        </h3>

                        <ul className="mt-4 space-y-4 text-sm text-white/70">
                            {addresses.map((item) => (
                                <li
                                    key={item.label}
                                    className="flex items-start gap-3"
                                >
                                    <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />

                                    <div>
                                        <p className="font-semibold text-white/90">
                                            {item.label}
                                        </p>
                                        <p className="mt-1 max-w-[300px] leading-relaxed text-white/60">
                                            {item.address}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact + Newsletter */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                            Contact Us
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm text-white/70">
                            <li className="flex items-start gap-3">
                                <Phone className="mt-0.5 size-4 shrink-0 text-brand" />
                                <span className="whitespace-nowrap">
                                    {site.phone}
                                </span>
                            </li>

                            <li className="flex items-start gap-3">
                                <Mail className="mt-0.5 size-4 shrink-0 text-brand" />
                                <span>{site.email}</span>
                            </li>
                        </ul>

                        <h3 className="mt-7 text-sm font-semibold uppercase tracking-wide text-white">
                            Newsletter
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-white/60">
                            Subscribe to get the latest updates and insights.
                        </p>

                        <form className="mt-4 space-y-2">
                            <Input
                                type="email"
                                required
                                placeholder="Your email address"
                                className="border-white/15 bg-white/5 text-white placeholder:text-white/40"
                            />

                            <Button type="submit" className="w-full rounded-md">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8">
                    <p>
                        &copy; <CurrentYear /> {site.name}. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link href="#" className="hover:text-white">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:text-white">
                            Terms of Service
                        </Link>
                        <Link href="#" className="hover:text-white">
                            Sitemap
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({
    title,
    links,
}: {
    title: string;
    links: readonly { id: string; label: string; href: string }[];
}) {
    return (
        <>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                {title}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
                {links.map((link) => (
                    <li key={link.id}>
                        <Link
                            href={link.href}
                            className="text-white/70 transition-colors hover:text-brand"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
