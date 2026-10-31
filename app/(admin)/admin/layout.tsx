import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminClientLayout } from "./_components/admin-client-layout";
import { AdminDashboardSkeleton } from "@/components/admin/admin-skeletons";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<AdminDashboardSkeleton />}>
            <AdminShell>{children}</AdminShell>
        </Suspense>
    );
}

async function AdminShell({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!session?.user) redirect("/login");

    return (
        <AdminClientLayout email={session.user.email ?? ""}>
            {children}
        </AdminClientLayout>
    );
}
