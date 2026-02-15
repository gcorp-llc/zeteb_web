"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const sections = [
  { key: "account", label: "حساب کاربری", icon: "icon-[solar--user-id-bold-duotone]" },
  { key: "privacy", label: "حریم خصوصی و امنیت", icon: "icon-[solar--shield-user-bold-duotone]" },
  { key: "notifications", label: "اعلان‌ها", icon: "icon-[solar--bell-bold-duotone]" },
  { key: "appearance", label: "نمایش و دسترسی", icon: "icon-[solar--monitor-bold-duotone]" },
];

export default function SettingsPage() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("account");

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black">تنظیمات حساب کاربری</h1>
        <p className="text-muted-foreground font-medium">تنظیمات متداول شامل امنیت، اعلان‌ها، نمایش و حریم خصوصی را مدیریت کنید.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="space-y-2">
          {sections.map((section) => (
            <Button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              variant={activeSection === section.key ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 !rounded-2xl font-bold ${activeSection === section.key ? "bg-primary/10 text-primary" : ""}`}
            >
              <span className={`${section.icon} w-5 h-5`} />
              {section.label}
            </Button>
          ))}
        </aside>

        <div className="md:col-span-3 glass-card space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-black border-b border-white/10 pb-4">زبان، منطقه و اطلاعات پایه</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                ["fa", "🇮🇷", "فارسی"],
                ["en", "🇺🇸", "English"],
                ["ar", "🇸🇦", "العربية"],
              ].map(([code, flag, label]) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${locale === code ? "border-primary bg-primary/5" : "border-white/10 hover:bg-white/5"}`}
                >
                  <span className="text-2xl">{flag}</span>
                  <span className="font-bold">{label}</span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 text-right">
                <Label>نام نمایشی</Label>
                <Input defaultValue="کاربر زتب" className="text-right" />
              </div>
              <div className="space-y-2 text-right">
                <Label>ایمیل</Label>
                <Input defaultValue="user@zeteb.com" className="text-right" />
              </div>
              <div className="space-y-2 text-right">
                <Label>منطقه زمانی</Label>
                <Input defaultValue="(GMT+03:30) Tehran" className="text-right" />
              </div>
              <div className="space-y-2 text-right">
                <Label>موقعیت مکانی</Label>
                <Input defaultValue="Tehran, Iran" className="text-right" />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black border-b border-white/10 pb-4">حریم خصوصی و امنیت</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border/40">
                <div>
                  <p className="font-bold">نمایش وضعیت آنلاین</p>
                  <p className="text-xs text-muted-foreground">دوستان شما وضعیت آنلاین بودن‌تان را ببینند.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border/40">
                <div>
                  <p className="font-bold">تأیید دومرحله‌ای</p>
                  <p className="text-xs text-muted-foreground">برای ورود، کد امنیتی پیامک/ایمیل فعال شود.</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border/40">
                <div>
                  <p className="font-bold">نمایش ایمیل در پروفایل</p>
                  <p className="text-xs text-muted-foreground">فقط مخاطبین مستقیم ایمیل شما را ببینند.</p>
                </div>
                <Switch />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black border-b border-white/10 pb-4">اعلان‌ها</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "اعلان لایک و کامنت",
                "اعلان پیام‌های مستقیم",
                "اعلان فرصت‌های شغلی/همکاری",
                "خلاصه هفتگی ایمیلی",
              ].map((item, i) => (
                <div key={item} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border/40">
                  <span className="text-sm font-semibold">{item}</span>
                  <Switch defaultChecked={i < 2} />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black border-b border-white/10 pb-4">نمایش و دسترسی</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 text-right">
                <Label>اندازه فونت</Label>
                <Input defaultValue="متوسط (پیش‌فرض)" className="text-right" />
              </div>
              <div className="space-y-2 text-right">
                <Label>تراکم نمایش محتوا</Label>
                <Input defaultValue="استاندارد" className="text-right" />
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Button variant="outline" className="rounded-2xl font-bold">بازنشانی پیش‌فرض</Button>
            <Button className="bg-ios-gradient px-8 rounded-2xl font-black">ذخیره تغییرات</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
