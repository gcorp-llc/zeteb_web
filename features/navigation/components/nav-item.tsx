"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: string;
  label: string;
  href: string;
  isActive: boolean;
  badge?: number;
  className?: string;
}

export const NavItem = ({ icon, label, href, isActive, badge, className }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors duration-300",
        "text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActive && "text-primary",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <div className="relative h-7 w-7 shrink-0">
        <span className={cn(icon, "h-7 w-7 block", isActive ? "text-primary" : "text-current")} />
        {badge ? (
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border border-background">
            {badge > 9 ? "+9" : badge}
          </span>
        ) : null}
      </div>
      <span className={cn("text-[10px] font-medium leading-none", isActive ? "text-primary" : "text-current")}>{label}</span>
    </Link>
  );
};
