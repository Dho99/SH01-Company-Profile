import { prisma } from "@/lib/db";
import { TechnologyForm } from "../../technology-form";

export default async function EditTechnologyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.technology.findUnique({ where: { id } });
  if (!item) return <div>Not found</div>;
  return <TechnologyForm defaultValues={item as never} />;
}
