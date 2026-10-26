"use client";

import { ArrowUp } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/format";

const SHOW_AFTER_PX = 600;
const R = 21;
const CIRCUMFERENCE = 2 * Math.PI * R;

/**
 * Round "back to top" button with a ring showing how far down the page you are.
 * It is a link to #top, so the section highlight in the menus locks to "خانه" while it scrolls.
 */
export function BackToTop() {
  const [progress, setProgress] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <a
      href="#top"
      aria-label="بازگشت به بالای صفحه"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "glass-bar fixed left-4 z-40 grid size-12 place-items-center rounded-full border border-white/70 text-primary transition-all duration-300",
        // phones: above the floating tab bar; desktop: page corner
        "bottom-[calc(env(safe-area-inset-bottom)+1.5rem+66px+0.75rem)] md:bottom-8 md:left-8",
        visible ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-90 opacity-0",
      )}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden>
        <circle cx="24" cy="24" r={R} fill="none" stroke="rgb(37 99 235 / 0.12)" strokeWidth="2.5" />
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <ArrowUp className="relative size-5" strokeWidth={2.4} />
    </a>
  );
}
