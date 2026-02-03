"use client";

import { NavMobile } from "./components/nav-mobile";
import { NavActions } from "./components/nav-actions";
import { NavSearch } from "./components/nav-search";
import { NavLogo } from "./components/nav-logo";
import { NavItem } from "./components/nav-item";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export const Navbar = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();

  const navItems = [
    {
      icon: "icon-[solar--home-smile-angle-broken]",
      label: t("home"),
      href: "/",
    },
    {
      icon: "icon-[solar--calendar-broken]",
      label: t("appointments"),
      href: "/appointments",
    },
    {
      icon: "icon-[solar--bell-broken]",
      label: t("notifications"),
      href: "/notifications",
    },
    {
      icon: "icon-[hugeicons--notification-square]",
      label: t("messages"),
      href: "/messages",
    },
    {
      icon: "icon-[solar--user-circle-broken]",
      label: t("profile"),
      href: "/profile",
    },
  ];
  return (
    <nav className="sticky top-0 z-50 m-2 rounded-2xl bg-zeteb-gradient shadow-md backdrop-blur-md border border-white/20">
      <div className="container mx-auto flex items-center justify-between p-2 gap-4">
        
        {/* بخش راست: منو، لوگو و لینک‌های اصلی */}
        <div className="flex items-center gap-4">
          <NavMobile />
          <NavLogo />
         
          {/* جداکننده عمودی کوچک (اختیاری برای زیبایی) */}
          <div className="hidden xl:block w-px h-6 bg-slate-300/50 mx-2" />
          
          {/* لینک‌های ناوبری دسکتاپ */}
           {navItems.map((item) => (
                    <NavItem
                      key={item.href}
                      icon={item.icon}
                      label={item.label}
                      href={item.href}
                      isActive={pathname === item.href}
                    />
                  ))}
          
        </div>

        {/* بخش وسط: جستجو */}
        <div className="hidden lg:block flex-1 max-w-md mx-2">
          
        </div>

        {/* بخش چپ: اکشن‌ها (پروفایل و اعلان) */}
        <div className="flex items-center">
           <NavSearch />
          <NavActions />
        </div>

      </div>
    </nav>
  );
};