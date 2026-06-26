import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { siteSettingSchema } from "@/lib/cms/schemas";

export async function GET() {
    try {
        const settings = await prisma.siteSetting.findUnique({
            where: { id: "singleton" },
        });
        return NextResponse.json(settings);
    } catch (error) {
        console.error("[GET /api/cms/site-setting]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}

export async function PUT(request: Request) {
    try {
        const formData = await request.formData();
        const raw = Object.fromEntries(formData.entries()) as Record<string, unknown>;
        for (const field of ["logoUrl", "heroImageUrl"]) {
            if (raw[field] === "") raw[field] = null;
        }
        const parsed = siteSettingSchema.safeParse(raw);

        if (!parsed.success) {
            const fieldErrors = parsed.error.flatten().fieldErrors;
            const message = Object.entries(fieldErrors)
                .flatMap(([field, msgs]) => (msgs as string[]).map((m) => `${field}: ${m}`))
                .join("; ");
            return NextResponse.json({ error: message || "Validation failed" }, { status: 400 });
        }

        const data = await prisma.siteSetting.upsert({
            where: { id: "singleton" },
            update: parsed.data,
            create: { id: "singleton", ...parsed.data },
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("[PUT /api/cms/site-setting]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
