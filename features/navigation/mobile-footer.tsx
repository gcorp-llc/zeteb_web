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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 md:hidden">
      {/* استفاده از bg-zeteb-gradient برای ست شدن با نوبار 
          و border-white/30 برای جدا شدن از پس‌زمینه
      */}
      <div className="mx-auto max-w-lg flex items-center justify-around rounded-full border border-white/30 bg-zeteb-gradient py-2 shadow-2xl backdrop-blur-2xl">
        {navItems.map((item) => (
          <FooterItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href}
          />
        ))}
      </div>
    </div>
  );
};