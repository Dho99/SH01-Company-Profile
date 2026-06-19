import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  /** "dark" -> dark wordmark for light surfaces, "light" -> white wordmark for dark surfaces */
  variant?: "dark" | "light";
  className?: string;
  href?: string;
};

export function Logo({ variant = "dark", className, href = "/" }: LogoProps) {
  const wordmark = variant === "light" ? "text-white" : "text-slate-900";
  const sub = variant === "light" ? "text-white/60" : "text-slate-400";

  return (
    <Link
      href={href}
      aria-label="LEXA Software House home"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <LogoMark className="h-8 w-8" />
      <span className="flex flex-col leading-none">
        <span className={cn("text-xl font-extrabold tracking-tight", wordmark)}>
          LEXA
        </span>
        <span
          className={cn(
            "text-[9px] font-semibold uppercase tracking-[0.28em]",
            sub
          )}
        >
          Software House
        </span>
      </span>
    </Link>
  );
}

/** Geometric mark: a dark blade crossed by a brand-blue chevron. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 33 L18 7 L24 7 L12 33 Z" fill="#1e293b" />
      <path d="M22 7 L34 33 L28 33 L20 15 Z" fill="#2563eb" />
      <path d="M16 33 L22 20 L26 28 L24 33 Z" fill="#3b82f6" />
    </svg>
  );
}
