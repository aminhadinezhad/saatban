import { Logo } from "@/components/logo";
import { BRAND, CONTACT } from "@/content/site";

const LINKS = [
  { href: "#features", label: "امکانات" },
  { href: "#tour", label: "نمونه‌ها" },
  { href: "#pricing", label: "تعرفه" },
  { href: "#faq", label: "سؤال‌های رایج" },
  { href: "#contact", label: "تماس" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white pb-32 md:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:items-start md:justify-between md:px-6">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-7 text-slate-500">{BRAND.tagline}. سامانه نوبت‌دهی آنلاین با تقویم شمسی.</p>
        </div>
        <nav aria-label="پیوندهای پایین صفحه" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="text-sm text-slate-600">
          <p className="font-semibold text-foreground">تماس</p>
          <a href={`tel:${CONTACT.phone}`} className="ltr mt-2 block hover:text-primary">
            {CONTACT.phoneLabel}
          </a>
        </div>
      </div>
      <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-400">© ۱۴۰۵ {BRAND.name}. همه حقوق محفوظ است.</div>
    </footer>
  );
}
