import { prisma } from "@/lib/db";
import { TestimonialForm } from "../../testimonial-form";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.testimonial.findUnique({ where: { id } });
  if (!item) return <div>Not found</div>;
  return <TestimonialForm defaultValues={item as never} />;
}
