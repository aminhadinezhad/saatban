"use client";

import * as React from "react";
import { NAV, type SectionId } from "@/content/site";
import { cn } from "@/lib/format";
import { Logo } from "./logo";
import { useActiveSection } from "./use-active-section";
import { useGlassTone } from "./use-glass-tone";
import { lensStyle, surfaceHoleStyle, useLens } from "./use-lens";

/** Floating liquid-glass capsule; a clear lens slides under the section you are reading. */
export function SiteHeader() {
  const active = useActiveSection();
  const bar = React.useRef<HTMLDivElement>(null);
  const links = React.useRef<Partial<Record<SectionId, HTMLAnchorElement | null>>>({});
  const tone = useGlassTone(bar);
  // "top" has no item here, so the lens fades out at the top of the page
  const lens = useLens(bar, () => links.current[active] ?? null, active);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 md:px-6">
      <div
        ref={bar}
        data-tone={tone}
        data-animate={lens.animate || undefined}
        className="liquid-bar relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full ps-3 pe-2 md:h-[60px] md:ps-5"
      >
        <div aria-hidden className="liquid-surface" style={surfaceHoleStyle(lens)} />
        <span
          aria-hidden
          className={cn(
            "liquid-lens absolute hidden rounded-full md:block",
            lens.animate && "transition-[left,top,width,height,opacity] duration-500 ease-[cubic-bezier(0.3,1.3,0.5,1)]",
            !lens.visible && "opacity-0",
          )}
          style={lensStyle(lens)}
        />
        {/* flex, not inline: an inline link adds a text line's descent below the logo and lifts it off-centre */}
        <a href="#top" aria-label="ساعتبان، بازگشت به بالا" className="relative z-10 flex shrink-0 items-center">
          <Logo />
        </a>
        <nav aria-label="منوی اصلی" className="relative z-10 hidden items-center md:flex">
          {NAV.slice(1).map(({ id, label }) => (
            <a
              key={id}
              ref={(el) => {
                links.current[id] = el;
              }}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                active === id ? "font-bold text-[var(--fg-active)]" : "font-medium text-[var(--fg-muted)] hover:text-[var(--fg-strong)]",
              )}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="relative z-10 shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_6px_16px_-6px_rgb(37_99_235/0.8)] transition-colors hover:bg-primary-hover md:px-5"
        >
          درخواست راه‌اندازی
        </a>
      </div>
    </header>
  );
}
