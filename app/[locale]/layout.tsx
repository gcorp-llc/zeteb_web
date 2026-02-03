import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import { Navbar } from "@/features/navigation/navbar";
import { MobileFooter } from "@/features/navigation/mobile-footer";
import { JsonLd } from "@/features/seo/components/json-ld";

// تعریف فونت بدنه
const shabnam = localFont({
  src: "../../public/fonts/Shabnam.woff2",
  variable: "--font-body",
  weight: "400",
  display: "swap",
});

// تعریف فونت عنوان‌ها
const shabnamBold = localFont({
  src: "../../public/fonts/Shabnam-Bold-FD-WOL.woff2",
  variable: "--font-heading",
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zeteb",
  description: "Your application description",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

interface RootLayoutProps {
  children: React.ReactNode;
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
        <meta name="theme-color" content="#eee" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body
        className={`${shabnam.variable} ${shabnamBold.variable} antialiased `}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <MobileFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
