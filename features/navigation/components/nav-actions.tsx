// src/components/shared/navbar/components/nav-actions.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavUserProfileCard } from "@/features/user/components/nav-user-profile-card";
import Image from "next/image";

export const NavActions = () => {
  return (
    <div className="flex items-center gap-2 rtl:space-x-reverse">
      
  
      {/* پروفایل دسکتاپ */}
      <div className="hidden lg:block">
        <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer p-1 pr-3 pl-1 rounded-xl hover:bg-white/20 transition-all select-none border border-transparent hover:border-white/20">
                    
                    <Avatar className="h-10 w-10 ring-2 ring-purple-500/30">
                        <AvatarImage src="/favicon.png" />
                        <AvatarFallback>HE</AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 mt-2 bg-white/80 backdrop-blur-xl border-white/40">
           <NavUserProfileCard/>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* آواتار موبایل (فقط دایره عکس) */}
      <div className="block lg:hidden">
        <div className="w-10 h-10 rounded-full ring-2 ring-purple-500 overflow-hidden p-0.5">
          <Image
            src="/favicon.png"
            alt="Profile"
            width={40}
            height={40}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

    </div>
  );
};