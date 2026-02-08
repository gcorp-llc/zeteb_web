"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { Textarea } from "@/components/ui/textarea";

export function CreatePost() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-card !p-4 mb-4">
      <div className="flex gap-3">
        <Avatar className="h-12 w-12 shrink-0">
          <AvatarImage src="/favicon.ico" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <button
          onClick={() => setIsOpen(true)}
          className="flex-1 text-right px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-muted-foreground text-sm font-medium"
        >
          شروع به نوشتن یک پست کنید...
        </button>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
        <Button variant="ghost" size="sm" className="gap-2 rounded-xl font-bold">
           <span className="icon-[solar--gallery-bold-duotone] w-5 h-5 text-primary" />
           رسانه
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 rounded-xl font-bold">
           <span className="icon-[solar--calendar-bold-duotone] w-5 h-5 text-orange-500" />
           رویداد
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 rounded-xl font-bold">
           <span className="icon-[solar--document-bold-duotone] w-5 h-5 text-emerald-500" />
           نوشتن مقاله
        </Button>
      </div>

      <ResponsiveModal title="ایجاد پست" open={isOpen} onOpenChange={setIsOpen}>
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/favicon.ico" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-black text-sm">حسین افتخارراد</p>
                <p className="text-[10px] text-muted-foreground font-bold">انتشار عمومی</p>
              </div>
           </div>
           <Textarea
             placeholder="در مورد چه چیزی می خواهید صحبت کنید؟"
             className="text-right min-h-[200px] border-none focus-visible:ring-0 text-lg"
           />
           <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <div className="flex gap-2">
                 <Button variant="ghost" size="icon" className="rounded-full">
                    <span className="icon-[solar--gallery-bold-duotone] w-6 h-6 text-muted-foreground" />
                 </Button>
                 <Button variant="ghost" size="icon" className="rounded-full">
                    <span className="icon-[solar--smile-square-bold-duotone] w-6 h-6 text-muted-foreground" />
                 </Button>
              </div>
              <Button className="bg-ios-gradient px-8 rounded-full font-bold">انتشار</Button>
           </div>
        </div>
      </ResponsiveModal>
    </div>
  );
}
