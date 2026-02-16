"use client";

import { PageContainer } from "@/components/page-container";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CreatePost } from "@/features/posts/components/create-post";
import { PostItem } from "@/features/posts/components/post-item";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function PostsPage() {
  const t = useTranslations("HomePage");
  const tPost = useTranslations("PostItem");
  const [filter, setFilter] = useState("posts");

  const fetchPosts = async ({ pageParam = 1 }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const basePosts = [
      { id: "1", content: "بسیار خرسندم که اعلام کنم تیم ما موفق به کسب رتبه برتر در جشنواره سلامت دیجیتال شد.", image_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800", time: "۲ ساعت پیش", author: { name: "دکتر مریم علوی", role: "متخصص پوست", image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=100" } },
      { id: "2", content: "امروز در مورد اهمیت چک‌آپ‌های دوره‌ای صحبت کردیم. سلامت شما اولویت ماست.", image_url: null, time: "۵ ساعت پیش", author: { name: "دکتر مریم علوی", role: "متخصص پوست", image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=100" } },
    ];

    return {
      posts: basePosts.map(p => ({
        ...p,
        id: `${pageParam}-${p.id}`
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
    queryKey: ["my-posts", filter],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  const posts = data?.pages.flatMap(p => p.posts) || [];

  const filters = [
    { id: "posts", label: tPost("posts"), icon: "icon-[solar--document-bold-duotone]" },
    { id: "comments", label: tPost("comments"), icon: "icon-[solar--chat-line-bold-duotone]" },
    { id: "reposts", label: tPost("reposts"), icon: "icon-[solar--repeat-bold-duotone]" },
    { id: "likes", label: tPost("likes"), icon: "icon-[solar--heart-bold-duotone]" },
  ];

  return (
    <PageContainer >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 pb-20">

        {/* Left Sidebar - Filters */}
        <div className="hidden lg:block space-y-4">
           <div className="glass-card !p-4 space-y-4">
              <h3 className="font-black text-sm">{t("myActivities")}</h3>
              <div className="space-y-2">
                 {filters.map((f) => (
                    <Button
                      key={f.id}
                      variant={filter === f.id ? "secondary" : "ghost"}
                      onClick={() => setFilter(f.id)}
                      className={cn("w-full justify-start text-xs font-bold gap-2 hover:bg-white/5", filter === f.id && "text-primary bg-primary/10")}
                    >
                       <span className={cn(f.icon, "w-4 h-4")} />
                       {f.label}
                    </Button>
                 ))}
              </div>
           </div>
        </div>

        {/* Main Content - Feed */}
        <div className="lg:col-span-2 space-y-6">
          <CreatePost />

          {/* Mobile Filter Scroll */}
          <div className="lg:hidden glass-card !p-2 flex gap-2 overflow-x-auto no-scrollbar">
             {filters.map((f) => (
                <Button
                  key={f.id}
                  variant={filter === f.id ? "secondary" : "ghost"}
                  onClick={() => setFilter(f.id)}
                  size="sm"
                  className={cn("!rounded-full text-[10px] font-black h-7 shrink-0", filter === f.id && "bg-primary/10 text-primary")}
                >
                  {f.label}
                </Button>
             ))}
          </div>

          <InfiniteScroll
            fetchNextPage={fetchNextPage}
            hasNextPage={!!hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          >
            <div className="space-y-4">
              {posts.map((post) => (
                <PostItem key={post.id} post={post} />
              ))}
            </div>
          </InfiniteScroll>
        </div>

        {/* Right Sidebar - Ads/Stats */}
        <div className="hidden lg:block space-y-4">
           <div className="glass-card !p-4">
              <p className="text-[10px] text-muted-foreground text-center">{t("ads")}</p>
              <div className="mt-4 aspect-[4/3] rounded-2xl bg-muted/20 border border-dashed border-border/50 flex flex-col items-center justify-center gap-2">
                 <span className="icon-[solar--ranking-bold-duotone] w-8 h-8 text-muted-foreground/50" />
                 <p className="text-[10px] font-bold text-muted-foreground">{t("viewStats")}</p>
              </div>
           </div>
        </div>

      </div>
    </PageContainer>
  );
}
