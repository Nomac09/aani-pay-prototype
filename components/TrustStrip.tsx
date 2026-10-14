"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Building2 } from "lucide-react";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "Licensed by RSB",
    sub: "Regulatory & Supervisory Bureau Dubai",
  },
  {
    icon: Lock,
    title: "Encrypted payment",
    sub: "256-bit SSL security",
  },
  {
    icon: Building2,
    title: "Example Utilities",
    sub: "Sub-metering operator since 2014",
  },
] as const;

export default function TrustStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {ITEMS.map(({ icon: Icon, title, sub }) => (
        <motion.div
          key={title}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.18 }}
          className="flex items-start gap-3 rounded-[12px] px-4 py-4 bg-white"
          style={{
            boxShadow: "0 1px 2px rgba(10,14,15,0.04), 0 2px 8px rgba(10,14,15,0.04)",
            border: "1px solid rgba(10,14,15,0.06)",
          }}
        >
          <div
            className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: "rgba(15,123,95,0.08)" }}
          >
            <Icon size={15} className="text-[#0F7B5F]" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-sm font-medium text-[#0A0E0F]">{title}</p>
            <p className="text-xs text-[#5C6566] leading-relaxed mt-0.5">{sub}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
