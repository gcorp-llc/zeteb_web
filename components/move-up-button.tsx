"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

export function MoveUpButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 right-4 sm:right-8 z-50 md:bottom-8 md:right-auto md:left-8"
        >
          <Button
            size="icon"
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-card border border-border shadow-xl hover:scale-110 transition-transform text-primary"
          >
            <span className="icon-[solar--alt-arrow-up-broken] w-6 h-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
