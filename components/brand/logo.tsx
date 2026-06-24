import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
  href?: string;
};

export function Logo({ variant = "dark", className, href = "/" }: LogoProps) {
  const isFooterLogo = variant === "light";
  const logoSrc = isFooterLogo ? "/logo-footer.png" : "/logo.png";

  return (
    <Link
      href={href}
      aria-label="LEXA Software House home"
      className={cn("inline-flex items-center", className)}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          isFooterLogo ? "h-[52px] w-[190px]" : "h-[44px] w-[165px]"
        )}
      >
        <Image
          src={logoSrc}
          alt="LEXA Software House"
          fill
          priority
          className={cn(
            isFooterLogo
              ? "object-cover object-center"
              : "object-cover object-center"
          )}
          sizes={isFooterLogo ? "190px" : "165px"}
        />
      </div>
    </Link>
  );
}