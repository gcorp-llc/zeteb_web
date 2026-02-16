import { PageContainer } from "@/components/page-container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Metadata } from "next";

async function getArticle(id: string) {
  // Mock fetching article
  return {
    id,
    title: "روش‌های نوین در درمان بیماری‌های قلبی",
    author: {
      name: "دکتر رضا محمدی",
      role: "متخصص قلب و عروق",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100",
    },
    content: `
      <h2>مقدمه</h2>
      <p>بیماری‌های قلبی عروقی یکی از علل اصلی مرگ و میر در سراسر جهان هستند. با این حال، پیشرفت‌های اخیر در تکنولوژی پزشکی و داروسازی منجر به تغییرات بزرگی در نحوه درمان این بیماری‌ها شده است.</p>
      <h2>تکنولوژی‌های جدید</h2>
      <p>از جمله این پیشرفت‌ها می‌توان به استفاده از هوش مصنوعی در تشخیص زودهنگام و جراحی‌های روباتیک اشاره کرد که دقت عمل را به شدت افزایش می‌دهند.</p>
      <blockquote>این مقاله صرفاً جهت اطلاع‌رسانی بوده و جایگزین توصیه‌های پزشک متخصص نمی‌باشد.</blockquote>
    `,
    cover: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200",
    date: "۱۴۰۳/۰۲/۱۰",
  };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);

  return {
    title: article.title,
    description: article.content.substring(0, 160).replace(/<[^>]*>/g, ""),
    openGraph: {
      title: article.title,
      images: article.cover ? [article.cover] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticle(id);

  return (
    <PageContainer>
      <article className="max-w-4xl mx-auto py-12 space-y-8">
        {article.cover && (
          <img src={article.cover} alt={article.title} className="w-full aspect-video object-cover rounded-3xl shadow-2xl" />
        )}

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black leading-tight">{article.title}</h1>
          <div className="flex items-center gap-3 py-4 border-b border-border/50">
            <Avatar className="w-12 h-12 rounded-2xl">
              <AvatarImage src={article.author.image} />
              <AvatarFallback>{article.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">{article.author.name}</p>
              <p className="text-xs text-muted-foreground">{article.author.role} • {article.date}</p>
            </div>
          </div>
        </div>

        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-black prose-p:leading-relaxed prose-blockquote:border-s-4
            prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-4
            prose-blockquote:rounded-e-2xl"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </PageContainer>
  );
}
