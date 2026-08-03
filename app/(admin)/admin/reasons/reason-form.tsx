"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api, { AxiosError } from "@/lib/api/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { reasonSchema } from "@/lib/cms/schemas";
import type { CreateReasonInput } from "@/lib/cms/types";
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
import { TrixEditor } from "@/components/admin/trix-editor";
import { IconPicker } from "@/components/icon-picker";

type Props = { defaultValues?: CreateReasonInput & { id: string } };

export function ReasonForm({ defaultValues }: Props) {
    const router = useRouter();
    const isEdit = !!defaultValues?.id;
    const endpoint = isEdit
        ? `/cms/reasons/${defaultValues.id}`
        : "/cms/reasons";

    const form = useForm<CreateReasonInput>({
        resolver: zodResolver(reasonSchema),
        defaultValues: (defaultValues ?? {
            icon: "",
            title: "",
            description: "",
            sortOrder: 0,
            published: true,
        }) as CreateReasonInput,
    });

    async function onSubmit(data: CreateReasonInput) {
        try {
            await api({ method: isEdit ? "PUT" : "POST", url: endpoint, data });
            toast.success(isEdit ? "Updated" : "Created");
            router.push("/admin/reasons");
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
                href="/admin/reasons"
                className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900"
            >
                <ArrowLeft className="size-4" /> Back
            </Link>

            <h1 className="text-2xl font-bold text-slate-900">
                {isEdit ? "Edit Reason" : "New Reason"}
            </h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-6 space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Icon</FormLabel>
                                <FormControl>
                                    <IconPicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
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
                                        id="reason-description"
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
