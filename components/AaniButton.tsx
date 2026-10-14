"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import AaniLogomark from "./AaniLogomark";
import type { Invoice } from "@/lib/demo";

interface Props {
  invoice: Invoice;
  onOpen: () => void;
}

export default function AaniButton({ invoice, onOpen }: Props) {
  return (
    <div className="space-y-3">
      <motion.button
        onClick={onOpen}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full h-16 rounded-[12px] relative overflow-hidden flex items-center px-5 cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #0F7B5F 0%, #14A37A 100%)",
          boxShadow: "0 2px 8px rgba(15,123,95,0.25), 0 0 0 1px rgba(15,123,95,0.1)",
        }}
        aria-label={`Pay AED ${invoice.totalIfAani.toFixed(2)} with Aani`}
      >
        {/* Hover glow layer */}
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{ background: "linear-gradient(135deg, #14A37A 0%, #1ac489 100%)" }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />

        <div className="relative flex items-center w-full z-10">
          <AaniLogomark size={22} />
          <span className="flex-1 text-center text-white font-semibold text-base tracking-wide">
            Pay AED {invoice.totalIfAani.toFixed(2)} with Aani
          </span>
          <ChevronRight size={18} className="text-white/70" strokeWidth={2} />
        </div>
      </motion.button>

      {/* Trust pills */}
      <div className="flex items-center justify-center gap-2">
        {(["Free", "10 seconds", "Direct from your bank app"] as const).map((label) => (
          <span
            key={label}
            className="text-[11px] text-[#5C6566] font-medium px-2.5 py-1 rounded-full"
            style={{ background: "rgba(10,14,15,0.05)", border: "1px solid rgba(10,14,15,0.07)" }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
