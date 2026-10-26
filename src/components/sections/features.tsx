import { ArrowLeft, CalendarOff, Clock3, FileSpreadsheet, Hand, MessageSquareText, Repeat, StickyNote, UserX } from "lucide-react";
import { Crop, PhoneFrame } from "@/components/frames";
import { cn } from "@/lib/format";

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <article className={cn("rise relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-6 md:p-7", className)}>{children}</article>;
}

function Title({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold tracking-wide text-primary">{kicker}</p>
      <h3 className="mt-2 text-xl leading-9 font-black md:text-[1.4rem]">{children}</h3>
    </div>
  );
}

function Calendar() {
  return (
    <Card className="bg-gradient-to-b from-primary-soft to-white md:col-span-3 md:row-span-2">
      <Title kicker="تقویم شمسی">مشتری فقط ساعت‌های واقعاً خالی را می‌بیند</Title>
      <p className="mt-3 max-w-md leading-8 text-slate-600">
        روزهای پر، تعطیل و نیمه‌بسته با رنگ و علامت از هم جدا می‌شوند. ساعتی که گذشته، پر شده یا بسته است اصلاً قابل انتخاب نیست؛ حتی اگر کسی بخواهد از راه دیگری رزروش کند.
      </p>
      <div className="relative mx-auto mt-8 -mb-40 w-[72%] max-w-[300px] md:-mb-48">
        <PhoneFrame name="m-home" alt="تقویم شمسی صفحه رزرو مشتری با روزهای آزاد، نیمه‌بسته و رزرو شده" />
      </div>
    </Card>
  );
}

function SameSlot() {
  return (
    <Card className="md:col-span-3">
      <Title kicker="بدون تداخل">دو نفر، یک ساعت؟ فقط یکی موفق می‌شود.</Title>
      <p className="mt-3 leading-8 text-slate-600">
        بررسی روی سرور و در خود پایگاه داده انجام می‌شود. حتی اگر دو مشتری در یک لحظه دکمه را بزنند، یک ساعت هرگز دو بار فروخته نمی‌شود.
      </p>
      <div className="relative mt-6 flex h-40 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-100" aria-hidden>
        <div className="slot-won relative flex h-[68px] w-44 flex-col items-center justify-center rounded-2xl border bg-white">
          <span className="ltr text-sm font-bold tabular-nums">۱۱:۰۰ - ۱۲:۰۰</span>
          <span className="text-[11px] font-medium opacity-80">آخرین ساعت خالی</span>
          <Hand className="tap-a absolute -right-3 -bottom-4 size-7 fill-white text-slate-700" />
          <Hand className="tap-b absolute -bottom-4 -left-3 size-7 -scale-x-100 fill-white text-slate-700" />
        </div>
        <div className="toast-in absolute bottom-3 rounded-xl bg-slate-900 px-3 py-1.5 text-[12px] text-white shadow-lg">
          نفر دوم: «این ساعت همین الان رزرو شد»
        </div>
      </div>
    </Card>
  );
}

function Locks() {
  return (
    <Card className="md:col-span-3">
      <Title kicker="تعطیلی‌ها">یک روز نیستید؟ نوبت‌ها گم نمی‌شوند.</Title>
      <p className="mt-3 leading-8 text-slate-600">قبل از بستن یک روز یا بازه، ساعتبان نشان می‌دهد چه نوبت‌هایی در آن هست. خودتان تصمیم می‌گیرید بمانند یا لغو شوند.</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-locked-soft px-3 py-1.5 text-locked">
          <CalendarOff className="size-3.5" /> روز کامل
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-locked-soft px-3 py-1.5 text-locked">
          <Clock3 className="size-3.5" /> بازه ساعتی
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-locked-soft px-3 py-1.5 text-locked">
          <Repeat className="size-3.5" /> هفتگی تکرارشونده
        </span>
      </div>
      <Crop
        name="d-lock"
        alt="پنجره بررسی قفل: دو رزرو فعال در محدوده و انتخاب حفظ یا لغو آن‌ها"
        focus={[0.5, 0.64]}
        zoom={2.1}
        className="mt-5 h-52 rounded-2xl bg-slate-50 ring-1 ring-slate-200"
      />
    </Card>
  );
}

function Otp() {
  return (
    <Card className="md:col-span-2">
      <Title kicker="ورود">بدون رمز، با کد پیامکی</Title>
      <div className="mt-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100" aria-hidden>
        <div className="flex items-start gap-2 text-[12px] text-slate-600">
          <MessageSquareText className="mt-0.5 size-4 text-primary" />
          <span className="rounded-xl rounded-tr-sm bg-white px-3 py-2 shadow-sm">کد ورود شما: ۴۸۲۷۱</span>
        </div>
        <div className="ltr mt-4 flex justify-center gap-1.5">
          {["۴", "۸", "۲", "۷", "۱"].map((d, i) => (
            <span key={i} className={cn("grid h-11 w-9 place-items-center rounded-lg border bg-white text-lg font-bold", i === 4 ? "border-primary ring-2 ring-primary/20" : "border-slate-200")}>
              {d}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">مشتری با شماره موبایلش ثبت‌نام می‌کند. محدودیت تلاش و انقضای کد، جلوی سوءاستفاده را می‌گیرد.</p>
    </Card>
  );
}

function Reschedule() {
  return (
    <Card className="md:col-span-2">
      <Title kicker="تغییر ساعت">جابه‌جایی نوبت در یک حرکت</Title>
      <div className="mt-5 flex items-center justify-center gap-3 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100" aria-hidden>
        <span className="ltr rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-400 tabular-nums line-through">۱۰:۰۰</span>
        <ArrowLeft className="size-5 text-primary" />
        <span className="ltr rounded-xl border border-success/30 bg-success-soft px-3 py-2 text-sm font-bold text-success tabular-nums">۱۱:۰۰</span>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">نوبت قبلی لغو و نوبت جدید ثبت می‌شود؛ هر دو با هم. اگر ساعت جدید پر باشد، نوبت قبلی دست‌نخورده می‌ماند.</p>
    </Card>
  );
}

function Report() {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <Card className="md:col-span-2">
      <Title kicker="گزارش">آخر ماه، همه‌چیز در یک نگاه</Title>
      <div className="mt-5 flex items-center justify-center gap-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100" aria-hidden>
        <svg viewBox="0 0 80 80" className="size-24 -rotate-90">
          <circle cx="40" cy="40" r={r} fill="none" stroke="#fee2e2" strokeWidth="11" />
          <circle cx="40" cy="40" r={r} fill="none" stroke="var(--primary)" strokeWidth="11" strokeDasharray={`${c * 0.87} ${c}`} strokeLinecap="round" />
        </svg>
        <div className="text-sm">
          <p className="text-2xl font-black">۸۷٪</p>
          <p className="text-slate-500">جلسات برگزار شده</p>
          <p className="mt-1 text-xs text-destructive">۱۳٪ لغو شده</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">برگزار شده، لغو شده و در انتظار، روزبه‌روز؛ به‌همراه تعداد مشتری‌های جدید هر ماه.</p>
    </Card>
  );
}

function Excel() {
  const rows = [
    ["سارا رضایی", "۱۴۰۵/۰۸/۰۵", "۱۰:۰۰", "ثبت شده"],
    ["علی محمدی", "۱۴۰۵/۰۸/۰۵", "۱۱:۰۰", "برگزار شده"],
    ["نگار کاظمی", "۱۴۰۵/۰۸/۰۶", "۰۹:۰۰", "لغو شده"],
  ];
  return (
    <Card className="md:col-span-3">
      <div className="flex items-start justify-between gap-4">
        <Title kicker="خروجی اکسل">اطلاعات شما، همیشه مال خود شماست</Title>
        <FileSpreadsheet className="size-9 shrink-0 text-success" strokeWidth={1.5} />
      </div>
      <p className="mt-3 leading-8 text-slate-600">مشتری‌ها، نوبت‌ها و تعطیلی‌ها را هر وقت خواستید در یک فایل اکسل راست‌به‌چپ با تاریخ شمسی بگیرید.</p>
      <div className="mt-5 overflow-hidden rounded-xl text-[12px] ring-1 ring-slate-200" aria-hidden>
        <div className="grid grid-cols-4 bg-success text-white">
          {["نام", "تاریخ", "ساعت", "وضعیت"].map((h) => (
            <span key={h} className="border-l border-white/20 px-3 py-2 font-bold last:border-l-0">
              {h}
            </span>
          ))}
        </div>
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-4 border-t border-slate-100 bg-white even:bg-slate-50/60">
            {row.map((cell, j) => (
              <span key={j} className="border-l border-slate-100 px-3 py-2 text-slate-600 last:border-l-0">
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}

function Customers() {
  const people = [
    { name: "سارا رضایی", initial: "س", count: "۱۴ نوبت", note: true },
    { name: "امیرحسین نوری", initial: "ا", count: "۹ نوبت" },
    { name: "مهدی نجفی", initial: "م", count: "غیرفعال", off: true },
  ];
  return (
    <Card className="md:col-span-3">
      <Title kicker="مشتری‌ها">پرونده هر مشتری، یک کلیک فاصله دارد</Title>
      <p className="mt-3 leading-8 text-slate-600">سابقه نوبت‌ها، توضیحات اختصاصی برای هر نفر، و غیرفعال کردن حساب کسی که مزاحمت ایجاد می‌کند.</p>
      <ul className="mt-5 divide-y divide-slate-100 rounded-xl ring-1 ring-slate-200" aria-hidden>
        {people.map((p) => (
          <li key={p.name} className="flex items-center gap-3 bg-white px-4 py-3 first:rounded-t-xl last:rounded-b-xl">
            <span className={cn("grid size-9 place-items-center rounded-full font-bold", p.off ? "bg-slate-100 text-slate-400" : "bg-primary-soft text-primary")}>{p.initial}</span>
            <span className={cn("flex-1 text-sm font-semibold", p.off && "text-slate-400")}>{p.name}</span>
            {p.note && <StickyNote className="size-4 text-warning" />}
            {p.off && <UserX className="size-4 text-slate-400" />}
            <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium", p.off ? "bg-slate-100 text-slate-400" : "bg-success-soft text-success")}>{p.count}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <div className="rise max-w-2xl">
        <p className="text-sm font-bold text-primary">امکانات</p>
        <h2 className="mt-3 text-3xl leading-[1.4] font-black md:text-[2.6rem]">
          ساده برای مشتری،
          <br className="hidden md:block" /> دقیق برای شما
        </h2>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-6 md:gap-5">
        <Calendar />
        <SameSlot />
        <Locks />
        <Otp />
        <Reschedule />
        <Report />
        <Excel />
        <Customers />
      </div>
    </section>
  );
}
