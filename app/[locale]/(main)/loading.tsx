"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl">
      <div className="relative">
        {/* iOS style loader */}
        <div className="w-12 h-12 rounded-2xl bg-ios-gradient animate-pulse shadow-xl shadow-primary/20" />
        <motion.div
          className="absolute inset-0 border-4 border-primary/30 border-t-primary rounded-2xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
