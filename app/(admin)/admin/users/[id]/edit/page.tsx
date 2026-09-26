import { prisma } from "@/lib/db";
import { UserForm } from "../../user-form";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, role: true } });
    if (!item) return <div className="p-6 text-sm text-slate-500">Not found</div>;
    return <UserForm defaultValues={item as never} />;
}
