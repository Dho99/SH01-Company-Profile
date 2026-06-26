import { prisma } from "@/lib/db";
import { ProjectForm } from "../../project-form";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.project.findUnique({ where: { id } });
  if (!item) return <div>Not found</div>;
  return <ProjectForm defaultValues={item as never} />;
}
