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
  const logoSrc = isFooterLogo ? "/footerLEXA.png" : "/logo.png";

  return (
    <Link
      href={href}
      aria-label="LEXA Software House home"
      className={cn("inline-flex items-center", className)}
    >
      <div
        className={cn(
          "relative",
          isFooterLogo ? "h-23.5 w-68.5" : "h-[74px] w-[250px]"
        )}
      >
        <Image
          src={logoSrc}
          alt="LEXA Software House"
          fill
          priority
          className="object-contain object-left"
          sizes={isFooterLogo ? "280px" : "250px"}
        />
      </div>
    </Link>
  );
}