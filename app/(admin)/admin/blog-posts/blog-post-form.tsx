"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api, { AxiosError } from "@/lib/api/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPostSchema } from "@/lib/cms/schemas";
import type { CreateBlogPostInput } from "@/lib/cms/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/admin/image-upload";
import { TrixEditor } from "@/components/admin/trix-editor";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

type Props = { defaultValues?: CreateBlogPostInput & { id: string } };

const inputClass =
    "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

function toDateInputValue(val: string | Date | undefined): string {
    if (!val) return "";
    const d = typeof val === "string" ? new Date(val) : val;
    return d.toISOString().split("T")[0];
}

export function BlogPostForm({ defaultValues }: Props) {
    const router = useRouter();
    const isEdit = !!defaultValues?.id;
    const endpoint = isEdit
        ? `/cms/blog-posts/${defaultValues.id}`
        : "/cms/blog-posts";

    const form = useForm<CreateBlogPostInput>({
        resolver: zodResolver(blogPostSchema),
        defaultValues: defaultValues
            ? {
                  ...defaultValues,
                  publishedAt: toDateInputValue(defaultValues.publishedAt),
              }
            : {
                  badge: "",
                  tag: "",
                  publishedAt: "",
                  title: "",
                  excerpt: "",
                  content: "",
                  imageUrl: "",
                  sortOrder: 0,
                  published: true,
              },
    });

    async function onSubmit(data: CreateBlogPostInput) {
        try {
            await api({ method: isEdit ? "PUT" : "POST", url: endpoint, data });
            toast.success(isEdit ? "Updated" : "Created");
            router.push("/admin/blog-posts");
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
                href="/admin/blog-posts"
                className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900"
            >
                <ArrowLeft className="size-4" /> Back
            </Link>

            <h1 className="text-2xl font-bold text-slate-900">
                {isEdit ? "Edit Blog Post" : "New Blog Post"}
            </h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-6 max-w-lg space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="badge"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Badge</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Latest News" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tag"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tag</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Digital Innovation" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="publishedAt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Published Date</FormLabel>
                                <FormControl>
                                    <input type="date" className={inputClass} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Excerpt</FormLabel>
                                <FormControl>
                                    <textarea
                                        rows={3}
                                        className={`${inputClass} h-auto resize-y py-2`}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <TrixEditor
                                        id="blog-post-content"
                                        value={field.value ?? ""}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cover Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ?? ""}
                                        onChange={field.onChange}
                                        label="Upload cover image"
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
                                        onChange={(e) =>
                                            field.onChange(Number(e.target.value))
                                        }
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
