import { Skeleton } from "@/components/ui/skeleton";
export function StatsSkeleton() {
    return (
        <section className="relative z-20 -mt-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[12px] bg-[#061b49] shadow-[0_24px_60px_rgba(2,8,23,0.32)] ring-1 ring-white/10">
                <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 md:grid-cols-4 md:divide-x md:divide-y-0">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-5 px-6 py-6 sm:px-8 lg:px-10">
                            <Skeleton className="size-14 rounded-full bg-white/10" />
                            <div className="space-y-2">
                                <Skeleton className="h-7 w-16 bg-white/10" />
                                <Skeleton className="h-3 w-24 bg-white/10" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
