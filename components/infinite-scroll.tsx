"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollProps {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  children?: React.ReactNode;
  loadingComponent?: React.ReactNode;
}

export function InfiniteScroll({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  children,
  loadingComponent,
}: InfiniteScrollProps) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {children}
      <div ref={ref} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && (loadingComponent || <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />)}
      </div>
    </>
  );
}
