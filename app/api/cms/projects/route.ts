import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { projectSchema } from "@/lib/cms/schemas";
import { slugify } from "@/lib/slug";
import { revalidateCms } from "@/lib/cms/revalidate";

async function uniqueSlug(base: string) {
    let slug = slugify(base);
    let candidate = slug;
    let i = 2;
    while (await prisma.project.findUnique({ where: { slug: candidate } })) candidate = `${slug}-${i++}`;
    return candidate;
}

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
        const data = parsed.data as Record<string, unknown>;
        const slug = (data.slug as string) || (await uniqueSlug(data.title as string));
        const created = await prisma.project.create({ data: { ...(data as object), slug } as never });
        revalidateCms("projects");
        return NextResponse.json({ success: true, data: created });
    } catch (error) {
        console.error("[POST /api/cms/projects]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
