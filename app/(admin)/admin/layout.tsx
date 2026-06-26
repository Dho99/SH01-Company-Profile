import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { logout } from "@/lib/api/auth";

const sidebarLinks = [
    { label: "Dashboard", href: "/admin", icon: "grid" },
    { label: "Site Settings", href: "/admin/site-setting", icon: "settings" },
    {
        label: "Section Headings",
        href: "/admin/section-headings",
        icon: "heading",
    },
    { label: "Stats", href: "/admin/stats", icon: "bar-chart" },
    { label: "About Points", href: "/admin/about-points", icon: "list" },
    { label: "Services", href: "/admin/services", icon: "briefcase" },
    { label: "Projects", href: "/admin/projects", icon: "folder" },
    { label: "Technologies", href: "/admin/technologies", icon: "cpu" },
    { label: "Reasons", href: "/admin/reasons", icon: "check-circle" },
    {
        label: "Testimonials",
        href: "/admin/testimonials",
        icon: "message-square",
    },
    { label: "Nav Links", href: "/admin/nav-links", icon: "link" },
];

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
                    <ul className="space-y-1">
                        {sidebarLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="block rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="border-t p-3">
                    <div className="mb-2 px-3 text-xs text-slate-500">
                        {session.user.email}
                    </div>
                    <form
                        action={async () => {
                            "use server";
                            await logout();
                        }}
                    >
                        <button
                            type="submit"
                            className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                        >
                            Sign Out
                        </button>
                    </form>
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
