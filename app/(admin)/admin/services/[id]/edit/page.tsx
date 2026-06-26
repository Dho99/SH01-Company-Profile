import { prisma } from "@/lib/db";
import { ServiceForm } from "../../service-form";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.service.findUnique({ where: { id } });
  if (!item) return <div>Not found</div>;
  return <ServiceForm defaultValues={item as never} />;
}
