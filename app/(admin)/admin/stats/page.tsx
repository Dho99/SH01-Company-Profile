import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getAdminStats } from "@/lib/cms/queries";
import { apiDelete } from "@/lib/api/cms";
export default async function StatsListPage() {
    const items = await getAdminStats();

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Stats</h1>
                <Link
                    href="/admin/stats/new"
                    className="inline-flex items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand/90"
                >
                    <Plus className="size-4" /> Add New
                </Link>
            </div>
            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-left">
                        <tr>
                            <th className="px-4 py-3 font-medium text-slate-500">
                                Icon
                            </th>
                            <th className="px-4 py-3 font-medium text-slate-500">
                                Value
                            </th>
                            <th className="px-4 py-3 font-medium text-slate-500">
                                Label
                            </th>
                            <th className="px-4 py-3 font-medium text-slate-500">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50">
                                <td className="px-4 py-3">{item.icon}</td>
                                <td className="px-4 py-3">{item.value}</td>
                                <td className="px-4 py-3 text-slate-500">
                                    {item.label}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/stats/${item.id}/edit`}
                                            className="rounded p-1 text-slate-400 hover:text-blue-600"
                                        >
                                            <Pencil className="size-4" />
                                        </Link>
                                        <form
                                            action={async () => {
                                                "use server";
                                                await apiDelete(
                                                    "/cms/stats/" + item.id,
                                                );
                                            }}
                                        >
                                            <button
                                                type="submit"
                                                className="rounded p-1 text-slate-400 hover:text-red-600"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-4 py-8 text-center text-slate-400"
                                >
                                    No items yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
