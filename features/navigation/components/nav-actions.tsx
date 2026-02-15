"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProfileMenu } from "@/features/user/components/profile-menu";
import { usePathname } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { SearchModal } from "./search-modal";

export const NavActions = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setProfileOpen(false);
  }, [pathname]);

  return (
    <div className="flex items-center gap-2 rtl:space-x-reverse">
      <button onClick={() => setSearchOpen(true)} className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors">
        <span className="icon-[solar--magnifer-bold-duotone] w-6 h-6 text-foreground/70" />
      </button>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />

      <DropdownMenu dir="rtl" open={profileOpen} onOpenChange={setProfileOpen}>
        <DropdownMenuTrigger asChild>
          <button className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-foreground/80 hover:text-foreground">
            <span className="icon-[solar--user-circle-bold-duotone] w-8 h-8" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto mt-2 bg-transparent border-none shadow-none p-0 overflow-visible" align="end">
          <ProfileMenu onNavigate={() => setProfileOpen(false)} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
