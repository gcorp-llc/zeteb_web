"use client";

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
    { icon: "icon-[solar--home-smile-angle-broken]", label: t("home"), href: "/" },
    { icon: "icon-[solar--medical-kit-broken]", label: t("doctors"), href: "/doctors" },
    { icon: "icon-[solar--calendar-broken]", label: t("appointments"), href: "/appointments" },
    { icon: "icon-[solar--bell-broken]", label: t("notifications"), href: "/notifications", badge: 3 },
    { icon: "icon-[solar--chat-round-dots-broken]", label: t("messages"), href: "/messages", badge: 2 },
    { icon: "", label: t("profile"), href: "/profile", avatar: true },
  ];

  return (
    <nav className="glass-nav animate-ios-in sticky top-4 z-50 mx-4 rounded-[2rem]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-5 flex-1 lg:flex-none">
            <NavLogo />
            <div className="hidden lg:block w-px h-8 bg-white/15 dark:bg-white/10 mx-3" />
            <div className="hidden lg:flex lg:items-center lg:gap-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  className="glass-item"
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  isActive={pathname === item.href}
                  badge={item.badge}
                  avatar={item.avatar}
                />
              ))}
            </div>
          </div>

          <div className="hidden md:block flex-1 max-w-xl lg:max-w-2xl mx-2 lg:mx-6">
            <NavSearch />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <NavActions />
          </div>
        </div>
      </div>
    </nav>
  );
};
