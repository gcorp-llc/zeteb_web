"use client";

import { useTranslations, useLocale } from "next-intl";
import { PageContainer } from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const t = useTranslations("Navbar");
  const tp = useTranslations("ProfilePage");
  const tl = useTranslations("Languages");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("تغییرات با موفقیت ذخیره شد");
    }, 1500);
  };

  return (
    <PageContainer title={tp("editProfile")}>
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Language Section */}
        <section className="glass-card space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="icon-[solar--globus-bold-duotone] text-primary w-6 h-6" />
            زبان برنامه
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {["fa", "en", "ar"].map((l) => (
              <Button
                key={l}
                variant={locale === l ? "default" : "outline"}
                className={`!rounded-2xl h-12 font-bold ${locale === l ? "bg-ios-gradient" : "border-2"}`}
                onClick={() => handleLanguageChange(l)}
              >
                {tl(l as any)}
              </Button>
            ))}
          </div>
        </section>

        {/* Profile Edit Form */}
        <section className="glass-card space-y-8">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="icon-[solar--user-id-bold-duotone] text-primary w-6 h-6" />
            ویرایش مشخصات
          </h3>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">{tp("firstName")}</Label>
                <Input id="firstName" defaultValue="حسین" className="!rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{tp("lastName")}</Label>
                <Input id="lastName" defaultValue="افتخارراد" className="!rounded-xl" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">عنوان تخصص (مشابه لینکدین)</Label>
              <Input id="role" defaultValue="متخصص داخلی و جراح" className="!rounded-xl" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">درباره من</Label>
              <Textarea
                id="bio"
                defaultValue="بیش از ۱۰ سال سابقه در درمان بیماری‌های داخلی و مدیریت سلامت بیماران. مشاور ارشد در بیمارستان‌های تراز اول."
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">موقعیت مکانی</Label>
              <Input id="location" defaultValue="تهران، ایران" className="!rounded-xl" />
            </div>

            <div className="pt-4">
              <Button type="submit" disabled={loading} className="w-full !rounded-2xl h-14 bg-ios-gradient text-lg font-black shadow-lg shadow-primary/20">
                {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </PageContainer>
  );
}
