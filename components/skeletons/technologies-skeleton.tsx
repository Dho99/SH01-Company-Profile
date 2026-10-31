import { Skeleton } from "@/components/ui/skeleton";
export function TechnologiesSkeleton() {
    return (
        <section className="bg-slate-50 py-12 lg:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl space-y-3 text-center"><Skeleton className="mx-auto h-4 w-32" /><Skeleton className="mx-auto h-8 w-64" /></div>
                <div className="mt-12 rounded-2xl border bg-white p-8 sm:p-10">
                    <div className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-2"><Skeleton className="size-9 rounded-lg" /><Skeleton className="h-3 w-16" /></div>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-center"><Skeleton className="h-10 w-48 rounded-lg" /></div>
                </div>
            </div>
        </section>
    );
}
