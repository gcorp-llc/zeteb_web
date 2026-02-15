"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostItemProps {
  post: any;
}

const actions = [
  { label: "لایک", icon: "icon-[solar--like-bold]" },
  { label: "نظر", icon: "icon-[solar--chat-round-bold]" },
  { label: "بازنشر", icon: "icon-[solar--repeat-bold]" },
  { label: "ارسال", icon: "icon-[solar--forward-bold]" },
];

export function PostItem({ post }: PostItemProps) {
  const comments = post.chatPreview || [
    { user: "مینا زمانی", message: "خیلی کاربردی بود، ممنون از توضیحات کامل." },
    { user: "علی رضایی", message: "برای بیماران دیابتی هم همین الگو پیشنهاد می‌شود؟" },
  ];

  return (
    <article className="rounded-2xl border border-border/40 bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start gap-3">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12 rounded-full">
              <AvatarImage src={post.author?.image || "/favicon.png"} />
              <AvatarFallback>{post.author?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <h4 className="font-bold text-sm hover:underline cursor-pointer">{post.author?.name || "کاربر"}</h4>
              <p className="text-[11px] text-muted-foreground leading-tight">{post.author?.role || "پزشک"}</p>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span>{post.time || "۱ ساعت پیش"}</span>
                <span>•</span>
                <span className="icon-[solar--global-bold] w-3 h-3" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-primary font-bold text-xs h-8 gap-1.5 rounded-full">
              <span className="icon-[solar--add-circle-bold] w-4 h-4" />
              دنبال‌کردن
            </Button>
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                  <span className="icon-[solar--menu-dots-bold] w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>ذخیره</DropdownMenuItem>
                <DropdownMenuItem>کپی لینک</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">گزارش</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-4 text-sm leading-7 text-right whitespace-pre-wrap">{post.content}</div>
      </div>

      {post.image && (
        <div className="w-full bg-muted/30">
          <img src={post.image} alt="post content" className="w-full h-auto max-h-[500px] object-cover" />
        </div>
      )}

      <div className="px-4 py-2.5 flex items-center justify-between border-b border-border/60">
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <span className="icon-[solar--like-bold] w-4 h-4 text-primary" />
          <span>{post.likes || 124}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>{post.comments || 14} نظر</span>
          <span>•</span>
          <span>۲ بازنشر</span>
        </div>
      </div>

      <div className="px-2 py-1 grid grid-cols-4 gap-1 border-b border-border/60">
        {actions.map((action) => (
          <Button key={action.label} variant="ghost" className="gap-2 rounded-lg text-xs font-medium h-10 text-muted-foreground hover:text-foreground">
            <span className={`${action.icon} w-5 h-5`} />
            {action.label}
          </Button>
        ))}
      </div>

      <div className="px-4 py-3 space-y-3 bg-muted/20">
        {comments.map((item: { user: string; message: string }, index: number) => (
          <div key={`${item.user}-${index}`} className="flex gap-2">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="text-[10px]">{item.user[0]}</AvatarFallback>
            </Avatar>
            <div className="rounded-2xl bg-background px-3 py-2 text-xs leading-6 flex-1">
              <p className="font-bold">{item.user}</p>
              <p className="text-muted-foreground">{item.message}</p>
            </div>
          </div>
        ))}

        <div className="flex gap-2 pt-1">
          <Avatar className="h-8 w-8 rounded-full shrink-0">
            <AvatarImage src="/favicon.png" />
          </Avatar>
          <button className="flex-1 bg-background border border-border/40 rounded-full px-4 py-2 text-xs text-muted-foreground text-right">
            نظر خود را بنویسید...
          </button>
        </div>
      </div>
    </article>
  );
}
