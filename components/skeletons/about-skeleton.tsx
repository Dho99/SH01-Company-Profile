import { Skeleton } from "@/components/ui/skeleton";
export function AboutSkeleton() {
    return (
        <section className="bg-white py-16 lg:py-20">
            <div className="mx-auto grid max-w-[1180px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
                <div className="space-y-4"><Skeleton className="h-4 w-32" /><Skeleton className="h-8 w-64" /><Skeleton className="h-20 w-full" /><div className="space-y-3 mt-6"><Skeleton className="h-5 w-3/4" /><Skeleton className="h-5 w-2/3" /><Skeleton className="h-5 w-4/5" /></div><Skeleton className="mt-6 h-10 w-40" /></div>
                <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
            </div>
        </section>
    );
}
