"use client";

import { PageContainer } from "@/components/page-container";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function AppointmentsPage() {
  const t = useTranslations("Navbar");
  const [view, setView] = useState<"patient" | "doctor">("patient");

  const fetchAppointments = async ({ pageParam = 1 }) => {
    // شبیه‌سازی فراخوانی API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const baseData = [
      { id: 1, name: "دکتر مریم علوی", date: "۱۴۰۳/۰۲/۱۵", time: "۱۰:۳۰", status: "confirmed", specialty: "متخصص پوست" },
      { id: 2, name: "دکتر رضا محمدی", date: "۱۴۰۳/۰۲/۲۰", time: "۱۶:۰۰", status: "pending", specialty: "متخصص قلب" },
      { id: 3, name: "دکتر سارا احمدی", date: "۱۴۰۳/۰۱/۱۰", time: "۱۸:۱۵", status: "done", specialty: "متخصص کودکان" },
      { id: 4, name: "دکتر علی حسینی", date: "۱۴۰۳/۰۱/۰۵", time: "۰۹:۰۰", status: "canceled", specialty: "متخصص داخلی" },
    ];

    return {
      // ترکیب شماره صفحه با ID برای جلوگیری از کلید تکراری در اسکرول نامحدود
      appointments: baseData.map(apt => ({
        ...apt,
        id: `${pageParam}-${apt.id}` 
      })),
      nextPage: pageParam < 3 ? pageParam + 1 : undefined
    };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["appointments", view],
    queryFn: fetchAppointments,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  const appointments = data?.pages.flatMap(p => p.appointments) || [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed": return <Badge className="bg-green-500/10 text-green-600 border-none">تایید شده</Badge>;
      case "pending": return <Badge className="bg-yellow-500/10 text-yellow-600 border-none">در انتظار</Badge>;
      case "done": return <Badge className="bg-blue-500/10 text-blue-600 border-none">انجام شده</Badge>;
      case "canceled": return <Badge className="bg-red-500/10 text-red-600 border-none">لغو شده</Badge>;
      default: return null;
    }
  };

  return (
    <PageContainer title={t("appointments")}>
      <div className="max-w-4xl mx-auto space-y-8 pb-20">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/5 p-2 rounded-[2rem] glass">
           <button
             onClick={() => setView("patient")}
             className={`flex-1 py-3 px-6 rounded-2xl font-bold transition-all ${view === "patient" ? "bg-ios-gradient text-white shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
           >
             نوبت‌های من (بیمار)
           </button>
           <button
             onClick={() => setView("doctor")}
             className={`flex-1 py-3 px-6 rounded-2xl font-bold transition-all ${view === "doctor" ? "bg-ios-gradient text-white shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
           >
             مدیریت نوبت‌ها (پزشک)
           </button>
        </div>

        <div className="flex items-center justify-between">
           <h2 className="text-xl font-black">{view === "patient" ? "لیست نوبت‌های دریافتی" : "درخواست‌های نوبت‌دهی"}</h2>
           <Button variant="outline" className="!rounded-xl border-2 font-bold h-10">
             <span className="icon-[solar--filter-bold-duotone] w-5 h-5 ml-2" />
             فیلتر
           </Button>
        </div>

        <InfiniteScroll
          fetchNextPage={fetchNextPage}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appointments.map((apt) => (
              <div key={apt.id} className="glass-card flex flex-col gap-4 border-none shadow-lg hover:scale-[1.02] transition-transform">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-xl bg-ios-gradient flex items-center justify-center text-white font-black shrink-0">
                      {apt.name.split(" ").map((n: string) => n[0]).join("")}
                    </div>
                    <div>
                       <h4 className="font-bold">{apt.name}</h4>
                       <p className="text-xs text-muted-foreground">{apt.specialty}</p>
                    </div>
                  </div>
                  {getStatusBadge(apt.status)}
                </div>

                <div className="flex items-center gap-6 py-2 border-y border-border/30">
                   <div className="flex items-center gap-2">
                      <span className="icon-[solar--calendar-bold-duotone] w-5 h-5 text-primary" />
                      <span className="text-sm font-bold">{apt.date}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="icon-[solar--clock-circle-bold-duotone] w-5 h-5 text-primary" />
                      <span className="text-sm font-bold">{apt.time}</span>
                   </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" className="flex-1 !rounded-xl font-bold h-10">جزئیات</Button>
                  {apt.status === "pending" && (
                    <Button variant="outline" className="flex-1 !rounded-xl border-red-500/30 text-red-500 hover:bg-red-500/5 font-bold h-10">لغو نوبت</Button>
                  )}
                  {view === "doctor" && apt.status === "pending" && (
                    <Button className="flex-1 !rounded-xl bg-green-600 hover:bg-green-700 font-bold h-10">تایید</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </PageContainer>
  );
}