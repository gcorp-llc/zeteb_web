"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export const NavUserProfileCard = () => {
  const t = useTranslations("UserProfileCard");

  const features = [
    { name: t("features.batch"), active: true },
    { name: t("features.ai"), active: true },
    { name: t("features.cloud"), active: false },
    { name: t("features.realtime"), active: false },
  ];

  return (
    <div className="relative p-6 w-full max-w-md mx-auto overflow-hidden transition-all duration-300 shadow-xl card bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 hover:shadow-2xl group">
      <div className="p-6 md:p-8 card-body">
        {/* برچسب محبوبیت (Badge) با همان چرخش و استایل بلید */}
        <div className="absolute top-0 left-0 -mt-3 -ml-3 z-10">
          <Badge className="p-3 text-sm font-extrabold shadow-md bg-warning text-warning-foreground rounded-xl transform -rotate-3 border-none">
            {t("trending")}
          </Badge>
        </div>

        {/* بخش قیمت و عنوان */}
        <div className="flex flex-col gap-2 pt-4">
          <h2 className="text-4xl font-extrabold text-primary drop-shadow-sm">
            {t("premium")}
          </h2>
          <div className="flex items-end text-slate-800 dark:text-white gap-1">
            <span className="text-5xl font-black">۲۹</span>
            <span className="text-xl font-medium opacity-70 pb-1">
              {t("perMonth")}
            </span>
          </div>
        </div>

        {/* جداکننده */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/20"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-slate-500 font-bold">
              {t("featuresAndAccess")}
            </span>
          </div>
        </div>

        {/* لیست ویژگی‌ها */}
        <ul className="flex flex-col gap-4 text-base font-medium">
          {features.map((feature, index) => (
            <li 
              key={index} 
              className={cn(
                "flex items-center gap-3 transition-colors",
                feature.active ? "text-slate-800 dark:text-slate-100" : "text-slate-400 opacity-60"
              )}
            >
              {feature.active ? (
                <span className="icon-[solar--check-circle-bold-duotone] w-6 h-6 text-success flex-shrink-0" />
              ) : (
                <span className="icon-[solar--close-circle-bold-duotone] w-6 h-6 text-error flex-shrink-0" />
              )}
              <span className={cn(!feature.active && "line-through")}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>

        {/* دکمه فراخوان (CTA) با همان استایل گرادینت نوبار */}
        <div className="mt-8">
          <Button className="w-full h-14 text-lg font-black rounded-2xl bg-zeteb-gradient hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-95 border-t border-white/30 shadow-lg text-white">
            {t("selectPlan")}
          </Button>
        </div>

      </div>

      {/* افکت نوری پس‌زمینه برای زیباتر شدن حالت شیشه‌ای */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full"></div>
    </div>
  );
};