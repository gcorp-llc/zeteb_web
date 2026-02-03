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
      name: t("videos"),
      href: "/videos",
      icon: "icon-[solar--videocamera-record-bold-duotone]",
    },
    {
      name: t("appointments"),
      href: "/appointments",
      icon: "icon-[solar--calendar-bold-duotone]",
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
        className="w-80 border-l border-white/20 bg-white/10 p-0 backdrop-blur-2xl dark:bg-slate-900/50"
      >
        <SheetTitle className="sr-only">{t("menu")}</SheetTitle>

        <div className="flex h-full flex-col p-4 text-white">
          <div className="mb-6 px-2 text-2xl font-black tracking-tighter text-white drop-shadow-md">
            ZETEB MENU
          </div>

          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 transition-all text-white/90 hover:text-white hover:shadow-lg"
                >
                  <span className={`${item.icon} w-6 h-6`}></span>
                  <span className="font-bold">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto border-t border-white/20 pt-4">
            <Link
              href="/logout"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/20 transition-all text-white/80 hover:text-red-300"
            >
              <span className="icon-[solar--logout-3-bold-duotone] w-6 h-6"></span>
              <span className="font-bold">{t("logout")}</span>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};