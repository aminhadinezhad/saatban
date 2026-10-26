"use client";

import * as React from "react";
import { NAV } from "@/content/site";
import { cn } from "@/lib/format";
import { Logo } from "./logo";
import { useActiveSection } from "./use-active-section";

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const active = useActiveSection();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background,box-shadow,border-color] duration-300",
        scrolled ? "border-b border-white/60 bg-white/70 shadow-[0_6px_24px_-12px_rgb(15_23_42/0.2)] backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 md:px-6">
        <a href="#top" aria-label="ساعتبان، بازگشت به بالا">
          <Logo />
        </a>
        <nav aria-label="منوی اصلی" className="hidden items-center gap-1 md:flex">
          {NAV.slice(1).map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === id ? "bg-primary-soft text-primary" : "text-slate-600 hover:text-foreground",
              )}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy md:px-5"
        >
          درخواست راه‌اندازی
        </a>
      </div>
    </header>
  );
}
