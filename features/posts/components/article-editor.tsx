"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/features/auth/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ArticleEditor() {
  const t = useTranslations("PostEditor");
  const { data: session } = authClient.useSession();
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: t("placeholder"),
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[500px]",
      },
    },
  });

  const handlePublish = () => {
    const content = editor?.getHTML();
    console.log("Publishing Article:", { title, content });
    toast.success("مقاله با موفقیت منتشر شد");
    router.push("/");
  };

  if (!editor) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between sticky top-20 z-10 glass-nav backdrop-blur-3xl bg-white/40 dark:bg-black/40 p-4 rounded-[2rem] border border-white/20">
        <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 rounded-lg">
                <AvatarImage src={session?.user?.image || "/favicon.png"} />
                <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <p className="text-sm font-bold">{session?.user?.name || "Hossein Eftekharad"}</p>
                  <span className="icon-[solar--alt-arrow-down-bold] w-3 h-3 cursor-pointer" />
                </div>
                <p className="text-[10px] text-muted-foreground">{t("individualArticle")}</p>
            </div>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-muted/20 p-1 rounded-full">
            <Button variant="ghost" size="sm" className="rounded-full text-xs font-bold px-3">{t("style")} <span className="icon-[solar--alt-arrow-down-bold] w-3 h-3 ms-1" /></Button>
            <div className="w-px h-4 bg-border/50 mx-1" />
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full"><span className="icon-[solar--text-bold-bold] w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full"><span className="icon-[solar--text-italic-bold] w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full"><span className="icon-[solar--list-bold] w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full"><span className="icon-[solar--list-cross-bold] w-4 h-4" /></Button>
            <div className="w-px h-4 bg-border/50 mx-1" />
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full"><span className="icon-[solar--pen-broken] w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full"><span className="icon-[solar--code-bold] w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full"><span className="icon-[solar--minus-square-bold] w-4 h-4" /></Button>
            <div className="w-px h-4 bg-border/50 mx-1" />
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full"><span className="icon-[solar--link-bold] w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full"><span className="icon-[solar--videocamera-record-bold] w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full"><span className="icon-[solar--gallery-bold] w-4 h-4" /></Button>
        </div>

        <div className="flex gap-2">
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full font-bold text-sm h-10 px-4 gap-2 border-primary/20 bg-primary/5 text-primary">
                   {t("manage")}
                   <span className="icon-[solar--alt-arrow-down-bold] w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass-card !p-2 !rounded-2xl shadow-2xl">
                {[
                  { label: t("settings"), key: "settings" },
                  { label: t("drafts"), key: "drafts" },
                  { label: t("scheduled"), key: "scheduled" },
                  { label: t("published"), key: "published" },
                  { label: t("newDraft"), key: "newDraft" },
                  { label: t("createNewsletter"), key: "createNewsletter" },
                  { label: t("help"), key: "help" },
                  { label: t("giveFeedback"), key: "giveFeedback" },
                ].map(item => (
                  <DropdownMenuItem key={item.key} className="font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer">
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
                onClick={handlePublish}
                disabled={!title.trim() || editor.isEmpty}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 h-10 rounded-full font-bold shadow-lg flex items-center gap-2"
            >
                {t("next")}
                <span className="icon-[solar--alt-arrow-right-bold] w-4 h-4 rtl:rotate-180" />
            </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="relative aspect-video w-full rounded-2xl border-2 border-dashed border-border/50 bg-muted/10 flex flex-col items-center justify-center gap-6 overflow-hidden group">
           {coverImage ? (
              <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
           ) : (
              <>
                 <div className="w-20 h-20 bg-muted/20 rounded-2xl flex items-center justify-center">
                    <span className="icon-[solar--gallery-bold] w-10 h-10 text-muted-foreground/40" />
                 </div>
                 <div className="text-center space-y-2">
                    <p className="font-bold text-muted-foreground">{t("addCover")}</p>
                    <label className="cursor-pointer">
                      <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-foreground/10 font-bold hover:bg-muted/50 transition-all">
                        <span className="icon-[solar--upload-bold] w-5 h-5" />
                        {t("uploadFromComputer")}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setCoverImage(URL.createObjectURL(file));
                        }}
                      />
                    </label>
                 </div>
              </>
           )}
           {coverImage && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-4 end-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setCoverImage(null)}
              >
                <span className="icon-[solar--trash-bin-trash-bold] w-5 h-5" />
              </Button>
           )}
        </div>

        <div className="space-y-6 min-h-screen">
          <input
              type="text"
              placeholder={t("titlePlaceholder")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border-none text-5xl font-black focus:outline-none placeholder:text-muted-foreground/30"
          />

          {!editor.getText().trim() && (
            <div className="text-muted-foreground/60 text-lg font-medium pointer-events-none mb-[-2rem]">
               {t("writeHere")}
            </div>
          )}

          <div className="flex gap-2 border-y border-border/30 py-2 sticky top-40 bg-background/50 backdrop-blur-md z-[5]">
              <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={editor.isActive('bold') ? 'bg-primary/10 text-primary' : ''}
              >
                  <span className="icon-[solar--text-bold-broken] w-5 h-5" />
              </Button>
              <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={editor.isActive('italic') ? 'bg-primary/10 text-primary' : ''}
              >
                  <span className="icon-[solar--text-italic-broken] w-5 h-5" />
              </Button>
              <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={editor.isActive('heading', { level: 2 }) ? 'bg-primary/10 text-primary' : ''}
              >
                  H2
              </Button>
              <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={editor.isActive('bulletList') ? 'bg-primary/10 text-primary' : ''}
              >
                  <span className="icon-[solar--list-broken] w-5 h-5" />
              </Button>
              <div className="w-px h-6 bg-border/30 mx-1 self-center" />
              <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                      const url = window.prompt('URL');
                      if (url) editor.chain().focus().setLink({ href: url }).run();
                  }}
              >
                  <span className="icon-[solar--link-broken] w-5 h-5" />
              </Button>
          </div>

          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
