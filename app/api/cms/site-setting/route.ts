import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { updateTag } from "next/cache";
import { siteSettingSchema } from "@/lib/cms/schemas";

export async function GET() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "singleton" } });
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());
  const parsed = siteSettingSchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  await prisma.siteSetting.upsert({
    where: { id: "singleton" },
    update: parsed.data,
    create: { id: "singleton", ...parsed.data },
  });

  updateTag("cms:site-setting");
  return NextResponse.json({ success: true });
}
