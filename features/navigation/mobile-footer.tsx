"use client";

import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { FooterItem } from "./components/footer-item";

export function MobileFooter() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();

  const navItems = [
    { icon: "icon-[solar--home-2-bold]", label: t("home"), href: "/" },
    { icon: "icon-[solar--stethoscope-bold]", label: t("doctors"), href: "/doctors" },
    { icon: "icon-[solar--calendar-bold]", label: t("appointments"), href: "/appointments" },
    { icon: "icon-[solar--bell-bold]", label: t("notifications"), href: "/notifications", badge: 3 },
    { icon: "icon-[solar--chat-round-dots-bold]", label: t("messages"), href: "/messages", badge: 2 },
  ];

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
      <div className="glass animate-ios-in mx-auto max-w-sm flex items-center justify-around rounded-[2.5rem] py-2 px-4 shadow-2xl">
        {navItems.map((item) => (
          <FooterItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href}
            badge={item.badge}
            className="glass-item"
          />
        ))}
      </div>
    </div>
  );
}
