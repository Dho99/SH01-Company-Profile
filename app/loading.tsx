import { HeroSkeleton } from "@/components/skeletons/hero-skeleton";
import { StatsSkeleton } from "@/components/skeletons/stats-skeleton";
import { ServicesSkeleton } from "@/components/skeletons/services-skeleton";
import { PortfolioSkeleton } from "@/components/skeletons/portfolio-skeleton";
import { BlogSkeleton } from "@/components/skeletons/blog-skeleton";

export default function Loading() {
    return (
        <>
            <HeroSkeleton />
            <StatsSkeleton />
            <ServicesSkeleton />
            <PortfolioSkeleton />
            <BlogSkeleton />
        </>
    );
}
