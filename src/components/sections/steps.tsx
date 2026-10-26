const STEPS = [
  { title: "گفت‌وگوی کوتاه", text: "ساعت کاری، روزهای تعطیل و اینکه مشتری تا چند روز جلوتر بتواند وقت بگیرد را می‌پرسیم." },
  { title: "راه‌اندازی پنل شما", text: "پنل اختصاصی کسب‌وکارتان آماده می‌شود و رمز ورود مدیر را تحویل می‌گیرید." },
  { title: "لینک برای مشتری‌ها", text: "لینک رزرو را در بیو، پیام‌رسان یا روی کارت ویزیت می‌گذارید. از اینجا به بعد مشتری‌ها خودشان وقت می‌گیرند." },
];

/** Three steps on a clock-like track. */
export function Steps() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <div className="rise mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold text-primary">شروع کار</p>
        <h2 className="mt-3 text-3xl leading-[1.4] font-black md:text-[2.6rem]">از تماس تا اولین نوبت آنلاین</h2>
      </div>
      <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        <span className="absolute top-7 right-[16%] left-[16%] hidden border-t-2 border-dashed border-primary/25 md:block" aria-hidden />
        <span className="absolute top-2 right-7 bottom-2 border-r-2 border-dashed border-primary/25 md:hidden" aria-hidden />
        {STEPS.map((step, i) => (
          <li key={step.title} className="rise relative flex gap-5 md:flex-col md:items-center md:text-center">
            <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border-4 border-background bg-white shadow-[0_8px_24px_-10px_rgb(37_99_235/0.5)] ring-1 ring-primary/20">
              <svg viewBox="0 0 40 40" className="size-9" aria-hidden>
                <circle cx="20" cy="20" r="16" fill="none" stroke="var(--primary-soft)" strokeWidth="4" />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${((i + 1) / 3) * 100.5} 100.5`}
                  transform="rotate(-90 20 20)"
                />
                <text x="20" y="25" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--foreground)">
                  {["۱", "۲", "۳"][i]}
                </text>
              </svg>
            </span>
            <div className="pt-1 md:pt-0">
              <h3 className="text-lg font-black">{step.title}</h3>
              <p className="mt-2 max-w-xs leading-8 text-slate-600">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
