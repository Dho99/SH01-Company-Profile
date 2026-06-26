"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import api from "@/lib/api/api";
import { apiDelete } from "@/lib/api/cms";
import { toast } from "sonner";

type BlogPost = {
    id: string;
    badge: string;
    tag: string;
    publishedAt: string;
    title: string;
    published: boolean;
};

export default function BlogPostsListPage() {
    const [items, setItems] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        async function load() {
            const { data } = await api.get<BlogPost[]>("/cms/blog-posts");
            setItems(data);
            setLoading(false);
        }
        load();
    }, [refresh]);

    async function handleDelete(id: string) {
        try {
            await apiDelete("/cms/blog-posts/" + id);
            setRefresh((n) => n + 1);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Delete failed");
        }
    }

    if (loading)
        return <div className="p-6 text-sm text-slate-400">Loading...</div>;

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
                <Link
                    href="/admin/blog-posts/new"
                    className="inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand/90"
                >
                    <Plus className="size-4" /> Add New
                </Link>
            </div>
            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-left">
                        <tr>
                            <th className="px-4 py-3 font-medium text-slate-500">
                                Title
                            </th>
                            <th className="px-4 py-3 font-medium text-slate-500">
                                Badge
                            </th>
                            <th className="px-4 py-3 font-medium text-slate-500">
                                Date
                            </th>
                            <th className="px-4 py-3 font-medium text-slate-500">
                                Status
                            </th>
                            <th className="px-4 py-3 font-medium text-slate-500">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50">
                                <td className="max-w-[280px] truncate px-4 py-3 font-medium text-slate-900">
                                    {item.title}
                                </td>
                                <td className="px-4 py-3 text-slate-500">
                                    {item.badge}
                                </td>
                                <td className="px-4 py-3 text-slate-500">
                                    {new Date(item.publishedAt).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        },
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${item.published ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"}`}
                                    >
                                        {item.published ? "Published" : "Draft"}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/blog-posts/${item.id}/edit`}
                                            className="rounded p-1 text-slate-400 hover:text-blue-600"
                                        >
                                            <Pencil className="size-4" />
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(item.id)}
                                            className="rounded p-1 text-slate-400 hover:text-red-600"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-8 text-center text-slate-400"
                                >
                                    No blog posts yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
