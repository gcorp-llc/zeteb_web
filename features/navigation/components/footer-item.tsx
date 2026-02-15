"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface FooterItemProps {
  icon: string;
  label: string;
  href: string;
  isActive: boolean;
  badge?: number;
  className?: string;
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
      className={cn("nav-item-base", isActive && "nav-item-active", className)}
      aria-current={isActive ? "page" : undefined}
    >
      <span
        className={cn(
          "absolute inset-0 rounded-xl bg-white/6 dark:bg-white/10",
          "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-105",
          "transition-all duration-500 ease-out",
          isActive && "opacity-60 scale-100"
        )}
        aria-hidden="true"
      />

      <div className="relative h-7 w-7 shrink-0 transition-all duration-400">
        <span
          className={cn(
            icon,
            "h-7 w-7 block",
            "group-hover:scale-110 group-hover:drop-shadow-sm",
            isActive
              ? "scale-110 drop-shadow-[0_0_8px_rgba(var(--primary),0.4)] text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        />
        {badge ? (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black h-[18px] min-w-[18px] px-1 rounded-full flex items-center justify-center border border-background">
            {badge > 9 ? "+9" : badge}
          </span>
        ) : null}
      </div>

      <span
        className={cn(
          "text-[9px] font-semibold tracking-tight transition-all duration-400",
          "group-hover:opacity-100",
          isActive
            ? "opacity-100 font-bold text-primary"
            : "opacity-70 text-muted-foreground"
        )}
      >
        {label}
      </span>

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
