"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { authApi } from "@/features/auth/api";
import { useTheme } from "next-themes";

interface ProfileMenuProps {
  onNavigate?: () => void;
}

export const ProfileMenu = ({ onNavigate }: ProfileMenuProps) => {
  const { data: session } = authApi.getSession();
  const { theme, setTheme } = useTheme();
  const t = useTranslations("ProfileMenu");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    onNavigate?.();
    router.replace(pathname, { locale: newLocale });
  };

  const closeMenu = () => onNavigate?.();

  return (
    <div className="flex flex-col w-72 glass-nav !rounded-2xl overflow-hidden shadow-2xl animate-ios-in border border-white/20">
      <div className="p-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14 ring-2 ring-primary/20">
            <AvatarImage src={session?.user?.image || "/favicon.png"} />
            <AvatarFallback className="bg-ios-gradient text-white font-black">
              {session?.user?.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-black text-foreground">{session?.user?.name || t("guestUser")}</span>
            <span className="text-[10px] text-muted-foreground truncate w-40">{t("viewAndEditProfile")}</span>
          </div>
        </div>
        <Link href="/profile" onClick={closeMenu}>
          <Button variant="outline" className="w-full mt-3 h-8 !rounded-xl text-xs font-bold border-primary/30 text-primary hover:bg-primary/10">
            {t("viewProfile")}
          </Button>
        </Link>
      </div>

      <div className="p-2 border-b border-white/10">
        <h3 className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t("account")}</h3>
        <Link href="/settings" onClick={closeMenu} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors group">
          <span className="icon-[solar--settings-bold-duotone] w-5 h-5 text-primary/70 group-hover:text-primary" />
          <span className="text-sm font-bold text-foreground/80">{t("settingsAndPrivacy")}</span>
        </Link>
        <Link href="/help" onClick={closeMenu} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors group">
          <span className="icon-[solar--help-bold-duotone] w-5 h-5 text-primary/70 group-hover:text-primary" />
          <span className="text-sm font-bold text-foreground/80">{t("help")}</span>
        </Link>
        <Link href="/clinics/manage" onClick={closeMenu} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-primary/10 transition-colors group border border-primary/20 mt-1">
          <span className="icon-[solar--hospital-bold-duotone] w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-sm font-black text-primary">{t("manageClinics")}</span>
        </Link>
        <div className="px-3 py-2 space-y-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="icon-[solar--global-bold-duotone] w-5 h-5 text-primary/70" />
              <span className="text-sm font-bold text-foreground/80">{t("language")}</span>
            </div>
            <div className="flex gap-2">
              {[
                { code: "fa", label: "فارسی" },
                { code: "en", label: "English" },
                { code: "ar", label: "العربية" },
              ].map((item) => (
                <button
                  key={item.code}
                  onClick={() => handleLanguageChange(item.code)}
                  className={`flex-1 text-[10px] py-1.5 rounded-lg border transition-all font-bold ${locale === item.code ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "border-white/10 hover:bg-white/5"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="icon-[solar--moon-bold-duotone] w-5 h-5 text-primary/70" />
              <span className="text-sm font-bold text-foreground/80">{t("displayMode")}</span>
            </div>
            <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
              <button onClick={() => setTheme("light")} className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg transition-all text-[10px] font-bold ${theme === "light" ? "bg-white text-black shadow-sm" : "text-muted-foreground hover:bg-white/5"}`}><span className="icon-[solar--sun-bold-duotone] w-4 h-4" />{t("light")}</button>
              <button onClick={() => setTheme("dark")} className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg transition-all text-[10px] font-bold ${theme === "dark" ? "bg-slate-800 text-white shadow-sm" : "text-muted-foreground hover:bg-white/5"}`}><span className="icon-[solar--moon-bold-duotone] w-4 h-4" />{t("dark")}</button>
              <button onClick={() => setTheme("system")} className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg transition-all text-[10px] font-bold ${theme === "system" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5"}`}><span className="icon-[solar--monitor-bold-duotone] w-4 h-4" />{t("system")}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 border-b border-white/10">
        <h3 className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t("manage")}</h3>
        <Link href="/posts" onClick={closeMenu} className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/5 transition-colors group">
          <div className="flex items-center gap-3">
            <span className="icon-[solar--posts-carousel-vertical-bold-duotone] w-5 h-5 text-primary/70 group-hover:text-primary" />
            <span className="text-sm font-bold text-foreground/80">{t("postsAndActivity")}</span>
          </div>
          <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded-md font-bold">12</span>
        </Link>
        <Link href="/analytics" onClick={closeMenu} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors group">
          <span className="icon-[solar--chart-bold-duotone] w-5 h-5 text-primary/70 group-hover:text-primary" />
          <span className="text-sm font-bold text-foreground/80">{t("analytics")}</span>
        </Link>
        <Link href="/wallet" onClick={closeMenu} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors group">
          <span className="icon-[solar--wallet-money-bold-duotone] w-5 h-5 text-primary/70 group-hover:text-primary" />
          <span className="text-sm font-bold text-foreground/80">{t("wallet")}</span>
        </Link>
      </div>

      <div className="p-2">
        <button
          onClick={async () => {
            closeMenu();
            await authApi.signOut();
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
