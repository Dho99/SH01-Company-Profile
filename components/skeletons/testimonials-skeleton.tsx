import { Skeleton } from "@/components/ui/skeleton";
export function TestimonialsSkeleton() {
    return (
        <section className="bg-slate-50 py-12 lg:py-14">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                <Skeleton className="h-8 w-64" />
                <div className="mt-10 flex gap-6 overflow-hidden pb-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex w-[88%] shrink-0 flex-col rounded-xl border bg-white p-6 sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                            <Skeleton className="size-7 rounded" />
                            <Skeleton className="mt-4 h-16 w-full" />
                            <div className="mt-6 flex items-center gap-4 border-t pt-5"><Skeleton className="size-12 rounded-full" /><div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-3 w-20" /></div></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
