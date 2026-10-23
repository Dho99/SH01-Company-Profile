"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
import { AdminTableSkeleton } from "@/components/admin/admin-skeletons";
import api from "@/lib/api/api";
import { apiDelete } from "@/lib/api/cms";
import { toast } from "sonner";

type UserRow = { id: string; name: string | null; email: string; role: string; createdAt: string };

export default function UsersPage() {
    const [items, setItems] = useState<UserRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        async function load() {
            try {
                const { data } = await api.get<UserRow[]>("/cms/users");
                setItems(data);
            } catch {
                toast.error("Failed to load users");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [refresh]);

    async function handleDelete(id: string) {
        try {
            await apiDelete("/cms/users/" + id);
            toast.success("Deleted");
            setRefresh((n) => n + 1);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Delete failed");
        }
    }

    if (loading) return <AdminTableSkeleton />;

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Users</h1>
                <Link href="/admin/users/new" className="inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand/90">
                    <Plus className="size-4" /> Add New
                </Link>
            </div>
            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-left">
                        <tr>
                            <th className="px-4 py-3 font-medium text-slate-500">Name</th>
                            <th className="px-4 py-3 font-medium text-slate-500">Email</th>
                            <th className="px-4 py-3 font-medium text-slate-500">Role</th>
                            <th className="px-4 py-3 font-medium text-slate-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {items.map((u) => (
                            <tr key={u.id} className="hover:bg-slate-50">
                                <td className="px-4 py-3">{u.name ?? "-"}</td>
                                <td className="px-4 py-3">{u.email}</td>
                                <td className="px-4 py-3">
                                    <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">{u.role}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/users/${u.id}/edit`} className="rounded p-1 text-slate-400 hover:text-blue-600">
                                            <Pencil className="size-4" />
                                        </Link>
                                        <DeleteConfirmDialog title="Delete User" description={`Delete ${u.email}? This cannot be undone.`} onConfirm={() => handleDelete(u.id)}>
                                            <button type="button" className="rounded p-1 text-slate-400 hover:text-red-600">
                                                <Trash2 className="size-4" />
                                            </button>
                                        </DeleteConfirmDialog>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                                    No users yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
