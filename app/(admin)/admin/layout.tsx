import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminClientLayout } from "./_components/admin-client-layout";

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

    // Role-based access control: hanya user dengan role ADMIN yang diizinkan
    const userRole = (session.user as unknown as Record<string, unknown>).role;
    if (userRole !== "ADMIN") redirect("/login?error=unauthorized");

    return (
        <AdminClientLayout email={session.user.email ?? ""}>
            {children}
        </AdminClientLayout>
    );
}

function AdminSkeleton() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="text-sm text-slate-400">Loading…</div>
        </div>
    );
}
