"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface PostItemProps {
  post: any;
}

export function PostItem({ post }: PostItemProps) {
  return (
    <div className="glass-card !p-0 mb-4 overflow-hidden border-none shadow-xl">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/favicon.ico" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-black text-sm">حسین افتخارراد</h4>
              <p className="text-[10px] text-muted-foreground font-bold">متخصص داخلی و جراح</p>
              <p className="text-[10px] text-muted-foreground">۱ ساعت پیش</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <span className="icon-[solar--menu-dots-bold] w-5 h-5" />
          </Button>
        </div>
        <div className="mt-4 text-sm leading-relaxed text-right">
          {post.content || "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است."}
        </div>
      </div>

      {post.image_url && (
        <div className="aspect-video w-full bg-muted overflow-hidden">
          <img src={post.image_url} alt="post" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="px-4 py-2 flex items-center justify-between border-t border-white/5">
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
           <span className="icon-[solar--like-bold] w-3 h-3 text-primary" />
           <span className="font-bold">۱۲۴ نفر</span>
        </div>
        <div className="text-[10px] text-muted-foreground font-bold">
          ۱۴ نظر • ۲ بازنشر
        </div>
      </div>

      <div className="px-2 py-1 flex items-center justify-between border-t border-white/5">
        <Button variant="ghost" className="flex-1 gap-2 rounded-xl text-xs font-bold hover:bg-white/5">
           <span className="icon-[solar--like-broken] w-5 h-5" />
           لایک
        </Button>
        <Button variant="ghost" className="flex-1 gap-2 rounded-xl text-xs font-bold hover:bg-white/5">
           <span className="icon-[solar--chat-round-line-broken] w-5 h-5" />
           نظر
        </Button>
        <Button variant="ghost" className="flex-1 gap-2 rounded-xl text-xs font-bold hover:bg-white/5">
           <span className="icon-[solar--repeat-broken] w-5 h-5" />
           بازنشر
        </Button>
        <Button variant="ghost" className="flex-1 gap-2 rounded-xl text-xs font-bold hover:bg-white/5">
           <span className="icon-[solar--forward-broken] w-5 h-5" />
           ارسال
        </Button>
      </div>
    </div>
  );
}
