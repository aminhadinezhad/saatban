import { Check } from "lucide-react";
import { PLAN_FEATURES, PLANS, PRICING_NOTE, type Plan } from "@/content/site";
import { cn, formatToman, perMonthLabel, toFa } from "@/lib/format";

/** Thin bars at the foot of each ticket, like a stub. Deterministic per plan. */
function Barcode({ seed, light }: { seed: number; light?: boolean }) {
  const bars = Array.from({ length: 34 }, (_, i) => 1 + ((i * 7 + seed * 13) % 4));
  let x = 0;
  return (
    <svg viewBox="0 0 120 22" className="h-5 w-28" aria-hidden>
      {bars.map((w, i) => {
        const rect = <rect key={i} x={x} y="0" width={w * 0.7} height="22" fill={light ? "rgb(255 255 255 / 0.55)" : "rgb(15 23 42 / 0.35)"} />;
        x += w * 0.7 + 1.6;
        return rect;
      })}
    </svg>
  );
}

function Ticket({ plan, index }: { plan: Plan; index: number }) {
  const f = plan.featured;
  return (
    <li className={cn("rise drop-shadow-[0_22px_32px_rgb(15_23_42/0.12)]", f && "md:-my-4")}>
      <div className={cn("ticket flex h-full flex-col rounded-[1.75rem]", f ? "bg-primary text-white" : "bg-white")} style={{ "--tear": "218px" } as React.CSSProperties}>
        <div className="relative flex h-[218px] flex-col px-7 pt-7">
          <div className="flex items-center justify-between">
            <span className={cn("text-lg font-black", f ? "text-white" : "text-foreground")}>{plan.name}</span>
            {plan.badge && (
              <span className={cn("rounded-full px-3 py-1 text-[11px] font-bold", f ? "bg-white text-primary" : "bg-primary-soft text-primary")}>{plan.badge}</span>
            )}
          </div>
          <p className="mt-6 flex items-baseline gap-2">
            <span className="text-[2.4rem] leading-none font-black tracking-tight tabular-nums">{formatToman(plan.price)}</span>
            <span className={cn("text-sm font-medium", f ? "text-blue-100" : "text-slate-500")}>تومان</span>
          </p>
          <p className={cn("mt-3 text-sm", f ? "text-blue-100" : "text-slate-500")}>
            {plan.months === 1 ? "پرداخت ماه‌به‌ماه" : `ماهی ${perMonthLabel(plan.price, plan.months)} تومان · ${toFa(plan.months)} ماه`}
          </p>
          <p className={cn("mt-1 text-sm font-semibold", f ? "text-white" : "text-success")}>{plan.note}</p>
        </div>

        <div className={cn("mx-6 border-t-2 border-dashed", f ? "border-white/30" : "border-slate-200")} aria-hidden />

        <div className="flex flex-1 flex-col px-7 pt-6 pb-6">
          <ul className="space-y-3 text-[14px]">
            {PLAN_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", f ? "bg-white/20 text-white" : "bg-success-soft text-success")}>
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className={f ? "text-blue-50" : "text-slate-700"}>{feature}</span>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className={cn(
              "mt-8 inline-flex h-12 items-center justify-center rounded-2xl font-bold transition-colors",
              f ? "bg-white text-primary hover:bg-blue-50" : "bg-foreground text-white hover:bg-navy",
            )}
          >
            خرید اشتراک {plan.name}
          </a>
          <div className="mt-6 flex items-center justify-between" aria-hidden>
            <Barcode seed={index + 2} light={f} />
            <span className={cn("ltr font-mono text-[11px] tracking-widest", f ? "text-blue-100/80" : "text-slate-400")}>SB-{String(plan.months).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="rise mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold text-primary">تعرفه</p>
          <h2 className="mt-3 text-3xl leading-[1.4] font-black md:text-[2.6rem]">یک بلیت، برای همه وقت‌های پیش رو</h2>
          <p className="mt-4 leading-8 text-slate-600">همه امکانات در هر سه طرح هست. فقط مدت اشتراک فرق می‌کند؛ هرچه بلندتر، به‌صرفه‌تر.</p>
        </div>
        <ul className="mt-14 grid items-stretch gap-6 md:grid-cols-3 md:gap-5 lg:gap-7">
          {PLANS.map((plan, i) => (
            <Ticket key={plan.id} plan={plan} index={i} />
          ))}
        </ul>
        <p className="mt-10 text-center text-xs leading-6 text-slate-500">{PRICING_NOTE}</p>
      </div>
    </section>
  );
}
