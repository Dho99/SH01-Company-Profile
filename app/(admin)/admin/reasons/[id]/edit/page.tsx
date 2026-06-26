import { prisma } from "@/lib/db";
import { ReasonForm } from "../../reason-form";

export default async function EditReasonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.reason.findUnique({ where: { id } });
  if (!item) return <div>Not found</div>;
  return <ReasonForm defaultValues={item as never} />;
}
