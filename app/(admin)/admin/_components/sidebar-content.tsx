"use client";

import Link from "next/link";
import { SidebarNav } from "./sidebar-nav";
import { SignOutButton } from "./sign-out-button";

export function SidebarContent({ email }: { email: string }) {
    return (
        <div className="flex flex-1 flex-col">
            <div className="flex h-14 shrink-0 items-center border-b border-white/8 px-5">
                <Link
                    href="/admin"
                    className="text-sm font-bold tracking-wide text-white"
                >
                    LEXA <span className="text-brand">CMS</span>
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-3">
                <SidebarNav />
            </nav>

            <div className="shrink-0 border-t border-white/8 px-4 py-3">
                <p className="mb-2 truncate text-xs text-white/35">{email}</p>
                <SignOutButton />
            </div>
        </div>
    );
}
