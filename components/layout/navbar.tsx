"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "group relative inline-flex items-center gap-1 py-5 text-sm font-medium transition-colors hover:text-brand",
                i === 0 ? "text-brand" : "text-slate-600"
              )}
            >
              {link.label}
              {"hasDropdown" in link && link.hasDropdown && (
                <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
              )}
              {i === 0 && (
                <span className="absolute inset-x-0 bottom-0 mx-auto h-0.5 w-6 rounded-full bg-brand" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild className="rounded-lg px-5">
            <Link href="#contact">Get in Touch</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-md text-slate-700 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2 rounded-lg">
              <Link href="#contact" onClick={() => setOpen(false)}>
                Get in Touch
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
