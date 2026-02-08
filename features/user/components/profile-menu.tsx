"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/features/auth/lib/auth-client";

export const ProfileMenu = () => {
  const { data: session } = authClient.useSession();
  const t = useTranslations("ProfileMenu");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex flex-col w-72 glass-nav !rounded-2xl overflow-hidden shadow-2xl animate-ios-in border border-white/20">
      {/* Header Profile */}
      <div className="p-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14 ring-2 ring-primary/20">
            <AvatarImage src={session?.user?.image || "/favicon.ico"} />
            <AvatarFallback className="bg-ios-gradient text-white font-black">
              {session?.user?.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-black text-foreground">{session?.user?.name || "کاربر زتب"}</span>
            <span className="text-[10px] text-muted-foreground truncate w-40">مشاهده و ویرایش پروفایل</span>
          </div>
        </div>
        <Link href="/profile">
           <Button variant="outline" className="w-full mt-3 h-8 !rounded-xl text-xs font-bold border-primary/30 text-primary hover:bg-primary/10">
             مشاهده پروفایل
           </Button>
        </Link>
      </div>

      {/* Account Section */}
      <div className="p-2 border-b border-white/10">
        <h3 className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t("account")}</h3>
        <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors group">
           <span className="icon-[solar--settings-bold-duotone] w-5 h-5 text-primary/70 group-hover:text-primary" />
           <span className="text-sm font-bold text-foreground/80">{t("settingsAndPrivacy")}</span>
        </Link>
        <Link href="/help" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors group">
           <span className="icon-[solar--help-bold-duotone] w-5 h-5 text-primary/70 group-hover:text-primary" />
           <span className="text-sm font-bold text-foreground/80">{t("help")}</span>
        </Link>
        <div className="px-3 py-2">
           <div className="flex items-center gap-3 mb-2">
              <span className="icon-[solar--global-bold-duotone] w-5 h-5 text-primary/70" />
              <span className="text-sm font-bold text-foreground/80">{t("language")}</span>
           </div>
           <div className="flex gap-2">
              <button
                onClick={() => handleLanguageChange("fa")}
                className={`flex-1 text-[10px] py-1 rounded-lg border transition-all ${locale === "fa" ? "bg-primary text-white border-primary" : "border-white/10 hover:bg-white/5"}`}
              >
                فارسی
              </button>
              <button
                onClick={() => handleLanguageChange("en")}
                className={`flex-1 text-[10px] py-1 rounded-lg border transition-all ${locale === "en" ? "bg-primary text-white border-primary" : "border-white/10 hover:bg-white/5"}`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange("ar")}
                className={`flex-1 text-[10px] py-1 rounded-lg border transition-all ${locale === "ar" ? "bg-primary text-white border-primary" : "border-white/10 hover:bg-white/5"}`}
              >
                العربية
              </button>
           </div>
        </div>
      </div>

      {/* Manage Section */}
      <div className="p-2 border-b border-white/10">
        <h3 className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t("manage")}</h3>
        <Link href="/posts" className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/5 transition-colors group">
           <div className="flex items-center gap-3">
              <span className="icon-[solar--posts-carousel-vertical-bold-duotone] w-5 h-5 text-primary/70 group-hover:text-primary" />
              <span className="text-sm font-bold text-foreground/80">{t("postsAndActivity")}</span>
           </div>
           <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded-md font-bold">12</span>
        </Link>
      </div>

      {/* Footer */}
      <div className="p-2">
        <button
          onClick={async () => {
            await authClient.signOut();
            router.push("/auth");
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-destructive/10 transition-colors group text-right"
        >
           <span className="icon-[solar--logout-bold-duotone] w-5 h-5 text-destructive/70 group-hover:text-destructive" />
           <span className="text-sm font-bold text-destructive/70 group-hover:text-destructive">{t("logout")}</span>
        </button>
      </div>
    </div>
  );
};
