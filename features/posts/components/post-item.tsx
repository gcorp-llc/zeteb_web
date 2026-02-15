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
  { label: "لایک", icon: "icon-[solar--like-bold-duotone]" },
  { label: "نظر", icon: "icon-[solar--chat-round-bold-duotone]" },
  { label: "بازنشر", icon: "icon-[solar--repeat-bold-duotone]" },
  { label: "ارسال", icon: "icon-[solar--forward-bold-duotone]" },
];

export function PostItem({ post }: PostItemProps) {
  return (
    <article className="glass-card !p-0 mb-4 overflow-hidden border border-border/30 shadow-xl animate-ios-in">
      {post.context && (
        <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
          <Avatar className="h-5 w-5">
            <AvatarImage src="/favicon.png" />
          </Avatar>
          <p className="text-[10px] text-muted-foreground font-medium">
            <span className="font-black text-foreground">{post.context.name}</span> {post.context.action}
          </p>
        </div>
      )}

      <div className="p-4">
        <div className="flex justify-between items-start gap-3">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12 rounded-xl">
              <AvatarImage src={post.author?.image || "/favicon.png"} />
              <AvatarFallback>{post.author?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <h4 className="font-black text-sm hover:text-primary hover:underline cursor-pointer">
                {post.author?.name || "حسین افتخارراد"}
              </h4>
              <p className="text-[11px] text-muted-foreground leading-tight max-w-[260px]">
                {post.author?.role || "متخصص داخلی و جراح"}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span>{post.time || "۱ ساعت پیش"}</span>
                <span>•</span>
                <span className="icon-[solar--global-bold] w-3 h-3" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-primary font-black text-xs h-8 gap-1.5 hover:bg-primary/10 rounded-full">
              <span className="icon-[solar--add-circle-bold] w-4 h-4" />
              دنبال کردن
            </Button>
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                  <span className="icon-[solar--menu-dots-bold] w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>ذخیره پست</DropdownMenuItem>
                <DropdownMenuItem>کپی لینک</DropdownMenuItem>
                <DropdownMenuItem>بی‌صدا کردن نویسنده</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">گزارش</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-4 text-sm leading-relaxed text-end whitespace-pre-wrap">{post.content || "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ."}</div>
      </div>

      {post.image && (
        <div className="w-full bg-muted/20 overflow-hidden cursor-pointer hover:opacity-95 transition-opacity">
          <img src={post.image} alt="post content" className="w-full h-auto max-h-[500px] object-cover" />
        </div>
      )}

      <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center -space-x-1 space-x-reverse">
          <div className="w-4 h-4 rounded-full bg-blue-500 border border-white flex items-center justify-center z-30"><span className="icon-[solar--like-bold] w-2.5 h-2.5 text-white" /></div>
          <div className="w-4 h-4 rounded-full bg-red-500 border border-white flex items-center justify-center z-20"><span className="icon-[solar--heart-bold] w-2.5 h-2.5 text-white" /></div>
          <span className="ps-2 text-[11px] text-muted-foreground font-medium hover:text-primary cursor-pointer hover:underline">{post.likes || 124}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium">
          <span className="hover:text-primary cursor-pointer hover:underline">{post.comments || 14} نظر</span>
          <span>•</span>
          <span className="hover:text-primary cursor-pointer hover:underline">۲ بازنشر</span>
        </div>
      </div>

      <div className="px-2 py-1 grid grid-cols-4 gap-1 border-b border-white/5">
        {actions.map((action) => (
          <Button key={action.label} variant="ghost" className="gap-2 rounded-lg text-xs font-bold hover:bg-white/5 h-11 text-muted-foreground hover:text-foreground">
            <span className={`${action.icon} w-5 h-5`} />
            {action.label}
          </Button>
        ))}
      </div>

      <div className="px-4 py-3 flex gap-2">
        <Avatar className="h-8 w-8 rounded-full shrink-0">
          <AvatarImage src="/favicon.png" />
        </Avatar>
        <button className="flex-1 bg-white/5 border border-border/30 rounded-full px-4 py-2 text-xs text-muted-foreground text-right hover:bg-white/10 transition-colors">
          نظر خود را بنویسید...
        </button>
      </div>
    </article>
  );
}
