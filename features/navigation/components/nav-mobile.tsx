"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export const NavMobile = () => {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const side = locale === "en" ? "left" : "right";

  const navItems = [
    {
      name: t("home"),
      href: "/",
      icon: "icon-[solar--home-smile-bold-duotone]",
    },
    {
      name: t("doctors"),
      href: "/doctors",
      icon: "icon-[solar--medical-kit-bold-duotone]",
    },
    {
      name: t("appointments"),
      href: "/appointments",
      icon: "icon-[solar--calendar-bold-duotone]",
    },
    {
      name: t("notifications"),
      href: "/notifications",
      icon: "icon-[solar--bell-bold-duotone]",
    },
    {
      name: t("messages"),
      href: "/messages",
      icon: "icon-[hugeicons--notification-square]",
    },
    {
      name: t("profile"),
      href: "/profile",
      icon: "icon-[solar--user-circle-bold-duotone]",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="btn btn-ghost lg:hidden p-2 rounded-lg hover:bg-white/20 transition-all duration-300 group">
          <span
            className="icon-[solar--hamburger-menu-bold-duotone] w-9 h-9 text-slate-500 transition-colors group-hover:text-slate-700"
            aria-hidden="true"
          ></span>
        </button>
      </SheetTrigger>

      <SheetContent
        side={side}
        className="w-80 glass !rounded-none p-0"
      >
        <SheetTitle className="sr-only">{t("menu")}</SheetTitle>

        <div className="flex h-full flex-col p-6">
          <div className="mb-8 px-2 text-3xl font-black tracking-tighter text-primary">
            ZETEB
          </div>

          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group"
                >
                  <span className={`${item.icon} w-7 h-7 text-primary/80 group-hover:text-primary transition-colors`}></span>
                  <span className="font-bold text-lg text-foreground/80 group-hover:text-foreground">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto border-t border-border/50 pt-6">
            <Link
              href="/logout"
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-destructive/10 transition-all group"
            >
              <span className="icon-[solar--logout-3-bold-duotone] w-7 h-7 text-destructive/70 group-hover:text-destructive"></span>
              <span className="font-bold text-lg text-destructive/70 group-hover:text-destructive">{t("logout")}</span>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};