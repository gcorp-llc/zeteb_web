"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NavLogo } from "@/features/navigation/components/nav-logo";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-white/5 border-t border-border/50 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <NavLogo />
          <p className="text-sm text-muted-foreground">
            {t("description")}
          </p>
          <p className="text-xs font-black text-primary/50">#DrManhattan</p>
        </div>

        <div>
          <h4 className="font-bold mb-4">{t("quickLinks")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/doctors" className="hover:text-primary transition-colors">{t("findDoctor")}</Link></li>
            <li><Link href="/clinics/manage" className="hover:text-primary transition-colors">{t("registerClinic")}</Link></li>
            <li><Link href="/analytics" className="hover:text-primary transition-colors">{t("analytics")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">{t("support")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/help" className="hover:text-primary transition-colors">{t("helpCenter")}</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">{t("contactUs")}</Link></li>
            <li><Link href="/faq" className="hover:text-primary transition-colors">{t("faq")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">{t("legal")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/terms" className="hover:text-primary transition-colors">{t("terms")}</Link></li>
            <li><Link href="/privacy" className="hover:text-primary transition-colors">{t("privacy")}</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border/30 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} {t("copyright")}</p>
      </div>
    </footer>
  );
}
