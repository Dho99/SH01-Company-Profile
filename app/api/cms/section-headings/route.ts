import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { updateTag } from "next/cache";
import { sectionHeadingSchema } from "@/lib/cms/schemas";

export async function GET() {
  const headings = await prisma.sectionHeading.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json(headings);
}

export async function PUT(request: Request) {
  const formData = await request.formData();
  const key = formData.get("key") as string;
  const eyebrow = formData.get("eyebrow") as string;
  const title = formData.get("title") as string;

  const parsed = sectionHeadingSchema.safeParse({ key, eyebrow, title });
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  await prisma.sectionHeading.upsert({
    where: { key: parsed.data.key },
    update: parsed.data,
    create: parsed.data,
  });

  updateTag("cms:section-headings");
  return NextResponse.json({ success: true });
}
