// src/components/shared/navbar/components/nav-actions.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileMenu } from "@/features/user/components/profile-menu";
import Image from "next/image";
import { useState } from "react";
import { SearchModal } from "./search-modal";

export const NavActions = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 rtl:space-x-reverse">
      
      {/* Search Toggle (Optional for mobile) */}
      <button
        onClick={() => setSearchOpen(true)}
        className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <span className="icon-[solar--magnifer-bold-duotone] w-6 h-6 text-foreground/70" />
      </button>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
  
      {/* Desktop & Mobile Profile */}
      <div>
        <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer rounded-full p-0.5 ring-2 ring-primary/20 hover:ring-primary/40 transition-all select-none">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="/favicon.png" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto mt-2 bg-transparent border-none shadow-none p-0 overflow-visible" align="end">
              <ProfileMenu />
            </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </div>
  );
};