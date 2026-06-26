"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api, { AxiosError } from "@/lib/api/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { aboutPointSchema } from "@/lib/cms/schemas";
import type { CreateAboutPointInput } from "@/lib/cms/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Props = { defaultValues?: CreateAboutPointInput & { id: string } };

const inputClass =
  "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

export function AboutPointForm({ defaultValues }: Props) {
  const router = useRouter();
  const isEdit = !!defaultValues?.id;
  const endpoint = isEdit
    ? `/cms/about-points/${defaultValues.id}`
    : "/cms/about-points";

  const form = useForm<CreateAboutPointInput>({
    resolver: zodResolver(aboutPointSchema),
    defaultValues: defaultValues ?? {
      text: "",
      sortOrder: 0,
      published: true,
    },
  });

  async function onSubmit(data: CreateAboutPointInput) {
    try {
      await api({ method: isEdit ? "PUT" : "POST", url: endpoint, data });
      toast.success(isEdit ? "Updated" : "Created");
      router.push("/admin/about-points");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error || "Something went wrong");
      } else {
        throw error;
      }
    }
  }

  return (
    <div>
      <Link
        href="/admin/about-points"
        className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="size-4" /> Back
      </Link>

      <h1 className="text-2xl font-bold text-slate-900">
        {isEdit ? "Edit About Point" : "New About Point"}
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 max-w-lg space-y-4"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <textarea
                    className={inputClass}
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sortOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sort Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <input
                    id="published"
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="rounded border-input text-primary focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  />
                  <FormLabel>Published</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
