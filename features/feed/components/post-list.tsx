"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface Author {
  name: string;
  role: string;
  image: string;
}

interface Article {
  id: number;
  author: Author;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  time: string;
}

export function PostList({ initialArticles }: { initialArticles: Article[] }) {
  const t = useTranslations("HomePage");

  const fetchPosts = async ({ pageParam = 1 }) => {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      articles: initialArticles.map(a => ({ ...a, id: a.id + pageParam * 1000 })),
      nextPage: pageParam < 3 ? pageParam + 1 : undefined
    };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  const allArticles = data?.pages.flatMap((page) => page.articles) || initialArticles;

  return (
    <InfiniteScroll
      fetchNextPage={fetchNextPage}
      hasNextPage={!!hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    >
      <div className="space-y-6">
        {allArticles.map((article, index) => (
          <div key={article.id} className="glass-card !p-0 overflow-hidden animate-ios-in" style={{ animationDelay: `${(index % 5) * 150}ms` }}>
            <div className="p-4 flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-ios-gradient flex items-center justify-center text-white font-black shrink-0 shadow-lg">
                {article.author.image}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm leading-none mb-1">{article.author.name}</h4>
                <p className="text-xs text-muted-foreground">{article.author.role}</p>
                <p className="text-[10px] text-muted-foreground/60">{article.time}</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <span className="icon-[solar--menu-dots-bold] w-5 h-5" />
              </Button>
            </div>
            <div className="px-4 pb-4">
              <p className="text-sm leading-relaxed mb-4 text-foreground/90">{article.content}</p>
              {article.image && (
                <div className="rounded-2xl overflow-hidden border border-border/30 shadow-sm">
                  <img src={article.image} alt="article" className="w-full h-auto object-cover" />
                </div>
              )}
            </div>
            <div className="px-4 py-2 flex items-center justify-between text-xs text-muted-foreground border-b border-border/30">
               <div className="flex items-center gap-1">
                  <span className="icon-[solar--heart-bold] text-red-500 w-4 h-4" />
                  <span>{article.likes}</span>
               </div>
               <div className="flex gap-3">
                  <span>{article.comments} نظر</span>
                  <span>۷ اشتراک</span>
               </div>
            </div>
            <div className="flex justify-around p-1">
               <Button variant="ghost" className="flex-1 flex items-center gap-2 font-bold text-muted-foreground h-10 hover:text-primary">
                  <span className="icon-[solar--heart-broken] w-5 h-5" />
                  <span>{t("like")}</span>
               </Button>
               <Button variant="ghost" className="flex-1 flex items-center gap-2 font-bold text-muted-foreground h-10 hover:text-primary">
                  <span className="icon-[solar--chat-round-line-broken] w-5 h-5" />
                  <span>{t("comment")}</span>
               </Button>
               <Button variant="ghost" className="flex-1 flex items-center gap-2 font-bold text-muted-foreground h-10 hover:text-primary">
                  <span className="icon-[solar--share-broken] w-5 h-5" />
                  <span>{t("share")}</span>
               </Button>
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
