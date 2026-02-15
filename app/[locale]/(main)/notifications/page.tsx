"use client";

import { PageContainer } from "@/components/page-container";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function NotificationsPage() {
  const t = useTranslations("Navbar");

  const fetchNotifications = async ({ pageParam = 1 }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const baseNotifications = [
      { id: 1, type: "like", sender: "دکتر مریم علوی", content: "پست شما را پسندید: «روش‌های نوین جراحی داخلی»", time: "۲ ساعت پیش", image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=100", isRead: false },
      { id: 2, type: "follow_request", sender: "علی حسینی", content: "درخواست دنبال کردن شما را دارد", time: "۵ ساعت پیش", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100", isRead: false },
      { id: 3, type: "comment", sender: "سارا احمدی", content: "در پست شما نظر داد: «بسیار عالی و کاربردی بود دکتر عزیز، خسته نباشید.»", time: "۱ روز پیش", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100", isRead: true },
      { id: 4, type: "mention", sender: "بیمارستان آتیه", content: "شما را در یک پست یاد کرد", time: "۲ روز پیش", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=100", isRead: true },
      { id: 5, type: "system", sender: "تیم پشتیبانی", content: "پروفایل شما با موفقیت تایید شد. اکنون می‌توانید نوبت‌دهی آنلاین را فعال کنید.", time: "۳ روز پیش", image: "/favicon.png", isRead: true },
      { id: 6, type: "follow_accept", sender: "رضا محمدی", content: "درخواست شما را پذیرفت", time: "۴ روز پیش", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100", isRead: true },
      { id: 7, type: "unfollow", sender: "ناشناس", content: "شما را آنفالو کرد", time: "۵ روز پیش", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100", isRead: true },
    ];

    return {
      notifications: baseNotifications.map(n => ({
        ...n,
        id: `${pageParam}-${n.id}`
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
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  const notifications = data?.pages.flatMap(p => p.notifications) || [];

  return (
    <PageContainer title={t("notifications")}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 pb-20">

        {/* Sidebar */}
        <div className="hidden lg:block space-y-4">
           <div className="glass-card !p-4 space-y-4">
              <h3 className="font-black text-sm">مدیریت اعلان‌ها</h3>
              <div className="space-y-2">
                 <Button variant="ghost" className="w-full justify-start text-xs font-bold gap-2 hover:bg-white/5 text-primary">
                    <span className="icon-[solar--bell-bing-bold-duotone] w-4 h-4" />
                    تنظیمات اعلان
                 </Button>
              </div>
           </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card !p-2 flex gap-2 overflow-x-auto no-scrollbar">
             <Button variant="secondary" size="sm" className="bg-primary/10 text-primary !rounded-full text-[10px] font-black h-7 shrink-0">همه</Button>
             <Button variant="ghost" size="sm" className="!rounded-full text-[10px] font-bold h-7 shrink-0">خوانده نشده</Button>
             <Button variant="ghost" size="sm" className="!rounded-full text-[10px] font-bold h-7 shrink-0">پست‌های من</Button>
             <Button variant="ghost" size="sm" className="!rounded-full text-[10px] font-bold h-7 shrink-0">اشاره‌ها</Button>
          </div>

          <InfiniteScroll
            fetchNextPage={fetchNextPage}
            hasNextPage={!!hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          >
            <div className="space-y-0.5">
              {notifications.map((n) => (
                <div key={n.id} className={`glass-card !p-4 !rounded-none first:!rounded-t-3xl last:!rounded-b-3xl flex gap-4 items-start transition-all border-b border-white/5 last:border-0 ${!n.isRead ? "bg-primary/5" : "hover:bg-white/5"}`}>
                  <Avatar className="w-14 h-14 rounded-full border border-border/30 shrink-0">
                    <AvatarImage src={n.image} />
                    <AvatarFallback className="bg-ios-gradient text-white font-bold">{n.sender[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                       <p className="text-xs leading-relaxed text-foreground/90">
                          <span className="font-black text-foreground hover:text-primary hover:underline cursor-pointer">{n.sender}</span> {n.content}
                       </p>
                       <div className="flex flex-col items-end gap-2 shrink-0 ms-2">
                          <p className="text-[10px] text-muted-foreground font-medium">{n.time}</p>
                          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                            <span className="icon-[solar--menu-dots-bold] w-4 h-4" />
                          </Button>
                       </div>
                    </div>

                    {n.type === "follow_request" && (
                       <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-8 !rounded-full border-primary text-primary hover:bg-primary/10 text-[10px] font-black px-4">پذیرفتن</Button>
                          <Button variant="ghost" size="sm" className="h-8 !rounded-full text-muted-foreground hover:bg-white/5 text-[10px] font-bold px-4">رد کردن</Button>
                       </div>
                    )}
                  </div>
                  {!n.isRead && <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />}
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block space-y-4">
           <div className="glass-card !p-4">
              <p className="text-[10px] text-muted-foreground text-center">تبلیغات</p>
              <div className="mt-4 aspect-[4/3] rounded-2xl bg-muted/20 border border-dashed border-border/50 flex flex-col items-center justify-center gap-2">
                 <span className="icon-[solar--ranking-bold-duotone] w-8 h-8 text-muted-foreground/50" />
                 <p className="text-[10px] font-bold text-muted-foreground">مشاهده آمار بازدید</p>
              </div>
           </div>
        </div>

      </div>
    </PageContainer>
  );
}