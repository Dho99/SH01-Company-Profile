import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SignOutButton } from "./_components/sign-out-button";
import { SidebarNav } from "./_components/sidebar-nav";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<AdminSkeleton />}>
            <AdminShell>{children}</AdminShell>
        </Suspense>
    );
}

async function AdminShell({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!session?.user) redirect("/login");

    return (
        <div className="flex min-h-screen bg-slate-50">
            <aside className="flex w-60 flex-col border-r bg-white">
                <div className="flex h-14 items-center border-b px-4">
                    <Link
                        href="/admin"
                        className="text-sm font-bold text-slate-900"
                    >
                        LEXA CMS
                    </Link>
                </div>
                <nav className="flex-1 overflow-y-auto p-3">
                    <SidebarNav />
                </nav>
                <div className="border-t p-3">
                    <div className="mb-2 px-3 text-xs text-slate-500">
                        {session.user.email}
                    </div>
                    <SignOutButton />
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
    );
}

function AdminSkeleton() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="text-sm text-slate-400">Loading...</div>
        </div>
    );
}
