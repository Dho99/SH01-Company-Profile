import { Skeleton } from "@/components/ui/skeleton";
export function WhyChooseSkeleton() {
    return (
        <section className="bg-white py-10 lg:py-12">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-6 lg:px-8">
                <div className="space-y-2 lg:col-span-1"><Skeleton className="h-3 w-24" /><Skeleton className="h-6 w-20" /></div>
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="space-y-2"><Skeleton className="size-11 rounded-xl" /><Skeleton className="h-4 w-24" /><Skeleton className="h-12 w-full" /></div>
                    ))}
                </div>
            </div>
        </section>
    );
}
