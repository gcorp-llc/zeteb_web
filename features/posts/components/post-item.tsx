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
  { label: "لایک", icon: "icon-[solar--like-broken]", activeIcon: "icon-[solar--like-broken]", color: "hover:text-blue-600" },
  { label: "نظر", icon: "icon-[solar--chat-round-broken]", color: "hover:text-blue-600" },
  { label: "بازنشر", icon: "icon-[solar--repeat-broken]", color: "hover:text-blue-600" },
  { label: "ارسال", icon: "icon-[solar--forward-broken]", color: "hover:text-blue-600" },
];

const reactions = [
  { label: "Like", emoji: "👍", color: "text-blue-500" },
  { label: "Celebrate", emoji: "👏", color: "text-green-500" },
  { label: "Support", emoji: "❤️", color: "text-red-500" },
  { label: "Love", emoji: "💡", color: "text-yellow-500" },
  { label: "Insightful", emoji: "🤔", color: "text-purple-500" },
  { label: "Funny", emoji: "😆", color: "text-orange-500" },
];

export function PostItem({ post }: PostItemProps) {
  const comments = post.chatPreview || [
    { user: "مینا زمانی", message: "خیلی کاربردی بود، ممنون از توضیحات کامل." },
    { user: "علی رضایی", message: "برای بیماران دیابتی هم همین الگو پیشنهاد می‌شود؟" },
  ];

  return (
    <article className="rounded-xl border border-border/40 bg-card text-card-foreground shadow-sm overflow-hidden mb-4">
      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-start gap-3">
          <div className="flex gap-2">
            <Avatar className="h-12 w-12 rounded-full border border-border/30">
              <AvatarImage src={post.author?.image || "/favicon.png"} />
              <AvatarFallback>{post.author?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <h4 className="font-bold text-sm hover:text-blue-600 hover:underline cursor-pointer transition-colors">{post.author?.name || "کاربر"}</h4>
                <span className="text-muted-foreground text-[10px]">• ۲nd</span>
              </div>
              <p className="text-[11px] text-muted-foreground line-clamp-1">{post.author?.role || "پزشک"}</p>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span>{post.time || "۱ ساعت پیش"}</span>
                <span>•</span>
                <span className="icon-[solar--global-broken] w-3 h-3" />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 font-bold text-sm h-8 gap-1 rounded-md">
              <span className="icon-[solar--add-broken] w-4 h-4" />
              دنبال‌کردن
            </Button>
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                  <span className="icon-[solar--menu-dots-broken] w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="gap-2"><span className="icon-[solar--bookmark-broken] w-4 h-4" />ذخیره</DropdownMenuItem>
                <DropdownMenuItem className="gap-2"><span className="icon-[solar--link-broken] w-4 h-4" />کپی لینک</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive gap-2"><span className="icon-[solar--flag-broken] w-4 h-4" />گزارش</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-3 text-[14px] leading-normal text-foreground whitespace-pre-wrap">{post.content}</div>
      </div>

      {post.image && (
        <div className="w-full border-y border-border/20 bg-muted/10">
          <img src={post.image} alt="post content" className="w-full h-auto max-h-[600px] object-contain mx-auto" />
        </div>
      )}

      <div className="px-4 py-2 flex items-center justify-between border-b border-border/20">
        <div className="flex items-center -space-x-1 rtl:space-x-reverse">
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center ring-2 ring-card z-30">
            <span className="text-[8px]">👍</span>
          </div>
          <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center ring-2 ring-card z-20">
            <span className="text-[8px]">❤️</span>
          </div>
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center ring-2 ring-card z-10">
            <span className="text-[8px]">👏</span>
          </div>
          <span className="ps-2 text-[11px] text-muted-foreground hover:text-blue-600 hover:underline cursor-pointer">{post.likes || 124}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="hover:text-blue-600 hover:underline cursor-pointer">{post.comments || 14} نظر</span>
          <span>•</span>
          <span className="hover:text-blue-600 hover:underline cursor-pointer">۲ بازنشر</span>
        </div>
      </div>

      <div className="px-2 py-1 flex items-center justify-around gap-1 border-b border-border/20">
        <div className="relative group/like flex-1">
          <Button variant="ghost" className="w-full gap-2 rounded-md text-sm font-semibold h-12 text-muted-foreground hover:bg-muted/50 transition-colors">
            <span className="icon-[solar--like-broken] w-6 h-6" />
            لایک
          </Button>

          {/* Reaction Menu */}
          <div className="absolute bottom-full left-0 mb-2 hidden group-hover/like:flex bg-card border border-border/50 shadow-xl rounded-full p-1.5 animate-in fade-in slide-in-from-bottom-2 gap-1 z-50">
            {reactions.map((r) => (
              <button key={r.label} title={r.label} className="w-10 h-10 flex items-center justify-center text-2xl hover:scale-125 transition-transform duration-200">
                {r.emoji}
              </button>
            ))}
          </div>
        </div>

        {actions.slice(1).map((action) => (
          <Button key={action.label} variant="ghost" className={`flex-1 gap-2 rounded-md text-sm font-semibold h-12 text-muted-foreground hover:bg-muted/50 transition-colors`}>
            <span className={`${action.icon} w-6 h-6`} />
            {action.label}
          </Button>
        ))}
      </div>

      <div className="px-4 py-3 space-y-3 bg-card/50">
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

        <div className="flex gap-2 pt-1 items-center">
          <Avatar className="h-10 w-10 rounded-full shrink-0">
            <AvatarImage src="/favicon.png" />
          </Avatar>
          <div className="flex-1 relative">
            <button className="w-full bg-background border border-border/60 hover:border-border rounded-full px-5 py-2.5 text-sm font-medium text-muted-foreground text-right transition-colors">
              نظر خود را بنویسید...
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
