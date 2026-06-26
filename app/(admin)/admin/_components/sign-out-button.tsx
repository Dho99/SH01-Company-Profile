"use client";

import { logout } from "@/lib/api/auth";

export function SignOutButton() {
    return (
        <button
            type="button"
            onClick={logout}
            className="w-full rounded px-3 py-2 text-left text-sm text-white/45 transition-colors hover:bg-white/8 hover:text-white/80"
        >
            Sign Out
        </button>
    );
}
