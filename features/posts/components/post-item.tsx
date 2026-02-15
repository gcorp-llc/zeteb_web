"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface PostItemProps {
  post: any;
}

const actions = [
  { label: "لایک", icon: "icon-[solar--like-broken]" },
  { label: "نظر", icon: "icon-[solar--chat-round-line-broken]" },
  { label: "بازنشر", icon: "icon-[solar--repeat-broken]" },
  { label: "ارسال", icon: "icon-[solar--forward-broken]" },
];

const sampleComments = [
  { id: 1, name: "مریم محمدی", text: "کاملاً موافقم، نکته خیلی کاربردی بود.", time: "۱س" },
  { id: 2, name: "دکتر رضایی", text: "ممنون از اشتراک‌گذاری. لطفا منبع مقاله را هم بگذارید.", time: "۴۵د" },
];

export function PostItem({ post }: PostItemProps) {
  return (
    <article className="glass-card !p-0 mb-4 overflow-hidden border border-border/30 shadow-xl animate-ios-in">
      <div className="p-4">
        <div className="flex justify-between items-start gap-3">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12 rounded-xl">
              <AvatarImage src={post.author?.image || "/favicon.png"} />
              <AvatarFallback>{post.author?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <h4 className="font-black text-sm hover:text-primary hover:underline cursor-pointer">{post.author?.name || "حسین افتخارراد"}</h4>
              <p className="text-[10px] text-muted-foreground leading-tight max-w-[220px]">{post.author?.role || "متخصص داخلی و جراح"}</p>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span>{post.time || "۱ ساعت پیش"}</span>
                <span>•</span>
                <span className="icon-[solar--global-bold] w-3 h-3" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-primary font-black text-xs h-8 gap-1 hover:bg-primary/10 rounded-full">
              <span className="icon-[solar--add-circle-bold] w-4 h-4" />
              دنبال کردن
            </Button>
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                  <span className="icon-[solar--menu-dots-bold] w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem>ذخیره</DropdownMenuItem>
                <DropdownMenuItem>کپی لینک پست</DropdownMenuItem>
                <DropdownMenuItem>عدم نمایش پست مشابه</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">گزارش</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-3 text-sm leading-relaxed text-end whitespace-pre-wrap">{post.content || "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ."}</div>
      </div>

      {post.image && (
        <div className="w-full bg-muted/20 overflow-hidden cursor-pointer hover:opacity-95 transition-opacity">
          <img src={post.image} alt="post content" className="w-full h-auto max-h-[500px] object-cover" />
        </div>
      )}

      <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <span className="icon-[solar--like-bold] w-4 h-4 text-blue-500" />
          <span>{post.likes || 124}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span>{post.comments || 14} نظر</span>
          <span>•</span>
          <span>۲ بازنشر</span>
        </div>
      </div>

      <div className="px-2 py-1 flex items-center justify-between border-b border-white/5">
        {actions.map((action) => (
          <Button key={action.label} variant="ghost" className="flex-1 gap-2 rounded-xl text-xs font-bold hover:bg-white/5 h-11">
            <span className={`${action.icon} w-5 h-5`} />
            {action.label}
          </Button>
        ))}
      </div>

      <div className="px-4 py-3 space-y-3">
        <div className="flex gap-2">
          <Avatar className="h-8 w-8 rounded-full shrink-0">
            <AvatarImage src="/favicon.png" />
          </Avatar>
          <button className="flex-1 bg-white/5 border border-border/30 rounded-full px-4 py-2 text-xs text-muted-foreground text-right hover:bg-white/10 transition-colors">نظر خود را بنویسید...</button>
        </div>

        <div className="space-y-2">
          {sampleComments.map((comment) => (
            <div key={comment.id} className="flex gap-2 items-start">
              <Avatar className="h-7 w-7 rounded-full shrink-0">
                <AvatarImage src="/favicon.png" />
                <AvatarFallback>{comment.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 rounded-2xl bg-white/5 border border-border/30 px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{comment.name}</span>
                  <span className="text-[10px] text-muted-foreground">{comment.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
