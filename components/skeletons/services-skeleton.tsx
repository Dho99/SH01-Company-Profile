import { Skeleton } from "@/components/ui/skeleton";
export function ServicesSkeleton() {
    return (
        <section className="bg-slate-50 py-12 lg:py-14">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl space-y-3 text-center"><Skeleton className="mx-auto h-4 w-32" /><Skeleton className="mx-auto h-8 w-64" /></div>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="rounded-xl border bg-white p-6 shadow-sm space-y-4"><div className="flex items-center gap-4"><Skeleton className="size-12 rounded-xl" /><Skeleton className="h-5 w-32" /></div><Skeleton className="h-12 w-full" /><Skeleton className="h-4 w-24" /></div>
                    ))}
                </div>
            </div>
        </section>
    );
}
