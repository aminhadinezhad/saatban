import { Phone, Send } from "lucide-react";
import { CONTACT } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-24">
      <div className="rise relative overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-white md:px-14 md:py-20">
        <div className="grid-paper grid-paper-light pointer-events-none absolute inset-0" aria-hidden />
        {/* a large, faint clock face in the corner */}
        <svg viewBox="0 0 200 200" className="pointer-events-none absolute -bottom-24 -left-20 size-[22rem] text-white/10" aria-hidden>
          <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="3" />
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1="100" y1="14" x2="100" y2={i % 3 === 0 ? 30 : 24} stroke="currentColor" strokeWidth={i % 3 === 0 ? 5 : 3} strokeLinecap="round" transform={`rotate(${i * 30} 100 100)`} />
          ))}
          <path d="M72 102l20 20 38-44" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="relative max-w-2xl">
          <h2 className="text-3xl leading-[1.45] font-black md:text-[2.7rem]">اولین نوبت آنلاین‌تان را همین هفته بگیرید</h2>
          <p className="mt-5 max-w-xl leading-8 text-blue-100">
            پیام بدهید یا تماس بگیرید. درباره کسب‌وکارتان می‌پرسیم، پنل را با هم می‌بینیم و اگر به کارتان آمد، راه‌اندازی‌اش با ماست.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={CONTACT.telegram}
              target="_blank"
              rel="noopener"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-white px-7 font-bold text-primary transition-colors hover:bg-blue-50"
            >
              <Send className="size-4" />
              پیام در تلگرام
            </a>
            <a
              href={CONTACT.bale}
              target="_blank"
              rel="noopener"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-white/12 px-7 font-bold text-white ring-1 ring-white/30 transition-colors hover:bg-white/20"
            >
              <Send className="size-4" />
              پیام در بله
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-white/12 px-7 font-bold text-white ring-1 ring-white/30 transition-colors hover:bg-white/20"
            >
              <Phone className="size-4" />
              <span className="ltr">{CONTACT.phoneLabel}</span>
            </a>
          </div>
          <p className="mt-5 text-sm text-blue-100/80">پاسخ‌گویی: {CONTACT.hours}</p>
        </div>
      </div>
    </section>
  );
}
