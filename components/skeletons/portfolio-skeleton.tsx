import { Skeleton } from "@/components/ui/skeleton";
export function PortfolioSkeleton() {
    return (
        <section className="bg-white py-12 lg:py-14">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-3"><Skeleton className="h-4 w-32" /><Skeleton className="h-8 w-56" /></div>
                <div className="mt-8 flex gap-6 overflow-hidden pb-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="w-[85%] shrink-0 rounded-xl border bg-white shadow-sm sm:w-[45%] lg:w-[calc(25%-18px)]">
                            <Skeleton className="aspect-[16/10] w-full rounded-t-xl" />
                            <div className="space-y-3 p-5"><Skeleton className="h-5 w-3/4" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-24" /></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
