import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  return {
    title: t("title"),
  };
}

export default function HomePage() {
  const t = useTranslations("HomePage");
  const tNav = useTranslations("Navbar");

  const doctors = [
    { name: "دکتر مریم علوی", specialty: "متخصص پوست و مو", rating: 4.8, reviews: 120, image: "MA" },
    { name: "دکتر رضا محمدی", specialty: "متخصص قلب و عروق", rating: 4.9, reviews: 85, image: "RM" },
    { name: "دکتر سارا احمدی", specialty: "متخصص کودکان", rating: 4.7, reviews: 150, image: "SA" },
  ];

  const articles = [
    {
      id: 1,
      author: { name: "دکتر رضا محمدی", role: "متخصص قلب و عروق", image: "RM" },
      content: "ورزش منظم و تغذیه سالم دو رکن اصلی برای داشتن قلبی سالم هستند. تحقیقات جدید نشان می‌دهد که حتی روزانه ۲۰ دقیقه پیاده‌روی سریع می‌تواند خطر ابتلا به بیماری‌های قلبی را تا ۳۰ درصد کاهش دهد. #سلامت_قلب #پیشگیری",
      image: "https://images.unsplash.com/photo-1505751172107-5739a00723a5?auto=format&fit=crop&q=80&w=800",
      likes: 124,
      comments: 18,
      time: "۲ ساعت پیش"
    },
    {
      id: 2,
      author: { name: "دکتر مریم علوی", role: "متخصص پوست و مو", image: "MA" },
      content: "با شروع فصل سرما، مراقبت از پوست اهمیت دوچندانی پیدا می‌کند. استفاده از مرطوب‌کننده‌های حاوی هیالورونیک اسید و ضدآفتاب (حتی در روزهای ابری) را فراموش نکنید. پوست شما در زمستان به آبرسانی بیشتری نیاز دارد. #پوست_و_مو #زمستانه",
      likes: 89,
      comments: 12,
      time: "۵ ساعت پیش"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Sidebar - Profile Summary */}
        <aside className="lg:col-span-3 space-y-4 hidden lg:block">
          <div className="glass-card !p-0 overflow-hidden">
            <div className="h-16 bg-ios-gradient" />
            <div className="px-6 pb-6 text-center">
              <div className="relative -mt-8 mb-4 flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 p-1 shadow-lg">
                  <div className="w-full h-full rounded-xl bg-ios-gradient flex items-center justify-center text-white text-2xl font-black">
                    U
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold">{t("guestUser")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("welcomeToZeteb")}</p>
              <div className="border-t border-border/50 pt-4 space-y-2 text-right">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground font-medium">{t("profileViews")}</span>
                  <span className="text-primary font-bold">۴۲</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground font-medium">{t("activeAppointments")}</span>
                  <span className="text-primary font-bold">۲</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card space-y-4">
             <h4 className="font-bold text-sm">{t("quickAccess")}</h4>
             <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors">
                   <span className="icon-[solar--save-bold-duotone] w-5 h-5" />
                   <span>{t("saved")}</span>
                </li>
                <li className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors">
                   <span className="icon-[solar--users-group-two-rounded-bold-duotone] w-5 h-5" />
                   <span>{t("medicalGroups")}</span>
                </li>
                <li className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors">
                   <span className="icon-[solar--hashtag-bold-duotone] w-5 h-5" />
                   <span>{t("followedHashtags")}</span>
                </li>
             </ul>
          </div>
        </aside>

        {/* Middle Content - Feed */}
        <main className="lg:col-span-6 space-y-6">
          {/* Start a Post */}
          <div className="glass-card !p-4">
            <div className="flex gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-ios-gradient flex items-center justify-center text-white font-black shrink-0">
                U
              </div>
              <button className="flex-1 text-right px-4 rounded-full border border-border/50 hover:bg-white/5 transition-colors text-muted-foreground text-sm font-medium">
                {t("startPost")}
              </button>
            </div>
            <div className="flex justify-around pt-2 border-t border-border/30">
               <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:bg-white/5 p-2 rounded-xl transition-colors">
                  <span className="icon-[solar--gallery-bold-duotone] text-green-500 w-6 h-6" />
                  <span>تصویر</span>
               </button>
               <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:bg-white/5 p-2 rounded-xl transition-colors">
                  <span className="icon-[solar--videocamera-record-bold-duotone] text-primary w-6 h-6" />
                  <span>ویدیو</span>
               </button>
               <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:bg-white/5 p-2 rounded-xl transition-colors">
                  <span className="icon-[solar--document-text-bold-duotone] text-orange-500 w-6 h-6" />
                  <span>{t("writeArticle")}</span>
               </button>
            </div>
          </div>

          {/* Articles Feed */}
          {articles.map((article, index) => (
            <div key={article.id} className="space-y-6">
              <div className="glass-card !p-0 overflow-hidden animate-ios-in" style={{ animationDelay: `${index * 150}ms` }}>
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

              {/* People You May Know - Inserted between articles */}
              {index === 0 && (
                <div className="glass-card space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm">{t("peopleYouMayKnow")}</h4>
                    <Button variant="ghost" size="sm" className="text-primary text-xs font-bold">مشاهده همه</Button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {doctors.map((doc, i) => (
                      <div key={i} className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all group">
                         <div className="w-14 h-14 rounded-full bg-ios-gradient flex items-center justify-center text-white text-lg font-black mb-2 shadow-md group-hover:scale-110 transition-transform">
                            {doc.image}
                         </div>
                         <h5 className="text-xs font-bold truncate w-full">{doc.name}</h5>
                         <p className="text-[10px] text-muted-foreground truncate w-full mb-3">{doc.specialty}</p>
                         <Button variant="outline" size="sm" className="h-7 w-full !rounded-lg text-[10px] font-bold border-primary/30 text-primary hover:bg-primary hover:text-white">دنبال کردن</Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </main>

        {/* Right Sidebar - Widgets */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="glass-card space-y-4">
            <h4 className="font-bold text-sm">{t("topSpecialties")}</h4>
            <div className="flex flex-wrap gap-2">
              {["قلب و عروق", "پوست و مو", "گوش و حلق", "چشم‌پزشکی", "روانپزشکی"].map(tag => (
                <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors px-3 py-1 rounded-lg border-none text-[11px] font-medium">
                  {tag}
                </Badge>
              ))}
            </div>
            <Button variant="ghost" className="w-full text-xs font-bold text-primary h-8">مشاهده همه تخصص‌ها</Button>
          </div>

          <div className="glass-card space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm">
              <span className="icon-[solar--fire-bold-duotone] text-orange-500 w-5 h-5" />
              <span>{t("topDoctorsOfWeek")}</span>
            </div>
            <div className="space-y-4">
              {doctors.map((doc, i) => (
                <div key={i} className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-ios-gradient flex items-center justify-center text-white text-xs font-black shrink-0">
                    {doc.image}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold truncate group-hover:text-primary transition-colors">{doc.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{doc.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-black text-yellow-600">
                    <span className="icon-[solar--star-bold] w-3 h-3" />
                    <span>{doc.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-muted-foreground text-center space-x-2 space-x-reverse opacity-60">
             <span className="hover:text-primary cursor-pointer">قوانین</span>
             <span>•</span>
             <span className="hover:text-primary cursor-pointer">حریم خصوصی</span>
             <span>•</span>
             <span className="hover:text-primary cursor-pointer">درباره ما</span>
             <p className="mt-2">© ۲۰۲۴ تمامی حقوق برای زتب محفوظ است</p>
          </div>
        </aside>

      </div>
    </div>
  );
}
