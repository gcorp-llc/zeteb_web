"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: string; // کلاس iconify
  label: string;
  href: string;
  isActive: boolean;
  badge?: number;
  className?: string; // برای اضافه کردن کلاس‌های خارجی مثل glass-item
}

export const NavItem = ({
  icon,
  label,
  href,
  isActive,
  badge,
  className,
}: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        // پایه glassmorphism + هماهنگی با تم قبلی
        "group relative flex flex-col items-center gap-1.5",
        "px-4 py-2.5 rounded-xl",
        "transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        "text-foreground/80 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive && "text-primary font-semibold",
        // اضافه کردن کلاس خارجی (معمولاً glass-item)
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {/* پس‌زمینه متحرک هنگام hover / active – لایه شیشه‌ای ظریف */}
      <span
        className={cn(
          "absolute inset-0 rounded-xl bg-white/5 dark:bg-white/8",
          "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-105",
          "transition-all duration-500 ease-out",
          isActive && "opacity-70 scale-100"
        )}
        aria-hidden="true"
      />

      {/* آیکون */}
      <div className="relative h-7 w-7 shrink-0 transition-all duration-400">
        <span
          className={cn(
            icon,
            "h-7 w-7 block",
            "group-hover:scale-110 group-hover:drop-shadow-md",
            isActive
              ? "scale-110 drop-shadow-[0_0_10px_rgba(var(--primary),0.45)] text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        />
        {badge ? (
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border-2 border-background animate-pulse">
            {badge > 9 ? "+9" : badge}
          </span>
        ) : null}
      </div>

      {/* متن زیر آیکون */}
      <span
        className={cn(
          "text-[10px] md:text-xs font-medium tracking-tight transition-all duration-400",
          "group-hover:opacity-100 group-hover:font-semibold",
          isActive
            ? "opacity-100 font-bold text-primary"
            : "opacity-70 text-muted-foreground"
        )}
      >
        {label}
      </span>

      {/* نشانگر فعال بودن – خط کوچک زیر آیتم (iOS-like) */}
      {isActive && (
        <span
          className={cn(
            "absolute bottom-1.5 left-1/2 h-1 w-5 -translate-x-1/2",
            "bg-primary rounded-full",
            "animate-in fade-in zoom-in-50 duration-300"
          )}
        />
      )}
    </Link>
  );
};