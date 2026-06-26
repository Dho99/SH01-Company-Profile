import { getAdminSiteSetting } from "@/lib/cms/queries";
import { SiteSettingForm } from "./form";

export default async function SiteSettingPage() {
  const settings = await getAdminSiteSetting();
  return <SiteSettingForm settings={settings} />;
}
