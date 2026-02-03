"use client";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: string; // تغییر از LucideIcon به string برای کلاس‌های Iconify
  label: string;
  href: string;
  isActive: boolean;
}

export const NavItem = ({ icon, label, href, isActive }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center gap-1 transition-all duration-300 px-3 py-1 rounded-2xl w-full",
        isActive 
          ? "text-primary scale-105" 
          : "text-slate-500 hover:text-slate-800"
      )}
    >
      {/* نمایش آیکون Solar با استفاده از کلاس */}
      <span 
        className={cn(
          icon,
          "h-7 w-7 transition-all", 
          isActive && "drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]"
        )} 
      />
      <span className={cn(
        "text-[10px] transition-all",
        isActive ? "font-black opacity-100" : "font-medium opacity-70"
      )}>
        {label}
      </span>
    </Link>
  );
};