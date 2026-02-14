"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { PostItem } from "@/features/posts/components/post-item";

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
      <div className="space-y-4">
        {allArticles.map((article) => (
          <PostItem key={article.id} post={article} />
        ))}
      </div>
    </InfiniteScroll>
  );
}
