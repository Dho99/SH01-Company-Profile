import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
    /** "dark" -> dark wordmark for light surfaces, "light" -> white wordmark for dark surfaces */
    variant?: "dark" | "light";
    className?: string;
    href?: string;
};

export function Logo({ variant, className, href = "/" }: LogoProps) {
    return (
        <Link
            href={href}
            aria-label="LEXA Software House home"
            className={cn("inline-flex items-center gap-2.5", className)}
        >
            <div
                className={cn(
                    "relative h-full w-full",
                    variant === "light" && "rounded bg-white p-1",
                )}
            >
                <Image
                    src="/logo.png"
                    alt="LEXA Software House"
                    width={100}
                    height={24}
                    className="object-contain object-left"
                    sizes="200px"
                />
            </div>
        </Link>
    );
}
