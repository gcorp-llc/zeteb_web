import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import "../globals.css";
import { Navbar } from "@/features/navigation/navbar";
import { MobileFooter } from "@/features/navigation/mobile-footer";
import { JsonLd } from "@/features/seo/components/json-ld";
import { Toaster } from "sonner";
import QueryProvider from "@/components/providers/query-provider";

// ────────────────────────────────────────────────
// فونت‌ها – بهترین روش: ترکیب وزن‌ها در یک variable font یا حداقل تعریف دقیق
// ────────────────────────────────────────────────
const shabnam = localFont({
  src: [
    {
      path: "../../public/fonts/Shabnam.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Shabnam-Bold-FD-WOL.woff2",
      weight: "700",
      style: "normal",
    },
    // اگر فایل‌های Italic یا وزن‌های دیگر داری اضافه کن
    // {
    //   path: ".../Shabnam-Medium.woff2",
    //   weight: "500",
    //   style: "normal",
    // },
  ],
  variable: "--font-shabnam",
  display: "swap",
  preload: true,          // مهم برای عملکرد اولیه
  fallback: ["system-ui", "sans-serif"], // fallback خوب برای RTL
});

export const metadata: Metadata = {
  title: {
    default: "Zeteb",
    template: "%s | Zeteb", // بهترین تمرین برای SEO
  },
  description: "توضیحات برنامه شما – می‌توانید بعداً داینامیک کنید",
  icons: {
    icon: "/favicon.ico",
    // بهتر است apple-touch-icon و manifest هم اضافه شود
    apple: "/apple-touch-icon.png",
  },
  // برای پروژه‌های فارسی خیلی مهم است
  alternates: {
    canonical: "/",
    // اگر چندزبانه شدید بعداً languages اضافه کنید
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  // برای موبایل‌های مدرن بهتر است
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
  // اگر از [locale] در مسیر استفاده می‌کنی → params اضافه شود
  // params?: { locale?: string };
}


export default async function RootLayout({
  children,
  params,
}: RootLayoutProps & { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const messages = await getMessages();

  const gaId = process.env.NEXT_PUBLIC_GA_ID;


  const direction = locale === "fa" || locale === "ar" ? "rtl" : "ltr";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zeteb",
    "url": process.env.BETTER_AUTH_URL,
    "logo": `${process.env.BETTER_AUTH_URL}/favicon.ico`,
  };

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>

      {gaId && <GoogleAnalytics gaId={gaId} />}

      <head>
        <JsonLd data={organizationSchema} />
        <meta charSet="utf-8" />
        {/* theme-color بهتر است در viewport مدیریت شود – اما می‌توانی نگه داری */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#111111" media="(prefers-color-scheme: dark)" />

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        {/* پیشنهاد: اضافه کردن preconnect برای فونت اگر از CDN بود */}
        {/* <link rel="preconnect" href="https://fonts..." /> */}
      </head>

      <body className="antialiased min-h-screen flex flex-col">
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <Toaster richColors position="top-center" />
            {children}
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}