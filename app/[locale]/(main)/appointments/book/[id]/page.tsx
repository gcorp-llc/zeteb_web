"use client";

import { PageContainer } from "@/components/page-container";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export default function AppointmentBookingPage({ params }: { params: { id: string } }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const timeSlots = [
    "۰۹:۰۰", "۰۹:۳۰", "۱۰:۰۰", "۱۰:۳۰", "۱۱:۰۰", "۱۱:۳۰",
    "۱۶:۰۰", "۱۶:۳۰", "۱۷:۰۰", "۱۷:۳۰", "۱۸:۰۰", "۱۸:۳۰"
  ];

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto space-y-8 pb-20">

        {/* Doctor Summary */}
        <div className="glass-card !p-6 flex items-center gap-6">
           <Avatar className="h-20 w-20 rounded-2xl ring-4 ring-primary/10">
              <AvatarImage src="/favicon.png" />
              <AvatarFallback>JD</AvatarFallback>
           </Avatar>
           <div>
              <h2 className="text-2xl font-black">دکتر حسین افتخارراد</h2>
              <p className="text-sm font-bold text-muted-foreground">متخصص داخلی و جراح</p>
              <div className="flex gap-2 mt-2">
                 <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black">نوبت‌دهی آنلاین</Badge>
                 <Badge className="bg-green-500/10 text-green-500 border-none text-[10px] font-black">فعال</Badge>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Date Picker */}
           <div className="glass-card !p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                 <span className="icon-[solar--calendar-bold-duotone] text-primary" />
                 انتخاب تاریخ نوبت
              </h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-2xl border border-white/10 mx-auto"
                dir="rtl"
              />
           </div>

           {/* Time Slots */}
           <div className="glass-card !p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                 <span className="icon-[solar--clock-circle-bold-duotone] text-primary" />
                 انتخاب ساعت (تاریخ: {date?.toLocaleDateString('fa-IR')})
              </h3>
              <div className="grid grid-cols-3 gap-3">
                 {timeSlots.map((slot) => (
                   <button
                     key={slot}
                     onClick={() => setSelectedSlot(slot)}
                     className={`py-3 rounded-xl border text-sm font-black transition-all ${selectedSlot === slot ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "border-white/10 hover:bg-white/5"}`}
                   >
                     {slot}
                   </button>
                 ))}
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-bold">هزینه ویزیت:</span>
                    <span className="font-black text-foreground">۱۵۰,۰۰۰ تومان</span>
                 </div>
                 <Button
                   disabled={!selectedSlot}
                   className="w-full h-12 !rounded-2xl bg-ios-gradient font-black shadow-lg shadow-primary/20"
                 >
                    تایید و پرداخت
                 </Button>
                 <p className="text-[10px] text-center text-muted-foreground">با کلیک بر روی تایید، شما قوانین زتب را می‌پذیرید.</p>
              </div>
           </div>
        </div>

      </div>
    </PageContainer>
  );
}
