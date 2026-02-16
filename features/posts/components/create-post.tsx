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
  const tp = useTranslations("PostEditor");
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

  const openMedia = (type: "image" | "video") => {
    setMediaType(type);
    setMediaOpen(true);
  };

  const composerActions = [
    { label: t("media"), icon: "icon-[solar--gallery-broken]", className: "text-green-500", onClick: () => openMedia("image") },
    { label: t("video"), icon: "icon-[solar--videocamera-record-broken]", className: "text-primary", onClick: () => openMedia("video") },
    { label: t("writeArticle"), icon: "icon-[solar--document-text-broken]", className: "text-orange-500", onClick: () => router.push("/posts/new/article") },
  ];

  const handlePost = async () => {
    let uploadedUrls: string[] = [];
    if (attachments.length > 0) {
      toast.info(tp("uploadingFiles"));
      const uploadPromises = attachments.map((file) => uploadFile(file));
      const results = await Promise.all(uploadPromises);
      uploadedUrls = results.filter((r): r is string => r !== null);
    }

    await postsApi.createPost({ content, image_url: uploadedUrls[0] });
    toast.success(tp("postSuccess"));
    setContent("");
    setAttachments([]);
    setPollData(null);
    setEventData(null);
    setIsOpen(false);
  };

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-4">
      <div className="flex gap-3 items-center mb-3">
        <Avatar className="w-12 h-12 rounded-full">
          <AvatarImage src={session?.user?.image || "/favicon.png"} />
          <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <button onClick={() => setIsOpen(true)} className="flex-1 text-start px-5 h-12 rounded-full border border-border/60 bg-background hover:bg-muted/30 transition-colors text-muted-foreground text-sm font-medium">
          {t("startPost")}
        </button>
      </div>

      <div className="flex justify-around items-center pt-3 border-t border-border/50">
        {composerActions.map((item) => (
          <button key={item.label} onClick={item.onClick} className="flex-1 flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground hover:bg-muted/30 p-3 rounded-xl transition-colors">
            <span className={`${item.icon} ${item.className} w-5 h-5`} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <ResponsiveModal hideHeader open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex flex-col h-[500px]">
          <div className="flex items-center gap-3 p-4">
            <Avatar className="w-14 h-14 rounded-full">
              <AvatarImage src={session?.user?.image || "/favicon.png"} />
              <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold">{session?.user?.name || t("guestUser")}</p>
                <span className="icon-[solar--alt-arrow-down-bold] w-4 h-4 cursor-pointer" />
              </div>
              <p className="text-muted-foreground text-xs">{tp("postToAnyone")}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 relative">
            <Textarea
              placeholder={t("postPlaceholder")}
              className="min-h-[250px] border-none bg-transparent text-lg focus-visible:ring-0 p-0 resize-none placeholder:text-muted-foreground/60"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="absolute bottom-4 start-6">
              <button className="p-1 hover:bg-muted rounded-full transition-colors">
                <span className="icon-[solar--smile-square-broken] w-6 h-6 text-muted-foreground" />
              </button>
            </div>

            {attachments.length > 0 && (
              <div className="grid grid-cols-1 gap-4 pb-4">
                {attachments.map((file, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden border border-border/30 bg-black/5">
                    {file.type.startsWith("image") ? <img src={URL.createObjectURL(file)} alt="Attachment" className="w-full h-auto" /> : <video src={URL.createObjectURL(file)} controls className="w-full h-auto" />}
                    <Button variant="secondary" size="icon" className="absolute top-2 end-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur" onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))}>
                      <span className="icon-[solar--close-circle-broken] w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {pollData && <div className="p-4 rounded-xl bg-muted/20 border border-border/50 text-sm font-semibold mb-4">📊 {pollData.question}</div>}
            {eventData && <div className="p-4 rounded-xl bg-muted/20 border border-border/50 text-sm font-semibold mb-4">📅 {eventData.title}</div>}
          </div>

          <div className="p-4 bg-card">
            <div className="flex items-center gap-4 px-2 mb-4">
              <button onClick={() => openMedia("image")} title={tp("addPhoto")} className="p-2 hover:bg-muted rounded-full transition-colors">
                <span className="icon-[solar--gallery-bold] w-6 h-6 text-muted-foreground" />
              </button>
              <button onClick={() => setEventOpen(true)} title={tp("createEvent")} className="p-2 hover:bg-muted rounded-full transition-colors">
                <span className="icon-[solar--calendar-bold] w-6 h-6 text-muted-foreground" />
              </button>
              <button title={tp("celebrate")} className="p-2 hover:bg-muted rounded-full transition-colors">
                <span className="icon-[solar--star-bold] w-6 h-6 text-muted-foreground" />
              </button>
              <button title={tp("hire")} className="p-2 hover:bg-muted rounded-full transition-colors">
                <span className="icon-[solar--case-bold] w-6 h-6 text-muted-foreground" />
              </button>
              <button onClick={() => setPollOpen(true)} title={tp("createPoll")} className="p-2 hover:bg-muted rounded-full transition-colors">
                <span className="icon-[solar--chart-bold] w-6 h-6 text-muted-foreground" />
              </button>
              <button title={tp("writeArticle")} className="p-2 hover:bg-muted rounded-full transition-colors">
                <span className="icon-[solar--document-bold] w-6 h-6 text-muted-foreground" />
              </button>
              <button onClick={() => openMedia("video")} title={tp("addVideo")} className="p-2 hover:bg-muted rounded-full transition-colors">
                <span className="icon-[solar--videocamera-record-bold] w-6 h-6 text-muted-foreground" />
              </button>
            </div>

            <div className="flex justify-end items-center gap-3 pt-4 border-t border-border/40">
              <button title={tp("schedule")} className="p-2 hover:bg-muted rounded-full transition-colors">
                <span className="icon-[solar--clock-circle-broken] w-6 h-6 text-muted-foreground" />
              </button>
              <Button onClick={handlePost} disabled={isUploading || (!content.trim() && !attachments.length && !pollData && !eventData)} className="rounded-full px-8 h-10 font-bold bg-[#3b3b3b] hover:bg-[#2b2b2b] text-[#8c8c8c] disabled:opacity-50 transition-colors">
                {isUploading ? "..." : tp("post")}
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
