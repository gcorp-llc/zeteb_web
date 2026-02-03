"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { name: "خانه", href: "/", icon: "icon-[solar--home-smile-bold-duotone]" },
  { name: "ویدیوها", href: "/videos", icon: "icon-[solar--videocamera-record-bold-duotone]" },
  { name: "نوبت‌دهی", href: "/appointments", icon: "icon-[solar--calendar-bold-duotone]" },
];

export const NavLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="hidden xl:flex items-center gap-1">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300",
                "hover:bg-white/20 hover:shadow-sm group",
                isActive 
                  ? "text-primary font-bold bg-white/30 shadow-inner" 
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <span className={cn(link.icon, "w-6 h-6 transition-transform group-hover:scale-110")} />
              <span className="text-sm font-bold">{link.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};