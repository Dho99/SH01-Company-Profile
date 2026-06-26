import { Suspense } from "react";
import Link from "next/link";
import { Home, Mail } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { CurrentYear } from "@/components/current-year";

export const metadata = {
    title: "404 — Page Not Found | LEXA Software House",
};

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <header className="flex h-[78px] items-center px-6 sm:px-10">
                {/* <Link href="/"> */}
                <Logo />
                {/* </Link> */}
            </header>

            <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
                <div className="relative mb-6 select-none">
                    <span className="text-[clamp(7rem,25vw,14rem)] font-extrabold leading-none tracking-[-0.05em] text-brand/10">
                        404
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center text-[clamp(5rem,18vw,10rem)] font-extrabold leading-none tracking-[-0.05em] text-brand">
                        404
                    </span>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Page Not Found
                </h1>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500 sm:text-base">
                    The page you&apos;re looking for doesn&apos;t exist or has
                    been moved.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Button
                        asChild
                        className="h-11 rounded-lg bg-brand px-6 font-semibold text-white hover:bg-brand/90"
                    >
                        <Link href="/">
                            <Home className="size-4" />
                            Back to Home
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="h-11 rounded-lg px-6 font-semibold"
                    >
                        <Link href="/#contact">
                            <Mail className="size-4" />
                            Contact Us
                        </Link>
                    </Button>
                </div>
            </main>

            <footer className="flex h-16 items-center justify-center">
                <p className="text-xs text-slate-400">
                    &copy;{" "}
                    <Suspense fallback="2026">
                        <CurrentYear />
                    </Suspense>{" "}
                    LEXA Software House
                </p>
            </footer>
        </div>
    );
}
