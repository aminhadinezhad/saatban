import type { Metadata, Viewport } from "next";
import { BRAND } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${BRAND.name} | سامانه نوبت‌دهی آنلاین با تقویم شمسی`,
  description: BRAND.description,
  applicationName: BRAND.name,
  openGraph: {
    title: `${BRAND.name}: ${BRAND.tagline}`,
    description: BRAND.description,
    locale: "fa_IR",
    type: "website",
    images: [{ url: "/screens/d-dashboard.webp", width: 2049, height: 1230, alt: "پنل مدیریت ساعتبان" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f7fb",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
