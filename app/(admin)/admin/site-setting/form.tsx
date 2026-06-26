"use client";

import { useState } from "react";
import api, { AxiosError } from "@/lib/api/api";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/image-upload";

const FIELDS = [
  { section: "Brand & Contact", fields: [
    { name: "name", label: "Site Name", type: "text" },
    { name: "tagline", label: "Tagline", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "location", label: "Location", type: "text" },
  ]},
  { section: "Social Links", fields: [
    { name: "linkedin", label: "LinkedIn URL", type: "url" },
    { name: "instagram", label: "Instagram URL", type: "url" },
    { name: "facebook", label: "Facebook URL", type: "url" },
    { name: "youtube", label: "YouTube URL", type: "url" },
  ]},
  { section: "Hero", fields: [
    { name: "heroEyebrow", label: "Eyebrow", type: "text" },
    { name: "heroHeading", label: "Heading", type: "text" },
    { name: "heroHighlight", label: "Highlight (accent)", type: "text" },
    { name: "heroDescription", label: "Description", type: "textarea" },
    { name: "heroPrimaryLabel", label: "Primary CTA Label", type: "text" },
    { name: "heroPrimaryHref", label: "Primary CTA Link", type: "text" },
    { name: "heroSecondaryLabel", label: "Secondary CTA Label", type: "text" },
    { name: "heroSecondaryHref", label: "Secondary CTA Link", type: "text" },
  ]},
  { section: "About", fields: [
    { name: "aboutEyebrow", label: "Eyebrow", type: "text" },
    { name: "aboutHeading", label: "Heading", type: "text" },
    { name: "aboutDescription", label: "Description", type: "textarea" },
    { name: "aboutCommitmentTitle", label: "Commitment Card Title", type: "text" },
    { name: "aboutCommitmentText", label: "Commitment Card Text", type: "textarea" },
    { name: "aboutCtaLabel", label: "CTA Label", type: "text" },
    { name: "aboutCtaHref", label: "CTA Link", type: "text" },
  ]},
  { section: "Footer", fields: [
    { name: "footerTagline", label: "Tagline", type: "textarea" },
    { name: "footerNewsletterTitle", label: "Newsletter Title", type: "text" },
    { name: "footerNewsletterText", label: "Newsletter Text", type: "text" },
  ]},
] as const;

type Props = {
  settings: {
    name: string; tagline: string; email: string; phone: string; location: string;
    linkedin: string; instagram: string; facebook: string; youtube: string;
    heroEyebrow: string; heroHeading: string; heroHighlight: string; heroDescription: string;
    heroPrimaryLabel: string; heroPrimaryHref: string; heroSecondaryLabel: string; heroSecondaryHref: string;
    aboutEyebrow: string; aboutHeading: string; aboutDescription: string;
    aboutCommitmentTitle: string; aboutCommitmentText: string; aboutCtaLabel: string; aboutCtaHref: string;
    footerTagline: string; footerNewsletterTitle: string; footerNewsletterText: string;
    logoUrl?: string | null;
    heroImageUrl?: string | null;
  } | null;
};

export function SiteSettingForm({ settings }: Props) {
  const [pending, setPending] = useState(false);
  const [logoUrl, setLogoUrl] = useState(settings?.logoUrl ?? "");
  const [heroImageUrl, setHeroImageUrl] = useState(settings?.heroImageUrl ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(e.currentTarget);
    formData.set("logoUrl", logoUrl ?? "");
    formData.set("heroImageUrl", heroImageUrl ?? "");

    try {
      await api.put("/cms/site-setting", formData);
      toast.success("Settings saved successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error || "Something went wrong");
      } else {
        throw error;
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
      <p className="mt-1 text-sm text-slate-500">
        Update global site content and copy.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-10">
        {FIELDS.map((group) => (
          <fieldset key={group.section}>
            <legend className="text-lg font-semibold text-slate-900">
              {group.section}
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {group.fields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-slate-700"
                  >
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      defaultValue={settings?.[field.name as keyof typeof settings] ?? ""}
                      rows={3}
                      className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      defaultValue={settings?.[field.name as keyof typeof settings] ?? ""}
                      className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    />
                  )}
                </div>
              ))}
            </div>
          </fieldset>
        ))}

        <fieldset>
          <legend className="text-lg font-semibold text-slate-900">Images</legend>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 block text-sm font-medium text-slate-700">Logo</p>
              <ImageUpload value={logoUrl ?? ""} onChange={setLogoUrl} label="Upload logo" />
            </div>
            <div>
              <p className="mb-2 block text-sm font-medium text-slate-700">Hero Image</p>
              <ImageUpload value={heroImageUrl ?? ""} onChange={setHeroImageUrl} label="Upload hero image" />
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-brand px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-brand/90 disabled:opacity-50"
        >
          {pending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
