"use client";

import Image from "next/image";
import Link from "next/link";

import { SidebarNav } from "./sidebar-nav";
import { SignOutButton } from "./sign-out-button";

export function SidebarContent({ email }: { email: string }) {
    return (
        <div className="flex flex-1 flex-col">
            {/* Header */}
            <div className="flex h-14 shrink-0 items-center border-b border-white/8 px-4">
                <Link
                    href="/admin"
                    className="flex items-center gap-2"
                >
                    <Image
                        src="/footerLEXA.png" // sesuaikan dengan nama file logo
                        alt="LEXA Software House"
                        width={80}
                        height={24}
                        className="h-auto w-[80px]"
                        priority
                    />

                    <span className="rounded bg-brand/20 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand">
                        CMS
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-2 py-3">
                <SidebarNav />
            </nav>

            {/* Footer */}
            <div className="shrink-0 border-t border-white/8 px-4 py-3">
                <p className="mb-2 truncate text-xs text-white/35">
                    {email}
                </p>

                <SignOutButton />
            </div>
        </div>
    );
}