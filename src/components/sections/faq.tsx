import { Plus } from "lucide-react";
import { FAQ } from "@/content/site";

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <div className="grid gap-10 md:grid-cols-[1fr_1.7fr] md:gap-16">
        <div className="rise md:sticky md:top-28 md:self-start">
          <p className="text-sm font-bold text-primary">سؤال‌های رایج</p>
          <h2 className="mt-3 text-3xl leading-[1.4] font-black md:text-[2.6rem]">قبل از شروع، معمولاً این‌ها را می‌پرسند</h2>
          <p className="mt-4 leading-8 text-slate-600">
            جواب سؤالتان اینجا نیست؟{" "}
            <a href="#contact" className="font-semibold text-primary underline-offset-4 hover:underline">
              از ما بپرسید
            </a>
            .
          </p>
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="group rise">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.05rem] font-bold [&::-webkit-details-marker]:hidden">
                {q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-primary ring-1 ring-slate-200 transition-transform duration-300 group-open:rotate-45">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="pb-6 leading-8 text-slate-600">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
