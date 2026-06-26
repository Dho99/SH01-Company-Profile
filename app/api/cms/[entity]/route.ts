import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { updateTag } from "next/cache";
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

const TAGS: Record<string, string> = {
  stat: "cms:stats",
  "about-points": "cms:about-points",
  services: "cms:services",
  projects: "cms:projects",
  technologies: "cms:technologies",
  reasons: "cms:reasons",
  testimonials: "cms:testimonials",
  "nav-links": "cms:nav-links",
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
  findMany: (args?: { where?: Record<string, unknown>; orderBy?: Record<string, string>[] }) => Promise<unknown[]>;
};

type CreateDelegate = {
  create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
};

export async function GET(_request: Request, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const model = prismaModels[entity] as FindManyDelegate | undefined;
  if (!model) {
    return NextResponse.json({ error: "Unknown entity" }, { status: 400 });
  }
  const items = await model.findMany({
    orderBy: [{ sortOrder: "asc" }],
  });
  return NextResponse.json(items);
}

export async function POST(request: Request, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const schema = SCHEMAS[entity];
  const tag = TAGS[entity];
  const model = prismaModels[entity] as CreateDelegate | undefined;

  if (!schema || !tag || !model) {
    return NextResponse.json({ error: "Unknown entity" }, { status: 400 });
  }

  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  await model.create({ data: parsed.data as Record<string, unknown> });
  updateTag(tag);
  return NextResponse.json({ success: true });
}
