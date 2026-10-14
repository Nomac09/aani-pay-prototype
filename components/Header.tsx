"use client";

import { Lock } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import EstaWordmark from "./EstaWordmark";

export default function Header() {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 40], [0, 1]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center px-4 sm:px-6"
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        backgroundColor: "rgba(250, 250, 247, 0.85)",
      }}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-[rgba(10,14,15,0.08)]"
        style={{ opacity: borderOpacity }}
      />
      <div className="max-w-lg mx-auto w-full flex items-center justify-between">
        <EstaWordmark className="h-6" />
        <div className="flex items-center gap-1.5 text-[#5C6566] text-xs font-medium">
          <Lock size={12} strokeWidth={2} />
          <span>Secure payment</span>
        </div>
      </div>
    </motion.header>
  );
}
