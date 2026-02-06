"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface FooterItemProps {
  icon: string; // کلاس iconify برای آیکون‌های Solar/Iconify
  label: string;
  href: string;
  isActive: boolean;
  badge?: number;
  className?: string; // برای اضافه کردن کلاس‌های خارجی مثل glass-item
}

export const FooterItem = ({
  icon,
  label,
  href,
  isActive,
  badge,
  className,
}: FooterItemProps) => {
  return (
<Link
  href={href}
  className={cn(
    "nav-item-base",  // ← کلاس پایه جدید جایگزین لیست کلاس‌های inline
    isActive && "nav-item-active",  // ← حالت شرطی
    className  // ← برای glass-item یا کلاس‌های دیگر
  )}
  aria-current={isActive ? "page" : undefined}
>
      {/* لایه پس‌زمینه شیشه‌ای متحرک برای hover/active */}
      <span
        className={cn(
          "absolute inset-0 rounded-xl bg-white/6 dark:bg-white/10",
          "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-105",
          "transition-all duration-500 ease-out",
          isActive && "opacity-60 scale-100"
        )}
        aria-hidden="true"
      />

      {/* آیکون */}
      <div className="relative h-6 w-6 shrink-0 transition-all duration-400">
        <span
          className={cn(
            icon,
            "h-6 w-6 block",
            "group-hover:scale-110 group-hover:drop-shadow-sm",
            isActive
              ? "scale-110 drop-shadow-[0_0_8px_rgba(var(--primary),0.4)] text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        />
        {badge ? (
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] font-black h-3.5 w-3.5 rounded-full flex items-center justify-center border border-background animate-pulse">
            {badge > 9 ? "+9" : badge}
          </span>
        ) : null}
      </div>

      {/* متن زیر آیکون */}
      <span
        className={cn(
          "text-[9px] font-medium tracking-tight transition-all duration-400", // فونت کوچکتر برای موبایل
          "group-hover:opacity-100 group-hover:font-semibold",
          isActive
            ? "opacity-100 font-bold text-primary"
            : "opacity-60 text-muted-foreground"
        )}
      >
        {label}
      </span>

      {/* نشانگر فعال بودن – خط کوچک زیر آیتم (iOS-like برای footer) */}
      {isActive && (
        <span
          className={cn(
            "absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2",
            "bg-primary rounded-full",
            "animate-in fade-in zoom-in-50 duration-300"
          )}
        />
      )}
    </Link>
  );
};