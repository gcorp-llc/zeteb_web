"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavItemProps {
  icon: string;
  label: string;
  href: string;
  isActive: boolean;
  badge?: number;
  className?: string;
  avatar?: boolean;
}

export const NavItem = ({ icon, label, href, isActive, badge, className, avatar }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col items-center gap-1",
        "px-3 py-2 rounded-xl",
        "transition-all duration-300",
        "text-foreground/80 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive && "text-primary",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <div className="relative h-7 w-7 shrink-0 transition-colors duration-300">
        {avatar ? (
          <Avatar className={cn("h-7 w-7 border border-border/60", isActive && "border-primary/60") }>
            <AvatarImage src="/favicon.png" />
            <AvatarFallback className="text-[10px] font-bold">U</AvatarFallback>
          </Avatar>
        ) : (
          <span
            className={cn(
              icon,
              "h-7 w-7 block",
              isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
            )}
          />
        )}
        {badge ? (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black h-5 min-w-5 px-1 rounded-full flex items-center justify-center border-2 border-background">
            {badge > 9 ? "+9" : badge}
          </span>
        ) : null}
      </div>

      <span
        className={cn(
          "text-[10px] md:text-[11px] font-medium transition-colors duration-300",
          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
        )}
      >
        {label}
      </span>
    </Link>
  );
};
