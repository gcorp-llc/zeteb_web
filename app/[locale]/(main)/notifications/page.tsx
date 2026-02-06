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
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      notifications: [
        { id: 1, type: "like", sender: "دکتر مریم علوی", content: "پست شما را پسندید", time: "۲ ساعت پیش", image: "MA", isRead: false },
        { id: 2, type: "follow", sender: "علی حسینی", content: "شما را دنبال کرد", time: "۵ ساعت پیش", image: "AH", isRead: true },
        { id: 3, type: "comment", sender: "سارا احمدی", content: "در پست شما نظر داد: عالی بود دکتر!", time: "۱ روز پیش", image: "SA", isRead: true },
      ],
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
      <div className="max-w-2xl mx-auto space-y-4 pb-20">
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl font-black">اعلان‌های اخیر</h2>
           <Button variant="ghost" className="text-primary font-bold text-sm">علامت‌گذاری همه به عنوان خوانده شده</Button>
        </div>

        <InfiniteScroll
          fetchNextPage={fetchNextPage}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className={`glass-card !p-4 flex gap-4 items-center transition-all ${!n.isRead ? "border-primary/30 bg-primary/5" : ""}`}>
                <Avatar className="w-12 h-12 rounded-xl">
                  <AvatarFallback className="bg-ios-gradient text-white font-bold">{n.image}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">
                    <span className="font-bold">{n.sender}</span> {n.content}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{n.time}</p>
                </div>
                {!n.isRead && <div className="w-2 h-2 bg-primary rounded-full" />}
                <Button variant="ghost" size="icon" className="rounded-full">
                  <span className="icon-[solar--menu-dots-bold] w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </PageContainer>
  );
}
