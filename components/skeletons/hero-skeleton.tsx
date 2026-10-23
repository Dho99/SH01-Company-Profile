import { Skeleton } from "@/components/ui/skeleton";
export function HeroSkeleton() {
    return (
        <section className="relative isolate overflow-hidden bg-[#06142f]">
            <div className="relative mx-auto flex min-h-[560px] max-w-[1180px] items-center px-4 py-20 sm:px-6 lg:px-8">
                <div className="max-w-[560px] space-y-5">
                    <Skeleton className="h-3 w-40 bg-white/10" />
                    <Skeleton className="h-16 w-full bg-white/10" />
                    <Skeleton className="h-6 w-3/4 bg-white/10" />
                    <div className="flex gap-4">
                        <Skeleton className="h-12 w-36 bg-white/10" />
                        <Skeleton className="h-12 w-44 bg-white/10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
