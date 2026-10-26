import { CalendarCheck2, Link2, MousePointerClick } from "lucide-react";
import { cn } from "@/lib/format";

const CHAT: { from: "customer" | "business"; text: string; time: string }[] = [
  { from: "customer", text: "سلام، برای فردا وقت دارید؟", time: "۱۰:۰۲" },
  { from: "business", text: "سلام. فردا ساعت ۱۱ و ۴ خالیه", time: "۱۰:۴۱" },
  { from: "customer", text: "۱۱ نمی‌رسم. ۱۲ چطور؟", time: "۱۱:۱۵" },
  { from: "business", text: "۱۲ پره متأسفانه. پس‌فردا ۱۲ خوبه؟", time: "۱۳:۳۰" },
  { from: "customer", text: "باشه همون ۱۱ فردا رو بذارید", time: "۱۷:۰۸" },
  { from: "business", text: "ببخشید، ۱۱ رو همین الان یکی دیگه گرفت", time: "۱۷:۲۰" },
];

const STEPS = [
  { icon: Link2, title: "لینک رزرو را باز می‌کند", text: "از بیو اینستاگرام، پیام‌رسان یا کارت ویزیت شما" },
  { icon: MousePointerClick, title: "روز و ساعت خالی را می‌بیند", text: "فقط ساعت‌هایی که واقعاً آزادند قابل انتخاب‌اند" },
  { icon: CalendarCheck2, title: "تأیید می‌کند و تمام", text: "نوبت در پنل شما ثبت می‌شود و ساعت برای بقیه پر می‌شود" },
];

export function BeforeAfter() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <div className="rise mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold text-primary">چرا ساعتبان؟</p>
        <h2 className="mt-3 text-3xl leading-[1.4] font-black md:text-[2.6rem]">نوبت‌دهی با پیام، یک روز کامل وقت می‌گیرد</h2>
        <p className="mt-4 leading-8 text-slate-600">این گفت‌وگو را احتمالاً بارها داشته‌اید. هفت ساعت، شش پیام، و آخرش هم نوبتی ثبت نشد.</p>
      </div>

      <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2">
        <div className="rise relative rounded-[1.75rem] border border-slate-200 bg-white p-5 md:p-7">
          <p className="mb-5 flex items-center justify-between text-sm">
            <span className="font-bold text-slate-500">بدون ساعتبان</span>
            <span className="rounded-full bg-destructive/8 px-2.5 py-1 text-xs font-semibold text-destructive">۷ ساعت · نوبتی ثبت نشد</span>
          </p>
          <ol className="space-y-2.5">
            {CHAT.map((m, i) => (
              <li key={i} className={cn("flex", m.from === "customer" ? "justify-start" : "justify-end")}>
                <span
                  className={cn(
                    "max-w-[80%] rounded-2xl px-3.5 py-2 text-[14px] leading-6",
                    m.from === "customer" ? "rounded-tr-md bg-slate-100 text-slate-700" : "rounded-tl-md bg-slate-800 text-white",
                    i === CHAT.length - 1 && "ring-2 ring-destructive/25",
                  )}
                >
                  {m.text}
                  <span className={cn("ms-2 align-bottom text-[10px]", m.from === "customer" ? "text-slate-400" : "text-slate-400")}>{m.time}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rise relative overflow-hidden rounded-[1.75rem] bg-navy p-5 text-white md:p-7">
          <div className="grid-paper grid-paper-light pointer-events-none absolute inset-0" aria-hidden />
          <p className="relative mb-6 flex items-center justify-between text-sm">
            <span className="font-bold text-blue-100">با ساعتبان</span>
            <span className="rounded-full bg-white/12 px-2.5 py-1 text-xs font-semibold text-white">سه قدم، بدون پیام</span>
          </p>
          <ol className="relative space-y-3">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex items-start gap-4 rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-primary">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block font-bold">
                    <span className="me-1.5 text-blue-200">{["۱", "۲", "۳"][i]}.</span>
                    {title}
                  </span>
                  <span className="mt-1 block text-sm leading-7 text-blue-100/80">{text}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="relative mt-6 rounded-2xl border border-dashed border-white/25 px-4 py-3 text-sm leading-7 text-blue-50">
            و شما؟ هیچ کاری لازم نیست. صبح پنل را باز می‌کنید و نوبت‌های امروز آنجاست.
          </p>
        </div>
      </div>
    </section>
  );
}
