import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { userUpdateSchema } from "@/lib/cms/schemas";

function requireAdmin(session: unknown) {
    const user = (session as { user?: Record<string, unknown> })?.user;
    return user?.role === "ADMIN";
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!requireAdmin(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    try {
        const { id } = await params;
        const raw = (await request.json()) as Record<string, unknown>;
        const parsed = userUpdateSchema.safeParse(raw);
        if (!parsed.success) {
            const fieldErrors = parsed.error.flatten().fieldErrors;
            const message = Object.entries(fieldErrors)
                .flatMap(([f, msgs]) => (msgs as string[]).map((m) => `${f}: ${m}`))
                .join("; ");
            return NextResponse.json({ error: message || "Validation failed" }, { status: 400 });
        }
        const { email, name, role, password } = parsed.data;
        const existing = await prisma.user.findUnique({ where: { id } });
        if (!existing) return NextResponse.json({ error: "User not found" }, { status: 404 });
        if (email !== existing.email) {
            const dup = await prisma.user.findUnique({ where: { email } });
            if (dup) return NextResponse.json({ error: "Email already exists" }, { status: 409 });
        }
        if (existing.role === "ADMIN" && role !== "ADMIN") {
            const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
            if (adminCount <= 1) return NextResponse.json({ error: "Cannot demote the last ADMIN" }, { status: 400 });
        }
        const data: Record<string, unknown> = { email, name: name || null, role };
        if (password && String(password).length > 0) data.passwordHash = await bcrypt.hash(String(password), 12);
        const updated = await prisma.user.update({
            where: { id },
            data: data as never,
            select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
        });
        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error("[PUT /api/cms/users/[id]]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!requireAdmin(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    try {
        const { id } = await params;
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
        const sessionUser = (session as { user?: { id?: string; email?: string } }).user;
        if (sessionUser?.id === id || sessionUser?.email === user.email) {
            return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
        }
        if (user.role === "ADMIN") {
            const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
            if (adminCount <= 1) return NextResponse.json({ error: "Cannot delete the last ADMIN" }, { status: 400 });
        }
        await prisma.user.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[DELETE /api/cms/users/[id]]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
