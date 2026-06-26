"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api, { AxiosError } from "@/lib/api/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projectSchema } from "@/lib/cms/schemas";
import type { CreateProjectInput } from "@/lib/cms/types";
import { PROJECT_CATEGORIES } from "@/lib/cms/icons";
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
import { ImageUpload } from "@/components/admin/image-upload";
import { TrixEditor } from "@/components/admin/trix-editor";

type Props = { defaultValues?: CreateProjectInput & { id: string } };

const inputClass =
    "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

const selectClass = inputClass + " [&>option]:px-3";

export function ProjectForm({ defaultValues }: Props) {
    const router = useRouter();
    const isEdit = !!defaultValues?.id;
    const endpoint = isEdit
        ? `/cms/projects/${defaultValues.id}`
        : "/cms/projects";

    const form = useForm<CreateProjectInput>({
        resolver: zodResolver(projectSchema),
        defaultValues: (defaultValues ?? {
            category: "",
            title: "",
            description: "",
            imageUrl: "",
            sortOrder: 0,
            published: true,
        }) as CreateProjectInput,
    });

    async function onSubmit(data: CreateProjectInput) {
        try {
            await api({ method: isEdit ? "PUT" : "POST", url: endpoint, data });
            toast.success(isEdit ? "Updated" : "Created");
            router.push("/admin/projects");
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(
                    error.response?.data?.error || "Something went wrong",
                );
            } else {
                throw error;
            }
        }
    }

    return (
        <div>
            <Link
                href="/admin/projects"
                className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900"
            >
                <ArrowLeft className="size-4" /> Back
            </Link>

            <h1 className="text-2xl font-bold text-slate-900">
                {isEdit ? "Edit Project" : "New Project"}
            </h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-6 space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <select className={selectClass} {...field}>
                                        <option value="">
                                            Select a category...
                                        </option>
                                        {PROJECT_CATEGORIES.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
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
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <TrixEditor
                                        id="project-description"
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
                                <FormLabel>Thumbnail Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ?? ""}
                                        onChange={field.onChange}
                                        label="Upload thumbnail"
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
                                            field.onChange(
                                                Number(e.target.value),
                                            )
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

                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? "Saving..." : "Save"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
