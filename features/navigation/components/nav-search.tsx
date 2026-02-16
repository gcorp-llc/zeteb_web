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
        className="w-full h-11 ps-10 rounded-full border-none bg-muted/30 focus:bg-muted/50 placeholder:text-foreground/40 focus:ring-2 focus:ring-primary/20 transition-all shadow-none"
      />
    </div>
  );
};