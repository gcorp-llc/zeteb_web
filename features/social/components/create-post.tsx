"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function CreatePost() {
  const t = useTranslations("HomePage");
  const [content, setContent] = useState("");

  const handlePost = () => {
    // API call to /api/proxy/posts
    console.log("Posting:", content);
    setContent("");
  };

  return (
    <div className="glass-card !p-4">
      <div className="flex gap-3 mb-4">
        <Avatar className="w-12 h-12 rounded-xl">
          <AvatarImage src="/favicon.ico" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex-1 text-right px-4 rounded-full border border-border/50 hover:bg-white/5 transition-colors text-muted-foreground text-sm font-medium">
              {t("startPost")}
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl glass border-none rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="text-right">ایجاد پست جدید</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                 <Avatar className="w-10 h-10 rounded-lg">
                    <AvatarImage src="/favicon.ico" />
                 </Avatar>
                 <div>
                    <p className="text-sm font-bold">کاربر مهمان</p>
                    <p className="text-[10px] text-muted-foreground">انتشار به صورت عمومی</p>
                 </div>
              </div>
              <Textarea
                placeholder="در مورد چه چیزی میخواهید صحبت کنید؟"
                className="min-h-[200px] border-none bg-transparent text-lg focus-visible:ring-0 p-0"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                 <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                       <span className="icon-[solar--gallery-bold-duotone] w-6 h-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                       <span className="icon-[solar--videocamera-record-bold-duotone] w-6 h-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                       <span className="icon-[solar--calendar-bold-duotone] w-6 h-6" />
                    </Button>
                 </div>
                 <Button
                   onClick={handlePost}
                   disabled={!content.trim()}
                   className="!rounded-full px-6 bg-ios-gradient shadow-lg shadow-primary/20 font-bold"
                 >
                   انتشار
                 </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-around pt-2 border-t border-border/30">
         <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:bg-white/5 p-2 rounded-xl transition-colors">
            <span className="icon-[solar--gallery-bold-duotone] text-green-500 w-6 h-6" />
            <span>تصویر</span>
         </button>
         <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:bg-white/5 p-2 rounded-xl transition-colors">
            <span className="icon-[solar--videocamera-record-bold-duotone] text-primary w-6 h-6" />
            <span>ویدیو</span>
         </button>
         <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:bg-white/5 p-2 rounded-xl transition-colors">
            <span className="icon-[solar--document-text-bold-duotone] text-orange-500 w-6 h-6" />
            <span>{t("writeArticle")}</span>
         </button>
      </div>
    </div>
  );
}
