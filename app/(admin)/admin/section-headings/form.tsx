"use client";

import { useState } from "react";
import api, { AxiosError } from "@/lib/api/api";
import { toast } from "sonner";

type Heading = {
  key: string;
  eyebrow: string;
  title: string;
};

export function SectionHeadingsForm({ headings }: { headings: Heading[] }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Section Headings</h1>
      <p className="mt-1 text-sm text-slate-500">
        Edit eyebrow text and titles for each section.
      </p>

      <div className="mt-8 space-y-6">
        {headings.map((heading) => (
          <SectionHeadingCard key={heading.key} heading={heading} />
        ))}
      </div>
    </div>
  );
}

function SectionHeadingCard({ heading }: { heading: Heading }) {
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setSaved(false);

    const formData = new FormData(e.currentTarget);

    try {
      await api.put("/cms/section-headings", formData);
      setSaved(true);
      toast.success(`${heading.key} saved`);
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
    <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-5 shadow-sm">
      <input type="hidden" name="key" value={heading.key} />
      <h2 className="mb-4 text-sm font-semibold uppercase text-slate-500">
        {heading.key}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`eyebrow-${heading.key}`} className="block text-sm font-medium text-slate-700">
            Eyebrow
          </label>
          <input
            id={`eyebrow-${heading.key}`}
            name="eyebrow"
            defaultValue={heading.eyebrow}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label htmlFor={`title-${heading.key}`} className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            id={`title-${heading.key}`}
            name="title"
            defaultValue={heading.title}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      {saved && (
        <p className="mt-3 text-sm text-green-600">Saved.</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-4 rounded-md bg-brand px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand/90 disabled:opacity-50"
      >
        {pending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
