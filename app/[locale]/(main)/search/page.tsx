"use client";

import { PageContainer } from "@/components/page-container";
import { useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = [
    { id: 1, type: "doctor", name: "دکتر حسین افتخارراد", specialty: "متخصص داخلی و جراح", location: "تهران، جردن", image: "/favicon.png", rating: 4.8 },
    { id: 2, type: "doctor", name: "دکتر سارا علوی", specialty: "متخصص قلب و عروق", location: "تهران، سعادت آباد", image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=100", rating: 4.9 },
    { id: 3, type: "article", title: "روش‌های نوین در جراحی‌های غیر تهاجمی", author: "دکتر مهران صادقی", date: "۲ روز پیش", views: 1240 },
  ];

  return (
    <PageContainer >
      <div className="max-w-4xl mx-auto space-y-6 pb-20">
        <div className="flex items-center justify-between">
           <h2 className="text-xl font-black">نتایج یافت شده</h2>
           <div className="flex gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary !rounded-full px-4 h-7 font-black">همه</Badge>
              <Badge variant="outline" className="!rounded-full px-4 h-7 font-bold border-white/10">پزشکان</Badge>
              <Badge variant="outline" className="!rounded-full px-4 h-7 font-bold border-white/10">مقالات</Badge>
           </div>
        </div>

        <div className="space-y-4">
           {results.map((item) => (
             <div key={item.id} className="glass-card !p-6 flex flex-col md:flex-row gap-6 hover:bg-white/5 transition-colors cursor-pointer group">
                {item.type === 'doctor' ? (
                  <>
                    <Avatar className="h-24 w-24 rounded-2xl ring-2 ring-primary/20">
                       <AvatarImage src={item.image} />
                       <AvatarFallback className="bg-ios-gradient text-white font-black">{item.name?.[0] || "D"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                       <div className="flex justify-between items-start">
                          <div>
                             <h3 className="text-lg font-black group-hover:text-primary transition-colors">{item.name}</h3>
                             <p className="text-sm font-bold text-muted-foreground">{item.specialty}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-lg">
                             <span className="icon-[solar--star-bold] w-4 h-4" />
                             <span className="text-xs font-black">{item.rating}</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                             <span className="icon-[solar--map-point-bold-duotone] w-4 h-4 text-primary" />
                             {item.location}
                          </div>
                          <div className="flex items-center gap-1">
                             <span className="icon-[solar--calendar-bold-duotone] w-4 h-4 text-primary" />
                             اولین نوبت خالی: فردا ۱۰:۳۰
                          </div>
                       </div>
                       <div className="pt-2 flex gap-3">
                          <Link href={`/appointments/book/${item.id}`}>
                             <Button className="h-9 !rounded-xl text-xs font-black px-6">دریافت نوبت</Button>
                          </Link>
                          <Button variant="outline" className="h-9 !rounded-xl text-xs font-bold border-primary/20 text-primary">مشاهده پروفایل</Button>
                       </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 space-y-3">
                     <div className="flex items-center gap-2">
                        <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-none rounded-lg text-[10px] font-black">مقاله آموزشی</Badge>
                        <span className="text-[10px] text-muted-foreground font-bold">{item.date}</span>
                     </div>
                     <h3 className="text-lg font-black group-hover:text-primary transition-colors">{item.title}</h3>
                     <div className="flex items-center gap-3">
                        <p className="text-xs font-bold text-muted-foreground">نویسنده: <span className="text-foreground">{item.author}</span></p>
                        <span className="text-muted-foreground">•</span>
                        <p className="text-xs font-bold text-muted-foreground">{item.views} بازدید</p>
                     </div>
                  </div>
                )}
             </div>
           ))}
        </div>
      </div>
    </PageContainer>
  );
}
