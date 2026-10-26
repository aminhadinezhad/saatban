"use client";

import { House, LayoutGrid, MessageCircle, MonitorSmartphone, Ticket } from "lucide-react";
import * as React from "react";
import { NAV, type SectionId } from "@/content/site";
import { cn } from "@/lib/format";
import { useActiveSection } from "./use-active-section";
import { useGlassTone } from "./use-glass-tone";
import { lensStyle, surfaceHoleStyle, useLens } from "./use-lens";

const ICONS: Record<SectionId, typeof House> = {
  top: House,
  features: LayoutGrid,
  tour: MonitorSmartphone,
  pricing: Ticket,
  contact: MessageCircle,
};

/** Floating liquid-glass tab bar for phones; a clear lens slides to the section you are reading. */
export function BottomNav() {
  const active = useActiveSection();
  const bar = React.useRef<HTMLDivElement>(null);
  const links = React.useRef<Partial<Record<SectionId, HTMLAnchorElement | null>>>({});
  const tone = useGlassTone(bar);
  const lens = useLens(bar, () => links.current[active] ?? null, active);

  return (
    <nav aria-label="پیمایش سریع" className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] md:hidden">
      <div
        ref={bar}
        data-tone={tone}
        data-animate={lens.animate || undefined}
        className="liquid-bar relative mx-auto h-[66px] max-w-md rounded-full p-1.5"
      >
        <div aria-hidden className="liquid-surface" style={surfaceHoleStyle(lens)} />
        <span
          aria-hidden
          className={cn(
            "liquid-lens absolute rounded-full",
            lens.animate && "transition-[left,top,width,height,opacity] duration-500 ease-[cubic-bezier(0.3,1.3,0.5,1)]",
            !lens.visible && "opacity-0",
          )}
          style={lensStyle(lens)}
        />
        <div className="relative grid h-full grid-cols-5">
          {NAV.map(({ id, label }) => {
            const Icon = ICONS[id];
            const isActive = id === active;
            return (
              <a
                key={id}
                ref={(el) => {
                  links.current[id] = el;
                }}
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative z-10 flex flex-col items-center justify-center gap-0.5 rounded-full text-[11px] transition-colors duration-300",
                  isActive ? "font-bold text-[var(--fg-active)]" : "font-medium text-[var(--fg-muted)]",
                )}
              >
                <Icon className="size-[21px]" strokeWidth={isActive ? 2.2 : 1.8} />
                {label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
