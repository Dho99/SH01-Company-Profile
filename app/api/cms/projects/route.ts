import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { projectSchema } from "@/lib/cms/schemas";

export async function GET() {
    try {
        const items = await prisma.project.findMany({ orderBy: [{ sortOrder: "asc" }] });
        return NextResponse.json(items);
    } catch (error) {
        console.error("[GET /api/cms/projects]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
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
        const created = await prisma.project.create({ data: parsed.data });
        return NextResponse.json({ success: true, data: created });
    } catch (error) {
        console.error("[POST /api/cms/projects]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
