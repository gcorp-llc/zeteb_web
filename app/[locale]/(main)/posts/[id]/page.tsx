import { PageContainer } from "@/components/page-container";
import { PostItem } from "@/features/posts/components/post-item";
import { Metadata } from "next";

async function getPost(id: string) {
  // Mock fetching post
  return {
    id,
    author: {
      name: "دکتر مریم علوی",
      role: "متخصص پوست و مو",
      image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=100",
    },
    content: "در این پست به بررسی روش‌های نوین جراحی داخلی می‌پردازیم. این روش‌ها می‌توانند زمان بهبودی بیمار را تا ۵۰ درصد کاهش دهند.",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000",
    time: "۲ ساعت پیش",
    likes: 124,
    comments: 14,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  return {
    title: `پست ${post.author.name}`,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.author.name,
      description: post.content.substring(0, 160),
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto py-8">
        <PostItem post={post} />
      </div>
    </PageContainer>
  );
}
