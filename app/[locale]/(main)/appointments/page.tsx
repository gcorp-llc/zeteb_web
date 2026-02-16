"use client";

import { PageContainer } from "@/components/page-container";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AppointmentsPage() {
  const t = useTranslations("Appointments");
  const [view, setView] = useState<"booked" | "requests">("booked");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchAppointments = async ({ pageParam = 1 }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data
    const bookedData = [
      { id: 1, name: "دکتر مریم علوی", date: "۱۴۰۳/۰۲/۱۵", time: "۱۰:۳۰", status: "confirmed", specialty: "متخصص پوست" },
      { id: 2, name: "دکتر رضا محمدی", date: "۱۴۰۳/۰۲/۲۰", time: "۱۶:۰۰", status: "pending", specialty: "متخصص قلب" },
    ];

    const requestData = [
      { id: 101, name: "سعید کریمی", date: "۱۴۰۳/۰۲/۲۵", time: "۰۹:۰۰", status: "pending", specialty: "بیمار" },
      { id: 102, name: "نازنین زهرا", date: "۱۴۰۳/۰۲/۲۶", time: "۱۱:۳۰", status: "pending", specialty: "بیمار" },
    ];

    const baseData = view === "booked" ? bookedData : requestData;

    return {
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
      case "confirmed": return <Badge className="bg-green-500/10 text-green-600 border-none font-black text-[10px]">{t("confirmed")}</Badge>;
      case "pending": return <Badge className="bg-yellow-500/10 text-yellow-600 border-none font-black text-[10px]">{t("pending")}</Badge>;
      case "done": return <Badge className="bg-blue-500/10 text-blue-600 border-none font-black text-[10px]">{t("done")}</Badge>;
      case "canceled": return <Badge className="bg-red-500/10 text-red-600 border-none font-black text-[10px]">{t("canceled")}</Badge>;
      default: return null;
    }
  };

  const SidebarContent = () => (
    <div className="space-y-4">
      <div className="glass-card !p-4 space-y-4">
        <h3 className="font-black text-sm">{t("manage")}</h3>
        <div className="space-y-2">
          <Button
            variant={view === "booked" ? "secondary" : "ghost"}
            onClick={() => { setView("booked"); setIsSidebarOpen(false); }}
            className={cn("w-full justify-start text-xs font-bold gap-2 hover:bg-white/5", view === "booked" && "text-primary bg-primary/10")}
          >
            <span className="icon-[solar--calendar-add-bold-duotone] w-4 h-4" />
            {t("booked")}
          </Button>
          <Button
            variant={view === "requests" ? "secondary" : "ghost"}
            onClick={() => { setView("requests"); setIsSidebarOpen(false); }}
            className={cn("w-full justify-start text-xs font-bold gap-2 hover:bg-white/5", view === "requests" && "text-primary bg-primary/10")}
          >
            <span className="icon-[solar--user-plus-bold-duotone] w-4 h-4" />
            {t("requests")}
          </Button>
        </div>
      </div>

      <div className="glass-card !p-4">
        <p className="text-[10px] text-muted-foreground text-center">{t("ads")}</p>
        <div className="mt-4 aspect-[4/3] rounded-2xl bg-muted/20 border border-dashed border-border/50 flex flex-col items-center justify-center gap-2">
           <span className="icon-[solar--ranking-bold-duotone] w-8 h-8 text-muted-foreground/50" />
           <p className="text-[10px] font-bold text-muted-foreground">{t("upgrade")}</p>
        </div>
      </div>
    </div>
  );

  return (
    <PageContainer >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 pb-20">

        <div className="hidden lg:block">
           <SidebarContent />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-2 items-center">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden shrink-0"
              onClick={() => setIsSidebarOpen(true)}
            >
              <span className="icon-[solar--hamburger-menu-broken] w-6 h-6" />
            </Button>
            <div className="relative flex-1">
              <span className="icon-[solar--magnifer-broken] absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("searchPlaceholder")}
                className="ps-10 h-12 bg-card border-none !rounded-2xl shadow-sm"
              />
            </div>
            <Button variant="outline" size="icon" className="h-12 w-12 !rounded-2xl border-none bg-card shadow-sm">
              <span className="icon-[solar--filter-bold-duotone] w-5 h-5 text-muted-foreground" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
             <h2 className="text-xl font-black">{view === "booked" ? t("booked") : t("requests")}</h2>
          </div>

          <InfiniteScroll
            fetchNextPage={fetchNextPage}
            hasNextPage={!!hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          >
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div key={apt.id} className="glass-card flex flex-col gap-4 !p-5 hover:border-primary/30 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-ios-gradient flex items-center justify-center text-white font-black shrink-0 shadow-lg">
                        {apt.name.split(" ").map((n: string) => n[0]).join("")}
                      </div>
                      <div className="space-y-1">
                         <h4 className="font-bold text-base">{apt.name}</h4>
                         <p className="text-xs text-muted-foreground">{apt.specialty}</p>
                      </div>
                    </div>

                    <DropdownMenu dir="rtl">
                      <DropdownMenuTrigger asChild>
                        <button className="outline-none">
                          {getStatusBadge(apt.status)}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-card !p-1 min-w-[120px]">
                        <DropdownMenuItem className="text-[10px] font-bold rounded-lg cursor-pointer gap-2" onClick={() => {}}>
                           <div className="w-2 h-2 rounded-full bg-green-500" />
                           {t("confirmed")}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-[10px] font-bold rounded-lg cursor-pointer gap-2" onClick={() => {}}>
                           <div className="w-2 h-2 rounded-full bg-blue-500" />
                           {t("done")}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-[10px] font-bold rounded-lg cursor-pointer gap-2 text-destructive" onClick={() => {}}>
                           <div className="w-2 h-2 rounded-full bg-destructive" />
                           {t("canceled")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3 border-y border-border/30">
                     <div className="flex items-center gap-2">
                        <span className="icon-[solar--calendar-bold-duotone] w-5 h-5 text-primary" />
                        <span className="text-sm font-bold">{apt.date}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="icon-[solar--clock-circle-bold-duotone] w-5 h-5 text-primary" />
                        <span className="text-sm font-bold">{apt.time}</span>
                     </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="secondary" className="flex-1 !rounded-xl font-bold h-11 bg-muted/40">{t("details")}</Button>
                    {view === "booked" && (
                      <Button variant="ghost" className="flex-1 !rounded-xl text-destructive hover:bg-destructive/5 font-bold h-11">{t("cancel")}</Button>
                    )}
                    {view === "requests" && (
                      <>
                        <Button variant="ghost" className="flex-1 !rounded-xl text-destructive hover:bg-destructive/5 font-bold h-11">{t("cancel")}</Button>
                        <Button className="flex-1 !rounded-xl bg-primary hover:bg-primary/90 font-bold h-11 shadow-lg shadow-primary/20">{t("confirm")}</Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>

        <div className="hidden lg:block space-y-4">
           <div className="glass-card !p-4">
              <p className="text-[10px] text-muted-foreground text-center">{t("specialOffer")}</p>
              <div className="mt-4 aspect-square rounded-2xl bg-ios-gradient p-6 flex flex-col items-center justify-center text-center gap-3">
                 <span className="icon-[solar--shield-check-bold] w-12 h-12 text-white" />
                 <p className="text-sm font-black text-white">{t("adminPanel")}</p>
                 <Button size="sm" className="bg-white text-primary hover:bg-white/90 rounded-full font-bold px-6">{t("learnMore")}</Button>
              </div>
           </div>
        </div>

      </div>

      <ResponsiveModal open={isSidebarOpen} onOpenChange={setIsSidebarOpen} title={t("menu")}>
          <div className="pb-10">
            <SidebarContent />
          </div>
      </ResponsiveModal>
    </PageContainer>
  );
}
