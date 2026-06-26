"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import api from "@/lib/api/api";
import { apiDelete } from "@/lib/api/cms";
import { toast } from "sonner";

type NavLink = { id: string; label: string; href: string; group: string; hasDropdown: boolean; sortOrder: number };

export default function NavLinksListPage() {
    const [items, setItems] = useState<NavLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        async function load() {
            const { data } = await api.get<NavLink[]>("/cms/nav-links");
            const sorted = [...data].sort((a, b) => a.group.localeCompare(b.group) || a.sortOrder - b.sortOrder);
            setItems(sorted);
            setLoading(false);
        }
        load();
    }, [refresh]);

    async function handleDelete(id: string) {
        try {
            await apiDelete("/cms/nav-links/" + id);
            setRefresh((n) => n + 1);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Delete failed");
        }
    }

    if (loading) return <div className="p-6 text-sm text-slate-400">Loading...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Nav Links</h1>
                <Link href="/admin/nav-links/new" className="inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand/90">
                    <Plus className="size-4" /> Add New
                </Link>
            </div>
            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-left">
                        <tr>
                            <th className="px-4 py-3 font-medium text-slate-500">Label</th>
                            <th className="px-4 py-3 font-medium text-slate-500">Href</th>
                            <th className="px-4 py-3 font-medium text-slate-500">Group</th>
                            <th className="px-4 py-3 font-medium text-slate-500">Dropdown</th>
                            <th className="px-4 py-3 font-medium text-slate-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50">
                                <td className="px-4 py-3">{item.label}</td>
                                <td className="px-4 py-3 text-slate-500">{item.href}</td>
                                <td className="px-4 py-3 text-slate-500">{item.group}</td>
                                <td className="px-4 py-3 text-slate-500">{item.hasDropdown ? "Yes" : "No"}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/nav-links/${item.id}/edit`} className="rounded p-1 text-slate-400 hover:text-blue-600">
                                            <Pencil className="size-4" />
                                        </Link>
                                        <button type="button" onClick={() => handleDelete(item.id)} className="rounded p-1 text-slate-400 hover:text-red-600">
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">No items yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
