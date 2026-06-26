import { prisma } from "@/lib/db";
import { AboutPointForm } from "../../about-point-form";

export default async function EditAboutPointPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.aboutPoint.findUnique({ where: { id } });
  if (!item) return <div>Not found</div>;
  return <AboutPointForm defaultValues={item as never} />;
}
