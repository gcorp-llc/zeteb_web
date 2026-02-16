"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer } from "vaul";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface ResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  className?: string;
  hideHeader?: boolean;
}

export function ResponsiveModal({
  children,
  open,
  onOpenChange,
  title,
  className,
  hideHeader = false,
}: ResponsiveModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={cn("sm:max-w-[600px] glass !rounded-3xl p-0 overflow-hidden border-white/20", className)}>
          {!hideHeader && (
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-xl font-black">{title}</DialogTitle>
            </DialogHeader>
          )}
          <div className={cn("max-h-[80vh] overflow-y-auto", !hideHeader ? "p-6" : "p-0")}>
            {children}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Drawer.Content className={cn("fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-fit flex-col rounded-t-[2rem] border-t border-white/20 glass outline-none", className)}>
          <div className="mx-auto mt-4 h-1.5 w-12 rounded-full bg-white/20" />
          {!hideHeader && (
            <div className="p-6 text-right">
               <h2 className="text-xl font-black">{title}</h2>
            </div>
          )}
          <div className={cn("pb-12 max-h-[80vh] overflow-y-auto", !hideHeader ? "p-6" : "p-0")}>
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
