"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Zap } from "lucide-react";
import Sparkline from "./Sparkline";
import type { Invoice } from "@/lib/demo";

interface Props {
  invoice: Invoice;
}

interface LineItemProps {
  label: string;
  value: string;
  muted?: boolean;
  bold?: boolean;
  separator?: boolean;
}

function LineItem({ label, value, muted, bold, separator }: LineItemProps) {
  return (
    <div
      className={`flex items-center justify-between py-2 ${separator ? "border-t border-[rgba(10,14,15,0.07)] mt-1 pt-3" : ""}`}
    >
      <span className={`text-sm ${muted ? "text-[#5C6566]" : bold ? "text-[#0A0E0F] font-semibold" : "text-[#0A0E0F]"}`}>
        {label}
      </span>
      <span className={`text-sm font-mono ${muted ? "text-[#5C6566]" : bold ? "text-[#0A0E0F] font-semibold" : "text-[#0A0E0F]"}`}>
        {value}
      </span>
    </div>
  );
}

export default function ConsumptionBreakdown({ invoice }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-[16px] overflow-hidden bg-white"
      style={{
        boxShadow: "0 1px 2px rgba(10,14,15,0.04), 0 4px 12px rgba(10,14,15,0.05)",
        border: "1px solid rgba(10,14,15,0.06)",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-[rgba(10,14,15,0.015)] transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-[8px] flex items-center justify-center"
            style={{ background: "rgba(15,123,95,0.08)" }}
          >
            <Zap size={15} className="text-[#0F7B5F]" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-medium text-[#0A0E0F]">Consumption details</p>
            <p className="text-xs text-[#5C6566]">{invoice.consumptionKwh} kWh - {invoice.period}</p>
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-[#5C6566]" strokeWidth={1.5} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 pb-6 border-t border-[rgba(10,14,15,0.06)]">
              <div className="pt-4 mb-5">
                <p className="text-xs text-[#5C6566] font-medium mb-3 uppercase tracking-wider">6-month consumption</p>
                <Sparkline animate={true} />
              </div>

              <div className="divide-y divide-[rgba(10,14,15,0.05)]">
                <LineItem label="Service fee" value={`AED ${invoice.serviceFee.toFixed(2)}`} muted />
                <LineItem label={`Consumption (${invoice.consumptionKwh} kWh)`} value={`AED ${invoice.consumptionCharge.toFixed(2)}`} muted />
                <LineItem label="Subtotal" value={`AED ${invoice.subtotal.toFixed(2)}`} />
                <LineItem label="VAT (5%)" value={`AED ${invoice.vat.toFixed(2)}`} muted />
                <LineItem label="Total due" value={`AED ${invoice.totalDue.toFixed(2)}`} bold separator />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
