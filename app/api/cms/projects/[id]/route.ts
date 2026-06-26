import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { projectSchema } from "@/lib/cms/schemas";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const raw = (await request.json()) as Record<string, unknown>;
        if (raw.imageUrl === "") raw.imageUrl = null;
        const parsed = projectSchema.safeParse(raw);
        if (!parsed.success) {
            const fieldErrors = parsed.error.flatten().fieldErrors;
            const message = Object.entries(fieldErrors)
                .flatMap(([f, msgs]) => (msgs as string[]).map((m) => `${f}: ${m}`))
                .join("; ");
            return NextResponse.json({ error: message || "Validation failed" }, { status: 400 });
        }
        const updated = await prisma.project.update({ where: { id }, data: parsed.data });
        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error("[PUT /api/cms/projects/[id]]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const deleted = await prisma.project.delete({ where: { id } });
        return NextResponse.json({ success: true, data: deleted });
    } catch (error) {
        console.error("[DELETE /api/cms/projects/[id]]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
