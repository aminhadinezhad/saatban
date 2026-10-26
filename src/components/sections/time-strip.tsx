import { Check, Lock } from "lucide-react";
import { cn, toFa } from "@/lib/format";

type SlotState = "free" | "booked" | "locked" | "mine";
const STATES: SlotState[] = ["free", "booked", "free", "mine", "free", "locked", "booked", "free", "booked", "free", "locked", "free"];
const LOCK_REASONS = ["جلسه هفتگی", "کارگاه", "استراحت"];

function Slot({ hour, state, reason }: { hour: number; state: SlotState; reason: string }) {
  const time = `${toFa(String(hour).padStart(2, "0"))}:۰۰ - ${toFa(String(hour + 1).padStart(2, "0"))}:۰۰`;
  return (
    <li
      className={cn(
        "flex h-[62px] w-[150px] shrink-0 flex-col items-center justify-center rounded-2xl border text-center",
        state === "free" && "border-slate-200 bg-white",
        state === "booked" && "border-slate-200 bg-slate-100 text-slate-400",
        state === "locked" && "hatch border-locked/20 bg-locked-soft text-locked",
        state === "mine" && "border-success/30 bg-success-soft text-success",
      )}
    >
      <span className="ltr text-[13px] font-semibold tabular-nums">{time}</span>
      <span className="mt-0.5 flex items-center gap-1 text-[11px] font-medium">
        {state === "free" && <span className="text-slate-500">قابل رزرو</span>}
        {state === "booked" && "رزرو شده"}
        {state === "locked" && (
          <>
            <Lock className="size-3" /> بسته · {reason}
          </>
        )}
        {state === "mine" && (
          <>
            <Check className="size-3" strokeWidth={3} /> رزرو شما
          </>
        )}
      </span>
    </li>
  );
}

function Row({ offset, reverse }: { offset: number; reverse?: boolean }) {
  const slots = STATES.map((state, i) => ({ hour: 8 + ((i + offset) % 12), state: STATES[(i + offset) % STATES.length]!, reason: LOCK_REASONS[i % 3]! }));
  return (
    <div className="overflow-hidden">
      <ul className={cn("flex w-max gap-3", reverse ? "marquee-reverse" : "marquee")}>
        {[...slots, ...slots].map((s, i) => (
          <Slot key={i} {...s} />
        ))}
      </ul>
    </div>
  );
}

/** A slow, endless river of time slots: the product's own vocabulary, used as decoration. */
export function TimeStrip() {
  return (
    <section aria-label="نمونه ساعت‌های رزرو" className="relative border-y border-slate-200/70 bg-white/60 py-5">
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" aria-hidden />
      <div className="space-y-3" aria-hidden>
        <Row offset={0} />
        <Row offset={5} reverse />
      </div>
    </section>
  );
}
