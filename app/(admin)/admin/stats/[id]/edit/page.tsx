import { prisma } from "@/lib/db";
import { StatForm } from "../../stat-form";

export default async function EditStatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.stat.findUnique({ where: { id } });
  if (!item) return <div>Not found</div>;
  return <StatForm defaultValues={item as never} />;
}
