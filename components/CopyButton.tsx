"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";

interface Props {
  text: string;
  label?: string;
}

export default function CopyButton({ text, label }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="relative inline-flex items-center">
      <motion.button
        onClick={handleCopy}
        whileTap={{ scale: 0.9 }}
        className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-[8px] cursor-pointer transition-colors"
        style={{
          background: copied ? "rgba(15,123,95,0.08)" : "rgba(10,14,15,0.05)",
          color: copied ? "#0F7B5F" : "#5C6566",
          border: `1px solid ${copied ? "rgba(15,123,95,0.2)" : "rgba(10,14,15,0.08)"}`,
        }}
        aria-label={`Copy ${label ?? text}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1"
            >
              <Check size={12} strokeWidth={2.5} />
              Copied
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1"
            >
              <Copy size={12} strokeWidth={2} />
              Copy
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
