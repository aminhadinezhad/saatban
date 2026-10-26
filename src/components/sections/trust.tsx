import { Database, FileSpreadsheet, Scale, ShieldCheck } from "lucide-react";

const POINTS = [
  {
    icon: Database,
    title: "اطلاعات هر کسب‌وکار جداست",
    text: "پنل و پایگاه داده شما مخصوص خودتان است و با کسب‌وکار دیگری مشترک نیست.",
  },
  {
    icon: ShieldCheck,
    title: "ورود امن",
    text: "کد یک‌بارمصرف با تاریخ انقضا، محدودیت تعداد تلاش، و نگهداری امن نشست‌های ورود.",
  },
  {
    icon: Scale,
    title: "قوانین و رضایت، ثبت‌شده",
    text: "مشتری هنگام ثبت‌نام قوانین و حریم خصوصی را می‌پذیرد و زمان و نسخه پذیرش به‌عنوان سابقه ذخیره می‌شود.",
  },
  {
    icon: FileSpreadsheet,
    title: "هیچ‌چیز قفل نیست",
    text: "هر لحظه می‌توانید از همه اطلاعات‌تان خروجی بگیرید. داده‌ها مال شماست، نه ما.",
  },
];

export function Trust() {
  return (
    <section data-surface="dark" className="relative overflow-hidden bg-navy-deep py-20 text-white md:py-28">
      <div className="grid-paper grid-paper-light pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="rise grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-end">
          <div>
            <p className="text-sm font-bold text-blue-300">خیالتان راحت</p>
            <h2 className="mt-3 text-3xl leading-[1.4] font-black md:text-[2.6rem]">نوبت‌ها جای امنی هستند</h2>
          </div>
          <p className="leading-8 text-blue-100/80 md:pb-2">
            ساعتبان برای کسب‌وکارهایی ساخته شده که اعتماد مشتری برایشان مهم است. این‌ها چیزهایی است که لازم نیست نگرانش باشید.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rise rounded-[1.5rem] bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-sm">
              <Icon className="size-7 text-blue-300" strokeWidth={1.6} />
              <h3 className="mt-5 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-blue-100/75">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
