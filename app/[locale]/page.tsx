import { useTranslations ,  useLocale } from "next-intl";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const locales = ["en", "fa", "ar"];

  if (!locales.includes(locale)) {
    return {};
  }

  const t = await import(`../../locale/${locale}.json`);

  return {
    title: t.HomePage.title,
    description: `${t.HomePage.title} - ${t.Languages[locale]}`,
  };
}

export default function HomePage() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const ln = useTranslations("Languages");

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <div className="text-slate-600">
          {t("activeLanguage")}: {ln(locale)}
        </div>
      </div>
    </main>
  );
}