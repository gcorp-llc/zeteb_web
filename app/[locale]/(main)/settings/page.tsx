"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const locale = useLocale();
  const t = useTranslations("Settings");
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("account");
  const isScrollingRef = useRef(false);

  const sections = [
    { key: "account", label: t("account"), icon: "icon-[solar--user-id-bold-duotone]" },
    { key: "privacy", label: t("privacy"), icon: "icon-[solar--shield-user-bold-duotone]" },
    { key: "notifications", label: t("notifications"), icon: "icon-[solar--bell-bold-duotone]" },
    { key: "appearance", label: t("appearance"), icon: "icon-[solar--monitor-bold-duotone]" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.key);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const scrollToSection = (key: string) => {
    setActiveSection(key);
    isScrollingRef.current = true;
    const el = document.getElementById(key);
    if (el) {
      const offset = 100; // Offset for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black">{t("title")}</h1>
        <p className="text-muted-foreground font-medium">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="space-y-2 sticky top-24 h-fit">
          {sections.map((section) => (
            <Button
              key={section.key}
              onClick={() => scrollToSection(section.key)}
              variant={activeSection === section.key ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 !rounded-2xl font-bold transition-all",
                activeSection === section.key ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}
            >
              <span className={`${section.icon} w-5 h-5`} />
              {section.label}
            </Button>
          ))}
        </aside>

        <div className="md:col-span-3 glass-card space-y-16">
          <section id="account" className="space-y-4 scroll-mt-24">
            <h2 className="text-xl font-black border-b border-white/10 pb-4">{t("language")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                ["fa", "🇮🇷", "فارسی"],
                ["en", "🇺🇸", "English"],
                ["ar", "🇸🇦", "العربية"],
              ].map(([code, flag, label]) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={cn(
                    "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                    locale === code ? "border-primary bg-primary/5" : "border-white/10 hover:bg-white/5"
                  )}
                >
                  <span className="text-2xl">{flag}</span>
                  <span className="font-bold">{label}</span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 text-start">
                <Label>{t("displayName")}</Label>
                <Input defaultValue="کاربر زتب" className="text-start" />
              </div>
              <div className="space-y-2 text-start">
                <Label>{t("email")}</Label>
                <Input defaultValue="user@zeteb.com" className="text-start" />
              </div>
              <div className="space-y-2 text-start">
                <Label>{t("timezone")}</Label>
                <Input defaultValue="(GMT+03:30) Tehran" className="text-start" />
              </div>
              <div className="space-y-2 text-start">
                <Label>{t("location")}</Label>
                <Input defaultValue="Tehran, Iran" className="text-start" />
              </div>
            </div>
          </section>

          <section id="privacy" className="space-y-4 scroll-mt-24">
            <h2 className="text-xl font-black border-b border-white/10 pb-4">{t("privacy")}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border/40">
                <div>
                  <p className="font-bold">{t("onlineStatus")}</p>
                  <p className="text-xs text-muted-foreground">{t("onlineStatusDesc")}</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border/40">
                <div>
                  <p className="font-bold">{t("twoFactor")}</p>
                  <p className="text-xs text-muted-foreground">{t("twoFactorDesc")}</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border/40">
                <div>
                  <p className="font-bold">{t("showEmail")}</p>
                  <p className="text-xs text-muted-foreground">{t("showEmailDesc")}</p>
                </div>
                <Switch />
              </div>
            </div>
          </section>

          <section id="notifications" className="space-y-4 scroll-mt-24">
            <h2 className="text-xl font-black border-b border-white/10 pb-4">{t("notifications")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: t("notifLikeComment"), checked: true },
                { label: t("notifMessages"), checked: true },
                { label: t("notifJobs"), checked: false },
                { label: t("notifWeekly"), checked: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border/40">
                  <span className="text-sm font-semibold">{item.label}</span>
                  <Switch defaultChecked={item.checked} />
                </div>
              ))}
            </div>
          </section>

          <section id="appearance" className="space-y-4 scroll-mt-24">
            <h2 className="text-xl font-black border-b border-white/10 pb-4">{t("appearance")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 text-start">
                <Label>{t("fontSize")}</Label>
                <Input defaultValue="متوسط (پیش‌فرض)" className="text-start" />
              </div>
              <div className="space-y-2 text-start">
                <Label>{t("displayDensity")}</Label>
                <Input defaultValue="استاندارد" className="text-start" />
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Button variant="outline" className="rounded-2xl font-bold">{t("reset")}</Button>
            <Button className="bg-ios-gradient px-8 rounded-2xl font-black">{t("save")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
