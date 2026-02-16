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
            <div className="space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className={`bg-card border border-border/50 p-5 rounded-2xl flex gap-4 items-start transition-all group ${!n.isRead ? "border-l-4 border-l-primary" : "hover:border-border"}`}>
                  <div className="relative">
                    <Avatar className="w-16 h-16 rounded-full border-2 border-background shrink-0">
                        <AvatarImage src={n.image} />
                        <AvatarFallback className="bg-ios-gradient text-white font-bold">{n.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background border border-border/50 flex items-center justify-center">
                        {n.type === "like" && <span className="icon-[solar--heart-bold] w-3.5 h-3.5 text-red-500" />}
                        {n.type === "comment" && <span className="icon-[solar--chat-line-bold] w-3.5 h-3.5 text-primary" />}
                        {n.type === "follow_request" && <span className="icon-[solar--user-plus-bold] w-3.5 h-3.5 text-orange-500" />}
                        {n.type === "system" && <span className="icon-[solar--verified-check-bold] w-3.5 h-3.5 text-blue-500" />}
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start gap-4">
                       <div className="space-y-1">
                          <p className="text-sm leading-relaxed">
                            <span className="font-black text-foreground hover:text-primary transition-colors cursor-pointer">{n.sender}</span>
                            <span className="text-muted-foreground mx-1">•</span>
                            <span className="text-foreground/80">{n.content}</span>
                          </p>
                          <p className="text-[11px] text-muted-foreground">{n.time}</p>
                       </div>
                       <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="icon-[solar--menu-dots-bold] w-4 h-4" />
                       </Button>
                    </div>

                    {n.type === "follow_request" && (
                       <div className="flex gap-2 pt-1">
                          <Button size="sm" className="h-9 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold px-6">پذیرفتن نوبت</Button>
                          <Button variant="outline" size="sm" className="h-9 rounded-xl text-muted-foreground hover:bg-muted text-xs font-bold px-6">رد کردن</Button>
                       </div>
                    )}
                  </div>
                  {!n.isRead && <div className="w-2.5 h-2.5 bg-primary rounded-full mt-2 shrink-0 animate-pulse" />}
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