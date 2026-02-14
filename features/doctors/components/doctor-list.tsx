"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  location: string;
  nextAvailable: string;
}

export function DoctorList({ initialDoctors }: { initialDoctors: Doctor[] }) {
  const t = useTranslations("HomePage");

  const fetchDoctors = async ({ pageParam = 1 }) => {
    // In a real scenario, this would call /api/proxy/doctors
    // For now we simulate the API call
    // const res = await fetch(`/api/proxy/doctors?page=${pageParam}`);
    // return res.json();

    // Simulating delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mocking more data
    return {
      doctors: initialDoctors.map(d => ({ ...d, id: d.id + pageParam * 100 })),
      nextPage: pageParam < 5 ? pageParam + 1 : undefined
    };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  const allDoctors = data?.pages.flatMap((page) => page.doctors) || initialDoctors;

  return (
    <InfiniteScroll
      fetchNextPage={fetchNextPage}
      hasNextPage={!!hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    >
      <div className="grid grid-cols-1 gap-6">
        {allDoctors.map((doc) => (
          <div key={doc.id} className="glass-card !p-0 overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div className="flex flex-col sm:flex-row">
              <div className="p-6 flex flex-1 gap-6">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl bg-ios-gradient flex items-center justify-center text-white text-3xl font-black shadow-lg">
                    {doc.image}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-background flex items-center justify-center" title="آنلاین">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{doc.name}</h3>
                    <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 px-2 py-1 rounded-lg">
                      <span className="icon-[solar--star-bold] w-4 h-4" />
                      <span className="font-bold text-sm">{doc.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground font-medium">{doc.specialty}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="icon-[solar--map-point-broken] w-4 h-4 text-primary" />
                      {doc.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="icon-[solar--chat-round-line-broken] w-4 h-4 text-primary" />
                      {doc.reviews} {t("reviews", { count: doc.reviews })}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Badge variant="secondary" className="bg-primary/5 text-primary border-none">نوبت‌دهی آنلاین</Badge>
                    <Badge variant="secondary" className="bg-green-500/5 text-green-600 border-none">مشاوره متنی</Badge>
                  </div>
                </div>
              </div>

              <div className="sm:w-64 bg-white/5 dark:bg-white/5 p-6 border-t sm:border-t-0 sm:border-r border-border/50 flex flex-col justify-between gap-4">
                <div className="space-y-1 text-center sm:text-right">
                  <p className="text-xs text-muted-foreground">{t("nextEmpty")}</p>
                  <p className="font-bold text-primary">{doc.nextAvailable}</p>
                </div>
                <Link href={`/appointments/book/${doc.id}`}>
                  <Button className="w-full !rounded-xl bg-ios-gradient shadow-lg shadow-primary/20 h-11">
                    {t("bookNow")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
