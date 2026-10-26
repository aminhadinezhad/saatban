import { ArrowLeft, CalendarCheck2, Check, Lock } from "lucide-react";
import { BrowserFrame, PhoneFrame } from "@/components/frames";

const PROOF = ["بدون نصب؛ روی هر موبایل و کامپیوتر", "ورود مشتری با کد پیامکی", "خروجی اکسل از همه اطلاعات"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="grid-paper pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-8 pb-16 md:grid-cols-[1fr_1.08fr] md:px-6 md:pt-16 md:pb-24">
        <div className="text-center md:text-start">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            نوبت‌دهی آنلاین با تقویم شمسی
          </p>

          <h1 className="mt-6 text-[2.35rem] leading-[1.3] font-black tracking-tight text-balance md:text-[3.6rem] md:leading-[1.22]">
            وقتِ کسب‌وکارتان را
            <br />
            بسپارید به{" "}
            <span className="relative inline-block text-primary">
              ساعتبان
              <svg viewBox="0 0 200 14" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-1.5 h-3 w-full" aria-hidden>
                <path d="M3 9.5C42 3.5 92 2.8 140 6.2S183 11 197 4.5" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[34rem] text-[1.05rem] leading-8 text-slate-600 md:mx-0 md:text-lg md:leading-9">
            مشتری‌ها خودشان روز و ساعت خالی را انتخاب می‌کنند و شما فقط سر وقت حاضر می‌شوید. بدون پیام‌های رفت‌وبرگشتی، بدون دفترچه، بدون دو نوبت در یک ساعت.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
            <a
              href="#contact"
              className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-7 font-bold text-white shadow-[0_12px_28px_-10px_rgb(37_99_235/0.7)] transition-all hover:bg-primary-hover sm:w-auto"
            >
              درخواست راه‌اندازی
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </a>
            <a
              href="#tour"
              className="inline-flex h-13 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-7 font-semibold text-slate-700 transition-colors hover:border-primary/40 hover:text-primary sm:w-auto"
            >
              دیدن پنل و صفحه مشتری
            </a>
          </div>

          <ul className="mt-8 flex flex-col items-center gap-2.5 text-sm text-slate-600 md:items-start">
            {PROOF.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-success-soft text-success">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]">
          <BrowserFrame
            name="d-dashboard"
            alt="داشبورد پنل مدیریت ساعتبان با رزروهای امروز و هشدار رزرو در محدوده قفل‌شده"
            className="hidden -rotate-1 md:block"
            priority
          />
          <div className="relative mx-auto w-[64%] max-w-[270px] md:absolute md:-bottom-16 md:-left-6 md:w-[44%]">
            <PhoneFrame name="m-home-scroll" bottomBar="m-nav" alt="صفحه رزرو مشتری: تقویم شمسی و ساعت‌های آزاد" scroll priority />
          </div>

          <div className="float absolute top-[8%] -right-1 flex items-center gap-2.5 rounded-2xl border border-white bg-white/95 py-2.5 pr-2.5 pl-4 shadow-[0_16px_40px_-14px_rgb(15_23_42/0.35)] backdrop-blur md:top-auto md:-right-6 md:bottom-[18%]">
            <span className="grid size-9 place-items-center rounded-xl bg-success-soft text-success">
              <CalendarCheck2 className="size-5" />
            </span>
            <span className="text-start">
              <span className="block text-[13px] font-bold">نوبت سارا ثبت شد</span>
              <span className="block text-[11px] text-muted-foreground">سه‌شنبه ۵ آبان · ۱۰:۰۰</span>
            </span>
          </div>

          <div className="float-late absolute bottom-[12%] -left-1 flex items-center gap-2 rounded-xl border border-locked/15 bg-locked-soft/95 px-3 py-2 text-[12px] font-semibold text-locked shadow-[0_12px_30px_-14px_rgb(124_58_237/0.5)] md:-top-6 md:right-8 md:bottom-auto md:left-auto">
            <Lock className="size-3.5" />
            جمعه‌ها خودکار بسته است
          </div>
        </div>
      </div>
    </section>
  );
}
