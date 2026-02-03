"use client";

import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export const NavSearch = () => {
  const t = useTranslations("Navbar");

  return (
    <div className="relative w-full group">
      <span className="absolute start-3 top-1/2 -translate-y-1/2 icon-[solar--magnifer-linear] w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors"></span>
      <Input
        type="text"
        placeholder={t("searchPlaceholder")}
        className="w-69 h-11 ps-10 rounded-4xl border-none bg-white/40 placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-primary/50 shadow-sm backdrop-blur-sm transition-all hover:bg-white/50"
      />
    </div>
  );
};