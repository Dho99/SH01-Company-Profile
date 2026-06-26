import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sectionHeadingSchema } from "@/lib/cms/schemas";

export async function GET() {
    try {
        const headings = await prisma.sectionHeading.findMany({
            orderBy: { key: "asc" },
        });
        return NextResponse.json(headings);
    } catch (error) {
        console.error("[GET /api/cms/section-headings]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}

export async function PUT(request: Request) {
    try {
        const formData = await request.json();
        const key = formData.key as string;
        const eyebrow = formData.eyebrow as string;
        const title = formData.title as string;

        const parsed = sectionHeadingSchema.safeParse({ key, eyebrow, title });
        if (!parsed.success) {
            const fieldErrors = parsed.error.flatten().fieldErrors;
            const message = Object.entries(fieldErrors)
                .flatMap(([field, msgs]) => (msgs as string[]).map((m) => `${field}: ${m}`))
                .join("; ");
            return NextResponse.json({ error: message || "Validation failed" }, { status: 400 });
        }

        const data = await prisma.sectionHeading.upsert({
            where: { key: parsed.data.key },
            update: parsed.data,
            create: parsed.data,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("[PUT /api/cms/section-headings]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
