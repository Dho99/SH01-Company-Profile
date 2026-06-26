import { prisma } from "@/lib/db";
import { NavLinkForm } from "../../nav-link-form";

export default async function EditNavLinkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.navLink.findUnique({ where: { id } });
  if (!item) return <div>Not found</div>;
  return <NavLinkForm defaultValues={item as never} />;
}
