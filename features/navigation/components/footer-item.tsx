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

export const FooterItem = ({ icon, label, href, isActive, badge, className }: FooterItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col items-center gap-1 rounded-xl px-2.5 py-2 transition-colors duration-300",
        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <div className="relative h-6 w-6 shrink-0">
        <span className={cn(icon, "h-6 w-6 block", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
        {badge ? (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black h-[17px] min-w-[17px] px-1 rounded-full flex items-center justify-center border border-background">
            {badge > 9 ? "+9" : badge}
          </span>
        ) : null}
      </div>

      <span className={cn("text-[9px] font-medium transition-colors duration-300", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}>
        {label}
      </span>
    </Link>
  );
};
