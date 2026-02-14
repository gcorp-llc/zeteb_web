"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function OfflineDetector() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial check
    if (!navigator.onLine) {
      setIsOffline(true);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-2xl p-6 text-center"
        >
          <div className="max-w-md space-y-6">
            <div className="w-24 h-24 rounded-3xl bg-destructive/10 flex items-center justify-center mx-auto text-destructive">
              <span className="icon-[solar--plain-bold-duotone] w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black">اتصال اینترنت برقرار نیست</h2>
              <p className="text-muted-foreground">
                لطفاً وضعیت اتصال خود را بررسی کرده و دوباره تلاش کنید. زتب برای کار به اینترنت نیاز دارد.
              </p>
            </div>
            <Button
              onClick={() => window.location.reload()}
              className="w-full h-12 bg-ios-gradient !rounded-2xl font-bold shadow-lg"
            >
              تلاش مجدد
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
