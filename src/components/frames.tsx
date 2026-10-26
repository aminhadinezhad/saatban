import Image from "next/image";
import { cn } from "@/lib/format";

export const SCREENS = {
  "m-home-full": { w: 780, h: 2650 },
  "m-home": { w: 780, h: 1688 },
  "m-confirm": { w: 780, h: 1688 },
  "m-booking": { w: 780, h: 1688 },
  "m-bookings": { w: 780, h: 2724 },
  "m-login": { w: 780, h: 1688 },
  "d-dashboard": { w: 2049, h: 1230 },
  "d-schedule": { w: 2049, h: 1230 },
  "d-lock": { w: 2049, h: 1230 },
  "d-bookings": { w: 2049, h: 1230 },
  "d-users": { w: 2049, h: 1230 },
  "d-reports": { w: 2049, h: 1230 },
  "d-export": { w: 2049, h: 1230 },
} as const;

export type ScreenName = keyof typeof SCREENS;

export function Screen({ name, alt, className, priority }: { name: ScreenName; alt: string; className?: string; priority?: boolean }) {
  const { w, h } = SCREENS[name];
  return (
    <Image
      src={`/screens/${name}.webp`}
      alt={alt}
      width={w}
      height={h}
      priority={priority}
      sizes="(max-width: 768px) 90vw, 50vw"
      className={cn("block h-auto w-full select-none", className)}
      draggable={false}
    />
  );
}

/**
 * A magnified region of a screenshot. `focus` is the point (0–1 of width and height) that
 * lands in the middle of the box; `zoom` is how many box-widths wide the screenshot is drawn.
 */
export function Crop({
  name,
  alt,
  focus,
  zoom,
  className,
}: {
  name: ScreenName;
  alt: string;
  focus: [number, number];
  zoom: number;
  className?: string;
}) {
  const [fx, fy] = focus;
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute top-1/2" style={{ width: `${zoom * 100}%`, left: `calc(50% - ${fx * zoom * 100}%)`, transform: `translateY(-${fy * 100}%)` }}>
        <Screen name={name} alt={alt} />
      </div>
    </div>
  );
}

/** A phone body around a customer-side screenshot. With `scroll`, a tall screenshot scrolls inside it. */
export function PhoneFrame({
  name,
  alt,
  scroll,
  className,
  priority,
}: {
  name: ScreenName;
  alt: string;
  scroll?: boolean;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative rounded-[2.6rem] bg-slate-900 p-[9px] shadow-[0_30px_60px_-20px_rgb(15_23_42/0.45)] ring-1 ring-slate-700/60", className)}>
      <div className="relative aspect-[390/844] overflow-hidden rounded-[2.05rem] bg-background pt-[9%]">
        <Screen name={name} alt={alt} priority={priority} className={scroll ? "phone-scroll" : undefined} />
        {/* status bar with the camera island, above the screenshot */}
        <span className="absolute inset-x-0 top-0 h-[9%] bg-background" aria-hidden />
        <span className="absolute top-[2.2%] left-1/2 h-[3.4%] w-[30%] -translate-x-1/2 rounded-full bg-slate-900" aria-hidden />
      </div>
    </div>
  );
}

/** A browser window around an admin-panel screenshot. */
export function BrowserFrame({
  name,
  alt,
  title = "پنل مدیریت",
  className,
  priority,
}: {
  name: ScreenName;
  alt: string;
  title?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_70px_-25px_rgb(30_58_138/0.35)]", className)}>
      <div className="relative flex h-9 items-center border-b border-slate-100 bg-slate-50/80 px-3" dir="ltr">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="absolute left-1/2 -translate-x-1/2 rounded-md bg-white px-3 py-0.5 text-[11px] text-muted-foreground ring-1 ring-slate-200" dir="rtl">
          {title}
        </span>
      </div>
      <Screen name={name} alt={alt} priority={priority} />
    </div>
  );
}
