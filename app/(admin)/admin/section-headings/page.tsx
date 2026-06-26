import { getAdminSectionHeadings } from "@/lib/cms/queries";
import { SectionHeadingsForm } from "./form";

export default async function SectionHeadingsPage() {
  const headings = await getAdminSectionHeadings();
  return <SectionHeadingsForm headings={headings} />;
}
