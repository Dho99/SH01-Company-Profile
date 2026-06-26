import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
    statSchema,
    aboutPointSchema,
    serviceSchema,
    projectSchema,
    technologySchema,
    reasonSchema,
    testimonialSchema,
    navLinkSchema,
} from "@/lib/cms/schemas";
import type { ZodSchema } from "zod";

const SCHEMAS: Record<string, ZodSchema> = {
    stat: statSchema,
    "about-points": aboutPointSchema,
    services: serviceSchema,
    projects: projectSchema,
    technologies: technologySchema,
    reasons: reasonSchema,
    testimonials: testimonialSchema,
    "nav-links": navLinkSchema,
};

const prismaModels: Record<string, unknown> = {
    stat: prisma.stat,
    "about-points": prisma.aboutPoint,
    services: prisma.service,
    projects: prisma.project,
    technologies: prisma.technology,
    reasons: prisma.reason,
    testimonials: prisma.testimonial,
    "nav-links": prisma.navLink,
};

type FindManyDelegate = {
    findMany: (args?: {
        where?: Record<string, unknown>;
        orderBy?: Record<string, string>[];
    }) => Promise<unknown[]>;
};

type CreateDelegate = {
    create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
};

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ entity: string }> },
) {
    try {
        const { entity } = await params;
        const model = prismaModels[entity] as FindManyDelegate | undefined;
        if (!model) {
            return NextResponse.json(
                { error: "Unknown entity" },
                { status: 400 },
            );
        }
        const items = await model.findMany({
            orderBy: [{ sortOrder: "asc" }],
        });
        return NextResponse.json(items);
    } catch (error) {
        console.error("[GET /api/cms/[entity]]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ entity: string }> },
) {
    try {
        const { entity } = await params;
        const schema = SCHEMAS[entity];
        const model = prismaModels[entity] as CreateDelegate | undefined;

        if (!schema || !model) {
            return NextResponse.json(
                { error: "Unknown entity" },
                { status: 400 },
            );
        }

        const raw = (await request.json()) as Record<string, unknown>;
        for (const field of ["imageUrl", "avatarUrl"]) {
            if (raw[field] === "") raw[field] = null;
        }
        const parsed = schema.safeParse(raw);

        if (!parsed.success) {
            const fieldErrors = parsed.error.flatten().fieldErrors;
            const message = Object.entries(fieldErrors)
                .flatMap(([field, msgs]) =>
                    (msgs as string[]).map((m) => `${field}: ${m}`),
                )
                .join("; ");
            return NextResponse.json(
                { error: message || "Validation failed" },
                { status: 400 },
            );
        }

        const created = await model.create({
            data: parsed.data as Record<string, unknown>,
        });
        return NextResponse.json({ success: true, data: created });
    } catch (error) {
        console.error("[POST /api/cms/[entity]]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
