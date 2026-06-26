"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTitle,
} from "@/components/ui/sheet";
import { SidebarContent } from "./sidebar-content";

export function AdminClientLayout({
    children,
    email,
}: {
    children: React.ReactNode;
    email: string;
}) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Desktop sidebar — always visible lg+ */}
            <aside className="hidden w-60 shrink-0 flex-col bg-[#06122a] lg:flex">
                <SidebarContent email={email} />
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                {/* Mobile topbar */}
                <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center border-b bg-white px-4 lg:hidden">
                    <button
                        onClick={() => setOpen(true)}
                        className="mr-3 rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        aria-label="Open navigation"
                    >
                        <Menu className="size-5" />
                    </button>
                    <span className="text-sm font-bold tracking-wide text-slate-800">
                        LEXA <span className="text-brand">CMS</span>
                    </span>
                </header>

                <main className="flex-1 p-5 lg:p-8">{children}</main>
            </div>

            {/* Mobile drawer */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent
                    side="left"
                    showCloseButton={false}
                    className="w-60 border-0 bg-[#06122a] p-0"
                >
                    <SheetTitle className="sr-only">Navigation</SheetTitle>
                    <SidebarContent email={email} />
                </SheetContent>
            </Sheet>
        </div>
    );
}
