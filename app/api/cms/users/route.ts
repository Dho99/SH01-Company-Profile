import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { userCreateSchema } from "@/lib/cms/schemas";

function requireAdmin(session: unknown) {
    const user = (session as { user?: Record<string, unknown> })?.user;
    return user?.role === "ADMIN";
}

export async function GET() {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!requireAdmin(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "asc" },
            select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
        });
        return NextResponse.json(users);
    } catch (error) {
        console.error("[GET /api/cms/users]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!requireAdmin(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    try {
        const raw = (await request.json()) as Record<string, unknown>;
        const parsed = userCreateSchema.safeParse(raw);
        if (!parsed.success) {
            const fieldErrors = parsed.error.flatten().fieldErrors;
            const message = Object.entries(fieldErrors)
                .flatMap(([f, msgs]) => (msgs as string[]).map((m) => `${f}: ${m}`))
                .join("; ");
            return NextResponse.json({ error: message || "Validation failed" }, { status: 400 });
        }
        const { email, password, role, name } = parsed.data;
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) return NextResponse.json({ error: "Email already exists" }, { status: 409 });
        const passwordHash = await bcrypt.hash(password, 12);
        const created = await prisma.user.create({
            data: { email, passwordHash, role: role as "ADMIN" | "EDITOR", name: name || null },
            select: { id: true, name: true, email: true, role: true, createdAt: true },
        });
        return NextResponse.json({ success: true, data: created });
    } catch (error) {
        console.error("[POST /api/cms/users]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
