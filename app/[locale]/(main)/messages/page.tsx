"use client";

import { PageContainer } from "@/components/page-container";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ResponsiveModal } from "@/components/ui/responsive-modal";

export default function MessagesPage() {
  const t = useTranslations("Navbar");
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);

  const chats = [
    { id: 1, name: "دکتر مریم علوی", lastMessage: "سلام، نوبت شما تایید شد.", time: "۱۰:۳۰", unread: 2, image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=100" },
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
    <PageContainer>
      <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex gap-4">
        {/* Chat List */}
        <div className={`w-full md:w-[380px] bg-card border border-border/50 rounded-3xl flex flex-col overflow-hidden ${selectedChat ? "hidden md:flex" : "flex"}`}>
          <div className="p-4 border-b border-border/30">
            <div className="flex items-center justify-between mb-4 px-2">
                <Button   onClick={() => setIsNewMessageModalOpen(true)} 
                variant="ghost" size="icon" className="rounded-full">
                    <span className="icon-[solar--hamburger-menu-broken] w-6 h-6" />
                </Button>
                <div className="relative flex-1 mx-2">
                    <span className="icon-[solar--magnifer-broken] absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="جستجو..." className="pr-10 h-10 bg-muted/30 border-none !rounded-full text-right" dir="rtl" />
                </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-3 mx-2 my-1 flex gap-3 cursor-pointer rounded-2xl transition-all ${selectedChat === chat.id ? "bg-primary text-primary-foreground" : "hover:bg-muted/50"}`}
              >
                <Avatar className="w-14 h-14 rounded-full border border-border/10">
                  <AvatarFallback className={selectedChat === chat.id ? "bg-white/20 text-white" : "bg-ios-gradient text-white"}>{chat.image}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-right">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-[11px] ${selectedChat === chat.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{chat.time}</span>
                    <h4 className="font-bold text-[15px] truncate">{chat.name}</h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={`text-[13px] truncate ${selectedChat === chat.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <div className={`text-[11px] font-bold min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center shrink-0 ${selectedChat === chat.id ? "bg-white text-primary" : "bg-primary text-white"}`}>
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* New Message FAB - Mobile Only */}
          
          </div>
        </div>

        {/* Active Chat */}
        <div className={`flex-1 bg-card border border-border/50 rounded-3xl flex flex-col overflow-hidden relative ${selectedChat ? "flex" : "hidden md:flex"}`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-3 border-b border-border/30 flex items-center justify-between bg-card/80 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedChat(null)}>
                    <span className="icon-[solar--alt-arrow-right-broken] w-6 h-6" />
                  </Button>
                  <Avatar className="w-10 h-10 rounded-full border border-border/10">
                    <AvatarFallback className="bg-ios-gradient text-white font-bold">
                      {chats.find(c => c.id === selectedChat)?.image}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-right">
                    <h4 className="font-bold text-[15px]">{chats.find(c => c.id === selectedChat)?.name}</h4>
                    <p className="text-[11px] text-primary font-medium">آخرین بازدید ۲ دقیقه پیش</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <span className="icon-[solar--magnifer-broken] w-5 h-5 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <span className="icon-[solar--phone-broken] w-5 h-5 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <span className="icon-[solar--menu-dots-broken] w-5 h-5 text-muted-foreground" />
                  </Button>
                </div>
              </div>

              {/* Chat Content - Telegram Style BG */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#e7ebf0] dark:bg-[#0f1215] relative">
                {/* Background Pattern Overlay (Optional effect) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://telegram.org/img/bg_pattern.png')] bg-repeat" />

                {messages.map(m => (
                  <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"} relative z-1`}>
                    <div className={`max-w-[85%] sm:max-w-[70%] px-3 py-2 rounded-2xl text-[14px] leading-relaxed shadow-sm relative group ${
                      m.sender === "me"
                        ? "bg-[#effdde] dark:bg-[#2b5278] text-foreground rounded-tr-sm"
                        : "bg-white dark:bg-[#212d3b] text-foreground rounded-tl-sm"
                    }`}>
                      <div className="pr-12">
                         {m.text}
                      </div>
                      <div className={`absolute bottom-1 left-2 flex items-center gap-1 opacity-60 text-[10px] ${m.sender === "me" ? "text-primary" : "text-muted-foreground"}`}>
                         <span>{m.time}</span>
                         {m.sender === "me" && <span className="icon-[solar--check-read-broken] w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-3 bg-card border-t border-border/30">
                <div className="max-w-4xl mx-auto flex gap-2 items-end">
                  <Button variant="ghost" size="icon" className="rounded-full shrink-0 mb-1">
                    <span className="icon-[solar--paperclip-broken] w-6 h-6 text-muted-foreground" />
                  </Button>
                  <div className="relative flex-1">
                    <textarea
                      placeholder="پیام..."
                      rows={1}
                      className="w-full bg-muted/30 border-none rounded-2xl py-3 px-4 pr-12 text-sm focus:ring-0 outline-none resize-none no-scrollbar text-right"
                      dir="rtl"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="absolute right-3 bottom-3">
                       <span className="icon-[solar--smile-square-broken] w-6 h-6 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <Button
                    className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90 shadow-lg p-0 shrink-0"
                    onClick={() => {
                       if (message.trim()) {
                         setMessage("");
                       }
                    }}
                  >
                    <span className="icon-[solar--plain-bold] w-6 h-6 rotate-180 text-primary-foreground" />
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

      {/* New Message Modal (Followers List) */}
      <ResponsiveModal open={isNewMessageModalOpen} onOpenChange={setIsNewMessageModalOpen} title="گفتگوی جدید">
          <div className="space-y-4">
             <div className="relative">
                <span className="icon-[solar--magnifer-bold-duotone] absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="جستجو در دنبال‌کنندگان..." className="pr-10 !rounded-xl bg-white/5" dir="rtl" />
             </div>
             <div className="space-y-1 max-h-[400px] overflow-y-auto">
                {[
                    { id: 10, name: "علی احمدی", specialty: "بیمار", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100" },
                    { id: 11, name: "سارا حسینی", specialty: "متخصص تغذیه", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" },
                    { id: 12, name: "محمد رضایی", specialty: "پزشک عمومی", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" },
                ].map((user) => (
                    <div
                        key={user.id}
                        onClick={() => {
                            setSelectedChat(user.id);
                            setIsNewMessageModalOpen(false);
                        }}
                        className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors"
                    >
                        <Avatar className="w-10 h-10 rounded-lg">
                            <AvatarImage src={user.image} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-right">
                            <p className="text-sm font-bold">{user.name}</p>
                            <p className="text-[10px] text-muted-foreground">{user.specialty}</p>
                        </div>
                    </div>
                ))}
             </div>
          </div>
      </ResponsiveModal>
    </PageContainer>
  );
}
