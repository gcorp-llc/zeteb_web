import { Navbar } from "@/features/navigation/navbar";
import { MobileFooter } from "@/features/navigation/mobile-footer";
import { Footer } from "@/components/footer";
import { PageAnimate } from "@/components/page-animate";
import { ChatWidget } from "@/features/social/components/chat-widget";
import { MoveUpButton } from "@/components/move-up-button";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PageAnimate>
        <main className="flex-1">{children}</main>
        <Footer />
      </PageAnimate>
      <ChatWidget />
      <MoveUpButton />
      <MobileFooter />
    </div>
  );
}
