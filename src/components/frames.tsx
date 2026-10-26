import { CalendarDays, House, UserRound } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/format";

export const SCREENS = {
  "m-home-scroll": { w: 780, h: 2714 },
  "m-home": { w: 780, h: 1688 },
  "m-confirm": { w: 780, h: 1688 },
  "m-booking": { w: 780, h: 1688 },
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

/** A length in the app's 390px-wide screen, scaled to the phone screen it is drawn in. */
const u = (px: number) => `calc(${px} * 100cqw / 390)`;

const APP_TABS = [
  { label: "خانه", icon: House, active: true },
  { label: "رزروهای من", icon: CalendarDays, active: false },
  { label: "پروفایل", icon: UserRound, active: false },
];

/**
 * The booking app's floating glass tab bar, drawn live over a scrolling screenshot so its
 * glass really blurs the page passing under it. Geometry copies the app (390px screen:
 * 12px side margins, 16px from the bottom, 62px tall, 6px padding, «خانه» selected).
 */
function AppTabBar() {
  const BAR_W = 366;
  const lens = { x: 242, y: 6, w: 118, h: 50 };
  const d = lens.h;
  const dot = "radial-gradient(circle closest-side, #000 98%, transparent)";
  const fill = "linear-gradient(#000 0 0)";
  const images = [fill, fill, dot, dot].join(", ");
  const sizes = `100% 100%, ${u(lens.w - d)} ${u(d)}, ${u(d)} ${u(d)}, ${u(d)} ${u(d)}`;
  const positions = `0 0, ${u(lens.x + d / 2)} ${u(lens.y)}, ${u(lens.x)} ${u(lens.y)}, ${u(lens.x + lens.w - d)} ${u(lens.y)}`;
  const hole: React.CSSProperties = {
    maskImage: images,
    WebkitMaskImage: images,
    maskSize: sizes,
    WebkitMaskSize: sizes,
    maskPosition: positions,
    WebkitMaskPosition: positions,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskComposite: "subtract, add, add, add",
    WebkitMaskComposite: "source-out, source-over, source-over, source-over",
  };

  return (
    <div
      aria-hidden
      className="liquid-bar absolute rounded-full"
      style={{ left: u(12), bottom: u(16), width: u(BAR_W), height: u(62), padding: u(6) }}
    >
      <div className="liquid-surface" style={hole} />
      <span className="liquid-lens absolute rounded-full" style={{ left: u(lens.x), top: u(lens.y), width: u(lens.w), height: u(lens.h) }} />
      <div className="relative grid h-full grid-cols-3">
        {APP_TABS.map(({ label, icon: Icon, active }) => (
          <span
            key={label}
            className={cn("relative z-10 flex flex-col items-center justify-center leading-tight", active ? "font-bold text-primary" : "font-medium text-slate-600")}
            style={{ fontSize: u(11), gap: u(2) }}
          >
            <Icon style={{ width: u(20), height: u(20) }} strokeWidth={active ? 2.3 : 1.8} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * A phone body around a customer-side screenshot: a status bar with the camera island, then
 * the app's 390×844 screen. With `scroll`, a tall screenshot scrolls inside the screen; with
 * `tabBar`, the app's glass tab bar floats over it (for screenshots taken without it).
 */
export function PhoneFrame({
  name,
  alt,
  scroll,
  tabBar,
  className,
  priority,
}: {
  name: ScreenName;
  alt: string;
  scroll?: boolean;
  tabBar?: boolean;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative rounded-[2.6rem] bg-slate-900 p-[9px] shadow-[0_30px_60px_-20px_rgb(15_23_42/0.45)] ring-1 ring-slate-700/60", className)}>
      <div className="overflow-hidden rounded-[2.05rem] bg-background">
        <div className="relative aspect-[390/40]" aria-hidden>
          <span className="absolute top-[22%] left-1/2 h-[52%] w-[30%] -translate-x-1/2 rounded-full bg-slate-900" />
        </div>
        <div className="relative aspect-[390/844] overflow-hidden [container-type:inline-size]">
          <Screen name={name} alt={alt} priority={priority} className={scroll ? "phone-scroll" : undefined} />
          {tabBar && <AppTabBar />}
        </div>
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
