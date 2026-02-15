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
import { VisibilitySelector } from "./modals/visibility-selector";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/features/auth/lib/auth-client";

export function ArticleEditor() {
  const t = useTranslations("PostEditor");
  const { data: session } = authClient.useSession();
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState("connections");
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
    console.log("Publishing Article:", { title, visibility, content });
    toast.success("مقاله با موفقیت منتشر شد");
    router.push("/");
  };

  if (!editor) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between sticky top-20 z-10 glass-nav backdrop-blur-3xl bg-white/40 dark:bg-black/40 p-4 rounded-[2rem] border border-white/20">
        <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 rounded-lg">
                <AvatarImage src={session?.user?.image || "/favicon.png"} />
                <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
                <p className="text-sm font-bold">{session?.user?.name || "کاربر زتب"}</p>
                <VisibilitySelector value={visibility} onChange={setVisibility} />
            </div>
        </div>
        <div className="flex gap-2">
            <Button variant="ghost" className="rounded-full font-bold" onClick={() => router.back()}>انصراف</Button>
            <Button
                onClick={handlePublish}
                disabled={!title.trim() || editor.isEmpty}
                className="bg-ios-gradient px-8 rounded-full font-bold shadow-lg shadow-primary/20"
            >
                {t("done")}
            </Button>
        </div>
      </div>

      <div className="glass-card !bg-white/70 dark:!bg-black/70 backdrop-blur-3xl !p-8 space-y-6 min-h-screen border border-white/20">
        <input
            type="text"
            placeholder={t("articleTitlePlaceholder")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-none text-4xl font-black focus:outline-none placeholder:text-muted-foreground/30"
        />

        <div className="flex gap-2 border-y border-border/30 py-2 sticky top-40 bg-transparent backdrop-blur-md z-[5]">
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
  );
}
