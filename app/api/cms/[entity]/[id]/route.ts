import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { statSchema, aboutPointSchema, serviceSchema, projectSchema, technologySchema, reasonSchema, testimonialSchema, navLinkSchema } from "@/lib/cms/schemas";
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

type UpdateDelegate = {
  update: (args: { where: { id: string }; data: Record<string, unknown> }) => Promise<unknown>;
  delete: (args: { where: { id: string } }) => Promise<unknown>;
};

export async function PUT(request: Request, { params }: { params: Promise<{ entity: string; id: string }> }) {
  try {
    const { entity, id } = await params;
    const schema = SCHEMAS[entity];
    const model = prismaModels[entity] as UpdateDelegate | undefined;

    if (!schema || !model) {
      return NextResponse.json({ error: "Unknown entity" }, { status: 400 });
    }

    const raw = await request.json() as Record<string, unknown>;
    for (const field of ["imageUrl", "avatarUrl"]) {
      if (raw[field] === "") raw[field] = null;
    }
    const parsed = schema.safeParse(raw);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const message = Object.entries(fieldErrors)
        .flatMap(([field, msgs]) => (msgs as string[]).map((m) => `${field}: ${m}`))
        .join("; ");
      return NextResponse.json({ error: message || "Validation failed" }, { status: 400 });
    }

    const updated = await model.update({ where: { id }, data: parsed.data as Record<string, unknown> });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[PUT /api/cms/[entity]/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ entity: string; id: string }> }) {
  try {
    const { entity, id } = await params;
    const model = prismaModels[entity] as UpdateDelegate | undefined;

    if (!model) {
      return NextResponse.json({ error: "Unknown entity" }, { status: 400 });
    }

    const deleted = await model.delete({ where: { id } });
    return NextResponse.json({ success: true, data: deleted });
  } catch (error) {
    console.error("[DELETE /api/cms/[entity]/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
