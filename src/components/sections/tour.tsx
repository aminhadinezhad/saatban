"use client";

import * as React from "react";
import { BrowserFrame, PhoneFrame, type ScreenName } from "@/components/frames";
import { cn } from "@/lib/format";

const ADMIN: { id: ScreenName; label: string; caption: string }[] = [
  { id: "d-dashboard", label: "داشبورد", caption: "نوبت‌های امروز، نوبت‌های پیش رو و هر چیزی که باید به آن رسیدگی کنید، همان اول کار." },
  { id: "d-schedule", label: "زمان‌بندی", caption: "تقویم ماه و ساعت‌به‌ساعتِ هر روز: چه کسی رزرو کرده، کجا بسته است و کجا خالی." },
  { id: "d-bookings", label: "رزروها", caption: "جست‌وجو با نام یا موبایل، فیلتر تاریخ و وضعیت، و لغو با ثبت دلیل." },
  { id: "d-users", label: "مشتری‌ها", caption: "فهرست مشتری‌ها با تعداد نوبت‌ها؛ با یک کلیک به پرونده هر نفر بروید." },
  { id: "d-reports", label: "گزارش‌ها", caption: "نمودار ماهانه نوبت‌ها: برگزار شده، لغو شده، در انتظار، و مشتری‌های جدید." },
  { id: "d-export", label: "خروجی اکسل", caption: "هر بخش را که خواستید انتخاب کنید و فایل اکسل شمسی و راست‌به‌چپ بگیرید." },
];

const CUSTOMER: { id: ScreenName; title: string; text: string }[] = [
  { id: "m-home", title: "روز و ساعت را انتخاب می‌کند", text: "ساعت‌های خالی، پر و بسته از هم پیداست." },
  { id: "m-confirm", title: "یک بار تأیید می‌کند", text: "تاریخ و ساعت را می‌بیند و ثبت می‌کند." },
  { id: "m-booking", title: "نوبتش را مدیریت می‌کند", text: "تا قبل از شروع، تغییر ساعت یا لغو با خودش." },
];

export function Tour() {
  const [active, setActive] = React.useState(0);
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent) {
    // RTL: the right arrow moves to the previous tab
    const delta = e.key === "ArrowLeft" ? 1 : e.key === "ArrowRight" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + ADMIN.length) % ADMIN.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="tour" className="relative bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="rise mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold text-primary">نمونه‌ها</p>
          <h2 className="mt-3 text-3xl leading-[1.4] font-black md:text-[2.6rem]">پنلی که هر صبح با آن کار می‌کنید</h2>
          <p className="mt-4 leading-8 text-slate-600">این تصویرها از خود نرم‌افزار گرفته شده‌اند، نه طرح گرافیکی.</p>
        </div>

        <div
          role="tablist"
          aria-label="بخش‌های پنل مدیریت"
          onKeyDown={onKeyDown}
          className="mx-auto mt-10 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-slate-100 p-1 [scrollbar-width:none]"
        >
          {ADMIN.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={i === active}
              aria-controls="tour-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-all",
                i === active ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-800",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div id="tour-panel" role="tabpanel" aria-labelledby={`tab-${ADMIN[active]!.id}`} className="mx-auto mt-8 max-w-5xl">
          <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
            {ADMIN.map((tab, i) => (
              <div key={tab.id} className={cn("transition-all duration-500", i === active ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0")} aria-hidden={i !== active}>
                <BrowserFrame name={tab.id} alt={`پنل مدیریت ساعتبان: ${tab.label}`} />
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-center leading-8 text-slate-600" aria-live="polite">
            {ADMIN[active]!.caption}
          </p>
        </div>

        <div className="mt-24">
          <h3 className="rise text-center text-2xl font-black md:text-3xl">و از نگاه مشتری شما</h3>
          <ol className="-mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:px-0">
            {CUSTOMER.map((step, i) => (
              <li key={step.id} className="rise w-[68%] shrink-0 snap-center md:w-auto">
                <PhoneFrame name={step.id} alt={step.title} className="mx-auto max-w-[260px]" />
                <div className="mt-6 text-center">
                  <span className="inline-grid size-8 place-items-center rounded-full bg-primary text-sm font-bold text-white">{["۱", "۲", "۳"][i]}</span>
                  <p className="mt-3 font-bold">{step.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
