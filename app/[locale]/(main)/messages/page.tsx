"use client";

import { PageContainer } from "@/components/page-container";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function MessagesPage() {
  const t = useTranslations("Navbar");
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [message, setMessage] = useState("");

  const chats = [
    { id: 1, name: "دکتر مریم علوی", lastMessage: "سلام، نوبت شما تایید شد.", time: "۱۰:۳۰", unread: 2, image: "MA" },
    { id: 2, name: "دکتر رضا محمدی", lastMessage: "نسخه جدید در سامانه ثبت شد.", time: "دیروز", unread: 0, image: "RM" },
    { id: 3, name: "حسین افتخارراد", lastMessage: "ممنون از راهنمایی شما.", time: "شنبه", unread: 0, image: "HE" },
  ];

  const messages = [
    { id: 1, sender: "them", text: "سلام، وقت بخیر", time: "۱۰:۰۰" },
    { id: 2, sender: "me", text: "سلام دکتر، در مورد نوبت فردا سوال داشتم", time: "۱۰:۰۵" },
    { id: 3, sender: "them", text: "بله بفرمایید، در خدمتم", time: "۱۰:۱۰" },
    { id: 4, sender: "them", text: "سلام، نوبت شما تایید شد.", time: "۱۰:۳۰" },
  ];

  return (
    <PageContainer title={t("messages")}>
      <div className="max-w-6xl mx-auto h-[calc(100vh-250px)] min-h-[500px] flex gap-6">
        {/* Chat List */}
        <div className={`w-full md:w-80 glass-card !p-0 flex flex-col overflow-hidden ${selectedChat ? "hidden md:flex" : "flex"}`}>
          <div className="p-4 border-b border-border/50">
            <h3 className="font-bold text-lg mb-4 text-right">گفتگوها</h3>
            <div className="relative">
               <span className="icon-[solar--magnifer-bold-duotone] absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <Input placeholder="جستجو در پیام‌ها..." className="pr-10 !rounded-xl bg-white/5 text-right" dir="rtl" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 flex gap-3 cursor-pointer hover:bg-white/5 transition-colors border-b border-border/30 last:border-0 ${selectedChat === chat.id ? "bg-primary/5 border-l-4 border-l-primary" : ""}`}
              >
                <Avatar className="w-12 h-12 rounded-xl">
                  <AvatarFallback className="bg-ios-gradient text-white font-bold">{chat.image}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-right">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                    <h4 className="font-bold text-sm truncate">{chat.name}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Chat */}
        <div className={`flex-1 glass-card !p-0 flex-col overflow-hidden ${selectedChat ? "flex" : "hidden md:flex"}`}>
          {selectedChat ? (
            <>
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedChat(null)}>
                    <span className="icon-[solar--alt-arrow-right-bold] w-6 h-6" />
                  </Button>
                  <Avatar className="w-10 h-10 rounded-lg">
                    <AvatarFallback className="bg-ios-gradient text-white font-bold">
                      {chats.find(c => c.id === selectedChat)?.image}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-right">
                    <h4 className="font-bold text-sm">{chats.find(c => c.id === selectedChat)?.name}</h4>
                    <p className="text-[10px] text-green-500 font-bold">آنلاین</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <span className="icon-[solar--phone-bold-duotone] w-5 h-5 text-primary" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <span className="icon-[solar--videocamera-bold-duotone] w-5 h-5 text-primary" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/5">
                {messages.map(m => (
                  <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] p-4 rounded-2xl text-sm ${
                      m.sender === "me"
                        ? "bg-primary text-white rounded-tr-none shadow-lg shadow-primary/10"
                        : "glass border-none rounded-tl-none"
                    }`}>
                      {m.text}
                      <p className={`text-[9px] mt-1 opacity-60 ${m.sender === "me" ? "text-left" : "text-right"}`}>{m.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border/50">
                <div className="flex gap-2 items-center">
                  <Button variant="ghost" size="icon" className="rounded-full shrink-0">
                    <span className="icon-[solar--add-circle-bold-duotone] w-6 h-6 text-primary" />
                  </Button>
                  <div className="relative flex-1">
                    <Input
                      placeholder="پیام خود را بنویسید..."
                      className="!rounded-2xl bg-white/5 pl-12 h-12 text-right"
                      dir="rtl"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex gap-2">
                       <span className="icon-[solar--gallery-bold-duotone] w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                       <span className="icon-[solar--microphone-bold-duotone] w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <Button
                    className="!rounded-2xl h-12 w-12 bg-ios-gradient shadow-lg p-0"
                    onClick={() => {
                       if (message.trim()) {
                         setMessage("");
                       }
                    }}
                  >
                    <span className="icon-[solar--plain-bold] w-6 h-6 rotate-180" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
               <span className="icon-[solar--chat-round-line-bold-duotone] w-20 h-20 opacity-10 mb-4" />
               <p className="font-bold">برای شروع گفتگو یک مخاطب را انتخاب کنید</p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
