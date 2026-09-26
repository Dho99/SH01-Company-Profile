"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api, { AxiosError } from "@/lib/api/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { userCreateSchema, userUpdateSchema } from "@/lib/cms/schemas";
import type { CreateUserInput } from "@/lib/cms/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type Props = { defaultValues?: CreateUserInput & { id: string } };

const ROLES = ["ADMIN", "EDITOR"] as const;
const selectClass =
    "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50 md:text-sm [&>option]:px-3";

export function UserForm({ defaultValues }: Props) {
    const router = useRouter();
    const isEdit = !!defaultValues?.id;
    const endpoint = isEdit ? `/cms/users/${defaultValues.id}` : "/cms/users";
    const schema = isEdit ? userUpdateSchema : userCreateSchema;

    const form = useForm<CreateUserInput>({
        resolver: zodResolver(schema as never),
        defaultValues: isEdit
            ? { name: defaultValues.name ?? "", email: defaultValues.email ?? "", password: "", role: (defaultValues.role as never) ?? "ADMIN" }
            : { name: "", email: "", password: "", role: "ADMIN" as never },
    });

    async function onSubmit(data: CreateUserInput) {
        try {
            const payload: Record<string, unknown> = { ...data };
            if (isEdit && !payload.password) delete payload.password;
            await api({ method: isEdit ? "PUT" : "POST", url: endpoint, data: payload });
            toast.success(isEdit ? "Updated" : "Created");
            router.push("/admin/users");
            router.refresh();
        } catch (error) {
            if (error instanceof AxiosError) toast.error(error.response?.data?.error || "Something went wrong");
            else throw error;
        }
    }

    return (
        <div>
            <Link href="/admin/users" className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900">
                <ArrowLeft className="size-4" /> Back
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">{isEdit ? "Edit User" : "New User"}</h1>
            <Card className="mt-6 w-full">
                <CardContent className="pt-6">
                    <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Admin" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="admin@lexatech.id" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{isEdit ? "New Password (leave blank to keep)" : "Password"}</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <FormControl>
                                    <select className={selectClass} {...field}>
                                        {ROLES.map((r) => (
                                            <option key={r} value={r}>
                                                {r}
                                            </option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Saving..." : "Save"}
                    </Button>
                </form>
            </Form>
                </CardContent>
            </Card>
        </div>
    );
}
