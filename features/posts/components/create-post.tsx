"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { VisibilitySelector } from "./modals/visibility-selector";
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
  const [visibility, setVisibility] = useState("everyone");
  const router = useRouter();

  // Modal states
  const [mediaOpen, setMediaOpen] = useState(false);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [pollOpen, setPollOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);

  // Attachment states
  const [attachments, setAttachments] = useState<File[]>([]);
  const [pollData, setPollData] = useState<{ question: string; options: string[]; duration: string } | null>(null);
  const [eventData, setEventData] = useState<{ title: string; date: string; time: string; location: string } | null>(null);

  const handlePost = async () => {
    let uploadedUrls: string[] = [];

    if (attachments.length > 0) {
        toast.info("در حال آپلود فایل‌ها...");
        const uploadPromises = attachments.map(file => uploadFile(file));
        const results = await Promise.all(uploadPromises);
        uploadedUrls = results.filter((r): r is string => r !== null);
    }

    // API call via postsApi
    await postsApi.createPost({
        content,
        image_url: uploadedUrls[0] // Simplified for now
    });

    toast.success("پست با موفقیت منتشر شد");
    setContent("");
    setAttachments([]);
    setPollData(null);
    setEventData(null);
    setIsOpen(false);
  };

  const openMedia = (type: "image" | "video") => {
    setMediaType(type);
    setMediaOpen(true);
  };

  return (
    <div className="glass-card !p-4 mb-4">
      <div className="flex gap-3 mb-4">
        <Avatar className="w-12 h-12 rounded-xl">
          <AvatarImage src={session?.user?.image || "/favicon.png"} />
          <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <button
          onClick={() => setIsOpen(true)}
          className="flex-1 text-right px-4 rounded-full border border-border/50 hover:bg-white/5 transition-colors text-muted-foreground text-sm font-medium"
        >
          {t("startPost")}
        </button>
      </div>

      <div className="flex justify-around pt-2 border-t border-border/30">
        <button
          onClick={() => openMedia("image")}
          className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:bg-white/5 p-2 rounded-xl transition-colors"
        >
          <span className="icon-[solar--gallery-bold-duotone] text-green-500 w-6 h-6" />
          <span>{t("media")}</span>
        </button>
        <button
          onClick={() => openMedia("video")}
          className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:bg-white/5 p-2 rounded-xl transition-colors"
        >
          <span className="icon-[solar--videocamera-record-bold-duotone] text-primary w-6 h-6" />
          <span>{t("video")}</span>
        </button>
        <button
          onClick={() => router.push('/posts/new/article')}
          className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:bg-white/5 p-2 rounded-xl transition-colors"
        >
          <span className="icon-[solar--document-text-bold-duotone] text-orange-500 w-6 h-6" />
          <span>{t("writeArticle")}</span>
        </button>
      </div>

      <ResponsiveModal
        title={t("createPost")}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 rounded-lg">
              <AvatarImage src={session?.user?.image || "/favicon.png"} />
              <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold">{session?.user?.name || t("guestUser")}</p>
              <VisibilitySelector value={visibility} onChange={setVisibility} />
            </div>
          </div>

          <div className="max-h-[400px] overflow-y-auto space-y-4">
            <Textarea
              placeholder={t("postPlaceholder")}
              className="min-h-[120px] border-none bg-transparent text-lg focus-visible:ring-0 p-0 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {attachments.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                    {attachments.map((file, i) => (
                        <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-border/30 bg-black/20">
                            {file.type.startsWith('image') ? (
                                <img src={URL.createObjectURL(file)} alt="Attachment" className="w-full h-full object-cover" />
                            ) : (
                                <video src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                            )}
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 w-6 h-6 rounded-full"
                                onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))}
                            >
                                <span className="icon-[solar--close-circle-bold] w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            {pollData && (
                <div className="p-4 rounded-2xl bg-white/5 border border-border/50 relative">
                    <p className="font-bold text-sm mb-3">{pollData.question}</p>
                    <div className="space-y-2">
                        {pollData.options.map((opt: string, i: number) => (
                            <div key={i} className="p-2 rounded-xl bg-white/5 border border-border/30 text-xs">
                                {opt}
                            </div>
                        ))}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 left-2 rounded-full"
                        onClick={() => setPollData(null)}
                    >
                        <span className="icon-[solar--close-circle-bold] w-5 h-5" />
                    </Button>
                </div>
            )}

            {eventData && (
                <div className="p-4 rounded-2xl bg-white/5 border border-border/50 relative flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center shrink-0">
                        <span className="icon-[solar--calendar-bold-duotone] w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <p className="font-bold text-sm">{eventData.title}</p>
                        <p className="text-[10px] text-muted-foreground">{eventData.date} • {eventData.time}</p>
                        <p className="text-[10px] text-muted-foreground">{eventData.location}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 left-2 rounded-full"
                        onClick={() => setEventData(null)}
                    >
                        <span className="icon-[solar--close-circle-bold] w-5 h-5" />
                    </Button>
                </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            <div className="flex gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" onClick={() => openMedia("image")} className="rounded-full hover:bg-primary/10 hover:text-primary">
                <span className="icon-[solar--gallery-bold-duotone] w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => openMedia("video")} className="rounded-full hover:bg-primary/10 hover:text-primary">
                <span className="icon-[solar--videocamera-record-bold-duotone] w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setEventOpen(true)} className="rounded-full hover:bg-primary/10 hover:text-primary">
                <span className="icon-[solar--calendar-bold-duotone] w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setPollOpen(true)} className="rounded-full hover:bg-primary/10 hover:text-primary">
                <span className="icon-[solar--chart-bold-duotone] w-6 h-6" />
              </Button>
            </div>
            <Button
              onClick={handlePost}
              disabled={isUploading || (!content.trim() && !attachments.length && !pollData && !eventData)}
              className="!rounded-full px-6 bg-ios-gradient shadow-lg shadow-primary/20 font-bold"
            >
              {isUploading ? "..." : t("publish")}
            </Button>
          </div>
        </div>
      </ResponsiveModal>

      {/* Sub-modals */}
      <MediaModal
        open={mediaOpen}
        onOpenChange={setMediaOpen}
        type={mediaType}
        onSelect={(files) => {
            setAttachments([...attachments, ...files]);
            setIsOpen(true);
        }}
      />
      <PollModal
        open={pollOpen}
        onOpenChange={setPollOpen}
        onDone={(data) => {
            setPollData(data);
            setIsOpen(true);
        }}
      />
      <EventModal
        open={eventOpen}
        onOpenChange={setEventOpen}
        onDone={(data) => {
            setEventData(data);
            setIsOpen(true);
        }}
      />
    </div>
  );
}
