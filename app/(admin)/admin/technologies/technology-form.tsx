"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api, { AxiosError } from "@/lib/api/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { technologySchema } from "@/lib/cms/schemas";
import type { CreateTechnologyInput } from "@/lib/cms/types";
import { ICON_CATEGORIES } from "@/lib/cms/icons";
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

type Props = { defaultValues?: CreateTechnologyInput & { id: string } };

const inputClass =
    "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

const selectClass = inputClass + " [&>option]:px-3";

export function TechnologyForm({ defaultValues }: Props) {
    const router = useRouter();
    const isEdit = !!defaultValues?.id;
    const endpoint = isEdit
        ? `/cms/technologies/${defaultValues.id}`
        : "/cms/technologies";

    const form = useForm<CreateTechnologyInput>({
        resolver: zodResolver(technologySchema),
        defaultValues: (defaultValues ?? {
            icon: "",
            label: "",
            color: "",
            sortOrder: 0,
            published: true,
        }) as CreateTechnologyInput,
    });

    async function onSubmit(data: CreateTechnologyInput) {
        try {
            await api({ method: isEdit ? "PUT" : "POST", url: endpoint, data });
            toast.success(isEdit ? "Updated" : "Created");
            router.push("/admin/technologies");
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
                href="/admin/technologies"
                className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900"
            >
                <ArrowLeft className="size-4" /> Back
            </Link>

            <h1 className="text-2xl font-bold text-slate-900">
                {isEdit ? "Edit Technology" : "New Technology"}
            </h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-6 max-w-lg space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Icon</FormLabel>
                                <FormControl>
                                    <select className={selectClass} {...field}>
                                        <option value="">
                                            Select an icon...
                                        </option>
                                        {ICON_CATEGORIES.technologies.map((icon) => (
                                            <option key={icon} value={icon}>
                                                {icon}
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
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
