"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const t = useTranslations("Settings");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black">تنظیمات حساب کاربری</h1>
        <p className="text-muted-foreground font-medium">مدیریت زبان، زمان و مکان شما</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-2">
           <Button variant="secondary" className="w-full justify-start gap-3 !rounded-2xl font-bold bg-primary/10 text-primary">
              <span className="icon-[solar--global-bold-duotone] w-5 h-5" />
              زبان و منطقه
           </Button>
           <Button variant="ghost" className="w-full justify-start gap-3 !rounded-2xl font-bold">
              <span className="icon-[solar--lock-password-bold-duotone] w-5 h-5" />
              امنیت
           </Button>
           <Button variant="ghost" className="w-full justify-start gap-3 !rounded-2xl font-bold">
              <span className="icon-[solar--bell-bold-duotone] w-5 h-5" />
              اعلان‌ها
           </Button>
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-6">
           <div className="glass-card space-y-6">
              <div className="space-y-4">
                 <h2 className="text-xl font-black border-b border-white/10 pb-4">زبان نمایش سایت</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => handleLanguageChange("fa")}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${locale === "fa" ? "border-primary bg-primary/5" : "border-white/10 hover:bg-white/5"}`}
                    >
                      <span className="text-2xl">🇮🇷</span>
                      <span className="font-bold">فارسی</span>
                    </button>
                    <button
                      onClick={() => handleLanguageChange("en")}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${locale === "en" ? "border-primary bg-primary/5" : "border-white/10 hover:bg-white/5"}`}
                    >
                      <span className="text-2xl">🇺🇸</span>
                      <span className="font-bold">English</span>
                    </button>
                    <button
                      onClick={() => handleLanguageChange("ar")}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${locale === "ar" ? "border-primary bg-primary/5" : "border-white/10 hover:bg-white/5"}`}
                    >
                      <span className="text-2xl">🇸🇦</span>
                      <span className="font-bold">العربية</span>
                    </button>
                 </div>
              </div>

              <div className="space-y-4 pt-6">
                 <h2 className="text-xl font-black border-b border-white/10 pb-4">منطقه زمانی و مکان</h2>
                 <div className="space-y-4">
                    <div className="space-y-2 text-right">
                       <Label>منطقه زمانی</Label>
                       <Input defaultValue="(GMT+03:30) Tehran" className="text-right" />
                    </div>
                    <div className="space-y-2 text-right">
                       <Label>موقعیت مکانی</Label>
                       <Input defaultValue="Tehran, Iran" className="text-right" />
                    </div>
                 </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-white/10">
                 <Button className="bg-ios-gradient px-8 rounded-2xl font-black">ذخیره تغییرات</Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
