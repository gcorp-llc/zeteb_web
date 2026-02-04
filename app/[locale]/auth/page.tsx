import { AuthContainer } from "@/features/auth/components/auth-container";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Auth" });

  return {
    title: t("title"),
  };
}

export default async function AuthPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4 bg-slate-50/50 dark:bg-slate-950/50">
      <AuthContainer />
    </div>
  );
}
