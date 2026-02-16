"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface PostItemProps {
  post: any;
}

export function PostItem({ post }: PostItemProps) {
  const t = useTranslations("PostItem");
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  const reactions = [
    { label: t("reactionLike"), emoji: "👍", color: "text-blue-500" },
    { label: t("reactionCelebrate"), emoji: "👏", color: "text-green-500" },
    { label: t("reactionSupport"), emoji: "❤️", color: "text-red-500" },
    { label: t("reactionLove"), emoji: "💡", color: "text-yellow-500" },
    { label: t("reactionInsightful"), emoji: "🤔", color: "text-purple-500" },
    { label: t("reactionFunny"), emoji: "😆", color: "text-orange-500" },
  ];

  const comments = post.chatPreview || [
    {
      id: 1,
      user: "Mehrdad Salahi (مهرداد صلاحی)",
      role: "Software Engineer",
      message: "جمله‌ات اشکال داره. درستش اینه: \nسرانه مطالعاتی کشور اصلاً بالا نیست که هر کس و ناکسی میشینه پای مسائلی که بهش مربوط نیست نظر میده.",
      likes: 1,
      replies: [
        {
          id: 101,
          user: "Arian Soltani",
          isAuthor: true,
          role: "AI Specialist | Data Science...",
          message: "همون مهرداد صلاحی 😂",
          likes: 0
        }
      ]
    },
    {
      id: 2,
      user: "Babak kamali MrMath",
      role: "professional and international math teacher...",
      message: "کس بودن هر کسی از جملاتش مشخصه",
      likes: 0,
      replies: []
    },
  ];

  const displayedComments = showAllComments ? comments : comments.slice(-2);

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
              {t("follow")}
            </Button>
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                  <span className="icon-[solar--menu-dots-broken] w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 glass-card !p-2">
                <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer">
                  <span className="icon-[solar--bookmark-bold] w-5 h-5" />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{t("save")}</span>
                    <span className="text-[10px] text-muted-foreground">{t("saveDesc")}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer">
                  <span className="icon-[solar--link-bold] w-5 h-5" />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{t("copyLink")}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer">
                  <span className="icon-[solar--code-bold] w-5 h-5" />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{t("embed")}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer">
                  <span className="icon-[solar--close-circle-bold] w-5 h-5" />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{t("unfollow", { name: post.author?.name || "User" })}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer">
                  <span className="icon-[solar--dislike-bold] w-5 h-5" />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{t("notInterested")}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 py-3 rounded-xl cursor-pointer">
                  <span className="icon-[solar--flag-bold] w-5 h-5 text-destructive" />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{t("report")}</span>
                  </div>
                </DropdownMenuItem>
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
          <span className="hover:text-blue-600 hover:underline cursor-pointer">{t("commentsCount", { count: post.comments || 14 })}</span>
          <span>•</span>
          <span className="hover:text-blue-600 hover:underline cursor-pointer">{t("repostsCount", { count: 2 })}</span>
        </div>
      </div>

      <div className="px-2 py-1 flex items-center justify-around gap-1 border-b border-border/20">
        <div className="relative group/like flex-1">
          <Button variant="ghost" className="w-full gap-2 rounded-md text-sm font-semibold h-12 text-muted-foreground hover:bg-muted/50 transition-colors">
            <span className="icon-[solar--like-broken] w-6 h-6" />
            {t("like")}
          </Button>

          <div className="absolute bottom-full start-0 mb-2 hidden group-hover/like:flex bg-card border border-border/50 shadow-xl rounded-full p-1.5 animate-in fade-in slide-in-from-bottom-2 gap-1 z-50">
            {reactions.map((r) => (
              <button key={r.label} title={r.label} className="w-10 h-10 flex items-center justify-center text-2xl hover:scale-125 transition-transform duration-200">
                {r.emoji}
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          className={cn("flex-1 gap-2 rounded-md text-sm font-semibold h-12 text-muted-foreground hover:bg-muted/50 transition-colors", isCommentsOpen && "text-primary bg-primary/5")}
        >
          <span className="icon-[solar--chat-round-broken] w-6 h-6" />
          {t("comment")}
        </Button>
        <Button variant="ghost" className="flex-1 gap-2 rounded-md text-sm font-semibold h-12 text-muted-foreground hover:bg-muted/50 transition-colors">
          <span className="icon-[solar--repeat-broken] w-6 h-6" />
          {t("repost")}
        </Button>
        <Button variant="ghost" className="flex-1 gap-2 rounded-md text-sm font-semibold h-12 text-muted-foreground hover:bg-muted/50 transition-colors">
          <span className="icon-[solar--forward-broken] w-6 h-6" />
          {t("send")}
        </Button>
      </div>

      <AnimatePresence>
        {isCommentsOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 space-y-4 bg-card/30">
              <div className="flex gap-2 pt-1 items-center">
                <Avatar className="h-10 w-10 rounded-full shrink-0">
                  <AvatarImage src="/favicon.png" />
                </Avatar>
                <div className="flex-1 relative">
                  <div className="relative">
                    <input
                      placeholder={t("addComment")}
                      className="w-full bg-background border border-border/60 hover:border-border rounded-full ps-5 pe-12 py-2.5 text-sm font-medium focus:outline-none focus:border-primary transition-colors"
                    />
                    <button className="absolute end-3 top-1/2 -translate-y-1/2">
                       <span className="icon-[solar--gallery-broken] w-5 h-5 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                 <Button variant="ghost" size="sm" className="h-8 text-xs font-bold gap-1">
                   {t("mostRelevant")}
                   <span className="icon-[solar--alt-arrow-down-broken] w-3 h-3" />
                 </Button>
              </div>

              <div className="space-y-6">
                {displayedComments.map((comment: any) => (
                  <div key={comment.id} className="space-y-4">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarFallback className="bg-ios-gradient text-white">{comment.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="bg-muted/30 rounded-2xl rounded-ss-none p-3">
                          <div className="flex justify-between items-start">
                             <div>
                                <h5 className="font-bold text-xs">{comment.user}</h5>
                                <p className="text-[10px] text-muted-foreground line-clamp-1">{comment.role}</p>
                             </div>
                             <span className="icon-[solar--menu-dots-broken] w-4 h-4 text-muted-foreground" />
                          </div>
                          <p className="text-xs mt-2 leading-relaxed whitespace-pre-wrap">{comment.message}</p>
                        </div>
                        <div className="flex items-center gap-4 ps-2 text-[11px] font-bold text-muted-foreground">
                           <button className="hover:text-primary">{t("like")}</button>
                           {comment.likes > 0 && <span className="flex items-center gap-1 text-primary"><span className="icon-[solar--like-bold] w-3 h-3" /> {comment.likes}</span>}
                           <span className="text-border">|</span>
                           <button className="hover:text-primary">{t("reply")}</button>
                           {comment.replies.length > 0 && <span>{t("repliesCount", { count: comment.replies.length })}</span>}
                        </div>
                      </div>
                    </div>

                    {comment.replies.map((reply: any) => (
                      <div key={reply.id} className="flex gap-3 ms-12">
                        <div className="w-px bg-border/50 relative">
                           <div className="absolute top-0 start-0 w-4 h-4 border-s border-b border-border/50 rounded-bl-xl -ms-[1px] -mt-2" />
                        </div>
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarFallback className="bg-ios-gradient text-white">{reply.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="bg-muted/30 rounded-2xl rounded-ss-none p-3">
                            <div className="flex justify-between items-start">
                               <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-bold text-xs">{reply.user}</h5>
                                    {reply.isAuthor && <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-[9px]">{t("author")}</span>}
                                  </div>
                                  <p className="text-[10px] text-muted-foreground line-clamp-1">{reply.role}</p>
                               </div>
                               <span className="icon-[solar--menu-dots-broken] w-4 h-4 text-muted-foreground" />
                            </div>
                            <p className="text-xs mt-2 leading-relaxed whitespace-pre-wrap">{reply.message}</p>
                          </div>
                          <div className="flex items-center gap-4 ps-2 text-[11px] font-bold text-muted-foreground">
                             <button className="hover:text-primary">{t("like")}</button>
                             <span className="text-border">|</span>
                             <button className="hover:text-primary">{t("reply")}</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {!showAllComments && comments.length > 2 && (
                <button
                  onClick={() => setShowAllComments(true)}
                  className="w-full text-start ps-2 py-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("loadMore")}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
