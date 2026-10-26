import { BRAND } from "@/content/site";
import { cn } from "@/lib/format";

/** A clock whose hands form a tick: time, confirmed. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("size-9", className)} aria-hidden>
      <rect width="40" height="40" rx="11" fill="var(--primary)" />
      <rect x="17" y="5.5" width="6" height="3.2" rx="1.4" fill="#fff" opacity="0.9" />
      <circle cx="20" cy="21.5" r="11" fill="none" stroke="#fff" strokeWidth="2.6" />
      <path d="M14.8 21.8l3.6 3.6 7-8.2" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className={cn("text-xl font-black tracking-tight", light ? "text-white" : "text-foreground")}>{BRAND.name}</span>
    </span>
  );
}
