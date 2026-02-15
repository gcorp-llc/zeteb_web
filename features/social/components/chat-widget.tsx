"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

const mockChats = [
  { id: 1, name: "دکتر مریم علوی", message: "سلام، وقت بخیر. در مورد پرونده...", image: null, time: "۲ دقیقه پیش" },
  { id: 2, name: "حسین حسینی", message: "ممنون از راهنمایی شما.", image: null, time: "۱ ساعت پیش" },
  { id: 3, name: "سارا کریمی", message: "آیا فردا مطب باز هست؟", image: null, time: "دیروز" },
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-0 right-4 sm:right-8 z-[60] hidden md:block w-80">
      <div className="bg-card border border-border shadow-2xl rounded-t-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div
          className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 transition-colors border-b border-border"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/favicon.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-card rounded-full" />
            </div>
            <span className="font-bold text-sm">پیام‌ها</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-muted rounded-full transition-colors">
              <span className="icon-[solar--menu-dots-broken] w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-muted rounded-full transition-colors">
              <span className="icon-[solar--pen-broken] w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-muted rounded-full transition-colors">
              <span className={cn("icon-[solar--alt-arrow-up-broken] w-4 h-4 transition-transform", isOpen && "rotate-180")} />
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 400 }}
              exit={{ height: 0 }}
              className="overflow-hidden flex flex-col bg-card"
            >
              <div className="p-2">
                <div className="relative">
                  <span className="absolute start-3 top-1/2 -translate-y-1/2 icon-[solar--magnifer-broken] w-4 h-4 text-muted-foreground" />
                  <input
                    placeholder="جستجو در پیام‌ها"
                    className="w-full bg-muted/50 border-none rounded-md py-1.5 ps-9 text-xs focus:ring-1 focus:ring-primary/30 outline-none"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {mockChats.map((chat) => (
                  <div key={chat.id} className="flex gap-3 p-3 hover:bg-muted/30 cursor-pointer transition-colors border-b border-border/10">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-xs truncate">{chat.name}</h4>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">{chat.time}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate leading-relaxed">
                        {chat.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-border bg-muted/10">
                <Button className="w-full text-xs font-bold gap-2 rounded-lg" variant="ghost">
                  مشاهده همه در پیام‌رسان
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating New Chat Button as requested */}
      <div className="fixed bottom-4 right-4 sm:right-8 flex flex-col gap-2 pointer-events-none">
        <button className="w-12 h-12 bg-[#0a66c2] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#004182] transition-colors pointer-events-auto">
           <span className="icon-[hugeicons--notification-square] w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
