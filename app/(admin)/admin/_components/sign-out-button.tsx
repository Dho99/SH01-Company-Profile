"use client";

import { LogOut } from "lucide-react";
import { logout } from "@/lib/api/auth";

export function SignOutButton() {
    return (
        <button
            type="button"
            onClick={logout}
            className="
                group
                flex w-full items-center justify-between
                rounded-lg border border-white/10
                px-3 py-2.5
                text-sm font-medium
                text-white/70
                transition-all duration-200
                hover:border-red-500/40
                hover:bg-red-500/10
                hover:text-red-400
                hover:shadow-[0_0_18px_rgba(239,68,68,.18)]
                active:scale-[0.98]
            "
        >
            <span>Sign Out</span>

            <LogOut
                className="
                    h-4 w-4
                    transition-all duration-200
                    group-hover:translate-x-0.5
                    group-hover:text-red-400
                "
            />
        </button>
    );
}