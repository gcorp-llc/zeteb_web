import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { PostList } from "@/features/feed/components/post-list";
import { CreatePost } from "@/features/posts/components/create-post";
import * as motion from "motion/react-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  return {
    title: t("title"),
  };
}

export default function HomePage() {
  const t = useTranslations("HomePage");

  const articles = [
    {
      id: 1,
      author: { name: "دکتر رضا محمدی", role: "متخصص قلب و عروق", image: "RM" },
      content: "ورزش منظم و تغذیه سالم دو رکن اصلی برای داشتن قلبی سالم هستند. حتی روزانه ۲۰ دقیقه پیاده‌روی سریع می‌تواند ریسک بیماری قلبی را کاهش دهد.",
      image: "https://images.unsplash.com/photo-1505751172107-5739a00723a5?auto=format&fit=crop&q=80&w=800",
      likes: 124,
      comments: 18,
      time: "۲ ساعت پیش"
    },
    {
      id: 2,
      author: { name: "دکتر مریم علوی", role: "متخصص پوست و مو", image: "MA" },
      content: "برای فصل سرما، مرطوب‌کننده حاوی هیالورونیک اسید و ضدآفتاب را فراموش نکنید. پوست زمستانی به آبرسانی عمیق‌تری نیاز دارد.",
      likes: 89,
      comments: 12,
      time: "۵ ساعت پیش"
    }
  ];

  const latestArticles = [
    { title: "راهنمای کامل کنترل فشار خون", author: "دکتر علی احمدی", reads: "۱.۲K" },
    { title: "تاثیر خواب بر سلامت روان", author: "دکتر سارا کاظمی", reads: "۹۸۰" },
    { title: "پیشگیری از درد کمر در کارمندان", author: "دکتر مهدی زمانی", reads: "۷۵۰" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3 space-y-4 hidden lg:block sticky top-24"
        >
          <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
            <div className="h-16 bg-muted" />
            <div className="px-5 pb-5 text-center">
              <div className="-mt-7 mx-auto mb-3 h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">U</div>
              <h3 className="text-sm font-bold">{t("guestUser")}</h3>
              <p className="text-xs text-muted-foreground mt-1">{t("welcomeToZeteb")}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card p-4">
            <h4 className="font-bold text-sm mb-3">مقالات جدید</h4>
            <div className="space-y-3">
              {latestArticles.map((article) => (
                <div key={article.title} className="rounded-xl border border-border/40 p-3 hover:bg-muted/20 transition-colors cursor-pointer">
                  <p className="text-xs font-bold leading-6">{article.title}</p>
                  <p className="text-[11px] text-muted-foreground">{article.author} • {article.reads}</p>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-3 text-xs">مشاهده همه</Button>
          </div>
        </motion.aside>

        <main className="lg:col-span-6 space-y-5">
          <CreatePost />
          <PostList initialArticles={articles} />
        </main>

        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3 space-y-4 hidden lg:block sticky top-24"
        >
          <div className="rounded-2xl border border-border/50 bg-card p-4">
            <h4 className="text-sm font-bold mb-3">افراد پیشنهادی</h4>
            {[
              "دکتر مریم علوی",
              "دکتر رضا محمدی",
              "دکتر سارا احمدی",
            ].map((name) => (
              <div key={name} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{name[0]}</div>
                  <span className="text-xs font-medium">{name}</span>
                </div>
                <Button size="sm" variant="outline" className="h-7 text-[10px]">دنبال‌کردن</Button>
              </div>
            ))}
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
