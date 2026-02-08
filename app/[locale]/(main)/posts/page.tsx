import { CreatePost } from "@/features/posts/components/create-post";
import { PostItem } from "@/features/posts/components/post-item";

export default function PostsPage() {
  // Mock posts for demonstration
  const mockPosts = [
    { id: "1", content: "بسیار خرسندم که اعلام کنم تیم ما موفق به کسب رتبه برتر در جشنواره سلامت دیجیتال شد.", image_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" },
    { id: "2", content: "امروز در مورد اهمیت چک‌آپ‌های دوره‌ای صحبت کردیم. سلامت شما اولویت ماست.", image_url: null },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <CreatePost />
      <div className="space-y-4">
        {mockPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
