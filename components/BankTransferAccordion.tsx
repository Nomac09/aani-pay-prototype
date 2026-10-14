"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import CopyButton from "./CopyButton";
import type { Invoice } from "@/lib/demo";

interface Props {
  invoice: Invoice;
}

interface CopyRowProps {
  label: string;
  value: string;
  note?: string;
  highlight?: boolean;
}

function CopyRow({ label, value, note, highlight }: CopyRowProps) {
  return (
    <div className={`py-3 ${highlight ? "rounded-[10px] px-3 -mx-3" : ""}`}
      style={highlight ? { background: "rgba(184,154,106,0.06)", border: "1px solid rgba(184,154,106,0.15)" } : undefined}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-[#5C6566] font-medium mb-0.5">{label}</p>
          <p className="text-sm text-[#0A0E0F] font-mono break-all">{value}</p>
          {note && (
            <p className="text-xs text-[#B89A6A] mt-1 font-medium">{note}</p>
          )}
        </div>
        <div className="flex-shrink-0 mt-4">
          <CopyButton text={value} label={label} />
        </div>
      </div>
    </div>
  );
}

export default function BankTransferAccordion({ invoice }: Props) {
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
        <div>
          <p className="text-sm font-medium text-[#0A0E0F]">
            Pay AED {invoice.totalDue.toFixed(2)} by bank transfer
          </p>
          <p className="text-xs text-[#5C6566] mt-0.5">1-2 business days</p>
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
            <div className="px-6 pb-6 space-y-1 border-t border-[rgba(10,14,15,0.06)]">
              <div className="pt-1 divide-y divide-[rgba(10,14,15,0.05)]">
                <CopyRow
                  label={`IBAN (${invoice.ibanBank})`}
                  value={invoice.iban}
                />
                <CopyRow
                  label="Payment reference"
                  value={invoice.reference}
                  note="Enter this reference exactly or your payment cannot be matched."
                  highlight
                />
                <CopyRow
                  label="Amount"
                  value={`AED ${invoice.totalDue.toFixed(2)}`}
                />
              </div>
              <p className="text-xs text-[#5C6566] pt-2">
                AED {invoice.aaniDiscount.toFixed(0)} Aani discount does not apply to bank transfers.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
