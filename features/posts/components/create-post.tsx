"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { MediaModal } from "./modals/media-modal";
import { PollModal } from "./modals/poll-modal";
import { EventModal } from "./modals/event-modal";
import { toast } from "sonner";
import { useUpload } from "@/hooks/use-upload";
import { authClient } from "@/features/auth/lib/auth-client";
import { postsApi } from "../api";

export function CreatePost() {
  const t = useTranslations("HomePage");
  const { uploadFile, isUploading } = useUpload();
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const router = useRouter();
  const [mediaOpen, setMediaOpen] = useState(false);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [pollOpen, setPollOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [pollData, setPollData] = useState<{ question: string; options: string[]; duration: string } | null>(null);
  const [eventData, setEventData] = useState<{ title: string; date: string; time: string; location: string } | null>(null);

  const composerActions = [
    { label: t("media"), icon: "icon-[solar--gallery-bold-duotone]", className: "text-green-500", onClick: () => openMedia("image") },
    { label: t("video"), icon: "icon-[solar--videocamera-record-bold-duotone]", className: "text-primary", onClick: () => openMedia("video") },
    { label: "رویداد", icon: "icon-[solar--calendar-bold-duotone]", className: "text-violet-500", onClick: () => setEventOpen(true) },
    { label: "نظرسنجی", icon: "icon-[solar--chart-bold-duotone]", className: "text-amber-500", onClick: () => setPollOpen(true) },
    { label: t("writeArticle"), icon: "icon-[solar--document-text-bold-duotone]", className: "text-orange-500", onClick: () => router.push("/posts/new/article") },
  ];

  const handlePost = async () => {
    let uploadedUrls: string[] = [];
    if (attachments.length > 0) {
      toast.info("در حال آپلود فایل‌ها...");
      const uploadPromises = attachments.map((file) => uploadFile(file));
      const results = await Promise.all(uploadPromises);
      uploadedUrls = results.filter((r): r is string => r !== null);
    }

    await postsApi.createPost({ content, image_url: uploadedUrls[0] });
    toast.success("پست با موفقیت منتشر شد");
    setContent("");
    setAttachments([]);
    setPollData(null);
    setEventData(null);
    setIsOpen(false);
  };

  return (
    <div className="glass-card !p-4 mb-4">
      <div className="flex gap-3 items-center mb-4">
        <Avatar className="w-12 h-12 rounded-full">
          <AvatarImage src={session?.user?.image || "/favicon.png"} />
          <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <button onClick={() => setIsOpen(true)} className="flex-1 text-right px-5 h-12 rounded-full border border-border/50 hover:bg-white/5 transition-colors text-muted-foreground text-sm font-semibold">
          {t("startPost")}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-3 border-t border-border/30">
        {composerActions.map((item) => (
          <button key={item.label} onClick={item.onClick} className="flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground hover:bg-white/5 p-2.5 rounded-xl transition-colors">
            <span className={`${item.icon} ${item.className} w-5 h-5`} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <ResponsiveModal title={t("createPost")} open={isOpen} onOpenChange={setIsOpen}>
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-3 pb-2 border-b border-border/30">
            <Avatar className="w-11 h-11 rounded-full">
              <AvatarImage src={session?.user?.image || "/favicon.png"} />
              <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-bold">{session?.user?.name || "کاربر"}</p>
          </div>

          <div className="max-h-[420px] overflow-y-auto space-y-4">
            <Textarea placeholder={t("postPlaceholder")} className="min-h-[140px] border-none bg-transparent text-lg focus-visible:ring-0 p-0 resize-none" value={content} onChange={(e) => setContent(e.target.value)} />

            {attachments.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {attachments.map((file, i) => (
                  <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-border/30 bg-black/20">
                    {file.type.startsWith("image") ? <img src={URL.createObjectURL(file)} alt="Attachment" className="w-full h-full object-cover" /> : <video src={URL.createObjectURL(file)} className="w-full h-full object-cover" />}
                    <Button variant="destructive" size="icon" className="absolute top-1 right-1 w-6 h-6 rounded-full" onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))}>
                      <span className="icon-[solar--close-circle-bold] w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {pollData && <div className="p-4 rounded-2xl bg-white/5 border border-border/50 text-sm font-semibold">📊 {pollData.question}</div>}
            {eventData && <div className="p-4 rounded-2xl bg-white/5 border border-border/50 text-sm font-semibold">📅 {eventData.title}</div>}
          </div>

          <div className="space-y-3 pt-4 border-t border-border/30">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {composerActions.map((item) => (
                <Button key={`modal-${item.label}`} variant="ghost" onClick={item.onClick} className="rounded-xl h-10 gap-1.5 text-xs">
                  <span className={`${item.icon} ${item.className} w-5 h-5`} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              ))}
            </div>
            <div className="flex justify-end">
              <Button onClick={handlePost} disabled={isUploading || (!content.trim() && !attachments.length && !pollData && !eventData)} className="!rounded-full px-7 bg-ios-gradient shadow-lg shadow-primary/20 font-bold">
                {isUploading ? "..." : t("publish")}
              </Button>
            </div>
          </div>
        </div>
      </ResponsiveModal>

      <MediaModal open={mediaOpen} onOpenChange={setMediaOpen} type={mediaType} onSelect={(files) => {
        setAttachments([...attachments, ...files]);
        setIsOpen(true);
      }} />
      <PollModal open={pollOpen} onOpenChange={setPollOpen} onDone={(data) => {
        setPollData(data);
        setIsOpen(true);
      }} />
      <EventModal open={eventOpen} onOpenChange={setEventOpen} onDone={(data) => {
        setEventData(data);
        setIsOpen(true);
      }} />
    </div>
  );
}
