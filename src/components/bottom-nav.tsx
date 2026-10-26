"use client";

import { House, LayoutGrid, MessageCircle, MonitorSmartphone, Ticket } from "lucide-react";
import { NAV, type SectionId } from "@/content/site";
import { cn } from "@/lib/format";
import { useActiveSection } from "./use-active-section";

const ICONS: Record<SectionId, typeof House> = {
  top: House,
  features: LayoutGrid,
  tour: MonitorSmartphone,
  pricing: Ticket,
  contact: MessageCircle,
};

/** Floating glass tab bar for phones; the soft bubble slides to the section you are reading. */
export function BottomNav() {
  const active = useActiveSection();
  const index = NAV.findIndex((n) => n.id === active);

  return (
    <nav aria-label="پیمایش سریع" className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] md:hidden">
      <div className="glass-bar mx-auto h-[66px] max-w-md rounded-full border border-white/70 p-1.5">
        <div className="relative grid h-full grid-cols-5">
          <span
            aria-hidden
            className="glass-pill absolute inset-y-0 w-1/5 rounded-full transition-[right] duration-500 ease-[cubic-bezier(0.3,1.4,0.5,1)]"
            style={{ right: `${index * 20}%` }}
          />
          {NAV.map(({ id, label }) => {
            const Icon = ICONS[id];
            const isActive = id === active;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative z-10 flex flex-col items-center justify-center gap-0.5 rounded-full text-[11px] transition-colors",
                  isActive ? "font-bold text-primary" : "font-medium text-slate-500",
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
