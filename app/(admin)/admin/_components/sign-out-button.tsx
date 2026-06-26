"use client";

import { logout } from "@/lib/api/auth";

export function SignOutButton() {
    return (
        <button
            type="button"
            onClick={logout}
            className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
        >
            Sign Out
        </button>
    );
}
