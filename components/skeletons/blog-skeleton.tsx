import { Skeleton } from "@/components/ui/skeleton";
export function BlogSkeleton() {
    return (
        <section className="bg-white pt-10 pb-6 lg:pt-12 lg:pb-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex justify-between"><Skeleton className="h-20 w-64" /><Skeleton className="h-10 w-28" /></div>
                <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]"><Skeleton className="min-h-[360px] rounded-[20px]" /><div className="space-y-2.5"><Skeleton className="h-6 w-32 mb-3" />{Array.from({ length: 4 }).map((_, i) => (<Skeleton key={i} className="h-[72px] rounded-[14px]" />))}</div></div>
            </div>
        </section>
    );
}
