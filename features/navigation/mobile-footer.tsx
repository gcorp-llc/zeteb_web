"use client";

import { usePathname } from "@/i18n/navigation";
import { FooterItem } from "./components/footer-item";
import { useTranslations } from "next-intl";

export const MobileFooter = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();

  const navItems = [
    {
      icon: "icon-[solar--home-smile-angle-broken]",
      label: t("home"),
      href: "/",
    },
    {
      icon: "icon-[solar--medical-kit-broken]",
      label: t("doctors"),
      href: "/doctors",
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
  ];

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
      <div
        className={`
          glass
          animate-ios-in
          mx-auto max-w-sm flex items-center justify-around
          rounded-[2.5rem] py-2 px-4
          shadow-2xl
        `}
      >
        {navItems.map((item) => (
          <FooterItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href}
            className="glass-item"  // هماهنگی با تم شیشه‌ای برای هر آیتم
          />
        ))}
      </div>
    </div>
  );
};